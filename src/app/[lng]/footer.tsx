import Loading from '@/components/loading';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { NativeCourses } from '@/utils/types';
import { TFunction } from 'i18next';
import Image from 'next/image';
import React from 'react';

type Props = {
  t: TFunction;
  nativeCourses: NativeCourses;
  isPending: boolean;
};

function Footer({ t, nativeCourses, isPending }: Props) {
  return (
    <footer className='hidden tablet:block h-20 w-full border-t-2 border-slate-200 p-2'>
      <div className='max-w-screen-lg mx-auto flex items-center h-full'>
        {isPending ? (
          <Loading />
        ) : (
          <Carousel
            opts={{
              align: 'start',
            }}
            className='w-full max-w-[1036px]'
          >
            <CarouselContent>
              {nativeCourses &&
                nativeCourses.courses.map((course) => (
                  <CarouselItem key={course.id} className='basis-1/6'>
                    <Button size='lg' variant='ghost'>
                      <Image
                        src={course.image_src}
                        width={40}
                        height={32}
                        alt={course.code}
                        className='mr-4'
                      />
                      {t(`course.${course.title}`)}
                    </Button>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </footer>
  );
}

export default Footer;
