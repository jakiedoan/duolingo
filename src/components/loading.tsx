import { cn } from '@/lib/utils';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {
  className?: string;
};

function Loading({ className }: Props) {
  return (
    <div className={cn('flex gap-2 w-full justify-center', className)}>
      <FontAwesomeIcon
        icon={faCircle}
        className='text-swan animate-loading'
        size='xs'
      />
      <FontAwesomeIcon
        icon={faCircle}
        className='text-swan animate-loading [animation-delay:-0.3s]'
        size='xs'
      />
      <FontAwesomeIcon
        icon={faCircle}
        className='text-swan animate-loading [animation-delay:-0.15s]'
        size='xs'
      />
    </div>
  );
}

export default Loading;
