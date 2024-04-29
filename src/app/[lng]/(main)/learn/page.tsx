'use client';

import React from 'react';
import FeedWrapper from '@/components/feed-wrapper';
import StickyWrapper from '@/components/sticky-wrapper';
import Header from './header';
import UserProgress from '@/components/user-progress';

function LearnPage() {
  return (
    <div className='flex flex-row-reverse gap-[48px] px-6'>
      <StickyWrapper>
        <UserProgress
          activeCourse={{
            title: 'Korean',
            imageSrc: '/assets/flag/korean.png',
          }}
          streak={1}
          gems={500}
          hearts={5}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title='Spanish' />
      </FeedWrapper>
    </div>
  );
}

export default LearnPage;
