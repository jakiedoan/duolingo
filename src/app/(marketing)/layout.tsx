'use client';

import React, { useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import { useThemeMode } from '@/utils/store/theme';

type Props = {
  children: React.ReactNode;
};

function MarketingLayout({ children }: Props) {
  const { mode, setMode } = useThemeMode();

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      // dark mode
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <div className='min-h-screen flex flex-col bg-snow-light'>
      <Header />
      <main className='flex flex-col flex-1 items-center justify-center'>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MarketingLayout;
