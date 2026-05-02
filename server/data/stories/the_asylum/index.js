import { characters, items } from './common.js';
import { chapter1 } from './chapter1/index.js';

export const storyDetails = {
  title: 'The Asylum',
  chapters: {
    chapter1: {
      title: 'The Awakening',
      number: 1,
      description:
        'You wake in a derelict hospital room with no memory. The path to escape is shrouded in mystery and stalked by an unseen horror.',
      flavorText:
        'You awaken in a derelict hospital room with no memory. Your story begins here.',
    },
  },
};

export const theme = 'horror';

export const storyData = {
  chapter1,
};

export { characters, items };
