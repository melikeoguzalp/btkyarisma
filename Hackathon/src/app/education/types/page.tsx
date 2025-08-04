
'use client';

import { useEffect, useState } from 'react';
import { educationData } from '@/lib/education-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function TypesPage() {
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

  const { phishingTypes } = educationData[language];

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          {language === 'en' ? 'Common Attack Types' : 'Yaygın Saldırı Türleri'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === 'en' ? 'Learn about the different methods attackers use.' : 'Saldırganların kullandığı farklı yöntemler hakkında bilgi edinin.'}
        </p>
      </header>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {phishingTypes.map((type, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>
                  <div className="flex items-center gap-3">
                      <type.icon className="h-6 w-6 text-primary"/>
                      <span className="font-semibold text-lg">{type.title}</span>
                  </div>
              </AccordionTrigger>
              <AccordionContent className="text-base px-2">
                {type.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
