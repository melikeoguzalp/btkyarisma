
'use client';

import { useEffect, useState } from 'react';
import { educationData, InteractiveStory } from '@/lib/education-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowRight, Lightbulb, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const StoryCard = ({ story, onAnswer, language }: { story: InteractiveStory, onAnswer: (isCorrect: boolean) => void, language: 'en' | 'tr' }) => {
  return (
    <Card className="shadow-lg bg-card/80 backdrop-blur-sm w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-start gap-3">
          <story.icon className="h-8 w-8 text-primary mt-1" />
          <div className="flex-1">
            {language === 'en' ? 'What Would You Do?' : 'Sen Olsan Ne Yapardın?'}
            <p className="text-sm font-normal text-destructive mt-1">{story.dangerType}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-center p-4 border rounded-md bg-background/50">"{story.scenario}"</p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4">
        {story.options.map((option, index) => (
          <Button key={index} onClick={() => onAnswer(option.isCorrect)} className="w-full">
            {option.text}
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
};

const ExplanationCard = ({ story, isCorrect, onNext, language }: { story: InteractiveStory, isCorrect: boolean | null, onNext: () => void, language: 'en' | 'tr' }) => {
  return (
    <Card className="shadow-lg bg-card/80 backdrop-blur-sm w-full max-w-2xl animate-in fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isCorrect ? (
            <>
              <CheckCircle className="h-8 w-8 text-green-500" /> {language === 'en' ? 'Correct!' : 'Doğru!'}
            </>
          ) : (
            <>
              <XCircle className="h-8 w-8 text-destructive" /> {language === 'en' ? 'Be Careful!' : 'Dikkatli Ol!'}
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{story.explanation}</p>
        <Alert variant={isCorrect ? "default" : "destructive"}>
           {isCorrect ? <Lightbulb className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          <AlertTitle>{language === 'en' ? 'Key Takeaway' : 'Önemli Bilgi'}</AlertTitle>
          <AlertDescription>
            {language === 'en' ? `This scenario demonstrates a common '${story.dangerType}' tactic.` : `Bu senaryo, yaygın bir '${story.dangerType}' taktiğini göstermektedir.`}
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter>
        <Button onClick={onNext} className="w-full sm:w-auto ml-auto">
          {language === 'en' ? 'Next Story' : 'Sonraki Hikaye'} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};


export default function StoriesPage() {
  const [language, setLanguage] = useState<'en' | 'tr'>('tr');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const storedLang = (localStorage.getItem('language') || 'tr') as 'en' | 'tr';
    setLanguage(storedLang);
    
    const handleLanguageChange = () => {
      const newLang = (localStorage.getItem('language') || 'tr') as 'en' | 'tr';
      setLanguage(newLang);
      setCurrentStoryIndex(0);
      setShowExplanation(false);
      setIsCorrect(null);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const { stories } = educationData[language];
  const currentStory = stories[currentStoryIndex];
  
  const handleAnswer = (correct: boolean) => {
    setIsCorrect(correct);
    setShowExplanation(true);
  };

  const handleNext = () => {
    const storedStats = localStorage.getItem('userStats');
    if (storedStats) {
        const stats = JSON.parse(storedStats);
        const completed = new Set(stats.completedStories || []);
        completed.add(currentStory.id);
        stats.completedStories = Array.from(completed);
        localStorage.setItem('userStats', JSON.stringify(stats));
    }


    setShowExplanation(false);
    setIsCorrect(null);
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
       <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          {language === 'en' ? 'Interactive Stories' : 'Etkileşimli Hikayeler'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === 'en' ? 'Learn to identify phishing attempts through real-life scenarios.' : 'Gerçek hayat senaryoları üzerinden oltalama girişimlerini tanımayı öğrenin.'}
        </p>
      </header>
      <div className="flex items-center justify-center min-h-[50vh]">
        {!showExplanation ? (
          <StoryCard story={currentStory} onAnswer={handleAnswer} language={language} />
        ) : (
          <ExplanationCard story={currentStory} isCorrect={isCorrect} onNext={handleNext} language={language} />
        )}
      </div>
    </main>
  );
}
