'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress'; // <-- Progress bar import edildi

export default function ReportPage() {
  const [language, setLanguage] = useState('tr');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [spamRate, setSpamRate] = useState<number | null>(null); // yeni

  useEffect(() => {
    const storedLang = localStorage.getItem('language') || 'tr';
    setLanguage(storedLang);

    const handleLanguageChange = () => {
      const newLang = localStorage.getItem('language') || 'tr';
      setLanguage(newLang);
    };
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setSpamRate(null);

    try {
      const response = await fetch('http://localhost:5000/get_spam_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metin: content }),
      });

      if (!response.ok) {
        throw new Error(language === 'en' ? 'API request failed' : 'API isteği başarısız oldu');
      }

      const data = await response.json();

      if (typeof data === 'string') {
        setResult(data);
        const match = data.match(/(\d+)%?/); // "%20\n" veya "20%" gibi değerleri işler
        if (match) {
          setSpamRate(Number(match[1]));
        }
      } else {
        setResult(JSON.stringify(data));
      }
    } catch (err: any) {
      setError(err.message || 'Bilinmeyen bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">
              {language === 'en' ? 'Phishing Analyzer' : 'Phishing Analiz Aracı'}
            </CardTitle>
            <CardDescription>
              {language === 'en'
                ? "Got a suspicious message? Paste its content below to analyze."
                : 'Şüpheli bir mesaj mı aldınız? İçeriğini aşağıya yapıştırarak analiz edin.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid w-full gap-2">
                <Label htmlFor="message-content" className="font-semibold">
                  {language === 'en' ? 'Message Content' : 'Mesaj İçeriği'}
                </Label>
                <Textarea
                  id="message-content"
                  name="content"
                  placeholder={
                    language === 'en'
                      ? 'Paste the full email or SMS content here...'
                      : 'E-postanın veya SMS\'in tam içeriğini buraya yapıştırın...'
                  }
                  className="min-h-[200px] text-base"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldAlert className="mr-2 h-4 w-4" />}
                  {language === 'en' ? 'Analyze Message' : 'Mesajı Analiz Et'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{language === 'en' ? 'Error' : 'Hata'}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Card className="mt-4 shadow-md">
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Analysis Result' : 'Analiz Sonucu'}</CardTitle>
              </CardHeader>
              <CardContent>
                {spamRate !== null && (
                  <div>
                    <p className="mb-2 font-semibold">
                      {language === 'en'
                        ? `Spam Probability: ${spamRate}%`
                        : `Spam Olasılığı: %${spamRate}`}
                    </p>
                    <Progress value={spamRate} className="h-4" />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
