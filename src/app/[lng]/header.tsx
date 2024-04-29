'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useClientTranslation } from '../i18n/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useFetchQuery } from '@/services';
import { Native_Language } from '@prisma/client';

// const siteLanguage = [
//   { id: 'en', title: 'English', srcIcon: '/assets/flag/en.png' },
//   { id: 'vi', title: 'Tiếng Việt', srcIcon: '/assets/flag/vietnamese.png' },
//   { id: 'ja', title: '日本語', srcIcon: '/assets/flag/japanese.png' },
//   { id: 'ko', title: '한국어', srcIcon: '/assets/flag/korean.png' },
//   { id: 'zh-CN', title: '中文', srcIcon: '/assets/flag/chinese.png' },
// ];

type Props = {
  params: {
    lng: string;
  };
  nativeList: Native_Language[];
};

function Header({ params, nativeList }: Props) {
  const router = useRouter();

  const { t } = useClientTranslation(params.lng);

  const handleChangeLanguage = (id: string, code: string): void => {
    router.push(`/${code}`);
  };

  return (
    <header className='h-20 w-full px-4'>
      <div className='laptop:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
        <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
          <div className='relative w-44 h-10'>
            <Image
              src='/assets/duolingo.svg'
              fill
              style={{ objectFit: 'contain' }}
              alt='doulingo-logo'
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='noOutline' size='lg' className='p-0'>
              <span>{t('intro.language.btn')}</span>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='grid grid-cols-2 gap-2 w-[420px] p-4 rounded-xl'
          >
            {nativeList &&
              nativeList.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  className='cursor-pointer'
                  onClick={() => handleChangeLanguage(item.id, item.code)}
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
    </header>
  );
}

export default Header;
