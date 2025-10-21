import { characters, items } from './common.js';
import { chapter1 } from './chapter1.js';

export const storyDetails = {
  title: 'Starship Wanderer',
  chapters: {
    chapter1: {
      title: 'Silent Orbit',
      number: 1,
      description:
        'You are the sole survivor. With your ship crippled and falling into a black hole, you must race against time to restore power and escape.',
    },
  },
};

export const theme = 'scifi';

export const storyData = {
  chapter1,
};

export { characters, items };
