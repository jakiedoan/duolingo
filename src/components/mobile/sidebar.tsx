'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { TFunction } from 'i18next';

type Props = {
  lng: string;
  t: TFunction;
};
function MobileSidebar({ lng, t }: Props) {
  const pathname = usePathname();

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
      icon: '/assets/sidebar/profile.svg',
    },
  ];

  return (
    <div className='flex tablet:hidden fixed bottom-0 h-24 w-full bg-snow justify-between items-center px-10 border-t-2 border-swan'>
      {sidebar.map((item) => (
        <Button
          key={item.id}
          variant={pathname === item.href ? 'sidebarOutline' : 'sidebar'}
          className='relative h-14 w-14'
        >
          <Image src={item.icon} alt={item.label} className='mr-5' fill />
        </Button>
      ))}
    </div>
  );
}

export default MobileSidebar;
