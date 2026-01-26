import { BGM, SFX } from '../../../audioData.js';
import { BG } from '../backgrounds.js';

export const pathB = {
  // ===================================================================
  // PATH B: RECORDS WING
  // ===================================================================
  B_records_entry: {
    speaker: 'Narrator',
    text: 'You enter a vast, circular library choked with filing cabinets and shelves groaning under the weight of countless patient records. Dust motes dance in the single beam of light from above.',
    background: BG.records_room,
    bgm: BGM.softHaunt,
    choices: [{ text: 'The history of this place is buried here.', next: 'B_records_hub' }]
  },

  B_records_hub: {
    speaker: 'Archivist\'s Sorrow',
    npc: 'Archivist\'s Sorrow',
    text: 'A translucent, weeping figure of a woman sorts endlessly through a pile of files. "Misplaced... all misplaced. He took my name, then he took my purpose. I can\'t remember... I can\'t file it away without my things."',
    visualEffect: 'glitch',
    effects: { stats: { sanity: -5 } },
    revisitText: '"Still here? The files are still out of order. I need my things to remember. My pen, my flower, my notice..."',
    choices: [
      { text: 'Explore the archive for her belongings.', next: 'B_explore_archives' },
      { text: 'Give her the items.', next: 'B_give_items', requires: { inventory: ['fountain_pen', 'pressed_flower', 'termination_notice'] } },
      { text: 'Return to the main hall.', next: 'hub' }
    ]
  },

  B_explore_archives: {
    speaker: 'Narrator',
    text: 'The archives are a maze of paper and sorrow. You can check the microfilm station, the pneumatic tube room, or the intake desk.',
    background: BG.records_room,
    choices: [
      { text: 'Go to the Microfilm Station.', next: 'B_microfilm' },
      { text: 'Go to the Pneumatic Tube Room.', next: 'B_tubes' },
      { text: 'Go to the Intake Desk.', next: 'B_intake' },
      { text: 'Return to the Archivist.', next: 'B_records_hub' }
    ]
  },

  B_microfilm: {
    speaker: 'Narrator',
    text: 'A dusty microfilm reader sits on a desk. On the floor beside it is a beautiful, old fountain pen, its nib slightly bent.',
    background: BG.records_room,
    effects: { inventory: { add: 'fountain_pen' } },
    choices: [{ text: 'Take the pen.', next: 'B_explore_archives' }]
  },

  B_tubes: {
    speaker: 'Narrator',
    text: 'A complex network of brass pneumatic tubes covers one wall. A single capsule is stuck in one of the tubes. Inside, you can see a pressed flower.',
    background: BG.records_room,
    choices: [
      { text: 'Try to get the capsule.', next: 'B_get_capsule' },
      { text: 'Leave it.', next: 'B_explore_archives' }
    ]
  },
  B_get_capsule: {
    speaker: 'Narrator',
    text: 'You manage to pry open a panel and retrieve the capsule. Inside is a single, perfectly preserved pressed flower, used as a bookmark.',
    effects: { inventory: { add: 'pressed_flower' } },
    choices: [{ text: 'Take the flower.', next: 'B_explore_archives' }]
  },

  B_intake: {
    speaker: 'Narrator',
    text: 'This is where new patients were processed. A clipboard hangs on the wall. Pinned to it is a formal, crinkled termination notice for the Head Archivist, citing "emotional instability".',
    background: BG.records_room,
    effects: { inventory: { add: 'termination_notice' } },
    choices: [{ text: 'Take the notice.', next: 'B_explore_archives' }]
  },

  B_give_items: {
    speaker: 'Archivist\'s Sorrow',
    npc: 'Archivist\'s Sorrow',
    text: 'You hand her the items. She touches each one, her form solidifying. "My pen... my bookmark... my end. I remember. He fired me because I knew. I knew what he was doing to the children. To Lily. To... you."',
    effects: { inventory: { remove: ['fountain_pen', 'pressed_flower', 'termination_notice'] } },
    choices: [{ text: 'To me?', next: 'B_revelation' }]
  },

  B_revelation: {
    speaker: 'Archivist\'s Sorrow',
    npc: 'Archivist\'s Sorrow',
    text: 'Her sad eyes meet yours. "He was so proud of you. His greatest success. Subject 47. The file is in the secure vault. Project... Elysium." She points to a heavy vault door at the back of the room.',
    choices: [{ text: 'Open the vault.', next: 'B_vault' }]
  },

  B_vault: {
    speaker: 'Narrator',
    text: 'The vault door groans open. Inside, there is only one file, sitting on a pedestal under a single light. It is labeled: "ELYSIUM - SUBJECT 47".',
    background: BG.records_room,
    sfx: SFX.secretDoor,
    choices: [{ text: 'Take your file.', next: 'B_take_file' }]
  },

  B_take_file: {
    speaker: 'Narrator',
    text: "You take the file. Your hands tremble as you open it. Inside are drawings of your own skull, notes on your psychological conditioning, and a final, chilling entry: 'Subject 47 is the perfect vessel. We must use them to anchor LILY's fractured mind.'",
    sfx: SFX.paperRustle,
    effects: { inventory: { add: 'elysium_folder' }, flags: { set: 'B_completed' }, stats: { sanity: -25 } },
    choices: [{ text: 'This... this is me.', next: 'B_escape_records' }]
  },

  B_escape_records: {
    speaker: 'Archivist\'s Sorrow',
    npc: 'Archivist\'s Sorrow',
    text: '"Go," she whispers, her form fading. "Use his pride against him. The truth is your weapon now." She gestures to a hidden door behind a bookshelf, leading back to the main hall.',
    choices: [{ text: 'Thank you.', next: 'hub' }]
  },
};
