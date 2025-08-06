
import { LucideIcon, Shield, ShieldCheck, ShieldHalf, ShieldEllipsis, BookOpen, ScrollText, NotebookText, Bot, Target, Gem, Trophy, Star, Award, ShieldQuestion, BrainCircuit } from 'lucide-react';

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  score: number;
  type: 'game' | 'report' | 'story';
};

export const badgesData: { [key: string]: Badge[] } = {
  en: [
    // Report Badges
    {
      id: 'rookie-analyst',
      name: 'Rookie Analyst',
      description: 'You analyzed your first suspicious message. Welcome aboard!',
      icon: ShieldQuestion,
      color: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300',
      score: 1, 
      type: 'report',
    },
     {
      id: 'veteran-analyst',
      name: 'Veteran Analyst',
      description: 'Analyzed 10 suspicious messages. You have a keen eye!',
      icon: ShieldCheck,
      color: 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300',
      score: 10,
      type: 'report',
    },
    // Story Badges
    {
      id: 'story-starter',
      name: 'Story Starter',
      description: 'Completed your first interactive story.',
      icon: BookOpen,
      color: 'border-amber-500/50 bg-amber-500/10 text-amber-300',
      score: 1,
      type: 'story',
    },
    {
      id: 'story-explorer',
      name: 'Story Explorer',
      description: 'Completed 5 interactive stories. You are learning the tactics!',
      icon: ScrollText,
      color: 'border-amber-500/50 bg-amber-500/20 text-amber-300',
      score: 5,
      type: 'story',
    },
    {
      id: 'story-master',
      name: 'Story Master',
      description: 'Completed all 10 interactive stories. You are a scenario expert!',
      icon: NotebookText,
      color: 'border-amber-500/50 bg-amber-500/30 text-amber-300',
      score: 10,
      type: 'story',
    },
    // Game Badges
    {
      id: 'game-beginner',
      name: 'Game Beginner',
      description: 'You have reached a score of 100 in the Phishing Game.',
      icon: Shield,
      color: 'border-green-500/50 bg-green-500/10 text-green-300',
      score: 100,
      type: 'game',
    },
    {
      id: 'game-apprentice',
      name: 'Game Apprentice',
      description: 'You have reached a score of 250 in the Phishing Game.',
      icon: ShieldHalf,
      color: 'border-sky-500/50 bg-sky-500/20 text-sky-300',
      score: 250,
      type: 'game',
    },
    {
      id: 'game-guardian',
      name: 'Game Guardian',
      description: 'You have achieved a score of 500 in the Phishing Game.',
      icon: Star,
      color: 'border-yellow-500/50 bg-yellow-500/20 text-yellow-300',
      score: 500,
      type: 'game',
    },
    {
      id: 'game-sentinel',
      name: 'Game Sentinel',
      description: 'You have achieved a score of 750 in the Phishing Game. Impressive!',
      icon: Award,
      color: 'border-orange-500/50 bg-orange-500/20 text-orange-300',
      score: 750,
      type: 'game',
    },
    {
      id: 'game-master',
      name: 'Game Master',
      description: 'You have mastered the game with a score of 1000.',
      icon: Trophy,
      color: 'border-red-500/50 bg-red-500/20 text-red-300',
      score: 1000,
      type: 'game',
    },
    {
      id: 'ai-challenger',
      name: 'AI Challenger',
      description: 'Scored over 1250, you are a true challenge for the AI!',
      icon: Bot,
      color: 'border-purple-500/50 bg-purple-500/20 text-purple-300',
      score: 1250,
      type: 'game'
    },
     {
      id: 'hard-mode-expert',
      name: 'Hard Mode Expert',
      description: 'Scored over 1500, you can spot even the hardest phish!',
      icon: Target,
      color: 'border-indigo-500/50 bg-indigo-500/20 text-indigo-300',
      score: 1500,
      type: 'game'
    },
     {
      id: 'very-hard-mode-legend',
      name: 'Legendary Defender',
      description: 'Scored over 2000, becoming a legendary phishing defender.',
      icon: Gem,
      color: 'border-rose-500/50 bg-rose-500/20 text-rose-300',
      score: 2000,
      type: 'game'
    },
     {
      id: 'psychology-expert',
      name: 'Mind Reader',
      description: 'Completed the "Getting Manipulated" lesson.',
      icon: BrainCircuit,
      color: 'border-teal-500/50 bg-teal-500/10 text-teal-300',
      score: 11, // Special ID for this lesson, assuming story 11
      type: 'story'
    }
  ],
  tr: [
     // Rapor Rozetleri
    {
      id: 'rookie-analyst',
      name: 'Acemi Analist',
      description: 'İlk şüpheli mesajını analiz ettin. Aramıza hoş geldin!',
      icon: ShieldQuestion,
      color: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300',
      score: 1, 
      type: 'report',
    },
     {
      id: 'veteran-analyst',
      name: 'Kıdemli Analist',
      description: '10 şüpheli mesaj analiz ettin. Gözünden hiçbir şey kaçmıyor!',
      icon: ShieldCheck,
      color: 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300',
      score: 10,
      type: 'report',
    },
    // Hikaye Rozetleri
    {
      id: 'story-starter',
      name: 'Hikayeye Başlayan',
      description: 'İlk etkileşimli hikayeni tamamladın.',
      icon: BookOpen,
      color: 'border-amber-500/50 bg-amber-500/10 text-amber-300',
      score: 1,
      type: 'story',
    },
    {
      id: 'story-explorer',
      name: 'Hikaye Kaşifi',
      description: '5 etkileşimli hikaye tamamladın. Taktikleri öğreniyorsun!',
      icon: ScrollText,
      color: 'border-amber-500/50 bg-amber-500/20 text-amber-300',
      score: 5,
      type: 'story',
    },
    {
      id: 'story-master',
      name: 'Hikaye Ustası',
      description: '10 etkileşimli hikayenin tümünü tamamladın. Sen bir senaryo uzmanısın!',
      icon: NotebookText,
      color: 'border-amber-500/50 bg-amber-500/30 text-amber-300',
      score: 10,
      type: 'story',
    },
    // Oyun Rozetleri
    {
      id: 'game-beginner',
      name: 'Oyun Acemisi',
      description: 'Phishing Oyununda 100 puana ulaştın.',
      icon: Shield,
      color: 'border-green-500/50 bg-green-500/10 text-green-300',
      score: 100,
      type: 'game',
    },
    {
      id: 'game-apprentice',
      name: 'Oyun Çırağı',
      description: 'Phishing Oyununda 250 puana ulaştın.',
      icon: ShieldHalf,
      color: 'border-sky-500/50 bg-sky-500/20 text-sky-300',
      score: 250,
      type: 'game',
    },
    {
      id: 'game-guardian',
      name: 'Oyun Muhafızı',
      description: 'Phishing Oyununda 500 puana ulaştın.',
      icon: Star,
      color: 'border-yellow-500/50 bg-yellow-500/20 text-yellow-300',
      score: 500,
      type: 'game',
    },
    {
      id: 'game-sentinel',
      name: 'Oyun Gözcüsü',
      description: 'Phishing Oyununda 750 puana ulaştın. Etkileyici!',
      icon: Award,
      color: 'border-orange-500/50 bg-orange-500/20 text-orange-300',
      score: 750,
      type: 'game',
    },
    {
      id: 'game-master',
      name: 'Oyun Ustası',
      description: 'Oyunda 1000 puana ulaşarak ustalaştın.',
      icon: Trophy,
      color: 'border-red-500/50 bg-red-500/20 text-red-300',
      score: 1000,
      type: 'game',
    },
     {
      id: 'ai-challenger',
      name: 'Yapay Zeka Rakibi',
      description: '1250 puanı geçtin, yapay zeka için gerçek bir rakipsin!',
      icon: Bot,
      color: 'border-purple-500/50 bg-purple-500/20 text-purple-300',
      score: 1250,
      type: 'game'
    },
     {
      id: 'hard-mode-expert',
      name: 'Zor Mod Uzmanı',
      description: '1500 puanı geçtin, en zor oltalama girişimini bile fark edebilirsin!',
      icon: Target,
      color: 'border-indigo-500/50 bg-indigo-500/20 text-indigo-300',
      score: 1500,
      type: 'game'
    },
     {
      id: 'very-hard-mode-legend',
      name: 'Efsanevi Savunmacı',
      description: '2000 puanı geçerek efsanevi bir oltalama savunucusu oldun.',
      icon: Gem,
      color: 'border-rose-500/50 bg-rose-500/20 text-rose-300',
      score: 2000,
      type: 'game'
    },
    {
      id: 'psychology-expert',
      name: 'Zihin Okuyucu',
      description: '"Manipüle Olma" dersini tamamladın.',
      icon: BrainCircuit,
      color: 'border-teal-500/50 bg-teal-500/10 text-teal-300',
      score: 11, // Bu ders için özel ID, 11. hikaye varsayıldı
      type: 'story'
    }
  ],
};
