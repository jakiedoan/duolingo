import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Loading() {
  return (
    <div className='flex gap-2'>
      <FontAwesomeIcon
        icon={faCircle}
        className='text-swan-default animate-loading'
        size='xs'
      />
      <FontAwesomeIcon
        icon={faCircle}
        className='text-swan-default animate-loading [animation-delay:-0.3s]'
        size='xs'
      />
      <FontAwesomeIcon
        icon={faCircle}
        className='text-swan-default animate-loading [animation-delay:-0.15s]'
        size='xs'
      />
    </div>
  );
}

export default Loading;
