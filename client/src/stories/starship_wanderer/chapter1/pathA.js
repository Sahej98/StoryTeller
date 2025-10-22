import { BG } from '../backgrounds.js';
import { SFX } from '../../../data/audioData.js';

export const pathA = {
  bridge: {
    speaker: 'You',
    text: 'The Bridge is eerily silent, a tomb adrift in the cosmos. Consoles are dark, save for a single, blinking red light on the main command console, a lone frantic heartbeat.',
    background: BG.bridge_power,
    choices: [
      { text: 'Access the command console.', next: 'bridge_console' },
      { text: 'Go back.', next: 'hub' },
    ],
  },
  bridge_console: {
    speaker: 'ship_ai',
    npc: 'ship_ai',
    text: 'This is the main power routing terminal. To reactivate the ship, you must provide a stabilized fusion core. I detect a spare in the Med-Bay, but it is under quarantine lockdown.',
    choices: [
      {
        text: 'Use the fusion core.',
        next: 'bridge_power_on',
        requires: { inventory: ['fusion_core'] },
      },
      { text: 'I need to get that core from the Med-Bay.', next: 'hub' },
    ],
  },
  bridge_power_on: {
    speaker: 'ship_ai',
    npc: 'ship_ai',
    text: 'Core accepted. Rerouting main power... Systems coming online. Warning: CRITICAL damage detected in main drive. Auto-repair functions are insufficient. Manual repairs are required in Engineering.',
    sfx: SFX.power_up,
    textEffects: [{ word: 'CRITICAL', effect: 'anger' }],
    effects: { flags: { set: 'power_restored' } },
    choices: [{ text: "Of course it's not that easy. Damn it.", next: 'hub' }],
  },
};
