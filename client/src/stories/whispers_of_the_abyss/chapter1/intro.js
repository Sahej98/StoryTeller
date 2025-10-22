import { BGM } from '../../../data/audioData.js';
import { BG } from '../backgrounds.js';

export const intro = {
  start: {
    speaker: 'Narrator',
    text: "You awaken with a gasp, black mud filling your mouth. The air is thick, heavy with the stench of decay and stagnant water. Gnarled, weeping trees claw at a bruised twilight sky. You don't know who you are, or how you got here.",
    background: BG.swamp_start,
    bgm: BGM.fantasy_ambient,
    choices: [{ text: 'Push yourself up from the mud.', next: 'start_2' }],
  },
  start_2: {
    speaker: 'Lyra',
    npc: 'lyra',
    text: "Well, look what the swamp dredged up. Another lost soul. Or are you just lost? The armor's a bit much for a casual stroll. Don't bother trying to remember your name. The Abyss steals them first.",
    textEffects: [{ word: 'steals', effect: 'fear' }],
    choices: [
      { text: 'Who... what are you?', next: 'start_3' },
      { text: 'The Abyss? Where am I?', next: 'start_4' },
    ],
  },
  start_3: {
    speaker: 'You',
    text: 'A ghost? A spirit? Your voice is... in my head. Are you real?',
    choices: [{ text: '...', next: 'start_5' }],
  },
  start_4: {
    speaker: 'You',
    text: "What is this place? The Abyss? I don't understand.",
    choices: [{ text: '...', next: 'start_5' }],
  },
  start_5: {
    speaker: 'Lyra',
    npc: 'lyra',
    text: "Oh, I'm as real as the mud on your face, tin can. Let's just say I'm a... long-term resident. This place, the Shadowfen, is bleeding into your world because its heart is sick. And you, my forgotten knight, are the first interesting thing to happen in a century.",
    choices: [{ text: 'What do you want from me?', next: 'hub' }],
  },
  hub: {
    speaker: 'Lyra',
    npc: 'lyra',
    bgm: BGM.fantasy_ambient,
    text: "The path ahead splits. To the left, the whispers are stronger... angrier. To the right, something glitters in the muck. The choice, as they say, is yours. Try not to die immediately; it's dreadfully boring.",
    revisitText:
      "Still dithering? The Abyss isn't known for its patience. Left is spooky, right is shiny. Pick one.",
    choices: [
      { text: 'Follow the angry whispers to the left.', next: 'left_path' },
      {
        text: 'Investigate the glittering object to the right.',
        next: 'right_path',
      },
    ],
  },
};
