import { UserInfo } from '@/utils/types';
import React from 'react';
import UserProgress from '@/components/user-progress';
import { TFunction } from 'i18next';

type Props = {
  user: UserInfo;
  t: TFunction;
  lng: string;
};

function MobileHeader({ user, t, lng }: Props) {
  return (
    <nav className='px-6 h-[50px] flex items-center bg-snow-default fixed top-0 w-full z-50'>
      {user.progress && (
        <UserProgress
          courses={user.courses}
          activeCourse={{
            title: t(`course.${user.progress.active_course.title}`),
            imageSrc: user.progress.active_course.image_src,
          }}
          streak={user.progress.streak}
          gems={user.progress.gems}
          hearts={user.progress.hearts}
          hasActiveSubscription={false}
          lng={lng}
        />
      )}
    </nav>
  );
}

export default MobileHeader;
