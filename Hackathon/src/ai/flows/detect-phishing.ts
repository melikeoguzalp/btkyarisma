// This is a server-side file! Don't add client-side logic here.
'use server';

/**
 * @fileOverview Flow for detecting phishing attempts in email/SMS content.
 *
 * - detectPhishingAttempt - Analyzes input text to determine if it is a phishing attempt.
 * - DetectPhishingInput - The input type for the detectPhishingAttempt function.
 * - DetectPhishingOutput - The return type for the detectPhishingAttempt function.
 */

import {ai, geminipro} from '@/ai/genkit';
import {z} from 'genkit';

const DetectPhishingInputSchema = z.object({
  text: z.string().describe('The email or SMS content to analyze.'),
});
export type DetectPhishingInput = z.infer<typeof DetectPhishingInputSchema>;

const DetectPhishingOutputSchema = z.object({
  isPhishing: z.boolean().describe('Whether the input text is likely a phishing attempt.'),
  reason: z.string().describe('The reason why the input text is classified as phishing or not.'),
});
export type DetectPhishingOutput = z.infer<typeof DetectPhishingOutputSchema>;

export async function detectPhishingAttempt(input: DetectPhishingInput): Promise<DetectPhishingOutput> {
  return detectPhishingFlow(input);
}

const detectPhishingPrompt = ai.definePrompt({
  name: 'detectPhishingPrompt',
  model: geminipro,
  input: {schema: DetectPhishingInputSchema},
  output: {schema: DetectPhishingOutputSchema},
  prompt: `You are an expert in identifying phishing attempts. Analyze the following text and determine if it is a phishing attempt.

Text: {{{text}}}

Provide a brief reason for your determination.

Respond in JSON format as follows:
{
  "isPhishing": true or false,
  "reason": "explanation"
}`,
});

const detectPhishingFlow = ai.defineFlow(
  {
    name: 'detectPhishingFlow',
    inputSchema: DetectPhishingInputSchema,
    outputSchema: DetectPhishingOutputSchema,
  },
  async input => {
    const {output} = await detectPhishingPrompt(input);
    return output!;
  }
);
