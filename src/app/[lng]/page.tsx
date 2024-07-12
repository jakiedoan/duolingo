'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SignIn } from '@/components/sign-in';
import { SignUp } from '@/components/sign-up';
import { useClientTranslation } from '../i18n/client';
import Footer from './footer';
import dynamic from 'next/dynamic';
import { useFetchQuery } from '@/services';
import { Native_Language } from '@prisma/client';
import { NativeCourses } from '@/utils/types';

const Header = dynamic(() => import('./header'), { ssr: false });

type Props = {
  params: {
    lng: string;
  };
};

export default function Home({ params }: Props) {
  const { t } = useClientTranslation(params.lng);

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  const { data: nativeList, isPending: isNativePending } = useFetchQuery<
    Native_Language[]
  >('native', 'native', false);

  const { data: nativeCourses, isPending: isCoursesPending } =
    useFetchQuery<NativeCourses>(
      'native_courses',
      `native/${params.lng}`,
      false
    );

  return (
    <div className='min-h-screen flex flex-col bg-snow-light'>
      {!isSignIn || !isSignUp ? (
        <>
          <Header
            params={params}
            nativeList={nativeList!}
            isPending={isNativePending}
          />

          <main className='flex flex-col flex-1 items-center justify-center'>
            <div className='max-w-[988px] mx-auto flex flex-col flex-1 w-full desktop:flex-row items-center justify-center p-4 gap-2'>
              <div className='relative w-[240px] h-[240px] tablet:w-[424px] tablet:h-[424px] mb-9 tablet:mb-0'>
                <Image src='/assets/heros.svg' alt='heros' fill />
              </div>

              <div className='flex flex-col items-center gap-y-8'>
                <h1 className='text-xl desktop:text-3xl font-bold text-neutral-600 max-w-[480px] text-center break-keep'>
                  {t('intro.description.title')}
                </h1>
                <div className='flex flex-col items-center gap-y-3 max-w-[330px] w-full'>
                  <>
                    <Button
                      size='lg'
                      variant='secondary'
                      className='w-full text-white bg-owl-light border-tree-frog-light'
                      onClick={() => setIsSignUp(true)}
                    >
                      {t('intro.get_started.btn')}
                    </Button>
                    <Button
                      size='lg'
                      variant='primaryOutline'
                      className='w-full border-swan-light'
                      onClick={() => setIsSignIn(true)}
                    >
                      {t('intro.have_account.btn')}
                    </Button>
                  </>
                </div>
              </div>
            </div>
          </main>
          <Footer
            t={t}
            nativeCourses={nativeCourses!}
            isPending={isCoursesPending}
          />
        </>
      ) : null}

      {isSignIn && (
        <SignIn setIsSignIn={setIsSignIn} setIsSignUp={setIsSignUp} t={t} />
      )}
      {isSignUp && (
        <SignUp setIsSignIn={setIsSignIn} setIsSignUp={setIsSignUp} t={t} />
      )}
    </div>
  );
}
