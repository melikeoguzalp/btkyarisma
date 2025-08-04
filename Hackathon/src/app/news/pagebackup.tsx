
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type NewsArticle = {
  id: number;
  url_adres: string;
  zararli_yazilim: string | null;
  tarih: string;
  kaynak: string;
};

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
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
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      setArticles([]); // Clear previous articles to prevent duplication

      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data: NewsArticle[] = await response.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
        const errorMsg = language === 'tr' ? 'Haberler yüklenemedi. Lütfen daha sonra tekrar deneyin.' : 'Failed to load news. Please try again later.';
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [language]);


  const processedArticles = articles.map(item => ({
      ...item,
      title: language === 'tr' ? `Zararlı URL Tespit Edildi: ${item.url_adres}` : `Malicious URL Detected: ${item.url_adres}`,
      description: language === 'tr' 
          ? `Zararlı bir URL (${item.url_adres}) bildirildi. İlişkili zararlı yazılım: ${item.zararli_yazilim || 'Belirtilmemiş'}.`
          : `A malicious URL (${item.url_adres}) has been reported. Associated malware: ${item.zararli_yazilim || 'Not specified'}.`,
  }));

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          {language === 'en' ? 'Cybersecurity Feed' : 'Siber Güvenlik Akışı'}
        </h1>
        <p className="text-muted-foreground mt-2">
           {language === 'en' ? 'Latest threats reported by USOM.' : 'USOM tarafından bildirilen güncel tehditler.'}
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-destructive text-center p-4 bg-destructive/10 rounded-md">{error}</div>
      ) : processedArticles.length === 0 ? (
         <div className="text-center text-muted-foreground p-4 bg-secondary/50 rounded-md">
            {language === 'en' ? 'No news articles found.' : 'Hiç haber bulunamadı.'}
         </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {processedArticles.map((article: any) => (
            <Card key={article.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="line-clamp-3 break-all">{article.title}</CardTitle>
                <CardDescription className="pt-2">{article.tarih} - {article.kaynak}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-4">{article.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="p-0 h-auto text-primary">
                  <Link href={`http://${article.url_adres}`} target="_blank" rel="noopener noreferrer">
                    {language === 'en' ? 'Check URL' : 'URL\'i Kontrol Et'} <ArrowRight className="ml-2 h-4 w-4" />
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
