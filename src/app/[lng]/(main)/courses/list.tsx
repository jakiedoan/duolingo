import { prisma } from '@/lib/prisma';
import React from 'react';
import Card from './card';

type Props = {
  courses: Courses[];
  activeCourseId: string;
};

function List({ courses, activeCourseId }: Props) {
  return (
    <div className='pt-6 grid grid-cols-2 tablet:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] laptop:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]'>
      {courses &&
        courses.map((course) => (
          <Card
            key={course.id}
            id={course.id}
            title={course.title}
            imageSrc={course.image_src}
            onClick={() => {}}
            disabled={false}
            active={course.id === activeCourseId}
          ></Card>
        ))}
    </div>
  );
}

export default List;
