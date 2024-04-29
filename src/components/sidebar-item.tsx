'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
  label: string;
  iconSrc: string;
  href: string;
  windowDimension: WindowDimension;
};

function SidebarItem({ label, iconSrc, href, windowDimension }: Props) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <>
      {windowDimension.width! < 1024 ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={active ? 'sidebarOutline' : 'sidebar'}
                className='justify-start h-[52px] w-[56px]'
                asChild
                size='icon'
              >
                <Link href={href} className='flex justify-center'>
                  <Image src={iconSrc} alt={label} height={32} width={32} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right'>{label}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Button
          variant={active ? 'sidebarOutline' : 'sidebar'}
          className='justify-start h-[52px]'
          asChild
        >
          <Link href={href}>
            <Image
              src={iconSrc}
              alt={label}
              className='mr-5'
              height={32}
              width={32}
            />
            {label}
          </Link>
        </Button>
      )}
    </>
  );
}

export default SidebarItem;
