'use client';

import MobileHeader from '@/components/mobile-header';
import Sidebar from '@/components/sidebar';
import React, { useEffect } from 'react';
import { TFunction } from 'i18next';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useClientTranslation } from '../../i18n/client';
import { useFetchQuery } from '@/services';

function MainLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  const { t } = useClientTranslation(lng);


  // const {data: user} = useFetchQuery('user', 'user/')

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    // console.log(session)
    if (!session) {
      router.push('/');
    }
  }, []);

  return (
    <>
      {!session ? null : (
        <>
          <MobileHeader />
          <Sidebar className='hidden tablet:flex' t={t} />
          <main className='tablet:pl-[256px] h-full pt-[50px] tablet:pt-0'>
            <div className='bg-snow-default max-w-[1056px] mx-auto pt-6 h-full'>
              {children}
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default MainLayout;
