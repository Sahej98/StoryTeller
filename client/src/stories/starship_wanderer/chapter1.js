// Note: BGM and SFX can be shared or story-specific
import { BGM, SFX } from '../../data/audioData.js';
import { BG } from './backgrounds.js';

export const chapter1 = {
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
  medbay: {
    speaker: 'ship_ai',
    npc: 'ship_ai',
    text: "The Med-Bay is sealed. Biohazard protocol initiated by the ship's doctor before... she was lost. I can override the seal, but I will need you to find me a plasma cutter from the storage bay to access the spare fusion core.",
    choices: [
      { text: 'Go to the storage bay to find a cutter.', next: 'storage_bay' },
      { text: 'Go back.', next: 'hub' },
    ],
  },
  storage_bay: {
    speaker: 'Narrator',
    text: 'The storage bay is a mess of spilled containers and floating debris. You find an emergency locker containing a plasma cutter.',
    effects: { inventory: { add: 'plasma_cutter' } },
    choices: [
      {
        text: 'Take the cutter and return to the Med-Bay.',
        next: 'medbay_open',
      },
    ],
  },
  medbay_open: {
    speaker: 'Narrator',
    text: "With a high-pitched hiss, the plasma cutter slices through the Med-Bay's emergency housing. You retrieve the stabilized fusion core.",
    sfx: SFX.plasma_cutter,
    effects: { inventory: { add: 'fusion_core' } },
    choices: [{ text: 'Now, to the Bridge.', next: 'hub' }],
  },
  win_game: {
    speaker: 'ship_ai',
    npc: 'ship_ai',
    text: 'Valve reset. Drive is stabilizing. Main power is holding. Captain... you did it. Plotting a course away from the singularity. We are... safe. For now. Congratulations. You have defied the odds.',
    bgm: BGM.ambient,
    choices: [{ text: 'To be continued...', next: null }],
  },
};
