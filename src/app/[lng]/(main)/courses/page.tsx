'use client';

import React, { useEffect, useState } from 'react';
import { useFetchQuery } from '@/services';
import List from './list';
import { Courses, Native_Language } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { NativeCourses, UserCourse } from '@/utils/types';
import { useClientTranslation } from '@/app/i18n/client';
import { useRouter } from 'next/navigation';
import { useUser } from '@/utils/provider/user';

type Props = {
  params: {
    lng: string;
  };
};

function CoursesPage({ params: { lng } }: Props) {
  const router = useRouter();
  const { t } = useClientTranslation(lng);
  const { user } = useUser();

  const { data: nativeList } = useFetchQuery<Native_Language[]>(
    'native',
    'native',
    false
  );

  const { data: nativeCourses } = useFetchQuery<NativeCourses>(
    'native_courses',
    `native/${lng}`,
    false
  );

  const handleChangeLanguage = (code: string): void => {
    router.push(`/${code}`);
  };

  const { data: courses } = useFetchQuery<UserCourse[]>(
    'user_courses',
    `user/${user?.id}/courses`,
    true
  );

  const activeList = nativeCourses?.courses.filter((course) => {
    return courses?.find((userCourse) => {
      return course.id === userCourse.id;
    });
  });

  return (
    <div className='h-full max-w-[912px] px-3 mx-auto'>
      <div className='flex justify-between items-center'>
        <span className='hidden tablet:flex text-2xl font-bold text-eel'>
          {t('courses.title.txt')}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='noOutline' size='lg' className='p-0'>
              <span>{t('courses.select_language.btn')}</span>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {nativeList &&
              nativeList.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => handleChangeLanguage(item.code)}
                >
                  <Image
                    src={item.image_src!}
                    alt='en'
                    width={25}
                    height={25}
                    className='mr-2'
                  />
                  <span>{item.title}</span>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <List nativeCourses={nativeCourses!} activeList={activeList!} lng={lng} />
    </div>
  );
}

export default CoursesPage;
