
import { LucideIcon, Shield, ShieldCheck, ShieldHalf, ShieldEllipsis } from 'lucide-react';

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  score: number;
};

export const badgesData: { [key: string]: Badge[] } = {
  en: [
    {
      id: 'rookie-analyst',
      name: 'Rookie Shield',
      description: 'You analyzed your first message. Welcome!',
      icon: Shield,
      color: 'bg-green-500/20 text-green-400',
      score: 1, // Represents 1 report analyzed
    },
    {
      id: 'bronze-shield',
      name: 'Apprentice Shield',
      description: 'You have reached a score of 250 in the Phishing Game.',
      icon: ShieldHalf,
      color: 'bg-sky-500/20 text-sky-400',
      score: 250,
    },
    {
      id: 'gold-shield',
      name: 'Guardian Shield',
      description: 'You have achieved a score of 500 in the Phishing Game.',
      icon: ShieldCheck,
      color: 'bg-yellow-500/20 text-yellow-400',
      score: 500,
    },
    {
      id: 'master-shield',
      name: 'Master Shield',
      description: 'You have mastered the game with a score of 1000.',
      icon: ShieldEllipsis,
      color: 'bg-red-600/20 text-red-500',
      score: 1000,
    },
  ],
  tr: [
    {
      id: 'rookie-analyst',
      name: 'Acemi Kalkanı',
      description: 'İlk mesajını analiz ettin. Hoş geldin!',
      icon: Shield,
      color: 'bg-green-500/20 text-green-400',
      score: 1, // 1 raporu temsil eder
    },
    {
      id: 'bronze-shield',
      name: 'Çırak Kalkanı',
      description: 'Phishing Oyununda 250 puana ulaştın.',
      icon: ShieldHalf,
      color: 'bg-sky-500/20 text-sky-400',
      score: 250,
    },
    {
      id: 'gold-shield',
      name: 'Muhafız Kalkanı',
      description: 'Phishing Oyununda 500 puana ulaştın.',
      icon: ShieldCheck,
      color: 'bg-yellow-500/20 text-yellow-400',
      score: 500,
    },
     {
      id: 'master-shield',
      name: 'Usta Kalkanı',
      description: 'Oyunda 1000 puana ulaşarak ustalaştın.',
      icon: ShieldEllipsis,
      color: 'bg-red-600/20 text-red-500',
      score: 1000,
    },
  ],
};
