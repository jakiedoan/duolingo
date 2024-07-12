'use client';

import Sidebar from '@/components/sidebar';
import React, { useEffect } from 'react';
import { useClientTranslation } from '../../i18n/client';
import { useFetchQuery, usePutQuery } from '@/services';
import { useWindowDimension } from '@/utils/hooks/window-dimension';
import {
  UserCourse,
  UserInfo,
  UserProgress as TypeUserProgress,
} from '@/utils/types';
import { useUser } from '@/utils/provider/user';
import MobileSidebar from '@/components/mobile/sidebar';
import MobileHeader from '@/components/mobile/header';
import StickyWrapper from '@/components/sticky-wrapper';
import UserProgress from '@/components/user-progress';

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

  const {
    isPending,
    error,
    mutateAsync: edit,
  } = usePutQuery('update_progress', `progress/${user?.id}`, true);

  const { data: progress } = useFetchQuery<TypeUserProgress>(
    'user_progress',
    `user/${user?.id}/progress`,
    true
  );

  const { data: courses } = useFetchQuery<UserCourse[]>(
    'user_courses',
    `user/${user?.id}/courses`,
    true
  );

  useEffect(() => {
    setUser(info!);
  }, [info]);

  const handleSelectCourse = (id: string) => {
    edit({
      activeCourseId: id,
    });
  };

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
        <div className='bg-snow max-w-[1056px] mx-auto pt-6 h-full'>
          {children}
        </div>
      </main>
      <MobileSidebar lng={lng} t={t} />
    </>
  );
}

export default MainLayout;
