import { BG } from '../backgrounds.js';
import { SFX, BGM } from '../../../data/audioData.js';

export const pathB = {
  engineering: {
    speaker: 'Narrator',
    text: 'The door to Engineering is buckled and fused shut from some IMMENSE heat. A nearby corpse, barely recognizable as an engineer, clutches a datapad.',
    textEffects: [{ word: 'IMMENSE', effect: 'shock' }],
    choices: [
      { text: 'Take the datapad.', next: 'engineering_datapad' },
      { text: 'Find a way to open the door.', next: 'engineering_door' },
      { text: 'Go back.', next: 'hub' },
    ],
  },
  engineering_datapad: {
    speaker: 'You',
    text: "You pry the datapad from the corpse's hands. The screen flickers to life with a final log entry.",
    effects: { inventory: { add: 'datapad' } },
    choices: [{ text: 'This might explain things.', next: 'engineering' }],
  },
  engineering_door: {
    speaker: 'You',
    text: "This door isn't budging. I'll need something powerful to cut through it.",
    choices: [
      {
        text: 'Use the plasma cutter.',
        next: 'engineering_enter',
        requires: { inventory: ['plasma_cutter'] },
      },
      { text: 'I need to find a cutter.', next: 'hub' },
    ],
  },
  engineering_enter: {
    speaker: 'Narrator',
    text: 'The plasma cutter slices through the damaged door with a hiss of superheated metal. Inside, the main drive is exposed, arcing with dangerous energy. A coolant valve is flashing red.',
    sfx: SFX.plasma_cutter,
    background: BG.engineering,
    choices: [{ text: 'Attempt to reset the valve.', next: 'fix_drive' }],
  },
  fix_drive: {
    speaker: 'ship_ai',
    npc: 'ship_ai',
    text: 'Captain, resetting that valve while the core is active is... extremely dangerous. However, given our proximity to the event horizon, it is also our only option.',
    textEffects: [{ word: 'extremely dangerous', effect: 'fear' }],
    choices: [
      {
        text: 'Do it. (Requires main power to be on)',
        next: 'win_game',
        requires: { flags: ['power_restored'] },
      },
      {
        text: 'I need to restore main power from the Bridge first.',
        next: 'hub',
      },
    ],
  },
  win_game: {
    speaker: 'ship_ai',
    npc: 'ship_ai',
    text: 'Valve reset. Drive is stabilizing. Main power is holding. Captain... you did it. Plotting a course away from the singularity. We are... safe. For now. Congratulations. You have defied the odds.',
    bgm: BGM.ambient,
    choices: [{ text: 'To be continued...', next: null }],
  },
};
