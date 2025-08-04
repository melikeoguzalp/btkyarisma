
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SearchCheck, ZoomIn, FileWarning, AlertTriangle, MousePointerClick } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';


const pageContent = {
    en: {
        pageTitle: "Be Careful",
        pageDescription: "Learn how to inspect links, domain names, and file extensions before you click.",
        hoverCheck: {
            title: "1. Hover and Check the Link (Without Clicking!)",
            description: "Here's how to see where a link is really going on your computer or phone:",
            computer: {
                title: "On a Computer:",
                steps: [
                    "Move your mouse cursor over the link, but don't click.",
                    "The full URL will appear in the bottom-left corner of your browser.",
                    "Example: https://e-devlet-gov-tr.org/update",
                    "This is fake because the real one should be turkiye.gov.tr."
                ]
            },
            phone: {
                title: "On a Phone:",
                steps: [
                    "Press and hold the link.",
                    "Options like 'Copy link' or 'Preview link' will appear.",
                    "Pay attention to what the link ends with: be careful with extensions like .exe, .apk, .zip!"
                ]
            }
        },
        domainCheck: {
            title: "2. Examine the Domain Name Carefully",
            description: "Attackers use fake domain names. Here's what to look out for:",
            table: {
                real: "Real",
                fake: "Fake"
            },
            warning: "Even if they end in '.com', '.org', or '.net', these sites can still be fake!"
        },
        extensionCheck: {
            title: "3. Pay Attention to the File Extension",
            description: "If a link you are asked to download contains the following extensions, it's dangerous to click:",
            table: {
                extension: "Extension",
                explanation: "Explanation",
                danger: "Danger Level",
                levels: {
                    high: "Very Dangerous",
                    medium: "Dangerous",
                    low: "Be Careful"
                }
            }
        },
        summary: {
            title: "Key Takeaways:",
            points: [
                "Hover over links with your mouse before clicking.",
                "Check the end of the link: could it be .exe, .apk, .zip, .html?",
                "Focus on the domain name: watch out for fake extensions like turkiye-gov.com!",
                "Never trust links from people you don't know.",
                "If an email or SMS uses urgent language like 'Log in now!', 'Your password has been stolen!' → Be suspicious!"
            ]
        },
        fileExtensions: [
            { ext: ".exe", desc: "Windows executable file", danger: "high" },
            { ext: ".apk", desc: "Android application file", danger: "high" },
            { ext: ".scr", desc: "Looks like a screensaver, could be a virus", danger: "high" },
            { ext: ".bat", desc: "Command script (Windows)", danger: "high" },
            { ext: ".zip, .rar", desc: "Compressed file", danger: "low" },
            { ext: ".js", desc: "Executes JavaScript code", danger: "medium" },
        ]
    },
    tr: {
        pageTitle: "Dikkat Et",
        pageDescription: "Tıklamadan önce bağlantıları, alan adlarını ve dosya uzantılarını nasıl inceleyeceğinizi öğrenin.",
        hoverCheck: {
            title: "1. Bağlantının Üzerine Gel ve Kontrol Et (Tıklamadan!)",
            description: "Bilgisayarda veya telefonda bir bağlantının nereye yönlendirdiğini görmek için:",
            computer: {
                title: "Bilgisayarda:",
                steps: [
                    "Farenin imlecini linkin üzerine getir ama tıklama.",
                    "Tarayıcının sol alt köşesinde tam URL görünür.",
                    "Örnek: https://e-devlet-gov-tr.org/guncelleme",
                    "Bu sahte çünkü gerçek turkiye.gov.tr olmalı."
                ]
            },
            phone: {
                title: "Telefonda:",
                steps: [
                    "Linke uzun bas.",
                    "“Bağlantıyı kopyala” veya “Bağlantıyı önizle” gibi seçenekler çıkar.",
                    "Linkin sonunda ne yazdığına dikkat et: .exe, .apk, .zip gibi uzantılar varsa dikkat!"
                ]
            }
        },
        domainCheck: {
            title: "2. Alan Adını Dikkatli İncele",
            description: "Saldırganlar sahte alan adları kullanır. Dikkat etmen gerekenler:",
            table: {
                real: "Gerçek",
                fake: "Sahte"
            },
            warning: "“.com”, “.org”, “.net” gibi sonlar gerçek sitelerle aynı görünse de bu siteler sahte olabilir!"
        },
        extensionCheck: {
            title: "3. Dosya Uzantısına Dikkat Et",
            description: "İndirmen için gönderilen bağlantılarda aşağıdaki uzantılar varsa tıklama tehlikelidir:",
            table: {
                extension: "Uzantı",
                explanation: "Açıklama",
                danger: "Tehlike Durumu",
                levels: {
                    high: "Çok Tehlikeli",
                    medium: "Tehlikeli",
                    low: "Dikkatli Ol"
                }
            }
        },
        summary: {
            title: "Kısaca Hatırlanması Gerekenler:",
            points: [
                "Linkin üzerine tıklamadan fareyle üzerine gel.",
                "Sonuna bak: .exe, .apk, .zip, .html olabilir mi?",
                "Alan adına odaklan: turkiye-gov.com gibi sahte uzantılara dikkat!",
                "Tanımadığın kişilerden gelen linklere asla güvenme.",
                "E-posta veya SMS’te acil davranmanı isteyen ifadeler varsa: “Hemen giriş yap!”, “Şifreniz çalındı!” → Şüphelen!"
            ]
        },
        fileExtensions: [
            { ext: ".exe", desc: "Windows çalıştırılabilir dosyası", danger: "high" },
            { ext: ".apk", desc: "Android uygulama dosyası", danger: "high" },
            { ext: ".scr", desc: "Ekran koruyucu gibi görünür, aslında virüs olabilir", danger: "high" },
            { ext: ".bat", desc: "Komut dosyası (Windows)", danger: "high" },
            { ext: ".zip, .rar", desc: "Sıkıştırılmış dosya", danger: "low" },
            { ext: ".js", desc: "JavaScript kodu çalıştırır", danger: "medium" },
        ]
    }
};

const domainExamples = [
    { real: "turkiye.gov.tr", fake: "e-devlet-gov-tr.org" },
    { real: "vakifbank.com.tr", fake: "vakifbanka.com" },
    { real: "ziraatbank.com.tr", fake: "ziraat-bankasi.net" }
];

export default function AttentionPage() {
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
    
    const content = pageContent[language];
    
    const getDangerBadge = (danger: 'high' | 'medium' | 'low') => {
        switch (danger) {
            case 'high': return <Badge variant="destructive">{content.extensionCheck.table.levels.high}</Badge>;
            case 'medium': return <Badge variant="secondary" className="bg-yellow-500/80 text-white">{content.extensionCheck.table.levels.medium}</Badge>;
            case 'low': return <Badge variant="outline" className="border-orange-400 text-orange-400">{content.extensionCheck.table.levels.low}</Badge>;
        }
    }

    return (
        <main className="container mx-auto p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
                    <SearchCheck className="h-10 w-10" />
                    {content.pageTitle}
                </h1>
                <p className="text-muted-foreground mt-2 max-w-3xl">
                    {content.pageDescription}
                </p>
            </header>

            <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                    <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><ZoomIn />{content.hoverCheck.title}</CardTitle>
                            <CardDescription>{content.hoverCheck.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-lg mb-2">{content.hoverCheck.computer.title}</h4>
                                <ul className="list-disc list-inside space-y-2 pl-2 text-muted-foreground">
                                    {content.hoverCheck.computer.steps.map((step, i) => <li key={i}>{step}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg mb-2">{content.hoverCheck.phone.title}</h4>
                                <ul className="list-disc list-inside space-y-2 pl-2 text-muted-foreground">
                                    {content.hoverCheck.phone.steps.map((step, i) => <li key={i}>{step}</li>)}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><FileWarning /> {content.extensionCheck.title}</CardTitle>
                             <CardDescription>{content.extensionCheck.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{content.extensionCheck.table.extension}</TableHead>
                                        <TableHead>{content.extensionCheck.table.explanation}</TableHead>
                                        <TableHead className="text-right">{content.extensionCheck.table.danger}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {content.fileExtensions.map(ext => (
                                        <TableRow key={ext.ext}>
                                            <TableCell className="font-mono font-semibold">{ext.ext}</TableCell>
                                            <TableCell>{ext.desc}</TableCell>
                                            <TableCell className="text-right">{getDangerBadge(ext.danger as 'high' | 'medium' | 'low')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MousePointerClick />{content.domainCheck.title}</CardTitle>
                             <CardDescription>{content.domainCheck.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-green-500">{content.domainCheck.table.real}</TableHead>
                                        <TableHead className="text-destructive">{content.domainCheck.table.fake}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {domainExamples.map(ex => (
                                        <TableRow key={ex.real}>
                                            <TableCell className="font-medium">{ex.real}</TableCell>
                                            <TableCell className="font-medium text-muted-foreground">{ex.fake}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                             <Alert variant="destructive" className="mt-4">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertDescription>{content.domainCheck.warning}</AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>

                    <Alert className="border-primary/50 bg-primary/10">
                        <AlertTitle className="text-primary font-bold text-lg">{content.summary.title}</AlertTitle>
                        <AlertDescription>
                           <ul className="list-disc list-inside mt-2 space-y-1">
                               {content.summary.points.map((point, i) => <li key={i}>{point}</li>)}
                           </ul>
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </main>
    );
}

    