
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
  prompt: `
You are an expert in cybersecurity training, working on an interactive game that helps users detect phishing attempts. Your goal is to create **realistic, psychologically convincing** scenarios that adapt to the user's profile and difficulty level.

The scenario will simulate either an email or SMS message. You must **randomly** choose whether the message is a **phishing attempt** or a **completely legitimate communication**. 

---
### USER PROFILE:
- Name: {{name}}
- Age: {{age}}
- Profession: {{userProfession}}
- School: {{school}} (if student)
- Department: {{department}} (if student)
- Job Title: {{jobTitle}} (if employee)
- Retirement Place: {{retirementPlace}} (if retired)
- Language: {{language}}
- Difficulty: {{difficulty}}

---
### MISSION:
Generate a **compelling, realistic scenario** in the chosen language ({{language}}), personalized based on the user's details. You can include **realistic emotions** like urgency, fear of missing out, rewards, or authority pressure depending on the scenario type. Personalize messages using the user's profile wherever reasonable.

The message must:
- Be either **email** or **sms**.
- Include a **sender** (a person, company, or phone number).
- For emails, include a **subject** line.
- Be realistic in length, tone, and style based on the message type.
- Always start with a greeting, such as "Dear {{name}}" or equivalent in the target language.
- Use themes relatable to the user (e.g., banking, education, e-commerce, tech support, health, social media).
- Include **one realistic call-to-action** (e.g., click, reply, log in).

---
### PHISHING SCENARIOS:
If you generate a phishing message, adapt the deception level based on difficulty:

- **Easy**: Obvious red flags (bad grammar, suspicious links, generic greeting).
- **Medium**: Better language, but subtle anomalies (slightly wrong domain, urgency).
- **Hard**: Highly personalized and grammatically correct, with very subtle phishing clues (e.g., typo in a URL).
- **Very-hard**: Spear-phishing level. Hyper-realistic with deep personalization or referencing real recent events, the phishing clue must be extremely subtle (like a hidden hyperlink).

---
### LEGITIMATE SCENARIOS:
These should look completely safe and plausible. No red flags. Could be a message from school, HR, pension office, or a friend.

---
### FINAL OUTPUT (JSON FORMAT):
Return the following fields:
- \`type\`: "email" or "sms"
- \`sender\`: Name/email/phone number of the sender
- \`subject\`: (only for emails)
- \`content\`: The full message
- \`isPhishing\`: true/false
- \`explanation\`: Justify why it’s phishing or not, based on clues (technical or social-engineering related).

DO NOT mention "this is a game" in the content. Stay **in character** as a real message.

### DIVERSITY REQUIREMENT:
You must avoid generating scenarios that are repetitive or similar to previous ones within a short span of prompts (e.g., 2–3 turns). Ensure each scenario is **unique** in terms of:

- Message topic and content
- Sender identity
- Type of phishing (e.g., prize, urgent login, fake HR, fake school message)
- Social engineering method (fear, urgency, reward, authority, curiosity)
- Message format (SMS vs Email)

Avoid repeating exact patterns like:
- "Your package is delayed"
- "Click here to log in to your account"
- "You have won a prize"

Instead, **rotate themes** across banking, social media, shopping, school, work, healthcare, and utilities. Make each scenario **feel fresh and unpredictable** to keep users engaged and challenged.
Keep a short internal memory of the last 3 generated scenarios and ensure **no direct repetition** of structure or topic.
Generate each URL so that it convincingly mimics a legitimate domain by using familiar organization names with subtle variations and realistic path structures.

` ,
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
