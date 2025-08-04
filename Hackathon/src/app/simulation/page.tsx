
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, Smartphone, Search, FilePenLine, PhoneOff, LucideIcon, LogIn, FileText, Touchpad, MessageSquareWarning, FileSignature, Send, ListChecks, Mail } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';


type SimulationStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const smsSimulationSteps: { [key: string]: SimulationStep[] } = {
  en: [
    { title: 'Step 1: Log in to e-Devlet', description: 'Go to https://www.turkiye.gov.tr. Log in with your T.C. ID No and password (or use e-signature, mobile signature, or internet banking options).', icon: LogIn },
    { title: 'Step 2: Go to the Search Section', description: 'On the e-Devlet main page, type the following phrase into the search box at the top: Ticari Elektronik İleti Şikayet Sistemi (İYS)', icon: Search },
    { title: 'Step 3: Open the Service and Apply', description: 'From the list that appears, click on the service: Ticari Elektronik İleti Şikayet Başvurusu – Ticaret Bakanlığı. On the page that opens, click on the "Yeni Başvuru" (New Application) option.', icon: FileText },
    { title: 'Step 4: Select Notification Type', description: 'For Şikayet Türü (Complaint Type), select "Mesaj (SMS)".', icon: Touchpad },
    { title: 'Step 5: Fill in Complaint Information', description: 'Sender Information: Enter the number or sender name of the message.\nContent: Paste the content of the SMS.\nReceipt Date and Time: Select when you received it.\nDescription: Briefly explain, for example: "I received a promotional SMS without my permission."', icon: FilePenLine },
    { title: 'Step 6: Submit the Application', description: 'After filling out the form, click the "Gönder" (Submit) button. Make a note of your application number after saving.', icon: Send },
    { title: 'Step 7: Track Your Application', description: 'You can track the status of your complaint by going to the "Başvurularım" (My Applications) section on the same page.', icon: ListChecks },
  ],
  tr: [
    { title: 'Adım 1: E-Devlet’e Giriş Yap', description: 'https://www.turkiye.gov.tr adresine git. T.C. Kimlik No ve şifrenle giriş yap (ya da e-imza, mobil imza, internet bankacılığı seçeneklerini kullanabilirsin).', icon: LogIn },
    { title: 'Adım 2: Arama Kısmına Git', description: 'E-Devlet ana sayfasında, yukarıdaki arama kutusuna şu ifadeyi yaz: Ticari Elektronik İleti Şikayet Sistemi (İYS)', icon: Search },
    { title: 'Adım 3: Hizmeti Aç ve Başvuru Yap', description: 'Karşına çıkan listeden şu hizmete tıkla: Ticari Elektronik İleti Şikayet Başvurusu – Ticaret Bakanlığı. Açılan sayfada "Yeni Başvuru" seçeneğine tıkla.', icon: FileText },
    { title: 'Adım 4: Bildirim Türünü Seç', description: 'Şikayet Türü olarak "Mesaj (SMS)" seçeneğini seç.', icon: Touchpad },
    { title: 'Adım 5: Şikayet Bilgilerini Doldur', description: 'Gönderici Bilgisi: Mesajı gönderen numarayı veya gönderen adını yaz.\nİçerik: SMS\'in içeriğini yapıştır.\nAlınma Tarihi ve Saati: Ne zaman aldığını seç.\nAçıklama: Kısaca açıkla. Örnek: "İznim olmadan tanıtım SMS\'i aldım."', icon: FilePenLine },
    { title: 'Adım 6: Başvuruyu Gönder', description: 'Formu doldurduktan sonra "Gönder" butonuna tıkla. Şikayetini kaydettikten sonra başvuru numarasını not et.', icon: Send },
    { title: 'Adım 7: Başvurunu Takip Et', description: 'Aynı sayfadan "Başvurularım" kısmına girerek şikayetinin durumunu takip edebilirsin.', icon: ListChecks },
  ],
};

const callSimulationSteps: { [key: string]: SimulationStep[] } = {
  en: [
    { title: 'Step 1: Log in to e-Devlet', description: 'Go to https://www.turkiye.gov.tr. Log in with your T.C. ID No and password (or use e-signature, mobile signature, or internet banking options).', icon: LogIn },
    { title: 'Step 2: Go to the Search Section', description: 'On the e-Devlet main page, type the following phrase into the search box at the top: Ticari Elektronik İleti Şikayet Sistemi (İYS)', icon: Search },
    { title: 'Step 3: Open the Service and Apply', description: 'From the list that appears, click on the service: Ticari Elektronik İleti Şikayet Başvurusu – Ticaret Bakanlığı. On the page that opens, click on the "Yeni Başvuru" (New Application) option.', icon: FileText },
    { title: 'Step 4: Select Notification Type', description: 'For Şikayet Türü (Complaint Type), select "Arama" (Call).', icon: Touchpad },
    { title: 'Step 5: Fill in Complaint Information', description: 'Sender Information: Enter the calling number (e.g., 0850 xxx xx xx).\nCall Date and Time: Select the day and time of the call.\nCompany Name (If any): If you know the name of the company that called.\nDescription: Briefly explain. Example: "I was called for product marketing purposes. These calls were made without my consent."', icon: FilePenLine },
    { title: 'Step 6: Submit the Application', description: 'After filling out the form, click the "Gönder" (Submit) button. Make a note of your application number after saving.', icon: Send },
    { title: 'Step 7: Track Your Application', description: 'You can track the status of your complaint by going to the "Başvurularım" (My Applications) section on the same page. These complaints are evaluated by the Ministry of Trade.', icon: ListChecks },
  ],
  tr: [
    { title: 'Adım 1: E-Devlet’e Giriş Yap', description: 'https://www.turkiye.gov.tr adresine git. T.C. Kimlik No ve şifrenle giriş yap (ya da e-imza, mobil imza, internet bankacılığı seçeneklerini kullanabilirsin).', icon: LogIn },
    { title: 'Adım 2: Arama Kısmına Git', description: 'E-Devlet ana sayfasında, yukarıdaki arama kutusuna şu ifadeyi yaz: Ticari Elektronik İleti Şikayet Sistemi (İYS)', icon: Search },
    { title: 'Adım 3: Hizmeti Aç ve Başvuru Yap', description: 'Karşına çıkan listeden şu hizmete tıkla: Ticari Elektronik İleti Şikayet Başvurusu – Ticaret Bakanlığı. Açılan sayfada "Yeni Başvuru" seçeneğine tıkla.', icon: FileText },
    { title: 'Adım 4: Bildirim Türünü Seç', description: 'Şikayet Türü olarak "Arama" seçeneğini seç.', icon: Touchpad },
    { title: 'Adım 5: Şikayet Bilgilerini Doldur', description: 'Gönderici Bilgisi: Arayan numarayı yaz (örnek: 0850 xxx xx xx).\nİleti Türü: "Ticari" (genelde satış, reklam, kampanya için arayanlar)\nAlınma Tarihi: Aramanın yapıldığı gün.\nSaat: Arama saati (yaklaşık da olabilir).\nFirma Adı (Varsa): Eğer arayan firmanın adını biliyorsan yaz.\nAçıklama: Kısaca açıkla. Örnek: "Bilinmeyen bir numara tarafından ürün satışı amacıyla arandım. İznim olmadan bu tür aramalar yapıldı."', icon: FilePenLine },
    { title: 'Adım 6: Başvuruyu Gönder', description: 'Formu doldurduktan sonra "Gönder" butonuna tıkla. Şikayetini kaydettikten sonra başvuru numarasını not et.', icon: Send },
    { title: 'Adım 7: Başvurunu Takip Et', description: 'Aynı sayfadan "Başvurularım" kısmına girerek şikayetinin durumunu takip edebilirsin. Bu şikayetler Ticaret Bakanlığı tarafından değerlendirilir.', icon: ListChecks },
  ],
};

const emailSimulationSteps: { [key: string]: SimulationStep[] } = {
  en: [
    { title: 'Step 1: Log in to e-Devlet', description: 'Go to https://www.turkiye.gov.tr. Log in with your T.C. ID No and password (or use e-signature, mobile signature, or internet banking options).', icon: LogIn },
    { title: 'Step 2: Go to the Search Section', description: 'On the e-Devlet main page, type the following phrase into the search box at the top: Ticari Elektronik İleti Şikayet Sistemi (İYS)', icon: Search },
    { title: 'Step 3: Open the Service and Apply', description: 'From the list that appears, click on the service: Ticari Elektronik İleti Şikayet Başvurusu – Ticaret Bakanlığı. On the page that opens, click on the "Yeni Başvuru" (New Application) option.', icon: FileText },
    { title: 'Step 4: Select Notification Type', description: 'For Şikayet Türü (Complaint Type), select "E-posta" (Email).', icon: Touchpad },
    { title: 'Step 5: Fill in Complaint Information', description: 'Sender Information: Enter the email address of the sender.\nContent: Paste the content of the email.\nReceipt Date and Time: Select when you received it.\nDescription: Briefly explain, for example: "I received a promotional email without my permission."', icon: FilePenLine },
    { title: 'Step 6: Submit the Application', description: 'After filling out the form, click the "Gönder" (Submit) button. Make a note of your application number after saving.', icon: Send },
    { title: 'Step 7: Track Your Application', description: 'You can track the status of your complaint by going to the "Başvurularım" (My Applications) section on the same page.', icon: ListChecks },
  ],
  tr: [
    { title: 'Adım 1: E-Devlet’e Giriş Yap', description: 'https://www.turkiye.gov.tr adresine git. T.C. Kimlik No ve şifrenle giriş yap (ya da e-imza, mobil imza, internet bankacılığı seçeneklerini kullanabilirsin).', icon: LogIn },
    { title: 'Adım 2: Arama Kısmına Git', description: 'E-Devlet ana sayfasında, yukarıdaki arama kutusuna şu ifadeyi yaz: Ticari Elektronik İleti Şikayet Sistemi (İYS)', icon: Search },
    { title: 'Adım 3: Hizmeti Aç ve Başvuru Yap', description: 'Karşına çıkan listeden şu hizmete tıkla: Ticari Elektronik İleti Şikayet Başvurusu – Ticaret Bakanlığı. Açılan sayfada "Yeni Başvuru" seçeneğine tıkla.', icon: FileText },
    { title: 'Adım 4: Bildirim Türünü Seç', description: 'Şikayet Türü olarak "E-posta" seçeneğini seç.', icon: Touchpad },
    { title: 'Adım 5: Şikayet Bilgilerini Doldur', description: 'Gönderici Bilgisi: E-postayı gönderen adresi yaz.\nİçerik: E-postanın içeriğini yapıştır.\nAlınma Tarihi ve Saati: Ne zaman aldığını seç.\nAçıklama: Kısaca açıkla. Örnek: "İznim olmadan tanıtım e-postası aldım."', icon: FilePenLine },
    { title: 'Adım 6: Başvuruyu Gönder', description: 'Formu doldurduktan sonra "Gönder" butonuna tıkla. Şikayetini kaydettikten sonra başvuru numarasını not et.', icon: Send },
    { title: 'Adım 7: Başvurunu Takip Et', description: 'Aynı sayfadan "Başvurularım" kısmına girerek şikayetinin durumunu takip edebilirsin.', icon: ListChecks },
  ],
};


const SimulationPlayer = ({ steps, language }: { steps: SimulationStep[], language: 'en' | 'tr' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setCurrentStep(0);
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 50); // initial animation
    return () => clearTimeout(timer);
  }, [steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
       setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };
  
  const handleRestart = () => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(0);
        setIsAnimating(false);
      }, 300);
  }

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];

  return (
    <Card className="w-full shadow-lg bg-card/80 backdrop-blur-sm border-0 sm:border overflow-hidden">
        <CardHeader className="pb-4">
            <Progress value={progress} className="mb-4 h-2"/>
            <div className={cn("transition-opacity duration-300", isAnimating ? "opacity-0" : "opacity-100")}>
                <CardTitle className="text-2xl flex items-center gap-3">
                   <div className="bg-primary/10 text-primary p-2 rounded-lg flex-shrink-0">
                      <currentStepData.icon className="h-6 w-6"/>
                   </div>
                   {currentStepData.title}
                </CardTitle>
            </div>
        </CardHeader>
        <CardContent className="min-h-[150px] flex items-center">
            <div className={cn("flex flex-col sm:flex-row items-start gap-6 transition-opacity duration-300 w-full", isAnimating ? "opacity-0" : "opacity-100")}>
                <div className="flex-grow pl-4">
                    <p className="text-muted-foreground text-base whitespace-pre-line">{currentStepData.description}</p>
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0 || isAnimating}>
            <ArrowLeft className="mr-2 h-4 w-4" /> {language === 'en' ? 'Previous' : 'Önceki'}
          </Button>
           {currentStep === steps.length - 1 ? (
             <Button onClick={handleRestart} className="bg-green-600 hover:bg-green-700" disabled={isAnimating}>
               <CheckCircle className="mr-2 h-4 w-4" /> {language === 'en' ? 'Finish & Restart' : 'Bitir & Yeniden Başla'}
             </Button>
           ) : (
             <Button onClick={handleNext} disabled={isAnimating}>
               {language === 'en' ? 'Next' : 'Sonraki'} <ArrowRight className="ml-2 h-4 w-4" />
             </Button>
           )}
        </CardFooter>
      </Card>
  )
}


export default function ComplaintPage() {
  const [language, setLanguage] = useState<'en' | 'tr'>('tr');
  const [activeSmsSteps, setActiveSmsSteps] = useState(smsSimulationSteps.tr);
  const [activeCallSteps, setActiveCallSteps] = useState(callSimulationSteps.tr);
  const [activeEmailSteps, setActiveEmailSteps] = useState(emailSimulationSteps.tr);

  useEffect(() => {
    const storedLang = (localStorage.getItem('language') || 'tr') as 'en' | 'tr';
    setLanguage(storedLang);
    setActiveSmsSteps(smsSimulationSteps[storedLang] || smsSimulationSteps.tr);
    setActiveCallSteps(callSimulationSteps[storedLang] || callSimulationSteps.tr);
    setActiveEmailSteps(emailSimulationSteps[storedLang] || emailSimulationSteps.tr);


    const handleLanguageChange = () => {
      const newLang = (localStorage.getItem('language') || 'tr') as 'en' | 'tr';
      setLanguage(newLang);
      setActiveSmsSteps(smsSimulationSteps[newLang] || smsSimulationSteps.tr);
      setActiveCallSteps(callSimulationSteps[newLang] || callSimulationSteps.tr);
      setActiveEmailSteps(emailSimulationSteps[newLang] || emailSimulationSteps.tr);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);


  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-headline text-primary">
          {language === 'en' ? 'I Have a Complaint' : 'Şikayetim Var'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {language === 'en' ? 'Learn how to report unwanted messages and calls to the authorities step by step.' : 'İstenmeyen mesajları ve aramaları yetkililere adım adım nasıl şikayet edeceğinizi öğrenin.'}
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="sms" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="sms">
                    <MessageSquareWarning className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'Unwanted SMS' : 'İstenmeyen SMS'}
                </TabsTrigger>
                <TabsTrigger value="call">
                    <PhoneOff className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'Spam Call' : 'Spam Arama'}
                </TabsTrigger>
                 <TabsTrigger value="email">
                    <Mail className="mr-2 h-4 w-4" />
                    {language === 'en' ? 'Unwanted Email' : 'İstenmeyen E-posta'}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="sms" className="mt-6">
                <SimulationPlayer steps={activeSmsSteps} language={language} />
            </TabsContent>
            <TabsContent value="call" className="mt-6">
                 <SimulationPlayer steps={activeCallSteps} language={language} />
            </TabsContent>
            <TabsContent value="email" className="mt-6">
                 <SimulationPlayer steps={activeEmailSteps} language={language} />
            </TabsContent>
        </Tabs>
      </div>

    </main>
  );
}

    