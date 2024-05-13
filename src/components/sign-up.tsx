'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TFunction } from 'i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { usePostQuery } from '@/services';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createToken } from '@/auth/token';
import { useSession } from '@/utils/provider/session';
import Loading from '@/components/loading';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '@/utils/provider/user';

type AccountProps = {
  age: number | null;
  name?: string | null;
  email: string | null;
  password: string | null;
};

const formSchema = z.object({
  age: z.coerce
    .number()
    .min(NaN, { message: 'Please enter your real age.' })
    .positive({ message: 'Please enter your real age.' }),
  name: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(8, { message: 'Password to short.' }),
});

export function SignUp({
  setIsSignIn,
  setIsSignUp,
  t,
}: {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  t: TFunction;
}) {
  // const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const { setToken } = useSession();
  const { setUser } = useUser();

  const {
    mutateAsync: post,
    isPending,
    error,
    data,
  } = usePostQuery<z.infer<typeof formSchema>>('sign-up', 'sign-up', false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      name: undefined,
      email: undefined,
      password: undefined,
    },
  });

  const onSuccessCallback = async (response: any) => {
    await createToken(response);
    setToken(response.token);
    const userInfo: any = jwtDecode(response.token);
    setUser(userInfo.user);
    router.push('/learn');
  };

  const handleSignUp = async (account: z.infer<typeof formSchema>) => {
    const { age, name, email, password } = account;

    try {
      const signup = await post({
        age: parseInt(age.toString()),
        name: name != undefined ? name : undefined,
        email: email,
        password: password,
      });

      if (signup) {
        onSuccessCallback(signup);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openSignIn = () => {
    setIsSignIn(true);
    setIsSignUp(false);
  };

  return (
    <div className='absolute w-full min-h-screen bg-snow-default top-0 left-0 flex flex-col'>
      <header className='h-20 w-full px-4'>
        <div className='flex items-center justify-end mobile:justify-between h-full'>
          <FontAwesomeIcon
            icon={faXmark}
            size='xl'
            onClick={() => setIsSignUp(false)}
            className='text-hare-default cursor-pointer'
          />
          <Button
            variant='primaryOutline'
            className='hidden mobile:inline-block'
            onClick={openSignIn}
          >
            {t('signUp.sign_in.btn')}
          </Button>
        </div>
      </header>

      <div className='flex flex-1 items-center justify-center'>
        <div className='max-w-[375px] flex flex-col flex-1 w-full'>
          <div className='relative flex flex-col flex-1 items-center justify-center w-full gap-4'>
            <h1 className='text-2xl font-bold'>{t('signUp.title')}</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignUp)}
                className='space-y-5 w-full'
              >
                {/* Age */}
                <FormField
                  control={form.control}
                  name='age'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder={t('signUp.age_placeholder.txt')}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t('signUp.age_note.txt')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Name */}
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder={t('signUp.name_placeholder.txt')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Email */}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder={t('signUp.email_placeholder.txt')}
                          {...field}
                        />
                      </FormControl>
                      {error && error.status === 409 ? (
                        <FormMessage>{error.data.message}</FormMessage>
                      ) : (
                        <FormMessage />
                      )}
                    </FormItem>
                  )}
                />
                {/* Password */}
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder={t('signUp.password_placeholder.txt')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  variant='primary'
                  size='lg'
                  className='w-full'
                >
                  {isPending ? <Loading /> : t('signUp.sign_up.btn')}
                </Button>
              </form>
            </Form>

            <div className='flex items-center w-full'>
              <hr className='flex-grow border-t border-[1.5px] border-swan-default' />
              <span className='px-3 text-swan-default'>
                {t('signUp.or.txt')}
              </span>
              <hr className='flex-grow border-t border-[1.5px] border-swan-default' />
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
            <p>{t('signUp.note_1.txt')}</p>
            <p>{t('signUp.note_2.txt')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
