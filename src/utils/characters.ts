export type Character = {
  [key: string]: {
    color: string;
    pathCharacterColor: string;
  };
};

const path = '--path-character-color';

export const characters: Character = {
  duo: {
    color: 'owl-light',
    pathCharacterColor: `[${path}:--color-owl-always-light]`,
  },
  lily: {
    color: 'beetle',
    pathCharacterColor: `[${path}:--color-beetle]`,
  },
  oscar: {
    color: 'peacock',
    pathCharacterColor: `[${path}:--color-peacock]`,
  },
  junior: {
    color: 'macaw-light',
    pathCharacterColor: `[${path}:--color-macaw-always-light]`,
  },
  zari: {
    color: 'starfish',
    pathCharacterColor: `[${path}:--color-starfish]`,
  },
  lucy: {
    color: 'fox-light',
    pathCharacterColor: `[${path}:--color-fox-always-light]`,
  },
  eddy: {
    color: 'cardinal-light',
    pathCharacterColor: `[${path}:--color-cardinal-always-light]`,
  },
  vikram: {
    color: 'dragon',
    pathCharacterColor: `[${path}:--color-dragon]`,
  },
  lin: {
    color: 'fox-light',
    pathCharacterColor: `[${path}:--color-fox-always-light]`,
  },
  falstaff: {
    color: 'grizzly-lite',
    pathCharacterColor: `[${path}:--color-grizzly-lite]`,
  },
};
