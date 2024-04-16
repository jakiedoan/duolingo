import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@/components';
import {
  ChevronDown,
  CreditCard,
  Keyboard,
  Settings,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'react-i18next';

const siteLanguage = [
  { id: 'en', title: 'English', srcIcon: '/assets/flag/en.png' },
  { id: 'vi', title: 'Tiếng Việt', srcIcon: '/assets/flag/vietnamese.png' },
  { id: 'ja', title: '日本語', srcIcon: '/assets/flag/japanese.png' },
  { id: 'ko', title: '한국어', srcIcon: '/assets/flag/korean.png' },
  { id: 'zh', title: '中文', srcIcon: '/assets/flag/chinese.png' },
];

function Header() {
  const {t, i18n} = useTranslation();

  const handleChangeLanguage = (id: string): void => {
    i18n.changeLanguage(id);
  };

  return (
    <header className='h-20 w-full px-4'>
      <div className='lg:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
        <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
          <div className='relative w-44 h-10'>
            <Image
              src='/assets/duolingo.svg'
              fill
              objectFit='contain'
              alt='doulingo-logo'
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='noOutline' size='lg' className='p-0'>
              <span>Site Language: English</span>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='grid grid-cols-2 gap-2 w-[420px] p-4 rounded-xl'
          >
            {siteLanguage.map((item) => (
              <DropdownMenuItem
                key={item.id}
                className='cursor-pointer'
                onClick={() => handleChangeLanguage(item.id)}
              >
                <Image
                  src={item.srcIcon}
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

        {/* <ClerkLoading>
          <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl='/' />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode='modal'
              afterSignInUrl='/learn'
              afterSignUpUrl='/learn'
            >
              <Button size='lg' variant='ghost'>
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded> */}
      </div>
    </header>
  );
}

export default Header;
