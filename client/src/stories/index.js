import * as asylumStory from './the_asylum/index.js';
import * as starshipStory from './starship_wanderer/index.js';
import * as fantasyStory from './whispers_of_the_abyss/index.js';

export const stories = {
  the_asylum: {
    id: 'the_asylum',
    title: 'The Asylum',
    description:
      'Awakening in a derelict asylum with no memory, you must uncover the dark secrets of the past to survive the horrors that now roam its halls.',
    thumbnail:
      'https://images.unsplash.com/photo-1598214105267-144b574a2b3c?q=80&w=1974&auto=format&fit=crop',
    ...asylumStory,
  },
  starship_wanderer: {
    id: 'starship_wanderer',
    title: 'Starship Wanderer',
    description:
      'You are the sole survivor aboard the starship "Wanderer." With a damaged AI as your only guide, you must repair the ship before it drifts into a black hole.',
    thumbnail:
      'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop',
    ...starshipStory,
  },
  whispers_of_the_abyss: {
    id: 'whispers_of_the_abyss',
    title: 'Whispers of the Abyss',
    description:
      'Amnesia-stricken and clad in battered armor, you are a knight lost in a cursed swamp. Guided by a spectral voice, you must confront the encroaching darkness.',
    thumbnail:
      'https://images.unsplash.com/photo-1505228945249-086105758928?q=80&w=2070&auto=format&fit=crop',
    ...fantasyStory,
  },
};
