import { SFX } from '../../../data/audioData.js';

export const pathC = {
  medbay: {
      speaker: 'ship_ai',
      npc: 'ship_ai',
      text: "The Med-Bay is sealed. Biohazard protocol initiated by the ship's doctor before... she was lost. I can override the seal, but I will need you to find me a plasma cutter from the storage bay to access the spare fusion core.",
      choices: [
          {text: 'Go to the storage bay to find a cutter.', next: 'storage_bay'},
          {text: 'Go back.', next: 'hub'}
      ]
  },
  storage_bay: {
      speaker: 'Narrator',
      text: 'The storage bay is a mess of spilled containers and floating debris. You find an emergency locker containing a plasma cutter.',
      effects: {inventory: {add: 'plasma_cutter'}},
      choices: [
          {text: 'Take the cutter and return to the Med-Bay.', next: 'medbay_open'},
      ]
  },
  medbay_open: {
      speaker: 'Narrator',
      text: 'With a high-pitched hiss, the plasma cutter slices through the Med-Bay\'s emergency housing. You retrieve the stabilized fusion core.',
      sfx: SFX.plasma_cutter,
      effects: {inventory: {add: 'fusion_core'}},
      choices: [
          {text: 'Now, to the Bridge.', next: 'hub'}
      ]
  },
};