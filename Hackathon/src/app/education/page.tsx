
'use client';

import { useEffect, useState, useMemo } from 'react';
import { educationData } from '@/lib/education-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';


export default function EducationPage() {
  const [language, setLanguage] = useState<'en' | 'tr'>('tr');

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

  const { dailyTips, educationSections } = educationData[language];
  
  const tipOfTheDay = useMemo(() => {
      if (!dailyTips || dailyTips.length === 0) return null;
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      return dailyTips[dayOfYear % dailyTips.length];
  }, [dailyTips]);


  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          {language === 'en' ? 'Education & Awareness' : 'Eğitim ve Farkındalık'}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          {language === 'en' ? 'Strengthen your digital shield with interactive lessons.' : 'Etkileşimli derslerle dijital kalkanınızı güçlendirin.'}
        </p>
         <p className="text-lg mt-4 max-w-3xl">
          {language === 'en' 
            ? 'In today\'s digital world, information is power. Understanding the tactics used by cyber attackers is the first and most important step in protecting yourself, your family, and your workplace. Here you can find the tools to become a more conscious internet user.' 
            : 'Günümüz dijital dünyasında bilgi güçtür. Siber saldırganların kullandığı taktikleri anlamak, kendinizi, ailenizi ve iş yerinizi korumanın ilk ve en önemli adımıdır. Burada, daha bilinçli bir internet kullanıcısı olmanız için gereken araçları bulabilirsiniz.'
          }
        </p>
      </header>
      
      {tipOfTheDay && (
        <Alert className="mb-8 border-primary/50 bg-primary/10">
            <tipOfTheDay.icon className="h-5 w-5 text-primary" />
            <AlertTitle className="text-primary font-bold">
                {language === 'en' ? 'Tip of the Day' : 'Günün İpucu'}
            </AlertTitle>
            <AlertDescription>
                <strong>{tipOfTheDay.title}:</strong> {tipOfTheDay.content}
            </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {educationSections.map((section) => (
            <Card key={section.link} className="shadow-lg hover:shadow-xl transition-shadow flex flex-col bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <section.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <CardTitle>{section.title}</CardTitle>
                        <CardDescription className="mt-1">{section.description}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow"></CardContent>
                <CardFooter>
                    <Button asChild className="w-full sm:w-auto ml-auto">
                        <Link href={section.link}>
                            {language === 'en' ? 'Go to Section' : 'Bölüme Git'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </main>
  );
}
