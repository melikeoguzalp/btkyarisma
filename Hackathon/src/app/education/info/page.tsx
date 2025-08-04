
'use client';

import { useEffect, useState } from 'react';
import { educationData } from '@/lib/education-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';

export default function InfoPage() {
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

  const { infoCards } = educationData[language];

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          {language === 'en' ? 'Quick Info Cards' : 'Hızlı Bilgi Kartları'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === 'en' ? 'Key cybersecurity tips in a flash.' : 'Önemli siber güvenlik ipuçları bir bakışta.'}
        </p>
      </header>

      <div className="flex justify-center">
        <Carousel className="w-full max-w-lg mx-auto" opts={{ loop: true }}>
          <CarouselContent>
            {infoCards.map((card, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className={cn("min-h-[250px] shadow-lg flex flex-col justify-center items-center text-center p-6",
                    index % 2 === 0 ? "bg-accent/20" : "bg-secondary/20"
                  )}>
                    <card.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription className="mt-2 text-base">{card.content}</CardDescription>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </main>
  );
}
