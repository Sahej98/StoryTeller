import * as asylumStory from './the_asylum/index.js';
import * as starshipStory from './starship_wanderer/index.js';
import * as fantasyStory from './whispers_of_the_abyss/index.js';

export const stories = {
  the_asylum: {
    id: 'the_asylum',
    title: 'The Asylum',
    description:
      'Awakening in a derelict asylum with no memory, you must uncover the dark secrets of the past to survive the horrors that now roam its halls.',
    ...asylumStory,
  },
  starship_wanderer: {
    id: 'starship_wanderer',
    title: 'Starship Wanderer',
    description:
      'You are the sole survivor aboard the starship "Wanderer." With a damaged AI as your only guide, you must repair the ship before it drifts into a black hole.',
    ...starshipStory,
  },
  whispers_of_the_abyss: {
    id: 'whispers_of_the_abyss',
    title: 'Whispers of the Abyss',
    description:
      'Amnesia-stricken and clad in battered armor, you are a knight lost in a cursed swamp. Guided by a spectral voice, you must confront the encroaching darkness.',
    ...fantasyStory,
  },
};
