import { BGM, SFX } from '../../../data/audioData.js';
import { BG } from '../backgrounds.js';

export const pathA = {
  // ===================================================================
  // PATH A: SECURITY WING
  // ===================================================================
  A_security_entry: {
    speaker: 'Narrator',
    text: 'You push open the heavy oak doors labeled "Security". The air is cold and smells of ozone and stale cigar smoke. Cameras on the ceiling track your every move with an audible whir.',
    background: BG.security_office,
    bgm: BGM.tension,
    choices: [{ text: 'This place gives me the creeps.', next: 'A_security_hub' }]
  },

  A_security_hub: {
    speaker: 'Narrator',
    text: 'You\'re in the main security nexus. A bank of monitors shows static-filled feeds of the asylum. A door to the Chief\'s Office is sealed with a keycard reader. Another leads to the Holding Cells. The Armory is locked with a heavy chain.',
    background: BG.security_office,
    revisitText: 'The security nexus. The monitors hum with silent judgment. The Chief\'s Office, Holding Cells, and Armory remain.',
    choices: [
      { text: 'Examine the monitors.', next: 'A_monitors' },
      { text: 'Try the Chief\'s Office.', next: 'A_chiefs_office_door' },
      { text: 'Go to the Holding Cells.', next: 'A_holding_cells' },
      { text: 'Check the Armory.', next: 'A_armory' },
      { text: 'Return to the main hall.', next: 'hub' }
    ]
  },

  A_monitors: {
    speaker: 'Echo of Barlowe',
    npc: 'Echo of Barlowe',
    text: 'As you approach the monitors, a shimmering, spectral figure of a man in a security chief\'s uniform appears, pointing at the screens. "See? They\'re everywhere! In the walls! Listening! Can\'t trust anyone. Especially not Finch. Never Finch."',
    visualEffect: 'glitch',
    sfx: SFX.static,
    effects: { stats: { sanity: -5 } },
    choices: [{ text: 'His paranoia is... tangible.', next: 'A_monitors_2' }]
  },
  A_monitors_2: {
    speaker: 'Narrator',
    text: 'One monitor flickers to life, showing the Chief\'s office. The ghost paces, then types a password into his computer: ELYSIUM. He vanishes. On a desk, you see a small fuse box with a single fuse missing.',
    background: BG.security_office,
    effects: { flags: { set: 'knows_barlowe_password' } },
    choices: [{ text: 'Elysium... that password seems important.', next: 'A_security_hub' }]
  },

  A_chiefs_office_door: {
    speaker: 'Narrator',
    text: 'The door requires a keycard and a password.',
    background: BG.security_office,
    choices: [
      { text: 'Use the keycard and password.', next: 'A_chiefs_office_entry', requires: { inventory: ['chiefs_keycard'], flags: ['knows_barlowe_password'] } },
      { text: 'I\'m missing something.', next: 'A_security_hub' }
    ]
  },

  A_holding_cells: {
    speaker: 'Narrator',
    text: 'A grim row of cells. Most are empty, but the last one is different. The walls are covered in frantic scratch marks, all depicting a single, terrified eye.',
    background: BG.security_office, // Placeholder
    choices: [{ text: 'Check the cell.', next: 'A_holding_cells_2' }]
  },
  A_holding_cells_2: {
    speaker: 'Narrator',
    text: 'Under a cot, you find a corroded keycard belonging to Chief Barlowe and a flask of cheap whiskey.',
    background: BG.security_office, // Placeholder
    effects: { inventory: { add: ['chiefs_keycard', 'flask_of_whiskey'] } },
    choices: [{ text: 'This is what I need.', next: 'A_security_hub' }]
  },

  A_armory: {
    speaker: 'Narrator',
    text: 'A heavy chain secures the armory gate. You\'ll need bolt cutters for this.',
    background: BG.security_office,
    choices: [
      { text: 'Use the bolt cutters.', next: 'A_armory_entry', requires: { inventory: ['bolt_cutters'] } },
      { text: 'I need to find some cutters.', next: 'A_security_hub' }
    ]
  },
  A_armory_entry: {
    speaker: 'Narrator',
    text: 'The bolt cutters snap the chain. Inside, you find a sturdy flashlight and a single electrical fuse.',
    sfx: SFX.scraping,
    effects: { inventory: { add: ['sturdy_flashlight', 'fuse'] } },
    choices: [{ text: 'More tools for the collection.', next: 'A_security_hub' }]
  },

  A_chiefs_office_entry: {
    speaker: 'Narrator',
    text: 'You enter Barlowe\'s office. It\'s obsessively neat. A large safe sits behind the desk. A framed photo on the desk shows Barlowe proudly shaking hands with the Director.',
    background: BG.directors_study,
    sfx: SFX.unlock,
    choices: [{ text: 'Examine the safe.', next: 'A_safe' }]
  },
  A_safe: {
    speaker: 'Narrator',
    text: 'The safe has a simple four-digit lock. A small plaque is inscribed on it: "My most trusted man\'s badge number."',
    background: BG.directors_study,
    choices: [
      { text: 'I need to find his badge number.', next: 'A_chiefs_office_entry' },
      // Logic for finding the badge number would go in another wing
    ]
  },

  A_escape_security: {
    speaker: 'Narrator',
    text: 'This is a placeholder for a direct escape from the security wing, leading to the end of the chapter.',
    choices: [{ text: 'Escape.', next: 'end_chapter_early' }]
  },
};
