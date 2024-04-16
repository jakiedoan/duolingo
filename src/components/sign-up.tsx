'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button, Input } from '@/components';
import Image from 'next/image';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

type AccountProps = {
  age: number | null;
  name?: string | null;
  email: string | null;
  password: string | null;
};

export function SignUp({
  setIsSignIn,
  setIsSignUp,
}: {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [account, setAccount] = useState<AccountProps>({
    age: null,
    name: null,
    email: null,
    password: null,
  });
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  const handleSignUp = async (account: AccountProps) => {
    if (!isLoaded || account.email == null || account.password == null) {
      return;
    }

    try {
      await signUp.create({
        lastName: account.name == null ? undefined : account.name,
        emailAddress: account.email,
        password: account.password,
        unsafeMetadata: {
          age: account.age,
        },
      });
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.log(err);
      // setClerkError(err.errors[0].message);
    }
  };

  const onPressVerify = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== 'complete') {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/learn');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [event.target.name]: event.target.value,
    });
  };

  const openSignIn = () => {
    setIsSignIn(true);
    setIsSignUp(false);
  };

  return (
    <div className='absolute w-full min-h-screen bg-snow-default top-0 left-0 flex flex-col'>
      <header className='h-20 w-full px-4'>
        <div className='flex items-center justify-end sm:justify-between h-full'>
          <FontAwesomeIcon
            icon={faXmark}
            size='xl'
            onClick={() => setIsSignUp(false)}
            className='text-hare-default cursor-pointer'
          />
          <Button
            variant='primaryOutline'
            className='hidden sm:inline-block'
            onClick={openSignIn}
          >
            Login
          </Button>
        </div>
      </header>

      <div className='flex flex-1 items-center justify-center'>
        <div className='max-w-[375px] flex flex-col flex-1 w-full'>
          <div className='relative flex flex-col flex-1 items-center justify-center w-full gap-4'>
            <p className='text-2xl font-bold'>Create your profile</p>
            <div>
              <Input
                name='age'
                placeholder='Age'
                type='number'
                required
                onChange={(event) => handleChange(event)}
              />
              <p className='text-hare-default text-justify mt-2'>
                Providing your age ensures you get the right Duolingo
                experience. For more details, please visit our{' '}
                <b className='text-macaw-default'>Privacy Policy</b>.
              </p>
            </div>

            <Input
              name='name'
              type='text'
              placeholder='Name (optional)'
              onChange={(event) => handleChange(event)}
            />
            <Input
              name='email'
              placeholder='Email'
              type='email'
              required
              onChange={(event) => handleChange(event)}
            />
            <Input
              name='password'
              type='password'
              placeholder='Password'
              required
              onChange={(event) => handleChange(event)}
            />
            <Button
              variant='primary'
              size='lg'
              className='w-full'
              onClick={() => handleSignUp(account)}
            >
              Create Account
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
