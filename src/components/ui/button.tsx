import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex relative items-center justify-center whitespace-nowrap rounded-2xl font-black ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide',
  {
    variants: {
      variant: {
        default:
          'bg-transparent hover:brightness-90 border-swan/35 border-2 border-b-4',
        noOutline: 'bg-transparent hover:brightness-90 text-hare-light',
        primary:
          'bg-macaw text-snow hover:brightness-110 border-bea-secondary border-b-4 active:border-b-0',
        primaryOutline:
          'text-macaw hover:brightness-90 border-swan border-2 border-b-4',
        secondary:
          'bg-owl text-snow hover:brightness-110 border-tree-frog border-b-4 active:border-b-0',
        secondaryOutline:
          'text-owl hover:brightness-90 border-swan border-2 border-b-4',
        danger:
          'bg-rose-500 text-snow hover:brightness-110 border-rose-600 border-b-4 active:border-b-0',
        dangerOutline:
          'text-rose-500 hover:brightness-90 border-swan border-2 border-b-4',
        super:
          'bg-indigo-500 text-snow hover:brightness-110 border-indigo-600 border-b-4 active:border-b-0',
        superOutline:
          'text-indigo-500 hover:brightness-90 border-swan border-2 border-b-4',
        ghost:
          'bg-transparent text-slate-500 border-transparent border-0 hover:brightness-110',
        sidebar:
          'bg-transparent text-wolf border-2 border-transparent hover:brightness-110 transition-none',
        sidebarOutline:
          'bg-macaw/15 text-macaw border-macaw/50 border-2 hover:bg-macaw/20 transition-none',

        locked: 'bg-swan text-hare border-swan border-b-4 active:border-b-0',

        lesson:
          'h-[65px] w-[70px] z-0 relative rounded-full bg-[rgb(var(--path-character-color))] hover:brightness-110 before:left-0 before:absolute before:w-full before:-z-[1] after:left-0 after:absolute after:w-full after:-z-[1] after:bg-[rgb(var(--path-character-color))] after:rounded-[50%/50%] after:shadow-lesson after:h-[57px] active:translate-y-2 active:after:shadow-none',
      },
      size: {
        default: 'h-11 px-4 py-6',
        sm: 'h-9 px-3',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10',
        rounded: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
