import * as asylumStory from './the_asylum/index.js';

export const stories = {
  the_asylum: {
    id: 'the_asylum',
    title: 'The Asylum',
    description:
      'Awakening in a derelict asylum with no memory, you must uncover the dark secrets of the past to survive the horrors that now roam its halls.',
    thumbnail:
      '/images/the_asylum/the_asylum_book_cover.png',
    ...asylumStory,
  },
};
