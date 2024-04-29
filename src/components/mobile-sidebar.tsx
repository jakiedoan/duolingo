'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const sidebar = [
  {
    id: 'learn',
    label: 'Learn',
    href: '/learn',
    icon: '/assets/sidebar/learn.svg',
  },
  {
    id: 'leaderboards',
    label: 'Leaderboards',
    href: '/leaderboards',
    icon: '/assets/sidebar/leaderboards.svg',
  },
  {
    id: 'quests',
    label: 'Quests',
    href: '/quests',
    icon: '/assets/sidebar/quest.svg',
  },
  {
    id: 'shop',
    label: 'Shop',
    href: '/shop',
    icon: '/assets/sidebar/shop.svg',
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: '/assets/sidebar/profile.svg',
  },
];

function MobileSidebar() {
  const pathname = usePathname();
  // const active = pathname === href;

  return (
    <div className='flex tablet:hidden fixed bottom-0 h-24 w-full bg-transparent justify-between items-center px-10 border-t-2'>
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
