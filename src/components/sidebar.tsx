'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SidebarItem from '@/components/sidebar-item';
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs';
import { Ellipsis } from 'lucide-react';
import { Button } from './ui/button';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import { useWindowDimension } from '@/utils/hooks/window-dimension';
import { TFunction } from 'i18next';
import { useSession } from 'next-auth/react';

type Props = {
  className?: string;
  t: TFunction;
};

function Sidebar({ className, t }: Props) {
  const logo = {
    laptop: '/assets/sidebar/duolingo-default.svg',
    tablet: '/assets/sidebar/duolingo-tablet.svg',
  };

  const windowDimension = useWindowDimension();

  const { data } = useSession();

  const profilePic = data?.user.image;

  const sidebar = [
    {
      id: 'learn',
      label: t('sidebar.learn.btn'),
      href: '/learn',
      icon: '/assets/sidebar/learn.svg',
    },
    {
      id: 'leaderboards',
      label: t('sidebar.leaderboards.btn'),
      href: '/leaderboards',
      icon: '/assets/sidebar/leaderboards.svg',
    },
    {
      id: 'quests',
      label: t('sidebar.quests.btn'),
      href: '/quests',
      icon: '/assets/sidebar/quest.svg',
    },
    {
      id: 'shop',
      label: t('sidebar.shop.btn'),
      href: '/shop',
      icon: '/assets/sidebar/shop.svg',
    },
    {
      id: 'profile',
      label: t('sidebar.profile.btn'),
      href: '/profile',
      icon: !profilePic ? '/assets/sidebar/more.svg' : profilePic,
    },
    {
      id: 'more',
      label: t('sidebar.more.btn'),
      href: '/',
      icon: '/assets/sidebar/more.svg',
    },
  ];

  return (
    <div
      className={cn(
        'flex bg-transparent h-full laptop:w-[256px] tablet:w-24 tablet:fixed left-0 top-0 px-4 border-r-2 flex-col',
        className
      )}
    >
      <Link href='/learn'>
        <div className='pt-8 pb-7 flex items-center justify-center gap-x-3'>
          <div className='relative w-44 h-10'>
            <Image
              src={windowDimension.width! < 1024 ? logo.tablet : logo.laptop}
              fill
              style={{ objectFit: 'contain' }}
              alt='doulingo-logo'
              priority
            />
          </div>
        </div>
      </Link>
      <div className='flex flex-col gap-y-2 flex-1'>
        {sidebar.map((item) => (
          <SidebarItem
            key={item.id}
            label={item.label}
            href={item.href}
            iconSrc={item.icon}
            windowDimension={windowDimension}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
