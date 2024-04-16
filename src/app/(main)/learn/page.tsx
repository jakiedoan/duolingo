'use client';

import { clerkClient, useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';

function LearnPage() {
  const { user } = useUser();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return <div>LearnPage</div>;
}

export default LearnPage;
