'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button, Input } from '@/components';
import Image from 'next/image';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

type AccountProps = {
  email: string | null;
  password: string | null;
};

export function SignIn({
  setIsSignIn,
  setIsSignUp,
}: {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [account, setAccount] = useState<AccountProps>({
    email: null,
    password: null,
  });

  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const handleLogin = async (account: AccountProps) => {
    if (!isLoaded || account.email == null || account.password == null) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: account.email,
        password: account.password,
      });
      if (result.status === 'complete') {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push('/learn');
      } else {
        console.log(result);
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      // setClerkError(err.errors[0].message);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value,
    });
  };

  const openSignUp = () => {
    setIsSignUp(true);
    setIsSignIn(false);
  };

  return (
    <div className='absolute w-full min-h-screen bg-snow-default top-0 left-0 flex flex-col'>
      <header className='h-20 w-full px-4'>
        <div className='flex items-center justify-end sm:justify-between h-full'>
          <FontAwesomeIcon
            icon={faXmark}
            size='xl'
            onClick={() => setIsSignIn(false)}
            className='text-hare-default cursor-pointer'
          />
          <Button
            variant='primaryOutline'
            className='hidden sm:inline-block'
            onClick={openSignUp}
          >
            SIGN UP
          </Button>
        </div>
      </header>

      <div className='flex flex-1 items-center justify-center'>
        <div className='max-w-[375px] max-h-[531px] flex flex-col flex-1 w-full'>
          <div className='relative flex flex-col flex-1 items-center justify-center w-full gap-4'>
            <p className='text-2xl font-bold'>Log in</p>
            <Input
              name='email'
              placeholder='Email or username'
              type='email'
              onChange={(event) => handleChange(event)}
            />
            <Input
              name='password'
              type='password'
              placeholder='Password'
              onChange={(event) => handleChange(event)}
            />
            <Button
              variant='primary'
              size='lg'
              className='w-full'
              onClick={() => handleLogin(account)}
            >
              Log In
            </Button>
            <div className='flex items-center w-full'>
              <hr className='flex-grow border-t border-2 border-swan-default' />
              <span className='px-3 text-swan-default'>OR</span>
              <hr className='flex-grow border-t border-2 border-swan-default' />
            </div>
            <div className='flex w-full justify-between gap-3'>
              <Button
                size='lg'
                className='w-full text-facebook relative space-x-2'
              >
                <Image
                  src='/assets/facebook.svg'
                  width={12}
                  height={12}
                  alt='facebook-login'
                />
                <span>Facebook</span>
              </Button>
              <Button
                size='lg'
                className='w-full text-google relative space-x-2'
              >
                <Image
                  src='/assets/google.svg'
                  width={20}
                  height={20}
                  alt='google-login'
                />
                <span>Google</span>
              </Button>
            </div>
          </div>

          <div className='relative text-sm text-hare-default w-full text-center space-y-3 pt-10 pb-2.5'>
            <p>
              By signing in to Duolingo, you agree to our <b>Terms</b> and
              <b> Privacy Policy</b>.
            </p>
            <p>
              This site is protected by reCAPTCHA Enterprise and the Google
              <b>Privacy Policy</b> and <b>Terms of Service</b> apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
