import { Lesson, Unit as SectionUnit } from '@prisma/client';
import React from 'react';
import UnitBanner from './unit-banner';
import LevelButton from './level-button';
import { units } from '@/utils/units';
import { characters } from '@/utils/characters';
import { UnitLevel } from '@/utils/types';

type Props = {
  id: string;
  order: number;
  title: string;
  description: string;
  code: string;
  levels: (UnitLevel & {
    completed: boolean;
  })[];
  activeLesson:
    | (Lesson & {
        unit: SectionUnit;
      })
    | undefined;
  activeLessonPercentage: number;
};

function Unit({
  id,
  order,
  title,
  description,
  levels,
  activeLesson,
  activeLessonPercentage,
  code,
}: Props) {
  return (
    <>
      {/* Section 1, Unit 1 */}
      <UnitBanner
        key={id}
        title={title}
        description={description}
        href={`guidebook/${code}/${order}`}
        bgColor={characters[units[order]].color}
      />
      <div className='flex items-center flex-col relative'>
        {levels &&
          levels.map((level, index) => {
            const isCurrent = true || level.id === activeLesson?.id;
            // const isLocked = isCurrent;
            const isLocked = !level.completed && !isCurrent;

            return (
              <LevelButton
                key={level.id}
                id={level.id}
                title={description}
                index={index}
                order={level.order}
                totalCount={levels.length - 1}
                current={isCurrent}
                locked={isLocked}
                percentage={activeLessonPercentage}
                character={characters[units[order]]}
              />
            );
          })}
      </div>
    </>
  );
}

export default Unit;
