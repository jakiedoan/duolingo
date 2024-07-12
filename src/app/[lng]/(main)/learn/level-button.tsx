import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Character } from '@/utils/characters';
import { Check, Crown, Star, Trophy } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type Props = {
  id: string;
  title: string;
  order: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
  character: {
    color: string;
    pathCharacterColor: string;
  };
};

function LevelButton({
  id,
  title,
  order,
  index,
  totalCount,
  locked,
  current,
  percentage,
  character,
}: Props) {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;

  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Trophy : Star;

  // 'lesson/unit/8/level/1'
  const href = isCompleted ? `/lesson/unit/${order}` : '/lesson';

  return (
    <div
      className='relative'
      style={{
        right: `${rightPosition}px`,
        marginTop: isFirst && !isCompleted ? 60 : 24,
        pointerEvents: locked ? 'none' : 'auto',
      }}
      aria-disabled={locked}
    >
      {current ? (
        <div className='h-[102px] w-[102px] relative'>
          <div
            className={`absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-${character.color} bg-snow rounded-xl animate-bounce tracking-wide z-10`}
          >
            Start
            <div className='absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-snow transform -translate-x-1/2' />
          </div>
          <Popover>
            <PopoverTrigger>
              <CircularProgressbarWithChildren
                value={Number.isNaN(percentage) ? 0 : percentage}
                styles={{
                  path: {
                    stroke: '#93D333',
                  },
                  trail: {
                    stroke: '#37464f',
                  },
                }}
              >
                {/* <Button
                  size='rounded'
                  variant={locked ? 'locked' : 'secondary'}
                  className={cn(
                    `h-[65px] w-[70px] border-b-8 border-black/20 transition-all duration-125 active:translate-y-px`,
                    locked ? '' : `bg-${characterColor}`
                  )}
                > */}
                <Button
                  variant={locked ? 'locked' : 'lesson'}
                  className={cn(
                    `lesson-button ${character.pathCharacterColor}`,
                    locked ? '' : `bg-${character.color}`
                  )}
                >
                  <Icon
                    className={cn(
                      'h-10 w-10',
                      locked
                        ? 'fill-swan text-swan stroke-swan'
                        : `fill-snow-light text-snow-light`,
                      isCompleted && 'fill-none stroke-[4]'
                    )}
                  />
                </Button>
              </CircularProgressbarWithChildren>
            </PopoverTrigger>
            <PopoverContent
              className={cn(
                'flex flex-col gap-4 w-full',
                locked ? 'bg-polar' : `bg-${character.color}`
              )}
              side='bottom'
            >
              <div
                className={cn(
                  `absolute left-1/2 -top-2 w-0 h-0 border-x-8 border-x-transparent border-b-8 transform -translate-x-1/2`,
                  locked ? 'border-swan' : `border-${character.color}`
                )}
              />
              <span
                className={cn(
                  'text-lg font-bold',
                  locked ? 'text-hare' : 'text-snow-light'
                )}
              >
                {title}
              </span>
              <Link
                href={href}
                aria-disabled={locked}
                style={{ pointerEvents: locked ? 'none' : 'auto' }}
              >
                <Button
                  size='lg'
                  className={`w-full bg-snow-light text-${character.color}`}
                >
                  Start +10 XP
                </Button>
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger>
            <Button
              size='rounded'
              variant={locked ? 'locked' : 'secondary'}
              className={cn(
                `h-[65px] w-[70px] border-b-8 border-black/20 transition-all duration-125 active:translate-y-px`,
                locked ? '' : `bg-${character.color}`
              )}
            >
              <Icon
                className={cn(
                  'h-10 w-10',
                  locked
                    ? 'fill-swan text-swan stroke-swan'
                    : `fill-snow-light text-snow-light`,
                  isCompleted && 'fill-none stroke-[4]'
                )}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn(
              'flex flex-col gap-4 w-full',
              locked ? 'bg-polar' : `bg-${character.color}`
            )}
            side='bottom'
          >
            <div
              className={cn(
                `absolute left-1/2 -top-2 w-0 h-0 border-x-8 border-x-transparent border-b-8 transform -translate-x-1/2`,
                locked ? 'border-swan' : `border-${character.color}`
              )}
            />
            <span
              className={cn(
                'text-lg font-bold',
                locked ? 'text-hare' : 'text-snow-light'
              )}
            >
              Complete all levels above to unlock this!
            </span>
            <Link
              href={href}
              aria-disabled={locked}
              style={{ pointerEvents: locked ? 'none' : 'auto' }}
            >
              <Button size='lg' className={`w-full`}>
                Locked
              </Button>
            </Link>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

export default LevelButton;
