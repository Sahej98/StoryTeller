import { BGM, SFX } from '../../data/audioData.js';

export const chapter3 = {
  start: {
    speaker: 'Narrator',
    text: "You unlock the heavy doors and step into the Central Administration wing. It's deceptively clean compared to the rest of the asylum. A grand staircase sweeps upwards, and doors lead to records, security, and the Director's office.",
    background:
      'https://images.unsplash.com/photo-1549488344-cbb6c144eda4?q=80&w=2070&auto=format&fit=crop',
    bgm: BGM.ambient,
    choices: [
      { text: 'Go to the Security Office', next: 'securityOffice' },
      { text: 'Head to the Records Room', next: 'recordsRoom' },
      {
        text: "Climb the stairs to the Director's Office",
        next: 'directorsOfficeDoor',
      },
    ],
  },
  securityOffice: {
    speaker: 'Narrator',
    text: 'The security office is a mess of smashed monitors and broken equipment. A single monitor still glows, showing a grid of static-filled camera feeds that occasionally flash with a single, terrified eye. A panel on the wall is open, a key fuse missing from its socket.',
    sfx: SFX.static,
    choices: [
      {
        text: 'Try to fix the fuse box',
        next: 'fuseBox',
        requires: { inventory: ['fuse'] },
      },
      { text: 'Search the desks', next: 'searchSecurityDesks' },
      { text: 'Leave', next: 'start' },
    ],
  },
  searchSecurityDesks: {
    speaker: 'Narrator',
    text: "You rummage through the desks. Beneath a pile of logbooks, you find a note scrawled on a napkin: 'DAMN generator keeps blowing the fuse. He's trying to keep us out. Code for the records safe is the year he published that damn book.' The ink is smeared, as if the writer was shaking.",
    textEffects: [{ word: 'DAMN', effect: 'shake' }],
    choices: [
      { text: 'What book?', next: 'securityOffice' },
      { text: 'Leave and go to the records room', next: 'recordsRoom' },
    ],
  },
  fuseBox: {
    speaker: 'Narrator',
    text: 'You slot the glass fuse into the empty socket. With a crackle of electricity, the monitors flicker to life. Most cameras are broken, but one shows a clear image of the Director’s office upstairs. You see a shadowy figure sitting in the chair, UNMOVING. Another camera flashes for a second, showing something huge and pale crawling on the ceiling of a hallway.',
    sfx: SFX.electric,
    jumpscare: true,
    effects: { flags: { set: 'powerRestored' }, stats: { sanity: -5 } },
    choices: [
      { text: 'Who is that in the chair?', next: 'directorsOfficeDoor' },
      { text: 'Shut it down and leave', next: 'start' },
    ],
  },
  recordsRoom: {
    speaker: 'Narrator',
    text: 'The records room is filled with shelves of patient files, stretching up into the darkness. The air is thick with the smell of dust and decaying paper. In the center of the room is a heavy metal safe.',
    background:
      'https://images.unsplash.com/photo-1580492518864-4c127425974b?q=80&w=1974&auto=format&fit=crop',
    sfx: SFX.paperRustle,
    choices: [
      { text: 'Search the files', next: 'searchFiles' },
      { text: 'Examine the safe', next: 'examineSafe' },
      { text: 'Leave', next: 'start' },
    ],
  },
  searchFiles: {
    speaker: 'Narrator',
    text: "You pull out a file marked with your number: 47. The details are CHILLING. 'Subject displays unprecedented psychic potential. A perfect VESSEL for the Elysium anchor. Procedure requires repeated cerebral boring to install psychic conduits. Subject's screaming is... problematic.' Tucked inside is a small glass fuse.",
    textEffects: [
      { word: 'CHILLING', effect: 'shake' },
      { word: 'VESSEL', effect: 'red' },
      { word: 'cerebral boring', effect: 'red' },
    ],
    effects: {
      inventory: { add: ['elysium_folder', 'fuse'] },
      stats: { sanity: -15 },
    },
    choices: [
      { text: 'Take the fuse and get out', next: 'recordsRoom' },
      { text: 'Force yourself to keep reading', next: 'searchFilesMore' },
    ],
  },
  searchFilesMore: {
    speaker: 'Narrator',
    text: "Another page: 'Pain response seems to amplify the psychic output. Recommending withdrawal of all sedatives for the next session. We need to see how far we can push the vessel before it breaks.' You slam the folder shut, your hands shaking.",
    choices: [{ text: "That's enough. Leave.", next: 'recordsRoom' }],
    effects: { stats: { sanity: -10 } },
  },
  examineSafe: {
    speaker: 'Narrator',
    text: "It's a standard combination safe. A plaque on the wall shows a picture of the asylum's founder, Dr. Alistair Finch, with a caption: 'Author of The Empty Man, 1984'.",
    choices: [
      { text: 'Enter code 1984', next: 'openSafe' },
      { text: 'Leave it', next: 'recordsRoom' },
    ],
  },
  openSafe: {
    speaker: 'Narrator',
    text: 'The code works. The heavy door swings open, revealing a single, pristine keycard with "DIRECTOR" printed on it.',
    sfx: SFX.unlock,
    effects: { inventory: { add: 'keycard' } },
    choices: [{ text: 'Take the keycard', next: 'recordsRoom' }],
  },
  directorsOfficeDoor: {
    speaker: 'Narrator',
    text: "You climb the grand staircase. The air grows heavy and cold. At the top is a single, imposing oak door with a brass plaque: 'Dr. A. Finch, Director'. There is a keycard slot next to the handle.",
    choices: [
      {
        text: 'Use the Director keycard',
        next: { chapter: 'chapter4', key: 'start' },
        requires: { inventory: ['keycard'] },
      },
      { text: 'Knock on the door', next: 'knockDirectorsDoor' },
      { text: 'Go back downstairs', next: 'start' },
    ],
  },
  knockDirectorsDoor: {
    speaker: 'Narrator',
    text: "You knock. There's no response. If someone is in there, they don't want to be disturbed. Or perhaps they CAN'T answer. You hear a faint, wet dragging sound from inside.",
    sfx: SFX.gore,
    choices: [{ text: 'Go back downstairs', next: 'start' }],
  },
};
