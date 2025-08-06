
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarFooter, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { PhishGuardLogo } from '@/components/phishguard-logo';
import Link from 'next/link';
import { Gamepad2, Newspaper, ShieldAlert, LogIn, UserPlus, Globe, LogOut, GraduationCap, User, MessageSquareWarning, ChevronDown, BookOpen, ListTree, BrainCircuit, UserX } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { educationData } from '@/lib/education-data';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [language, setLanguage] = useState('tr');
  const [isEducationOpen, setIsEducationOpen] = useState(false);

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Check for language in localStorage
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
      setLanguage(storedLang);
    } else {
      localStorage.setItem('language', 'tr');
    }
    
    // Open the education collapsible if on an education sub-page
    if (pathname.startsWith('/education')) {
        setIsEducationOpen(true);
    }

  }, [pathname]); // Re-check on route change

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userStats');
    setUser(null);
    router.push('/login');
  };
  
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'tr' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    // Dispatch a custom event to notify other components of the language change
    window.dispatchEvent(new Event('languageChanged'));
  }

  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return (
       <html lang={language} className="dark">
         <body>
           {children}
         </body>
       </html>
    )
  }

  const educationLinks = educationData[language as 'en' | 'tr'].educationSections;

  return (
    <html lang={language} className="dark">
      <head>
        <title>PhishGuard</title>
        <meta name="description" content="AI-powered phishing detection and prevention." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <PhishGuardLogo />
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {user ? (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/profile">
                          <User />
                           {language === 'en' ? 'Profile' : 'Profil'}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/report">
                          <ShieldAlert />
                           {language === 'en' ? 'Report Phish' : 'Phishing Bildir'}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/cyberbullying">
                          <UserX />
                          {language === 'en' ? 'CYBERBULLYING' : 'SİBER ZORBALIK'}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <Collapsible open={isEducationOpen} onOpenChange={setIsEducationOpen} className="w-full">
                        <SidebarMenuItem>
                             <CollapsibleTrigger asChild>
                                <SidebarMenuButton className="justify-between w-full" isActive={pathname.startsWith('/education')}>
                                    <div className="flex items-center gap-2">
                                        <GraduationCap />
                                        {language === 'en' ? 'Education' : 'Eğitim'}
                                    </div>
                                    <ChevronDown className={cn("h-4 w-4 transition-transform", isEducationOpen && "rotate-180")} />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                        </SidebarMenuItem>

                        <CollapsibleContent>
                            <div className="pl-8 pr-2 py-1 space-y-1">
                                {educationLinks.map((link) => (
                                    <SidebarMenuItem key={link.link}>
                                        <SidebarMenuButton asChild variant="ghost" className={cn("w-full justify-start", pathname === link.link && "bg-sidebar-accent")}>
                                            <Link href={link.link}>
                                                <link.icon />
                                                {link.title}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/simulation">
                          <MessageSquareWarning />
                          {language === 'en' ? 'I Have a Complaint' : 'Şikayetim Var'}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/news">
                          <Newspaper />
                          {language === 'en' ? 'Cyber News' : 'Siber Haberler'}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                ) : (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/login">
                          <LogIn />
                           {language === 'en' ? 'Login' : 'Giriş Yap'}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/register">
                          <UserPlus />
                          {language === 'en' ? 'Register' : 'Kayıt Ol'}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className='flex-col items-start gap-2'>
               <Button variant="ghost" onClick={toggleLanguage} className="w-full justify-start">
                  <Globe className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Türkçe' : 'English'}
                </Button>
              {user && (
                <SidebarMenuButton onClick={handleLogout} className="w-full">
                  <LogOut />
                  {language === 'en' ? 'Logout' : 'Çıkış Yap'}
                </SidebarMenuButton>
              )}
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            {children}
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
