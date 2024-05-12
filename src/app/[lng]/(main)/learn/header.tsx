import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
};

function Header({ title }: Props) {
  return (
    <div className='sticky top-0 bg-snow-default pb-3 desktop:pt-[28px] desktop:mt-[28px] flex items-center justify-between border-b2 mb-5 text-wolf-default desktop:z-50'>
      <Link href='/courses'>
        <Button>
          <ArrowLeft className='h-5 w-5 stroke-2 text-wolf-default' />
        </Button>
      </Link>
      <h1 className='font-bold text-lg'>{title}</h1>
    </div>
  );
}

export default Header;
