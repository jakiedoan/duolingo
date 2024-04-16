'use client';

import { Button, SignIn, SignUp } from '@/components';
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useUser,
} from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  // const { t } = useTranslation('translation');

  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  const { isSignedIn, isLoaded, user } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/learn');
    }
  }, [isSignedIn]);

  useEffect(() => {
    console.log('in', isSignIn);
    console.log('up', isSignUp);
    if (isSignIn) {
      setIsSignUp(false);
    }
    if (isSignUp) {
      setIsSignIn(false);
    }
  }, [isSignIn, isSignUp]);

  return (
    <div className='max-w-[988px] mx-auto flex flex-col flex-1 w-full lg:flex-row items-center justify-center p-4 gap-2'>
      <div className='relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-9 lg:mb-0'>
        <Image src='/assets/heros.svg' alt='heros' fill />
      </div>

      <div className='flex flex-col items-center gap-y-8'>
        <h1 className='text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center'>
          {/* {t('description.title')} */}
          The free, fun, and effective way to learn a language!
        </h1>
        <div className='flex flex-col items-center gap-y-3 max-w-[330px] w-full'>
          <ClerkLoading>
            <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
          </ClerkLoading>
          <ClerkLoaded>
            {!isSignedIn && (
              <>
                <Button
                  size='lg'
                  variant='secondary'
                  className='w-full text-white bg-owl-light border-tree-frog-light'
                  onClick={() => setIsSignUp(true)}
                >
                  Get Started
                </Button>
                <Button
                  size='lg'
                  variant='primaryOutline'
                  className='w-full border-swan-light'
                  onClick={() => setIsSignIn(true)}
                >
                  I already have an account
                </Button>
              </>
            )}
            {/* <SignedOut>
              <SignUpButton
                mode='redirect'
                redirectUrl='/sign-in'
                afterSignInUrl='/learn'
                afterSignUpUrl='/learn'
              >
                <Button size='lg' variant='secondary' className='w-full'>
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton
                mode='modal'
                afterSignInUrl='/learn'
                afterSignUpUrl='/learn'
              >
                <Button size='lg' variant='primaryOutline' className='w-full'>
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut> */}
            {isSignIn && (
              <SignIn setIsSignIn={setIsSignIn} setIsSignUp={setIsSignUp} />
            )}
            {isSignUp && (
              <SignUp setIsSignIn={setIsSignIn} setIsSignUp={setIsSignUp} />
            )}
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
