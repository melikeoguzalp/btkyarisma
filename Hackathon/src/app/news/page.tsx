'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type UsomNews = {
  header: string;
  link: string;
  tarih: string;
};

export default function NewsPage() {
  const [articles, setArticles] = useState<UsomNews[]>([]);
  const [language, setLanguage] = useState<'en' | 'tr'>('tr');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedLang = (localStorage.getItem('language') || 'tr') as 'en' | 'tr';
    setLanguage(storedLang);

    const handleLanguageChange = () => {
      const newLang = (localStorage.getItem('language') || 'tr') as 'en' | 'tr';
      setLanguage(newLang);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      setArticles([]);

      try {
        const response = await fetch('http://localhost:5000/get_news');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data: UsomNews[] = await response.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
        const errorMsg = language === 'tr'
          ? 'USOM haberleri yüklenemedi. Daha sonra tekrar deneyin.'
          : 'Failed to load USOM news. Please try again later.';
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [language]);

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          {language === 'en' ? 'Cybersecurity Feed' : 'Siber Güvenlik Akışı'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === 'en'
            ? 'Latest security bulletins from USOM.'
            : 'USOM tarafından bildirilen en son güvenlik bildirimleri.'}
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-destructive text-center p-4 bg-destructive/10 rounded-md">{error}</div>
      ) : articles.length === 0 ? (
        <div className="text-center text-muted-foreground p-4 bg-secondary/50 rounded-md">
          {language === 'en' ? 'No news articles found.' : 'Hiç haber bulunamadı.'}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="line-clamp-3">{article.header}</CardTitle>
                <CardDescription className="pt-2">{article.tarih}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-4">
                  {language === 'en'
                    ? 'Click the button below to read more details.'
                    : 'Detayları okumak için aşağıdaki butona tıklayın.'}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="p-0 h-auto text-primary">
                  <Link href={article.link} target="_blank" rel="noopener noreferrer">
                    {language === 'en' ? 'View Bulletin' : 'Bildirim Sayfası'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
