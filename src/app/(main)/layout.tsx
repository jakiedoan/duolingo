'use client';

import React from 'react';

function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='bg-snow'>{children}</div>;
}

export default MainLayout;
