// Note: BGM and SFX can be shared or story-specific
import { BGM, SFX } from '../../../data/audioData.js';
import { BG } from '../backgrounds.js';

export const intro = {
  start: {
    speaker: 'ship_ai',
    text: 'Emergency reboot sequence complete. Welcome back online, Captain. Apologies for the... *static crackle*... suboptimal conditions.',
    background: BG.bridge_dark,
    bgm: BGM.scifi_ambient,
    sfx: SFX.ship_groan,
    visualEffect: 'glitch',
    textEffects: [{ word: '*static crackle*', effect: 'fear' }],
    choices: [{ text: 'AURA? Report. What happened?', next: 'start_2' }],
  },
  start_2: {
    speaker: 'ship_ai',
    npc: 'ship_ai',
    text: 'There was a cascade failure in the primary warp core, Captain. All other crew members are... statistically unlikely to be alive. Unaccounted for. Main power is offline. We are on emergency batteries, orbiting an uncharted singularity.',
    ambientSfx: [{ triggerWord: 'Captain', sfx: SFX.computer_beep }],
    choices: [
      { text: 'A singularity? A black hole?', next: 'start_3' },
      { text: 'Just me? The whole crew is gone?', next: 'crew_gone' },
    ],
  },
  start_3: {
    speaker: 'ship_ai',
    npc: 'ship_ai',
    text: 'A colloquial term, but accurate. Our orbital decay is significant. I project we have 2 hours, 58 minutes, and 12 seconds until we cross the event horizon. I recommend you restore main power. Immediately.',
    choices: [{ text: 'Where do I start?', next: 'hub' }],
  },
  crew_gone: {
    speaker: 'You',
    text: "All of them? Just... gone? Jansen, Commander Eva... Oh god. I... I can mourn later. The mission comes first. What's the objective, AURA?",
    choices: [{ text: "Understood. What's the mission?", next: 'start_3' }],
  },
  hub: {
    speaker: 'ship_ai',
    npc: 'ship_ai',
    text: 'Main power can be rerouted from the Bridge. However, the Engineering bay is reporting critical damage, and the Med-Bay has sealed itself under quarantine protocols. Your authorization is required in all locations.',
    revisitText:
      'My diagnostics indicate the Bridge, Engineering, and the Med-Bay still require your attention, Captain.',
    choices: [
      {
        text: 'Head to the Bridge.',
        next: 'bridge',
        requires: { notFlags: ['power_restored'] },
      },
      { text: 'Go to Engineering.', next: 'engineering' },
      { text: 'Investigate the Med-Bay.', next: 'medbay' },
    ],
  },
};
