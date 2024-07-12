'use client';

import React, { useEffect, useState } from 'react';
import FeedWrapper from '@/components/feed-wrapper';
import StickyWrapper from '@/components/sticky-wrapper';
import { useUser } from '@/utils/provider/user';
import { useClientTranslation } from '@/app/i18n/client';
import { useFetchQuery, usePutQuery } from '@/services';
import { UserCourse, UserProgress as UserProgressType } from '@/utils/types';
import Unit from './unit';
import Loading from '@/components/loading';
import { Courses, Section } from '@prisma/client';
import UserProgress from '@/components/user-progress';

type Props = {
  params: {
    lng: string;
  };
};

function LearnPage({ params }: Props) {
  const { t } = useClientTranslation(params.lng);
  const { user } = useUser();

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
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
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
            lng={params.lng}
            handleChangeCourse={handleSelectCourse}
          />
        )}
      </StickyWrapper>

      <FeedWrapper>
        {isPending ? (
          <Loading />
        ) : (
          <>
            {progress && progress.active_course?.section?.length! > 0
              ? progress.active_course.section[0].units.map((unit) => (
                  <div key={unit.id} className='mb-10'>
                    <Unit
                      id={unit.id}
                      order={unit.order}
                      description={t(`learn.${unit.description}`)}
                      title={`${t(
                        `learn.${progress.active_course.section[0].title}`
                      )} ${progress.active_course.section[0].order}, ${t(
                        `learn.${unit.title}`
                      )} ${unit.order}`}
                      levels={unit.levels}
                      activeLesson={undefined}
                      activeLessonPercentage={0}
                      code={progress.active_course.code}
                    />
                  </div>
                ))
              : null}
          </>
        )}
      </FeedWrapper>
    </div>
  );
}

export default LearnPage;
