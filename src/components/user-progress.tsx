import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { InfinityIcon } from 'lucide-react';

type Props = {
  activeCourse: { imageSrc: string; title: string };
  streak: number;
  gems: number;
  hearts: number;
  hasActiveSubscription: boolean;
};

function UserProgress({
  activeCourse,
  streak,
  gems,
  hearts,
  hasActiveSubscription,
}: Props) {
  return (
    <div className='flex items-center justify-between gap-x-2 w-full'>
      <Link href='/courses'>
        <Button variant='ghost'>
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className='rounded-md border'
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Button
        variant='ghost'
        className={streak > 1 ? 'text-fox-default' : 'text-swan-default'}
      >
        <Image
          src={
            streak > 1
              ? '/assets/learn/streak.svg'
              : '/assets/learn/no-streak.svg'
          }
          height={28}
          width={28}
          alt='hearts'
          className='mr-2'
        />
        {streak}
      </Button>
      <Link href='/shop'>
        <Button variant='ghost' className='text-macaw-default'>
          <Image
            src='/assets/learn/gems.svg'
            height={22}
            width={22}
            alt='gems'
            className='mr-2'
          />
          {gems}
        </Button>
      </Link>
      <Button variant='ghost' className='text-cardinal-default'>
        <Image
          src='/assets/learn/hearts.svg'
          height={28}
          width={28}
          alt='hearts'
          className='mr-2'
        />
        {hasActiveSubscription ? (
          <InfinityIcon className='h-4 w-4 stroke-[3]' />
        ) : (
          hearts
        )}
      </Button>
    </div>
  );
}

export default UserProgress;
