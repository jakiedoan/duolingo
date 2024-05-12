'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import { TFunction } from 'i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePostQuery } from '@/services';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from '@/utils/provider/session';
import { createToken } from '@/auth/token';
import { useUser } from '@/utils/provider/user';
import Loading from '@/components/loading';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string(),
});

export function SignIn({
  setIsSignIn,
  setIsSignUp,
  t,
}: {
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  t: TFunction;
}) {
  const router = useRouter();

  const { setToken } = useSession();

  const {
    data,
    mutateAsync: post,
    isPending,
    error,
  } = usePostQuery<z.infer<typeof formSchema>>(
    'sign-in',
    'sign-in',
    false,
    () => null
  );

  const handleLogin = async (account: z.infer<typeof formSchema>) => {
    const { email, password } = account;

    try {
      const signin = await post({
        email,
        password,
      });

      if (signin) {
        onSuccessCallback(signin);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccessCallback = async (response: any): Promise<void> => {
    await createToken(response);
    setToken(response.token);
    router.push('/learn');
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  const openSignUp = (): void => {
    setIsSignUp(true);
    setIsSignIn(false);
  };

  return (
    <div className='absolute w-full min-h-screen bg-snow-default top-0 left-0 flex flex-col'>
      <header className='h-20 w-full px-4'>
        <div className='flex items-center justify-end mobile:justify-between h-full'>
          <FontAwesomeIcon
            icon={faXmark}
            size='xl'
            onClick={() => setIsSignIn(false)}
            className='text-hare-default cursor-pointer'
          />
          <Button
            variant='primaryOutline'
            className='hidden mobile:inline-block'
            onClick={openSignUp}
          >
            {t('signIn.sign_up.btn')}
          </Button>
        </div>
      </header>

      <div className='flex flex-1 items-center justify-center'>
        <div className='max-w-[375px] max-h-[531px] flex flex-col flex-1 w-full'>
          <div className='relative flex flex-col flex-1 items-center justify-center w-full gap-4'>
            <h1 className='text-2xl font-bold'>{t('signIn.title')}</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLogin)}
                className='space-y-5 w-full'
                noValidate
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder={t('signIn.email_placeholder.txt')}
                          {...field}
                        />
                      </FormControl>
                      {error && error.status === 404 ? (
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
                          placeholder={t('signIn.password_placeholder.txt')}
                          {...field}
                        />
                      </FormControl>
                      {error && error.status === 401 ? (
                        <FormMessage>{error.data.message}</FormMessage>
                      ) : (
                        <FormMessage />
                      )}
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  variant='primary'
                  size='lg'
                  className='w-full'
                >
                  {isPending ? <Loading /> : t('signIn.log_in.btn')}
                </Button>
              </form>
            </Form>
            <div className='flex items-center w-full'>
              <hr className='flex-grow border-t border-[1.5px] border-swan-default' />
              <span className='px-3 text-swan-default'>
                {t('signIn.or.txt')}
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
            <p>{t('signIn.note_1.txt')}</p>
            <p>{t('signIn.note_2.txt')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
