'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SidebarItem from '@/components/sidebar-item';
import { useWindowDimension } from '@/utils/hooks/window-dimension';
import { TFunction } from 'i18next';
import { useUser } from '@/utils/provider/user';

type Props = {
  className?: string;
  t: TFunction;
  lng: string;
};

function Sidebar({ className, t, lng }: Props) {
  const logo = {
    desktop: '/assets/sidebar/duolingo-default.svg',
    tablet: '/assets/sidebar/duolingo-tablet.svg',
  };

  const windowDimension = useWindowDimension();

  const { user } = useUser();

  const sidebar = [
    {
      id: 'learn',
      label: t('sidebar.learn.btn'),
      href: `/${lng}/learn`,
      icon: '/assets/sidebar/learn.svg',
    },
    {
      id: 'leaderboards',
      label: t('sidebar.leaderboards.btn'),
      href: `/${lng}/leaderboards`,
      icon: '/assets/sidebar/leaderboards.svg',
    },
    {
      id: 'quests',
      label: t('sidebar.quests.btn'),
      href: `/${lng}/quests`,
      icon: '/assets/sidebar/quest.svg',
    },
    {
      id: 'shop',
      label: t('sidebar.shop.btn'),
      href: `/${lng}/shop`,
      icon: '/assets/sidebar/shop.svg',
    },
    {
      id: 'profile',
      label: t('sidebar.profile.btn'),
      href: `/${lng}/profile`,
      icon: !user?.avatar ? '/assets/sidebar/profile.svg' : user?.avatar,
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
        'flex bg-transparent h-full desktop:w-[256px] tablet:w-24 tablet:fixed left-0 top-0 px-4 border-r-2 flex-col',
        className
      )}
    >
      <Link href='/learn'>
        <div className='pt-8 pb-7 flex items-center justify-center gap-x-3'>
          <div className='relative w-44 h-10'>
            <Image
              src={windowDimension.width! < 1160 ? logo.tablet : logo.desktop}
              fill
              style={{ objectFit: 'contain' }}
              alt='doulingo-logo'
              priority
            />
          </div>
        </div>
      </Link>
      <div className='flex flex-col gap-y-2 flex-1 desktop:w-full'>
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
