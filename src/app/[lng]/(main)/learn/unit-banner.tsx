import { Button } from '@/components/ui/button';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotebookText } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  description: string;
  href: string;
  bgColor: string;
};

function UnitBanner({ title, description, href, bgColor }: Props) {
  return (
    <div
      className={`w-full rounded-xl bg-${bgColor} p-5 text-snow-light flex items-center justify-between font-bold`}
    >
      <div className='space-y-2.5'>
        <h4 className='flex gap-2 items-center text-snow-light opacity-70 uppercase'>
          <Link href='/sections'>
            <FontAwesomeIcon icon={faArrowLeft} size='lg' />
          </Link>
          <span>{title}</span>
        </h4>
        <p className='text-xl'>{description}</p>
      </div>
      <Link href={href}>
        <Button className='flex gap-2'>
          <NotebookText size={30} />
          <span className='hidden desktop:block'>Guidebook</span>
        </Button>
      </Link>
    </div>
  );
}

export default UnitBanner;
