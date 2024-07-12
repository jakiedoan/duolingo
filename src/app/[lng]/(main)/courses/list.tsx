import React, { useCallback, useEffect } from 'react';
import Card from './card';
import { useClientTranslation } from '@/app/i18n/client';
import { NativeCourses } from '@/utils/types';
import { usePutQuery } from '@/services';
import { useUser } from '@/utils/provider/user';
import { useSession } from '@/utils/provider/session';
import { useRouter } from 'next/navigation';

type Props = {
  nativeCourses: NativeCourses;
  activeList: Array<any>;
  lng: string;
};

function List({ nativeCourses, activeList, lng }: Props) {
  const router = useRouter();
  const { user } = useUser();
  const { t } = useClientTranslation(lng);

  const {
    isPending,
    error,
    mutateAsync: edit,
  } = usePutQuery('update_progress', `progress/${user?.id}`, true);

  const handleSelectCourse = useCallback(
    (id: string) => {
      edit({
        activeCourseId: id,
      });

      if (!isPending) {
        router.push('learn');
      }
    },
    [isPending]
  );

  return (
    <div className='pt-6 grid gap-3 tablet-mid:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] grid-cols-[repeat(auto-fill,minmax(210px,1fr))]'>
      {nativeCourses &&
        nativeCourses.courses.map((course) => (
          <Card
            key={course.id}
            id={course.id}
            title={t(`course.${course.title}`)}
            imageSrc={course.image_src}
            onClick={handleSelectCourse}
            disabled={false}
            active={activeList.includes(course)}
          />
        ))}
    </div>
  );
}

export default List;
