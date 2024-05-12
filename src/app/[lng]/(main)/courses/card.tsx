import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type Props = {
  title: string;
  id: string;
  imageSrc: string;
  onClick: (id: string) => void;
  disabled?: boolean;
  active?: boolean;
};

function Card({ title, id, imageSrc, onClick, disabled, active }: Props) {
  return (
    <div
      className={cn(
        'h-full border-2 rounded-2xl border-b-4 border-swan-default hover:brightness-90 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 max-w-full min-h-[217px] desktop:min-w-[200px] desktop:max-w-[240px] mb-3',
        disabled && 'pointer-events-none opacity-50'
      )}
      onClick={() => onClick(id)}
    >
      <div className='min-h-[24px] w-full flex items-center justify-end'>
        {active && (
          <div className='rounded-md bg-tree-frog-default flex items-center justify-center p-1.5'>
            <Check className='text-snow-default stroke-[4] h-4 w-4' />
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        height={70}
        width={93.33}
        className='object-cover'
      />
      <p className='text-eel-default text-center font-bold mt-3'>{title}</p>
    </div>
  );
}

export default Card;
