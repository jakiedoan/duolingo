import {
  UserCourse,
  UserInfo,
  UserProgress as UserProgressType,
} from '@/utils/types';
import React from 'react';
import UserProgress from '@/components/user-progress';
import { TFunction } from 'i18next';
import { useFetchQuery, usePutQuery } from '@/services';

type Props = {
  user: UserInfo;
  t: TFunction;
  lng: string;
};

function MobileHeader({ user, t, lng }: Props) {
  const {
    isPending,
    error,
    mutateAsync: edit,
  } = usePutQuery('update_progress', `progress/${user?.id}`, true);

  const { data: progress } = useFetchQuery<UserProgressType>(
    'user_progress',
    `user/${user?.id}/progress`,
    true
  );

  const { data: courses } = useFetchQuery<UserCourse[]>(
    'user_courses',
    `user/${user?.id}/courses`,
    true
  );

  const handleSelectCourse = (id: string) => {
    edit({
      activeCourseId: id,
    });
  };

  return (
    <nav className='px-6 h-[50px] flex items-center bg-snow fixed top-0 w-full z-50'>
      {progress && courses && (
        <UserProgress
          courses={courses}
          activeCourse={{
            title: t(`course.${progress.active_course.title}`),
            imageSrc: progress.active_course.image_src,
          }}
          streak={progress.streak}
          gems={progress.gems}
          hearts={progress.hearts}
          hasActiveSubscription={false}
          lng={lng}
          handleChangeCourse={handleSelectCourse}
        />
      )}
    </nav>
  );
}

export default MobileHeader;
