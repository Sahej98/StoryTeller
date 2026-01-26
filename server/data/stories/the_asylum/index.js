import { characters, items } from './common.js';
import { chapter1 } from './chapter1/index.js';
import { chapter2 } from './chapter2/index.js';
import { chapter3 } from './chapter3/index.js';

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
    chapter2: {
      title: 'The West Wing',
      number: 2,
      description:
        'The trail leads to a wing where hope died. Uncover the story of a tormented patient to find the key forward.',
      flavorText:
        "After escaping the initial horrors, you delve deeper into the asylum's West Wing, a place where hope itself was once a patient.",
    },
    chapter3: {
      title: 'Secrets and Keys',
      number: 3,
      description:
        "Delve into the asylum's administrative heart. Your own patient file contains a terrifying truth.",
      flavorText:
        "The secrets of the West Wing have led you to the asylum's cold, administrative heart. Here, the monsters wear suits, and the truth is the most dangerous weapon of all.",
    },
  },
};

export const theme = 'horror';

export const storyData = {
  chapter1,
  chapter2,
  chapter3,
};

export { characters, items };
