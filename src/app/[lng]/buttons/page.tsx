import { Button } from '@/components/ui/button';
import { Crown, Star, Trophy } from 'lucide-react';
import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ButtonsPage() {
  const character = [
    {
      id: 'owl',
      color: '--color-owl-always-light',
    },
    { id: 'starfish', color: '--color-starfish' },
  ];

  const owllight = '--color-owl-always-light';

  const characterColor: any = {
    owl: '[--path-character-color:--color-owl-always-light]',
    starfish: '[--path-character-color:--color-starfish]',
  };

  const percentage = 66;

  return (
    <div className='flex flex-col p-4 space-y-4 max-w-[200px]'>
      {/* <Button>Default</Button>
      <Button variant='primary'>Primary</Button>
      <Button variant='primaryOutline'>Primary Outline</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='secondaryOutline'>Secondary Outline</Button>
      <Button variant='danger'>Danger</Button>
      <Button variant='dangerOutline'>Danger Outline</Button>
      <Button variant='super'>Super</Button>
      <Button variant='superOutline'>Super Outline</Button>
      <Button variant='ghost'>Ghost</Button>
      <Button variant='sidebar'>Sidebar</Button>
      <Button variant='sidebarOutline'>Sidebar Outline</Button> */}
      {/* bg-owl-light ${characterColor['owl']} */}

      {character.map((character, index) => (
        <Button
          key={index}
          className={`lesson-button ${characterColor[character.id]}`}
        >
          <Star fill='white' />
        </Button>
      ))}
      <br />

      {character.map((character, index) => (
        <Button
          key={index}
          variant='lesson'
          className={`[--path-character-color:${character.color}]`}
        >
          <Trophy fill='white' />
        </Button>
      ))}
    </div>
  );
}

export default ButtonsPage;
