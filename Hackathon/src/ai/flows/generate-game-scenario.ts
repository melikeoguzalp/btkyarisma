
'use server';
/**
 * @fileOverview A Genkit flow for generating personalized phishing game scenarios.
 *
 * - generateGameScenario - Creates a phishing scenario based on user's profession.
 * - GenerateGameScenarioInput - The input type for the function.
 * - GenerateGameScenarioOutput - The return type for the function.
 */

import { ai, geminipro } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateGameScenarioInputSchema = z.object({
  userProfession: z.string().describe("The profession of the user, e.g., 'student', 'employee', 'retired'."),
  name: z.string().optional().describe("The user's name."),
  age: z.number().optional().describe("The user's age."),
  school: z.string().optional().describe("The user's school, if they are a student."),
  department: z.string().optional().describe("The user's department, if they are a student."),
  jobTitle: z.string().optional().describe("The user's job title, if they are an employee."),
  retirementPlace: z.string().optional().describe("The place the user retired from, if applicable."),
  language: z.enum(['en', 'tr']).default('tr').describe("The language for the scenario generation."),
  difficulty: z.enum(['easy', 'medium', 'hard', 'very-hard']).default('easy').describe("The difficulty level of the scenario."),
});
export type GenerateGameScenarioInput = z.infer<typeof GenerateGameScenarioInputSchema>;

const GenerateGameScenarioOutputSchema = z.object({
  type: z.enum(['email', 'sms']).describe("The type of the message."),
  sender: z.string().describe("The sender of the message (can be a person, company, or phone number)."),
  subject: z.string().optional().describe("The subject of the email, if applicable."),
  content: z.string().describe("The full content of the message."),
  isPhishing: z.boolean().describe("Whether the scenario is a phishing attempt or a legitimate message."),
  explanation: z.string().describe("A brief explanation of why the message is (or is not) a phishing attempt, highlighting the clues.")
});
export type GenerateGameScenarioOutput = z.infer<typeof GenerateGameScenarioOutputSchema>;

const scenarioPrompt = ai.definePrompt({
  name: 'gameScenarioPrompt',
  model: geminipro,
  input: { schema: GenerateGameScenarioInputSchema },
  output: { schema: GenerateGameScenarioOutputSchema },
  prompt: `You are a creative content generator specializing in cybersecurity education. Your task is to create a highly realistic message scenario for a game in the specified language: {{language}}.

The user's name is {{name}}, they are {{age}} years old, and their profession is {{userProfession}}.
The difficulty for this scenario is: {{difficulty}}.

VERY IMPORTANT: You must randomly decide whether to generate a phishing attempt OR a completely legitimate, safe message. The \`isPhishing\` field must be set accordingly. The "explanation" should justify your choice, pointing out red flags for phishing attempts or signs of legitimacy for safe messages.

Generate a single, compelling scenario (either an email or SMS) tailored to the user and the requested difficulty level. You should create a diverse mix of scenarios. Sometimes use the user's personal details for a targeted attack, and other times create a general, common attack (like a fake package delivery, a suspicious login alert, or a streaming service problem) that is not related to their profession. The goal is to be unpredictable.

- Generate all content (sender, subject, content, explanation) in the target language: {{language}}.
- Start the message by addressing the user by their name, for example: "Dear {{name}}".
- Use the user's age ({{age}}) to tailor the context. For younger users, use themes like social media, online gaming, or student life. For older users, use themes like banking, health services, or retirement benefits.
- If the user is a 'student' at {{school}}, you could create a scenario about university notifications OR a general one about a social media account issue.
- If the user is an 'employee' with the job title '{{jobTitle}}', you could create a scenario like a fake request from a 'manager' OR a general one about a fake invoice from an online store.
- If the user is 'retired', you could create a scenario about pension benefits OR a general one about a streaming service subscription.
- For 'other' professions, create a general scenario but still use their name {{name}} and age {{age}} for personalization.

DIFFICULTY-BASED CLUES (Only for Phishing Scenarios):
- easy: Use obvious clues. Blatant spelling/grammar errors, generic greetings (Dear Customer), highly suspicious links (e.g., 'yourbank-security.xyz'). The sender's email should be clearly fake.
- medium: Clues are more subtle. The sender's email might be a close imitation (e.g., 'support@yourbanc.com'). Language is more professional, but with a sense of urgency. The link might be a URL shortener (e.g., bit.ly).
- hard: Very convincing. The message is highly personalized using the user's name/job title. Grammar is perfect. The phishing clue might be a very subtle discrepancy in a link's domain that requires careful inspection (e.g., 'microsoft-support.com' vs 'microsft-support.com').
- very-hard: Extremely targeted (spear phishing). The message content is highly plausible, referencing a specific internal project or a recent real-world event. The only clue might be the underlying URL of a hyperlink that looks perfectly fine on the surface. The user would have to "hover" to see the real destination.

For legitimate messages, ensure they look authentic and do not contain any of these red flags.

Provide the output in the specified JSON format.
`,
});

const generateGameScenarioFlow = ai.defineFlow(
  {
    name: 'generateGameScenarioFlow',
    inputSchema: GenerateGameScenarioInputSchema,
    outputSchema: GenerateGameScenarioOutputSchema,
  },
  async (input) => {
    const { output } = await scenarioPrompt(input);
    return output!;
  }
);

export async function generateGameScenario(input: GenerateGameScenarioInput): Promise<GenerateGameScenarioOutput> {
  return generateGameScenarioFlow(input);
}
