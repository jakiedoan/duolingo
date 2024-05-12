'use client';

import React from 'react';
import FeedWrapper from '@/components/feed-wrapper';
import StickyWrapper from '@/components/sticky-wrapper';
import Header from './header';
import UserProgress from '@/components/user-progress';
import { useSession } from '@/utils/provider/session';
import { useUser } from '@/utils/provider/user';
import { useClientTranslation } from '@/app/i18n/client';
import { Courses } from '@prisma/client';

type Props = {
  params: {
    lng: string;
  };
};

function LearnPage({ params }: Props) {
  const { t } = useClientTranslation(params.lng);

  const { user } = useUser();

  const progress = user?.progress;

  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        {progress && (
          <UserProgress
            courses={user.courses}
            activeCourse={{
              title: t(`course.${progress.active_course.title}`),
              imageSrc: progress.active_course.image_src,
            }}
            streak={progress.streak}
            gems={progress.gems}
            hearts={progress.hearts}
            hasActiveSubscription={false}
            lng={params.lng}
          />
        )}
      </StickyWrapper>
      <FeedWrapper>
        <Header title='Spanish' />
      </FeedWrapper>
    </div>
  );
}

export default LearnPage;
