
'use server';
/**
 * @fileOverview An AI agent that acts as a tutor for the phishing game.
 * It evaluates the user's analysis of a given scenario and provides feedback.
 *
 * - evaluateGameAnalysis - A function that evaluates the user's analysis.
 * - EvaluateGameAnalysisInput - The input type for the function.
 * - EvaluateGameAnalysisOutput - The return type for the function.
 */

import {ai, geminipro} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateGameAnalysisInputSchema = z.object({
  scenarioContent: z.string().describe('The full content of the email or SMS scenario presented to the user.'),
  userRiskScore: z.number().min(0).max(100).describe("The user's estimated phishing risk score (0-100)."),
  userReasoning: z.string().describe("The user's reasoning for their estimated risk score."),
  language: z.enum(['en', 'tr']).default('tr').describe('The language for the feedback.'),
});
export type EvaluateGameAnalysisInput = z.infer<typeof EvaluateGameAnalysisInputSchema>;

const EvaluateGameAnalysisOutputSchema = z.object({
  isPhishing: z.boolean().describe('Whether the content is actually a phishing attempt.'),
  aiRiskScore: z.number().min(0).max(100).describe('The AI tutor\'s calculated risk score (0-100).'),
  aiReasoning: z.string().describe('The AI tutor\'s reasoning for its calculated score, identifying the specific red flags or signs of legitimacy.'),
  feedback: z.string().describe("A direct comparison of the AI's analysis versus the user's. It should comment on the user's accuracy and point out what they might have missed or identified correctly."),
  educationalFeedback: z.string().describe("Actionable advice for the user on what to pay attention to in the next scenario based on their performance in this one."),
});
export type EvaluateGameAnalysisOutput = z.infer<typeof EvaluateGameAnalysisOutputSchema>;

export async function evaluateGameAnalysis(input: EvaluateGameAnalysisInput): Promise<EvaluateGameAnalysisOutput> {
  return evaluateGameAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'evaluateGameAnalysisPrompt',
  model: geminipro,
  input: {schema: EvaluateGameAnalysisInputSchema},
  output: {schema: EvaluateGameAnalysisOutputSchema},
  prompt: `You are a cybersecurity expert acting as a tutor in a phishing simulation game.
Your goal is to evaluate a user's analysis of a message and provide constructive, educational feedback.
Respond in the specified language: {{language}}.

Analyze the following message content to determine its actual risk and whether it's phishing.
Message Content: """{{scenarioContent}}"""

Based on the content, first determine if it IS phishing or not.
Then, calculate an 'aiRiskScore' from 0 (safe) to 100 (definitely phishing) based on factors like suspicious links, urgent language, sender impersonation, grammar, etc.
Provide a detailed 'aiReasoning' for your score.

Now, compare your analysis with the user's analysis:
- User's Estimated Score: {{userRiskScore}}
- User's Reasoning: "{{userReasoning}}"

Provide your evaluation in two parts:
1.  'feedback': Directly compare your findings with the user's. For example: "Your score of {{userRiskScore}} is quite close. You correctly identified the urgent language, but you missed the suspicious link hidden in the text." or "You correctly identified this as a safe message. Your reasoning was spot on."
2.  'educationalFeedback': Give the user a concrete tip for the next round. For example: "In the next scenario, try to hover over links (if possible) or examine the domain name carefully before trusting it." or "Great job! Keep applying this level of scrutiny to all unexpected messages."

Return your full evaluation in the specified JSON format.
`,
});

const evaluateGameAnalysisFlow = ai.defineFlow(
  {
    name: 'evaluateGameAnalysisFlow',
    inputSchema: EvaluateGameAnalysisInputSchema,
    outputSchema: EvaluateGameAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
