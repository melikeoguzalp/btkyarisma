
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserX, Shield, Lock, Camera, MessageSquareShare, School, Phone, Landmark, Rss, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const pageData = {
    en: {
        pageTitle: "CYBERBULLYING",
        title: "If You're Cyberbullied, Don't Stay Silent, You're Not Alone",
        whatIs: {
            title: "What is Cyberbullying?",
            description: "Cyberbullying is all malicious behavior carried out using digital tools to harm a person. It can occur through social media, messaging apps, games, or emails.",
            examplesTitle: "Some examples:",
            examples: [
                "Mean or mocking comments",
                "Sharing photos or videos without permission",
                "Being threatened with private information",
                "Exclusion from groups",
                "Being ridiculed with fake accounts"
            ],
            note: "Remember, this is not your fault, and you are not alone. Sometimes, fears like 'No one will believe me,' 'My family will be angry,' or 'Everyone will make fun of me' might make you stay silent. But staying silent only empowers the bullying. Your voice is the greatest power to change this situation. Please don't hesitate to speak up."
        },
        whatToDo: {
            title: "🛡️ What Should You Do If You Are Cyberbullied?",
            description: "A step-by-step guide:",
            steps: [
                { icon: Lock, text: "Block: Immediately block the person who is bullying you." },
                { icon: Camera, text: "Save Evidence: Take screenshots, and back up messages without deleting them." },
                { icon: MessageSquareShare, text: "Tell an Adult: Your family, a teacher, a guidance counselor... Be sure to tell someone you trust." },
                { icon: School, text: "Report to Your School: Tell the guidance counselor or the principal about the situation." },
            ]
        },
        howToReport: {
            title: "📢 Ways to Report Cyberbullying",
            description: "If someone is harming you, it might not just be 'bad behavior,' it could also be a crime. Here's what you can do:",
            methods: [
                "Via social media apps: Every platform has 'Report' or 'Flag' options.",
                "Report with your family: Call the Police Hotline (112), use e-Devlet for Cybercrime reports, or contact CİMER (Presidency's Communication Center).",
                "Get help from your guidance counselor: They can be your first point of contact for cyberbullying within the school."
            ]
        },
        strongerTogether: {
            title: "We Are Stronger Together",
            description: "If someone is trying to harm you, know that you are targeted not because you are worthless, but because you are valuable. But you are not alone. This application is here for you. We listen, we support, we empower."
        }
    },
    tr: {
        pageTitle: "SİBER ZORBALIK",
        title: "💬 Siber Zorbalığa Uğradığında Susma, Yalnız Değilsin",
        whatIs: {
            title: "Siber Zorbalık Nedir?",
            description: "Siber zorbalık, dijital araçlar kullanılarak bir kişiye zarar vermek amacıyla yapılan kötü davranışların tümüdür. Sosyal medya, mesajlaşma uygulamaları, oyunlar veya e-postalar yoluyla gerçekleşebilir.",
            examplesTitle: "Bazı örnekler:",
            examples: [
                "Kötü veya alaycı yorumlar",
                "İzinsiz fotoğraf veya video paylaşımı",
                "Özel bilgilerle tehdit edilme",
                "Gruplardan dışlanma",
                "Sahte hesaplarla dalga geçilme"
            ],
            note: "Unutma, bu senin suçun değil ve yalnız değilsin. Bazen 'Kimse bana inanmaz,' 'Ailem çok kızar,' ya da 'Herkes benimle dalga geçer' gibi korkular sessiz kalmana neden olabilir. Ama sessiz kalmak, zorbalığı güçlendirir. Senin sesin, bu durumu değiştirecek en büyük güç. Lütfen konuşmaktan çekinme."
        },
        whatToDo: {
            title: "🛡️ Siber Zorbalığa Uğrarsan Ne Yapmalısın?",
            description: "Adım Adım Rehber:",
            steps: [
                { icon: Lock, text: "Engelle: Zorbalık yapan kişiyi hemen engelle." },
                { icon: Camera, text: "Kanıtları Sakla: Ekran görüntüsü al, mesajları silmeden yedekle." },
                { icon: MessageSquareShare, text: "Bir Yetişkene Anlat: Ailen, öğretmenin, rehberlik hocan... Güvendiğin birine mutlaka anlat." },
                { icon: School, text: "Okuluna Bildir: Rehber öğretmene ya da müdüre durumu anlat." },
            ]
        },
        howToReport: {
            title: "📢 Siber Zorbalığı Bildirmenin Yolları",
            description: "Sana zarar veren biri varsa, bu sadece “kötü davranış” değil, aynı zamanda bir suç olabilir. İşte ne yapabilirsin:",
            methods: [
                "Sosyal medya uygulamaları üzerinden: Her platformda 'Şikayet Et' veya 'Raporla' seçenekleri vardır.",
                "Ailenle birlikte şikayet et: 📞 112 Polis İhbar Hattı, 🌐 E-Devlet: Siber Suçlarla Mücadele Başvuru, 📩 CİMER: Cumhurbaşkanlığı İletişim Merkezi.",
                "Rehber öğretmeninden yardım al: Okul içindeki siber zorbalıklarda ilk başvuracağın kişi olabilir."
            ]
        },
        strongerTogether: {
            title: "Birlikte Güçlüyüz",
            description: "Sana zarar vermeye çalışan biri varsa, bil ki sen değersiz değil, değerli olduğun için hedeftesin. Ama yalnız değilsin. Bu uygulama senin için burada. Dinliyoruz, destekliyoruz, güçlendiriyoruz."
        }
    }
};

export default function CyberbullyingPage() {
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

  const content = pageData[language];

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
            <UserX className="h-10 w-10"/>
            {content.pageTitle}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-3xl text-lg">
          {content.title}
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
            {/* What is Cyberbullying? */}
            <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>{content.whatIs.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>{content.whatIs.description}</p>
                    <h4 className="font-semibold">{content.whatIs.examplesTitle}</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {content.whatIs.examples.map((ex, i) => <li key={i}>{ex}</li>)}
                    </ul>
                     <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{content.whatIs.note}</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            {/* How to Report */}
            <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>{content.howToReport.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>{content.howToReport.description}</p>
                    <ul className="space-y-3">
                       {content.howToReport.methods.map((method, i) => (
                         <li key={i} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                            <Rss className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <span>{method}</span>
                         </li>
                       ))}
                    </ul>
                </CardContent>
            </Card>

        </div>
        <div className="space-y-6">
            {/* What Should You Do? */}
            <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>{content.whatToDo.title}</CardTitle>
                    <CardDescription>{content.whatToDo.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {content.whatToDo.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-4 p-3 rounded-lg border border-primary/20 bg-primary/5">
                            <step.icon className="h-8 w-8 text-primary flex-shrink-0" />
                            <p>{step.text}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
             {/* Stronger Together */}
            <Alert className="border-green-500/30 bg-green-500/10 text-green-300 shadow-lg">
                <AlertTriangle className="h-5 w-5 text-green-400" />
                <AlertTitle className="text-xl font-bold text-green-400">{content.strongerTogether.title}</AlertTitle>
                <AlertDescription className="text-green-300/90 mt-2 text-base">
                    {content.strongerTogether.description}
                </AlertDescription>
            </Alert>
        </div>
      </div>
    </main>
  );
}
