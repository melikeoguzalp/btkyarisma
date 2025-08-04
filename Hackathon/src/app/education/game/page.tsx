'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, MessageSquare, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { generateGameScenario, GenerateGameScenarioOutput } from '@/ai/flows/generate-game-scenario';
import { evaluateGameAnalysis, EvaluateGameAnalysisOutput } from '@/ai/flows/evaluate-game-analysis';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

// UserProfile type
type UserProfile = {
  uid: string;
  name: string;
  profession: string;
  age?: number;
  school?: string;
  department?: string;
  jobTitle?: string;
  retirementPlace?: string;
};

const getRiskCategory = (score: number): 'low' | 'medium' | 'high' => {
  if (score <= 30) return 'low';
  if (score <= 60) return 'medium';
  return 'high';
};

type Difficulty = 'easy' | 'medium' | 'hard' | 'very-hard';

const getDifficulty = (score: number): Difficulty => {
  if (score >= 1000) return 'very-hard';
  if (score >= 500) return 'hard';
  if (score >= 250) return 'medium';
  return 'easy';
};

export default function GamePage() {
  const [language, setLanguage] = useState<'en' | 'tr'>('tr');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameScenarios, setGameScenarios] = useState<GenerateGameScenarioOutput[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [userRiskScore, setUserRiskScore] = useState(50);
  const [userReasoning, setUserReasoning] = useState('');
  const [evaluationResult, setEvaluationResult] = useState<EvaluateGameAnalysisOutput | null>(null);
  const [pointsEarned, setPointsEarned] = useState<number | null>(null);

  useEffect(() => {
    const storedLang = (localStorage.getItem('language') || 'tr') as 'en' | 'tr';
    setLanguage(storedLang);

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserProfile(JSON.parse(storedUser));
    }

    const handleLanguageChange = () => {
      const newLang = (localStorage.getItem('language') || 'tr') as 'en' | 'tr';
      setLanguage(newLang);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const fetchNewScenarios = async (profile: UserProfile, count: number, lang: 'en' | 'tr') => {
    if (!profile) return;
    setIsLoading(true);
    setError(null);
    try {
      const currentDifficulty = getDifficulty(score);
      const scenarioPromises = Array(count)
        .fill(null)
        .map(() =>
          generateGameScenario({
            userProfession: profile.profession,
            name: profile.name,
            age: profile.age,
            school: profile.school,
            department: profile.department,
            jobTitle: profile.jobTitle,
            retirementPlace: profile.retirementPlace,
            language: lang,
            difficulty: currentDifficulty,
          })
        );
      const newScenarios = await Promise.all(scenarioPromises);
      setGameScenarios((prev) => [...prev, ...newScenarios]);
    } catch (err) {
      console.error(err);
      const errorMsg =
        language === 'tr'
          ? 'Yeni oyun senaryoları yüklenemedi. Lütfen daha sonra tekrar deneyin.'
          : 'Failed to load new game scenarios. Please try again later.';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userProfile) {
      const storedStats = localStorage.getItem('userStats');
      if (storedStats) {
        setScore(JSON.parse(storedStats).gameScore || 0);
      }
      setGameScenarios([]);
      setCurrentIndex(0);
      setEvaluationResult(null);
    }
  }, [userProfile, language]);

  useEffect(() => {
    if (userProfile && gameScenarios.length === 0) {
      fetchNewScenarios(userProfile, 1, language);
    }
  }, [userProfile, language, gameScenarios.length]);

  const currentItem = useMemo(() => gameScenarios[currentIndex], [currentIndex, gameScenarios]);

  const handleAnalysisSubmit = async () => {
    if (!currentItem || isEvaluating || !userProfile) return;

    setIsEvaluating(true);
    setError(null);

    try {
      const result = await evaluateGameAnalysis({
        scenarioContent: currentItem.content,
        userRiskScore: userRiskScore,
        userReasoning: userReasoning,
        language,
      });
      setEvaluationResult(result);

      const userCategory = getRiskCategory(userRiskScore);
      const aiCategory = getRiskCategory(result.aiRiskScore);
      let earned = 0;

      if (userCategory === aiCategory) {
        const difference = Math.abs(userRiskScore - result.aiRiskScore);
        earned = Math.max(0, 50 - difference);
      } else {
        earned = 0;
      }

      setPointsEarned(earned);
      const newTotalScore = score + earned;
      setScore(newTotalScore);

      const storedStats = localStorage.getItem('userStats');
      if (storedStats) {
        const stats = JSON.parse(storedStats);
        if (newTotalScore > (stats.gameScore || 0)) {
          stats.gameScore = newTotalScore;
          localStorage.setItem('userStats', JSON.stringify(stats));
        }
      }

      // 🔁 Skoru backend'e gönder
      await fetch('http://localhost:5000/save_phishing_score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isim: userProfile.name,
          yas: userProfile.age,
          okul: userProfile.school,
          bolum: userProfile.department,
          score: newTotalScore,
        }),
      });
    } catch (err) {
      console.error(err);
      const errorMsg =
        language === 'tr'
          ? 'Analiz değerlendirilemedi. Lütfen tekrar deneyin.'
          : 'Failed to evaluate analysis. Please try again.';
      setError(errorMsg);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNext = async () => {
    setEvaluationResult(null);
    setUserReasoning('');
    setUserRiskScore(50);
    setPointsEarned(null);
    const nextIndex = currentIndex + 1;
    if (nextIndex >= gameScenarios.length && userProfile && !isLoading) {
      await fetchNewScenarios(userProfile, 1, language);
    }
    setCurrentIndex(nextIndex);
  };

  if (isLoading && gameScenarios.length === 0) {
    return (
      <main className="container mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">
          {language === 'en'
            ? `Loading personalized scenarios for a ${userProfile?.profession}...`
            : `Bir ${userProfile?.profession} için kişiselleştirilmiş senaryolar yükleniyor...`}
        </p>
      </main>
    );
  }

  const renderResultCard = (result: EvaluateGameAnalysisOutput, earned: number) => {
    const userCategory = getRiskCategory(userRiskScore);
    const aiCategory = getRiskCategory(result.aiRiskScore);
    const isCorrectCategory = userCategory === aiCategory;

    return (
      <Card className="shadow-lg animate-in fade-in bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            {language === 'en' ? "Tutor's Feedback" : 'Eğitmen Geri Bildirimi'}
          </CardTitle>
          <CardDescription>
            {isCorrectCategory
              ? language === 'en'
                ? `You earned ${earned} points!`
                : `${earned} puan kazandın!`
              : language === 'en'
              ? "You didn't earn any points this round, but let's see why."
              : 'Bu tur hiç puan kazanamadın, ama nedenine bakalım.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-lg bg-background/50 border">
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Your Score' : 'Senin Puanın'}
              </p>
              <p className="text-3xl font-bold">{userRiskScore}</p>
            </div>
            <div
              className={cn(
                'p-4 rounded-lg border',
                isCorrectCategory
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-destructive bg-destructive/10'
              )}
            >
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? "AI Tutor's Score" : 'Yapay Zeka Eğitmeninin Puanı'}
              </p>
              <p className="text-3xl font-bold">{result.aiRiskScore}</p>
            </div>
          </div>

          <Accordion type="single" collapsible defaultValue="feedback">
            <AccordionItem value="feedback">
              <AccordionTrigger>
                {language === 'en' ? 'Detailed Feedback' : 'Detaylı Geri Bildirim'}
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="text-base">{result.feedback}</p>
                <Alert variant={isCorrectCategory ? 'default' : 'destructive'}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>
                    {language === 'en' ? "AI's Reasoning" : 'Yapay Zekanın Gerekçesi'}
                  </AlertTitle>
                  <AlertDescription>{result.aiReasoning}</AlertDescription>
                </Alert>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="educational">
              <AccordionTrigger>{language === 'en' ? 'Educational Tip' : 'Eğitimsel İpucu'}</AccordionTrigger>
              <AccordionContent>
                <p className="text-base">{result.educationalFeedback}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>
          <Button onClick={handleNext} className="w-full sm:w-auto ml-auto">
            {language === 'en' ? 'Next Scenario' : 'Sıradaki Senaryo'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          {language === 'en' ? 'Phishing Analysis Game' : 'Phishing Analiz Oyunu'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === 'en'
            ? 'Analyze the scenario and test your skills!'
            : 'Senaryoyu analiz et ve yeteneklerini sına!'}
        </p>
      </header>

      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6 text-center">
          <Badge className="text-lg py-2 px-4 mt-4">
            {language === 'en' ? 'Total Score' : 'Toplam Puan'}: {score}
          </Badge>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{language === 'en' ? 'Error' : 'Hata'}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {currentItem && !evaluationResult && (
          <Card className="shadow-lg min-h-[400px] flex flex-col justify-between bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                {currentItem.type === 'email' ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-5 w-5" />
                    <span>{language === 'en' ? 'Email' : 'E-posta'}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="h-5 w-5" />
                    <span>SMS</span>
                  </div>
                )}
                <span className="text-sm text-muted-foreground">
                  {language === 'en' ? 'From' : 'Gönderen'}: {currentItem.sender}
                </span>
              </div>
              {currentItem.subject && <CardTitle className="mt-2 text-xl">{currentItem.subject}</CardTitle>}
            </CardHeader>
            <CardContent className="text-base flex-grow">
              <p className="whitespace-pre-wrap">{currentItem.content}</p>
            </CardContent>
            <CardFooter className="flex flex-col gap-6">
              <div className="w-full space-y-4">
                <div>
                  <Label htmlFor="reasoning" className="font-semibold">
                    {language === 'en' ? 'Your Analysis' : 'Senin Analizin'}
                  </Label>
                  <Textarea
                    id="reasoning"
                    value={userReasoning}
                    onChange={(e) => setUserReasoning(e.target.value)}
                    placeholder={
                      language === 'en'
                        ? 'Why do you think this is risky or safe?'
                        : 'Sizce bu neden riskli veya güvenli?'
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="risk-score" className="font-semibold">
                    {language === 'en'
                      ? `Your Risk Score Estimate: ${userRiskScore}`
                      : `Tahmini Risk Puanın: ${userRiskScore}`}
                  </Label>
                  <Slider
                    id="risk-score"
                    min={0}
                    max={100}
                    step={1}
                    value={[userRiskScore]}
                    onValueChange={(value) => setUserRiskScore(value[0])}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button onClick={handleAnalysisSubmit} disabled={isEvaluating || !userReasoning} className="w-full sm:w-auto">
                {isEvaluating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {language === 'en' ? 'Submit Analysis' : 'Analizi Gönder'}
              </Button>
            </CardFooter>
          </Card>
        )}

        {evaluationResult && pointsEarned !== null && renderResultCard(evaluationResult, pointsEarned)}

        {!currentItem && !isLoading && (
          <p className="text-center text-muted-foreground">
            {language === 'en'
              ? 'You have completed all scenarios!'
              : 'Tüm senaryoları tamamladınız!'}
          </p>
        )}
      </div>
    </main>
  );
}
