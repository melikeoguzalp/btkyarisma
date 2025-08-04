
'use client';

import { useEffect } from 'react';
import { redirect, usePathname } from 'next/navigation';

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      if (pathname === '/') {
        redirect('/report');
      }
    } else {
      redirect('/login');
    }
  }, [pathname]);
  
  return null;
}
