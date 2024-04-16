import { Button } from '@/components';
import Image from 'next/image';
import React from 'react';

function Footer() {
  return (
    <footer className='hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2'>
      <div className='max-w-screen-lg mx-auto flex items-center justify-evenly h-full'>
        <Button size='lg' variant='ghost' className='w-full'>
          <Image
            src='/assets/flag/german.png'
            width={40}
            height={32}
            alt='German'
            className='mr-4'
          />
          German
        </Button>
        <Button size='lg' variant='ghost' className='w-full'>
          <Image
            src='/assets/flag/japanese.png'
            width={40}
            height={32}
            alt='Japanese'
            className='mr-4'
          />
          Japanese
        </Button>
        <Button size='lg' variant='ghost' className='w-full'>
          <Image
            src='/assets/flag/korean.png'
            width={40}
            height={32}
            alt='Korean'
            className='mr-4'
          />
          Korean
        </Button>
        <Button size='lg' variant='ghost' className='w-full'>
          <Image
            src='/assets/flag/latin.png'
            width={40}
            height={32}
            alt='Latin'
            className='mr-4'
          />
          Latin
        </Button>
        <Button size='lg' variant='ghost' className='w-full'>
          <Image
            src='/assets/flag/vietnamese.png'
            width={40}
            height={32}
            alt='Vietnamese'
            className='mr-4'
          />
          Vietnamese
        </Button>
        <Button size='lg' variant='ghost' className='w-full'>
          <Image
            src='/assets/flag/chinese.png'
            width={40}
            height={32}
            alt='Chinese'
            className='mr-4'
          />
          Chinese
        </Button>
      </div>
    </footer>
  );
}

export default Footer;
