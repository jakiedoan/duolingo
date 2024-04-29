'use client';

import React, { useEffect } from 'react';
import axios from 'axios';
import { useFetchQuery } from '@/services';
import List from './list';

function CoursesPage() {
  const { data: courses } = useFetchQuery<Courses[]>('courses', 'course');

  return (
    <div className='h-full max-w-[912px] px-3 mx-auto'>
      <h1 className='text-2xl font-bold text-neutral-700'>Language Course</h1>
      <List courses={courses!} activeCourseId={'activeCourseId'}></List>
    </div>
  );
}

export default CoursesPage;
