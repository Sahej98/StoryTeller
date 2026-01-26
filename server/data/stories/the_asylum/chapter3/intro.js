import { BGM, SFX } from '../../../audioData.js';
import { BG } from '../backgrounds.js';

export const intro = {
  // ===================================================================
  // DYNAMIC START ROUTER & HUB
  // ===================================================================
  start: {
    speaker: 'Narrator',
    text: '',
    choices: [
      { text: '...', next: 'start_from_A', requires: { flags: ['A_ch2_escaped'] } },
      { text: '...', next: 'start_from_B', requires: { flags: ['B_ch2_escaped'] } },
      { text: '...', next: 'start_from_C', requires: { flags: ['C_ch2_escaped'] } },
      { text: '...', next: 'start_from_D', requires: { flags: ['D_ch2_escaped'] } },
      { text: '...', next: 'start_default' }
    ]
  },
  start_from_A: {
    speaker: 'Narrator',
    text: 'You crawl out of a filthy service hatch, the stench of the morgue clinging to you. You find yourself in the pristine, marbled basement of a new wing. A grand staircase spirals up into the gloom. The contrast is jarring.',
    background: BG.admin_wing,
    choices: [{ text: 'This place is... different.', next: 'hub' }]
  },
  start_from_B: {
    speaker: 'Narrator',
    text: "The projected door solidifies and opens not into freedom, but into another, grander part of the asylum. The air here is cold and still, the architecture stately and oppressive. A grand staircase sweeps upwards.",
    background: BG.admin_wing,
    choices: [{ text: "Out of the frying pan...", next: 'hub' }]
  },
  start_from_C: {
    speaker: 'Narrator',
    text: "The ambulance bay door leads back inside, into a sterile reception area. Polished floors reflect the flickering lights above. This must be the asylum's main administrative building.",
    background: BG.admin_wing,
    choices: [{ text: 'Where the decisions were made.', next: 'hub' }]
  },
  start_from_D: {
    speaker: 'Narrator',
    text: "The service elevator ascends with a smooth hum, opening into a grand, marbled lobby. This is the heart of the asylum's power structure. You can feel the psychic residue of authority and cruelty lingering in the air.",
    background: BG.admin_wing,
    choices: [{ text: 'This is his domain.', next: 'hub' }]
  },
  start_default: {
    speaker: 'Narrator',
    text: "You step into the Central Administration wing. It's deceptively clean, a mausoleum of marble and mahogany under a film of dust. The air is cold, still, and carries the faint, sterile scent of ozone.",
    background: BG.admin_wing,
    bgm: BGM.ambient,
    choices: [{ text: '...', next: 'hub' }]
  },
  hub: {
    speaker: 'Narrator',
    text: 'A grand staircase sweeps upwards towards the Director\'s private quarters. On the ground floor, doors are labeled "Security", "Records", and "Personnel". The oppressive silence is broken only by the hum of the lights. For the first time in a long time, you feel... alone. No monster is chasing you, no immediate threat looms. This is a place of secrets, not terrors.',
    background: BG.admin_wing,
    revisitText: "You're back in the main hall of the Admin wing. Dust motes dance in the sterile air. Security, Records, Personnel... each a path to a different truth, a different escape. The Grand Staircase remains, a silent challenge.",
    effects: { setCheckpoint: true },
    choices: [
      { text: 'Enter the Security Wing', next: 'A_security_entry' },
      { text: 'Enter the Records Wing', next: 'B_records_entry' },
      { text: 'Enter the Personnel Wing', next: 'C_personnel_entry' },
      { text: "Examine the Grand Staircase", next: 'D_staircase_examine' },
    ]
  },
  D_staircase_examine: {
    speaker: "Director's Echo",
    npc: "director_echo",
    text: "'Impatient, are we? The path to true understanding is not so simple. Uncover my secrets, prove your worth... or find another, lesser way out. The choice is yours, Subject 47.' A faint, shimmering barrier blocks the way.",
    background: BG.admin_wing,
    choices: [
      { text: '[ESCAPE ROUTE] Broadcast the Director\'s secrets to challenge him.', next: 'escape_broadcast_route', requires: { inventory: ['elysium_folder'], flags: ['repaired_radio_tower'] } },
      { text: 'I am not yet worthy.', next: 'hub' },
    ]
  },
  // ===================================================================
  // FINAL CLIFFHANGER SEQUENCE
  // ===================================================================
}