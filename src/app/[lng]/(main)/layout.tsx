'use client';

import Sidebar from '@/components/sidebar';
import React, { useEffect } from 'react';
import { useClientTranslation } from '../../i18n/client';
import { useFetchQuery } from '@/services';
import { useWindowDimension } from '@/utils/hooks/window-dimension';
import { UserInfo } from '@/utils/types';
import { useUser } from '@/utils/provider/user';
import MobileSidebar from '@/components/mobile/sidebar';
import MobileHeader from '@/components/mobile/header';

function MainLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  const { t } = useClientTranslation(lng);

  const windowDimension = useWindowDimension();

  const { user, setUser } = useUser();

  const { data: info } = useFetchQuery<UserInfo>(
    'user_info',
    `user/${user?.id}`,
    true
  );

  useEffect(() => {
    setUser(info!);
  }, [info]);

  return (
    <>
      {windowDimension.width! < 700 && (
        <MobileHeader user={user!} t={t} lng={lng} />
      )}
      <Sidebar
        className='hidden tablet:flex tablet:items-center'
        t={t}
        lng={lng}
      />
      <main className='desktop:pl-[256px] tablet:pl-24 h-full pt-[50px] tablet:pt-0'>
        <div className='bg-snow-default max-w-[1056px] mx-auto pt-6 h-full'>
          {children}
        </div>
      </main>
      <MobileSidebar lng={lng} t={t} />
    </>
  );
}

export default MainLayout;
