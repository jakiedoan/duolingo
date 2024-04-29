import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-black ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide',
  {
    variants: {
      variant: {
        default:
          'bg-transparent hover:brightness-90 border-swan-default border-2 border-b-4',
        noOutline: 'bg-transparent hover:brightness-90 text-hare-light',
        primary:
          'bg-macaw-default text-snow-default hover:brightness-110 border-bea-secondary border-b-4 active:border-b-0',
        primaryOutline:
          'text-macaw-default hover:brightness-90 border-swan-default border-2 border-b-4',
        secondary:
          'bg-owl-default text-snow-default hover:brightness-110 border-tree-frog-default border-b-4 active:border-b-0',
        secondaryOutline:
          'text-owl-default hover:brightness-90 border-swan-default border-2 border-b-4',
        danger:
          'bg-rose-500 text-snow-default hover:brightness-110 border-rose-600 border-b-4 active:border-b-0',
        dangerOutline:
          'text-rose-500 hover:brightness-90 border-swan-default border-2 border-b-4',
        super:
          'bg-indigo-500 text-snow-default hover:brightness-110 border-indigo-600 border-b-4 active:border-b-0',
        superOutline:
          'text-indigo-500 hover:brightness-90 border-swan-default border-2 border-b-4',
        ghost:
          'bg-transparent text-slate-500 border-transparent border-0 hover:brightness-110',
        sidebar:
          'bg-transparent text-wolf-default border-2 border-transparent hover:brightness-110 transition-none',
        sidebarOutline:
          'bg-macaw-default/15 text-macaw-default border-macaw-default/50 border-2 hover:bg-macaw-default/20 transition-none',
      },
      size: {
        default: 'h-11 px-4 py-2',
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
