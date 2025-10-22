import { characters, items } from './common.js';
import { chapter1 } from './chapter1/index.js';

export const storyDetails = {
  title: 'Whispers of the Abyss',
  chapters: {
    chapter1: {
      title: 'The Sunken Path',
      number: 1,
      description:
        'Lost and without memory, you awaken in a cursed swamp. An ancient evil stirs, and a mysterious voice is your only guide.',
      flavorText:
        'Lost and without memory, you awaken in a cursed swamp where an ancient evil stirs. Your story begins here.',
    },
  },
};

export const theme = 'fantasy';

export const storyData = {
  chapter1,
};

export { characters, items };
