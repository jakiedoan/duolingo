import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'bg-polar flex h-12 w-full rounded-xl border-2 border-swan pr-2 pl-4 py-2 text-xl file:border-0 file:text-sm file:font-medium autofill:text-eel placeholder:text-eel focus-visible:outline-none  focus-visible:border-macaw disabled:cursor-not-allowed disabled:opacity-50 caret-macaw',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
