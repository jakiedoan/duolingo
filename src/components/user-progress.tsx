import Link from 'next/link';
import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { InfinityIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Courses } from '@prisma/client';
import { useClientTranslation } from '@/app/i18n/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { usePutQuery } from '@/services';
import { useUser } from '@/utils/provider/user';
import { UserCourse } from '@/utils/types';

type Props = {
  courses: UserCourse[];
  activeCourse: { imageSrc: string; title: string };
  streak: number;
  gems: number;
  hearts: number;
  hasActiveSubscription: boolean;
  lng: string;
  handleChangeCourse: (id: string) => void;
};

function UserProgress({
  courses,
  activeCourse,
  streak,
  gems,
  hearts,
  hasActiveSubscription,
  lng,
  handleChangeCourse,
}: Props) {
  const { t } = useClientTranslation(lng);

  return (
    <div className='flex items-center justify-between gap-x-2 w-full'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost'>
            <Image
              src={activeCourse.imageSrc}
              alt={activeCourse.title}
              className='rounded-md border'
              width={35}
              height={35}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-60 max-h-[360px] rounded-xl'
        >
          <DropdownMenuLabel>{t('progress.my_courses.txt')}</DropdownMenuLabel>
          <DropdownMenuSeparator className='my-0' />
          <DropdownMenuGroup>
            {courses &&
              courses.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => handleChangeCourse(item.id)}
                >
                  <Image
                    src={item.image_src!}
                    alt='en'
                    width={25}
                    height={25}
                    className='mr-2'
                  />
                  <span>{t(`course.${item.title}`)}</span>
                </DropdownMenuItem>
              ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator className='my-0' />
          <DropdownMenuGroup>
            <DropdownMenuItem className='cursor-pointer py-2.5 pr-3 pl-5'>
              <Link href={`/${lng}/courses`} className='flex items-center'>
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  className='text-hare mr-2 w-6 h-6'
                />
                <span>{t('progress.new_course.btn')}</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant='ghost'
        className={streak > 1 ? 'text-fox' : 'text-swan'}
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
        <Button variant='ghost' className='text-macaw'>
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
      <Button variant='ghost' className='text-cardinal'>
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
