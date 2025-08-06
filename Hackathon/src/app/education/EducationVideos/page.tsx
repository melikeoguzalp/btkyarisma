'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Youtube, Clapperboard } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sayfa içeriği için çoklu dil desteği
const pageContent = {
    en: {
        pageTitle: "Training Videos",
        pageDescription: "Watch our videos to learn about phishing and cybersecurity.",
        videos: [
            {
                id: 1,
                title: "What Are Phishing Attacks?",
                description: "Learn the basics of phishing attacks and how they work in this video.",
                thumbnailUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Video+1"
            },
            {
                id: 2,
                title: "Creating Strong Passwords",
                description: "How to create strong, hard-to-crack passwords to keep your accounts secure.",
                thumbnailUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Video+2"
            },
            {
                id: 3,
                title: "Two-Factor Authentication (2FA)",
                description: "Why is Two-Factor Authentication (2FA) important and how do you enable it?",
                thumbnailUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Video+3"
            },
            {
                id: 4,
                title: "Social Engineering Traps",
                description: "Common social engineering tactics used by attackers to deceive you.",
                thumbnailUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Video+4"
            },
             {
                id: 5,
                title: "Secure Wi-Fi Usage",
                description: "Tips for safely using public and private Wi-Fi networks.",
                thumbnailUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Video+5"
            },
            {
                id: 6,
                title: "Recognizing Malicious Emails",
                description: "Key indicators to look for to identify a malicious email.",
                thumbnailUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Video+6"
            }
        ]
    },
    tr: {
        pageTitle: "Eğitim Videoları",
        pageDescription: "Oltalama ve siber güvenlik hakkında bilgi edinmek için videolarımızı izleyin.",
        videos: [
            {
                id: 1,
                title: "Oltalama Saldırıları Nedir?",
                description: "Bu videoda oltalama (phishing) saldırılarının temellerini ve nasıl çalıştıklarını öğrenin.",
                thumbnailUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Video+1"
            },
            {
                id: 2,
                title: "Güçlü Parola Oluşturma",
                description: "Hesaplarınızı güvende tutmak için kırılması zor, güçlü parolalar nasıl oluşturulur?",
                thumbnailUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Video+2"
            },
            {
                id: 3,
                title: "İki Faktörlü Kimlik Doğrulama",
                description: "İki faktörlü kimlik doğrulama (2FA) neden önemlidir ve nasıl etkinleştirilir?",
                thumbnailUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Video+3"
            },
            {
                id: 4,
                title: "Sosyal Mühendislik Tuzakları",
                description: "Saldırganların sizi kandırmak için kullandığı yaygın sosyal mühendislik taktikleri.",
                thumbnailUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Video+4"
            },
            {
                id: 5,
                title: "Güvenli Wi-Fi Kullanımı",
                description: "Halka açık ve özel Wi-Fi ağlarını güvenli bir şekilde kullanmak için ipuçları.",
                thumbnailUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Video+5"
            },
            {
                id: 6,
                title: "Zararlı E-postaları Tanıma",
                description: "Zararlı bir e-postayı tanımlamak için dikkat edilmesi gereken temel göstergeler.",
                thumbnailUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Video+6"
            }
        ]
    }
};

// Video Kartı Bileşeni
const VideoCard = ({ video }: { video: (typeof pageContent.tr.videos)[0] }) => {
    return (
        <Card className="shadow-lg bg-card/60 backdrop-blur-sm overflow-hidden group cursor-pointer transition-all duration-300 hover:border-primary/60 hover:shadow-primary/20 hover:shadow-2xl">
            <div className="relative">
                <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Youtube className="h-16 w-16 text-white/80" />
                </div>
            </div>
            <CardHeader>
                <CardTitle>{video.title}</CardTitle>
                <CardDescription className="mt-1">{video.description}</CardDescription>
            </CardHeader>
        </Card>
    );
};

export default function EgitimVideolariPage() {
    const [language, setLanguage] = useState<'en' | 'tr'>('tr');

    useEffect(() => {
        // Dil bilgisini localStorage'dan al
        const storedLang = (localStorage.getItem('language') || 'tr') as 'en' | 'tr';
        setLanguage(storedLang);

        // Dil değiştirme olayını dinle
        const handleLanguageChange = () => {
            const newLang = (localStorage.getItem('language') || 'tr') as 'en' | 'tr';
            setLanguage(newLang);
        };

        window.addEventListener('languageChanged', handleLanguageChange);
        
        // Component kaldırıldığında event listener'ı temizle
        return () => {
            window.removeEventListener('languageChanged', handleLanguageChange);
        };
    }, []);
    
    const content = pageContent[language];
    
    return (
        <main className="container mx-auto p-4 md:p-8">
            {/* Sayfa Başlığı */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
                    <Clapperboard className="h-10 w-10" />
                    {content.pageTitle}
                </h1>
                <p className="text-muted-foreground mt-2 max-w-3xl">
                    {content.pageDescription}
                </p>
            </header>

            {/* Video Galerisi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.videos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </main>
    );
}
