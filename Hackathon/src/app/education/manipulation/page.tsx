
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, Clapperboard, Lightbulb, ShieldCheck, PhoneCall, StopCircle, UserX, Info, PhoneOff, Group } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const manipulationTechniques = {
    en: [
        { title: 'Sense of Urgency', description: 'They rush you to prevent you from thinking. "Act now or your account will be closed!"' },
        { title: 'Fear and Threats', description: 'They scare you with problems. "A virus has been detected, click here to clean it immediately."' },
        { title: 'Curiosity', description: 'They use intriguing topics to get you to click. "Look who viewed your profile!"' },
        { title: 'Authority', description: 'They impersonate a trusted person or institution. "We are calling from your bank..."' }
    ],
    tr: [
        { title: 'Aciliyet Duygusu', description: 'Düşünmenizi engellemek için sizi acele ettirirler. "Hemen harekete geçin yoksa hesabınız kapanacak!"' },
        { title: 'Korku ve Tehdit', description: 'Sizi sorunlarla korkuturlar. "Virüs tespit edildi, hemen temizlemek için tıklayın."' },
        { title: 'Merak Uyandırma', description: 'Tıklamanızı sağlamak için ilgi çekici konular kullanırlar. "Profilini kimlerin gezdiğine bak!"' },
        { title: 'Otorite Figürü', description: 'Güvenilir bir kişiyi veya kurumu taklit ederler. "Bankanızdan arıyoruz..."' }
    ]
}

const protectionTips = {
  en: [
    { icon: StopCircle, title: "Don't Panic", text: "If they try to scare you on the call, don't panic immediately. Stay calm first." },
    { icon: UserX, title: "Don't Believe Immediately", text: "If an unknown number calls you with bad news, don't believe what they say right away." },
    { icon: ShieldCheck, title: "Verify Before Acting", text: "Always confirm what is said from a trusted source or person. Call your relatives, be sure." },
    { icon: Info, title: "Don't Share Your Information", text: "No matter who it is, don't give out private information like your ID or bank details over the phone." },
    { icon: PhoneOff, title: "If It's Suspicious, Hang Up", text: "If the conversation makes you uncomfortable or seems strange, hang up the phone. You can call back if necessary." },
    { icon: Group, title: "Inform Your Circle", text: "Warn your family members and those around you so that others don't experience such things." }
  ],
  tr: [
    { icon: StopCircle, title: "Panik Yapma", text: "Gelen aramada seni korkutmaya çalışıyorlarsa, hemen paniğe kapılma. Önce sakin ol." },
    { icon: UserX, title: "Hemen İnanma", text: "Tanımadığın bir numara seni arayıp kötü bir haber veriyorsa, söylediklerine hemen inanma." },
    { icon: ShieldCheck, title: "Doğrulamadan Harekete Geçme", text: "Söylenen şeyi mutlaka güvendiğin bir yerden veya kişiden teyit et. Yakınlarını ara, emin ol." },
    { icon: Info, title: "Bilgini Paylaşma", text: "Kim olursa olsun, telefonda kimlik bilgisi, banka bilgisi gibi özel şeyleri söyleme." },
    { icon: PhoneOff, title: "Şüpheliyse Kapat", text: "Konuşma seni rahatsız ettiyse veya tuhaf geldiyse telefonu kapat. Gerekirse sen geri dönersin." },
    { icon: Group, title: "Çevreni Bilgilendir", text: "Bu tür şeyleri başkaları da yaşamasın diye aile bireylerini ve çevrendekileri uyar." }
  ]
};


export default function ManipulationPage() {
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

  const content = manipulationTechniques[language];
  const tips = protectionTips[language];

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
            <BrainCircuit className="h-10 w-10"/>
            {language === 'en' ? 'Getting Manipulated' : 'Manipüle Olma'}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl">
          {language === 'en' ? 'Attackers target your emotions, not just your computer. Learn to recognize these tactics.' : 'Saldırganlar sadece bilgisayarınızı değil, duygularınızı hedefler. Bu taktikleri tanımayı öğrenin.'}
        </p>
      </header>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
             <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
                 <CardHeader>
                    <CardTitle>{language === 'en' ? 'Common Psychological Tactics' : 'Yaygın Psikolojik Taktikler'}</CardTitle>
                    <CardDescription>{language === 'en' ? 'Be aware of these tricks used in phishing and spam calls:' : 'Oltalama ve spam aramalarda kullanılan bu hilelere karşı dikkatli olun:'}</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    {content.map(technique => (
                        <Alert key={technique.title} variant="default" className="border-primary/20">
                            <Lightbulb className="h-4 w-4 text-primary" />
                            <AlertTitle className="text-primary">{technique.title}</AlertTitle>
                            <AlertDescription>{technique.description}</AlertDescription>
                        </Alert>
                    ))}
                 </CardContent>
             </Card>
             
             <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
                 <CardHeader>
                    <CardTitle>{language === 'en' ? 'How to Protect Yourself' : 'Kendinizi Nasıl Korursunuz?'}</CardTitle>
                    <CardDescription>{language === 'en' ? 'What to do during a suspicious call:' : 'Şüpheli bir arama sırasında ne yapmalısınız:'}</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    {tips.map(tip => (
                        <Alert key={tip.title} variant="default" className="border-l-4 border-primary">
                            <tip.icon className="h-5 w-5" />
                            <AlertTitle>{tip.title}</AlertTitle>
                            <AlertDescription>{tip.text}</AlertDescription>
                        </Alert>
                    ))}
                 </CardContent>
             </Card>
        </div>
        <div className="md:col-span-1 space-y-6">
            <Card className="shadow-lg bg-card/80 backdrop-blur-sm sticky top-24">
                <CardHeader>
                    <CardTitle>{language === 'en' ? 'Case Study Video' : 'Örnek Olay Videosu'}</CardTitle>
                    <CardDescription>{language === 'en' ? 'Watch this short video to see how these techniques are applied in a real-life scenario.' : 'Bu tekniklerin gerçek hayatta nasıl uygulandığını görmek için bu kısa videoyu izleyin.'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="https://www.instagram.com/reel/DFYG0Ufv5Eb/" target="_blank" rel="noopener noreferrer">
                        <div className="group relative aspect-video w-full rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all">
                            <img src="https://placehold.co/1280x720/663399/FFFFFF.png?text=Instagram" alt="Video Thumbnail" className="w-full h-full object-cover" data-ai-hint="social media video" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Clapperboard className="h-16 w-16 text-white/80 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {language === 'en' ? 'Click to watch on Instagram' : 'Instagram\'da izlemek için tıkla'}
                            </div>
                        </div>
                    </Link>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
