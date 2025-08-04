
'use server';

import { analyzePhishingReport, AnalyzePhishingReportOutput } from '@/ai/flows/analyze-phishing-report';
import { z } from 'zod';

type FormState = {
  status: 'idle' | 'success' | 'error';
  result?: AnalyzePhishingReportOutput;
  error?: string;
};

const PhishingReportSchema = z.object({
  content: z.string().min(20, { message: 'Content must be at least 20 characters long.' }),
  language: z.enum(['en', 'tr']),
});

export async function analyzePhishingReportAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  
  const validatedFields = PhishingReportSchema.safeParse({
    content: formData.get('content'),
    language: formData.get('language'),
  });

  if (!validatedFields.success) {
    const contentError = validatedFields.error.flatten().fieldErrors.content?.join(', ');
    const language = formData.get('language');
    const langError = language === 'tr' ? 'İçerik en az 20 karakter uzunluğunda olmalıdır.' : 'Content must be at least 20 characters long.';
    return {
      status: 'error',
      error: contentError ? langError : 'Invalid language provided.',
    };
  }
  
  try {
    const result = await analyzePhishingReport({ 
        content: validatedFields.data.content,
        language: validatedFields.data.language,
     });
    return { status: 'success', result };
  } catch (e) {
    console.error(e);
    const errorMsg = validatedFields.data.language === 'tr' ? 'Sunucu hatası nedeniyle rapor analiz edilemedi.' : 'Failed to analyze the report due to a server error.';
    return { status: 'error', error: errorMsg };
  }
}
