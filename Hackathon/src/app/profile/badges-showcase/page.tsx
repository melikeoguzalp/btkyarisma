
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as BadgeType, badgesData } from '@/lib/badges-data';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

type UserStats = {
  reportsAnalyzed: number;
  gameScore: number;
  completedStories: string[];
};

export default function BadgesShowcasePage() {
  const [earnedBadges, setEarnedBadges] = useState<BadgeType[]>([]);
  const [language, setLanguage] = useState<'en' | 'tr'>('tr');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = () => {
      const storedLang = (localStorage.getItem('language') || 'tr') as 'en' | 'tr';
      setLanguage(storedLang);

      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        router.push('/login');
        return;
      }
      
      const storedStats = localStorage.getItem('userStats');
      if (storedStats) {
        const userStats = JSON.parse(storedStats) as UserStats;
        const allBadges = badgesData[storedLang] || badgesData.en;
        const currentEarnedBadges = allBadges.filter(badge => {
            switch(badge.type) {
                case 'game':
                    return userStats.gameScore >= badge.score;
                case 'report':
                    return userStats.reportsAnalyzed >= badge.score;
                case 'story':
                     return (userStats.completedStories || []).length >= badge.score;
                default:
                    return false;
            }
        });
        setEarnedBadges(currentEarnedBadges);
      }
      setLoading(false);
    };

    fetchUserData();

    const handleLanguageChange = () => {
      fetchUserData();
    };
    window.addEventListener('languageChanged', handleLanguageChange);
    window.addEventListener('storage', fetchUserData);

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      window.removeEventListener('storage', fetchUserData);
    };
  }, [router]);
  
  if (loading) {
      return null;
  }

  const allBadges = badgesData[language] || badgesData.en;

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          {language === 'en' ? 'Badge Showcase' : 'Rozet Galerisi'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === 'en' ? 'All available badges and your achievements.' : 'Tüm mevcut rozetler ve başarıların.'}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allBadges.map((badge) => {
          const isEarned = earnedBadges.some(b => b.id === badge.id);
          return (
            <Card key={badge.id} className={cn('shadow-lg flex flex-col', isEarned ? badge.color : 'bg-muted/30')}>
              <CardHeader className="items-center text-center">
                <badge.icon className={cn('h-20 w-20', !isEarned && 'grayscale opacity-60')} />
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <CardTitle>{badge.name}</CardTitle>
                <CardDescription className={cn('mt-2', isEarned && 'text-foreground/80')}>
                  {badge.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="justify-center">
                {isEarned && (
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle className="h-5 w-5" />
                    {language === 'en' ? 'Earned' : 'Kazanıldı'}
                  </div>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
