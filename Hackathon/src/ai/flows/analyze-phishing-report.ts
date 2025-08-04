
'use server';
/**
 * @fileOverview An AI agent that analyzes user-submitted email or SMS content to determine if it is a phishing attempt.
 *
 * - analyzePhishingReport - A function that takes email or SMS content as input and returns a phishing analysis.
 * - AnalyzePhishingReportInput - The input type for the analyzePhishingReport function.
 * - AnalyzePhishingReportOutput - The return type for the analyzePhishingReport function.
 */

import {ai, geminipro} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePhishingReportInputSchema = z.object({
  content: z.string().describe('The email or SMS content to analyze.'),
  language: z.enum(['en', 'tr']).default('tr').describe('The language for the analysis.'),
});
export type AnalyzePhishingReportInput = z.infer<typeof AnalyzePhishingReportInputSchema>;

const AnalyzePhishingReportOutputSchema = z.object({
  phishingScore: z
    .number()
    .min(0)
    .max(1)
    .describe(
      'A score from 0.0 (definitely safe) to 1.0 (definitely phishing) indicating the likelihood of the content being a phishing attempt. This should be a dynamic value based on the analysis.'
    ),
  reason: z.string().describe('The reasoning behind the phishing determination.'),
  reportingAdvice: z.string().describe('Actionable advice on how and where to report the phishing attempt.'),
});
export type AnalyzePhishingReportOutput = z.infer<typeof AnalyzePhishingReportOutputSchema>;

export async function analyzePhishingReport(input: AnalyzePhishingReportInput): Promise<AnalyzePhishingReportOutput> {
  return analyzePhishingReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePhishingReportPrompt',
  model: geminipro,
  input: {schema: AnalyzePhishingReportInputSchema},
  output: {schema: AnalyzePhishingReportOutputSchema},
  prompt: `You are a cybersecurity analyst who calculates a phishing risk score based on a set of rules.
Respond in the specified language: {{language}}.

Content: {{{content}}}

Analyze the content based on the following risk factors and their corresponding points. Start with a score of 0.0 and add points for each red flag you find. The final score is the sum of points, capped at 1.0.

RISK FACTORS:
- Suspicious Link (0.35 pts): URL shorteners (bit.ly, etc.), mismatched domain names, or non-standard TLDs (.xyz, .info).
- Urgent/Threatening Language (0.25 pts): Phrases like "urgent action required," "account will be suspended," or threats.
- Request for Credentials/Personal Info (0.30 pts): Asks for passwords, social security numbers, credit card details.
- Generic Greeting (0.10 pts): Vague greetings like "Dear Customer" instead of a personal name.
- Sender Impersonation (0.25 pts): Sender email address is suspicious or tries to mimic a legitimate company but has slight variations (e.g., support@yourbanc.com).
- Grammatical Errors/Typos (0.15 pts): Poor grammar and spelling mistakes.
- Unexpected Attachments (0.20 pts): Unexpected invoices, documents, or files.
- Too Good to Be True Offers (0.20 pts): Winning a lottery, claiming a large prize for a small fee.

Based on your analysis:
1.  Calculate the final 'phishingScore' by summing the points of all identified risk factors.
2.  Provide a 'reason' explaining WHICH factors you identified and why they contributed to the score.
3.  Provide actionable 'reportingAdvice' on how and where to report the phishing attempt. For emails, suggest reporting to the email provider. For SMS, suggest forwarding to a carrier's spam number. Always suggest reporting to the national cybersecurity authority like CISA (in the US) or USOM (in Turkey via www.usom.gov.tr).

Return your analysis in the specified JSON format, with all text fields translated to the target language ({{language}}).`,
});

const analyzePhishingReportFlow = ai.defineFlow(
  {
    name: 'analyzePhishingReportFlow',
    inputSchema: AnalyzePhishingReportInputSchema,
    outputSchema: AnalyzePhishingReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
