'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge as UiBadge } from '@/components/ui/badge';
import { badgesData, Badge } from '@/lib/badges-data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Loader2, ShieldCheck, Gamepad2, GraduationCap } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

type UserProfileData = {
  uid: string;
  name: string;
  email: string;
  profession: string;
};

type UserStats = {
  reportsAnalyzed: number;
  gameScore: number;
  lessonsCompleted: number;
  completedStories: string[];
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [language, setLanguage] = useState<'en' | 'tr'>('tr');
  const pathname = usePathname();
  const router = useRouter();

  const updateEarnedBadges = (userStats: UserStats, lang: 'en' | 'tr') => {
    const allBadges = badgesData[lang] || badgesData.en;
    const currentEarnedBadges = allBadges.filter(badge => {
      if (badge.id === 'rookie-analyst') {
        return userStats.reportsAnalyzed >= badge.score;
      }
      return userStats.gameScore >= badge.score;
    });
    setEarnedBadges(currentEarnedBadges);
  };

  useEffect(() => {
    const fetchUserData = () => {
      const storedUser = localStorage.getItem('user');
      const storedLang = (localStorage.getItem('language') || 'tr') as 'en' | 'tr';
      setLanguage(storedLang);

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        const storedStats = localStorage.getItem('userStats');
        if (storedStats) {
          const userStats = JSON.parse(storedStats) as UserStats;
          userStats.lessonsCompleted = (userStats.completedStories || []).length;
          setStats(userStats);
          updateEarnedBadges(userStats, storedLang);
        } else {
          const defaultStats = { reportsAnalyzed: 0, gameScore: 0, lessonsCompleted: 0, completedStories: [] };
          setStats(defaultStats);
          updateEarnedBadges(defaultStats, storedLang);
        }
      } else {
        router.push('/login');
      }
    };

    fetchUserData();

    const handleLanguageChange = () => {
      const newLang = (localStorage.getItem('language') || 'tr') as 'en' | 'tr';
      setLanguage(newLang);
      if (stats) {
        updateEarnedBadges(stats, newLang);
      }
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    window.addEventListener('storage', fetchUserData);

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
      window.removeEventListener('storage', fetchUserData);
    };
  }, [pathname, router]); // <-- `stats` çıkarıldı


  const earnedBadgeIds = useMemo(() => new Set(earnedBadges.map(b => b.id)), [earnedBadges]);
  const langBadges = badgesData[language] || badgesData.en;

  const displayStats = [
    {
      icon: ShieldCheck,
      label: language === 'en' ? 'Reports Analyzed' : 'Analiz Edilen Rapor',
      value: stats?.reportsAnalyzed ?? 0,
      color: 'text-green-500'
    },
    {
      icon: Gamepad2,
      label: language === 'en' ? 'Highest Game Score' : 'Yüksek Oyun Puanı',
      value: stats?.gameScore ?? 0,
      color: 'text-purple-500'
    },
    {
      icon: GraduationCap,
      label: language === 'en' ? 'Lessons Completed' : 'Tamamlanan Ders',
      value: stats?.lessonsCompleted ?? 0,
      color: 'text-yellow-500'
    },
  ];

  if (!user || !stats) {
    return (
      <main className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-[80vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          {language === 'en' ? 'My Profile' : 'Profilim'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === 'en' ? 'View your stats, information, and earned badges.' : 'İstatistiklerini, bilgilerini ve kazandığın rozetleri görüntüle.'}
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-1 shadow-lg bg-card/80 backdrop-blur-sm flex flex-col">
          <CardHeader className="items-center text-center pb-4">
            <Avatar className="w-24 h-24 text-3xl mb-4">
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
            <UiBadge variant="secondary" className="capitalize text-sm mt-2">
              {user.profession}
            </UiBadge>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-end">
            <h3 className="text-lg font-semibold text-center mb-4">{language === 'en' ? 'My Stats' : 'İstatistiklerim'}</h3>
            <div className="space-y-4">
              {displayStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-background/50 rounded-lg">
                  <stat.icon className={cn("h-8 w-8", stat.color)} />
                  <div>
                    <p className="font-bold text-xl">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'My Badges' : 'Rozetlerim'}</CardTitle>
            <CardDescription>
              {language === 'en' ? 'Your collection of achievements.' : 'Başarı koleksiyonun.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {langBadges.map((badge) => {
                  const isEarned = earnedBadgeIds.has(badge.id);
                  return (
                    <Tooltip key={badge.id}>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            'flex flex-col items-center justify-center p-4 rounded-lg transition-all aspect-square',
                            isEarned ? badge.color : 'bg-muted/30 grayscale opacity-50'
                          )}
                        >
                          <badge.icon className="h-12 w-12" />
                          <span className="mt-2 text-sm font-semibold text-center text-foreground">
                            {badge.name}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{badge.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
