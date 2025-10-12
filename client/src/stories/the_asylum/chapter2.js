import { BGM, SFX } from '../../data/audioData.js';

export const chapter2 = {
  start: {
    speaker: 'Narrator',
    text: "You find yourself at the entrance to the West Wing. The air is colder here, and a sign hangs crookedly, its letters spelling out 'Where Hope Sleeps'. The silence is HEAVY, broken only by the dripping of water somewhere in the darkness. The floor is sticky.",
    background:
      'https://images.unsplash.com/photo-1506102811-232-13a846c4b288?q=80&w=2070&auto=format&fit=crop',
    bgm: BGM.tension,
    textEffects: [{ word: "'Where Hope Sleeps'", effect: 'whisper' }],
    choices: [
      { text: 'Proceed down the main hall', next: 'westWingMainHall' },
      { text: 'Check the first door on the left', next: 'patientRoom201' },
      { text: 'Look for a map or directory', next: 'findDirectory' },
    ],
  },
  findDirectory: {
    speaker: 'Narrator',
    text: 'A grime-covered directory hangs on the wall, shattered as if something was thrown at it. Most of it is unreadable, but you can make out a few locations: Patient Rooms, Recreational Therapy, and... the Morgue, its letters circled in what looks like dried blood.',
    choices: [
      { text: 'Head towards the patient rooms', next: 'westWingMainHall' },
      { text: 'Find the stairs to the Morgue', next: 'morgueStairs' },
    ],
  },
  westWingMainHall: {
    speaker: 'Narrator',
    text: 'The main hall is lined with identical, numbered doors. Scratches mar the walls, deep gouges in the plaster with dark stains beneath them. A wheelchair sits abandoned in the middle of the hall, one wheel slowly spinning with a faint squeak.',
    sfx: SFX.scraping,
    choices: [
      { text: 'Inspect the wheelchair', next: 'inspectWheelchair' },
      { text: 'Try door 204', next: 'door204' },
      { text: 'Continue to the end of the hall', next: 'endOfHall' },
    ],
  },
  inspectWheelchair: {
    speaker: 'Narrator',
    text: "You cautiously approach the wheelchair. Strapped to the seat is a mouldy patient file, its pages warped by moisture. You pick it up; the name reads 'The Watcher'.",
    effects: { inventory: { add: 'patient_file' } },
    choices: [{ text: 'Read the file', next: 'readWatcherFile' }],
  },
  readWatcherFile: {
    speaker: 'Narrator',
    text: "The file describes a patient who clawed out his own eyes, claiming they 'showed him too much'. He became obsessed with 'the girl in the walls', believing she whispered secrets to him. He carved maps of the asylum's hidden passages with his own fingernails to find her. The final entry notes his mysterious disappearance from a locked room.",
    choices: [
      { text: 'The scratches on the walls...', next: 'examineScratches' },
    ],
  },
  examineScratches: {
    speaker: 'Narrator',
    text: "You look at the scratches on the wall again. They aren't random. They form a crude map, a path leading towards the far end of the hall and pointing to a specific spot on the floor. You see flakes of dried blood and fingernail fragments embedded in the plaster.",
    effects: { flags: { set: 'foundWatcherMap' } },
    choices: [{ text: 'Follow the map', next: 'endOfHall' }],
  },
  door204: {
    speaker: 'Narrator',
    text: "You try the handle of room 204. It's locked tight. The foul, cloying smell of rot seeps from underneath.",
    choices: [{ text: 'Move on', next: 'westWingMainHall' }],
  },
  endOfHall: {
    speaker: 'Narrator',
    text: "You reach the end of the hall. It's a dead end, with a large, barred window looking out into the stormy courtyard. There's nothing here but the smell of ozone and decay.",
    choices: [
      {
        text: 'Examine the floor where the map pointed',
        next: 'findLooseBoard',
        requires: { flags: ['foundWatcherMap'] },
      },
      { text: 'Go back', next: 'westWingMainHall' },
    ],
  },
  findLooseBoard: {
    speaker: 'Narrator',
    text: "You kneel down and examine the floorboards. Just as the Watcher's bloody map indicated, one of them is loose. You pry it up with your fingers, getting splinters under your nails.",
    sfx: SFX.floorCreak,
    choices: [{ text: 'Look inside', next: 'underTheBoard' }],
  },
  underTheBoard: {
    speaker: 'Narrator',
    text: "Under the floorboard, you find a heavy, ornate key with a 'W' engraved on it, wrapped in a blood-stiffened rag. It's cold to the touch. This must be the main key for this wing.",
    effects: { inventory: { add: 'west_wing_key' } },
    choices: [{ text: 'Take the key and find the exit', next: 'westWingExit' }],
  },
  westWingExit: {
    speaker: 'Narrator',
    text: "At the opposite end of the hall from where you entered is a heavy set of double doors marked 'Central Administration'. There's a large, ornate lock.",
    choices: [
      {
        text: 'Use the West Wing Key',
        next: { chapter: 'chapter3', key: 'start' },
        requires: { inventory: ['west_wing_key'] },
      },
    ],
  },
  morgueStairs: {
    speaker: 'Narrator',
    text: 'You find a stairwell leading down into chilling darkness. A sign, flecked with what looks like dried blood, confirms this is the way to the Morgue. The air is rank with the smell of formaldehyde and rot.',
    bgm: BGM.descent,
    choices: [
      { text: 'Descend into the Morgue', next: 'morgueEntrance' },
      { text: 'This is a bad idea. Go back.', next: 'start' },
    ],
    effects: { stats: { sanity: -10 } },
  },
  morgueEntrance: {
    speaker: 'Narrator',
    text: 'The morgue is a sterile, tiled room. The grout between the tiles is stained red. Several refrigerated lockers line one wall, one of them slightly ajar. A single slab in the center of the room is occupied by a form covered in a sheet.',
    background:
      'https://images.unsplash.com/photo-1615413722218-3920a8d6a?q=80&w=2062&auto=format&fit=crop',
    choices: [
      { text: 'Pull back the sheet', next: 'pullSheet' },
      { text: 'Check the ajar locker', next: 'checkLockers' },
    ],
    effects: { stats: { sanity: -15 } },
  },
  pullSheet: {
    speaker: 'Narrator',
    text: "You hesitate, then pull back the sheet. It's the body of a security guard, his eyes and mouth stitched shut with coarse black thread. His chest is a ruined cavity, and clutched in his hand is an ornate key. As you watch, his remaining fingers twitch.",
    jumpscare: true,
    sfx: SFX.gore,
    textEffects: [{ word: 'stitched shut', effect: 'red' }],
    choices: [{ text: 'Pry the key from his hand', next: 'getKeyFromCorpse' }],
  },
  getKeyFromCorpse: {
    speaker: 'Narrator',
    text: "You fight back revulsion and pry the key from his cold, stiff fingers. It makes a dry, snapping sound. As you take it, the corpse's head lolls to the side to face you, and a muffled SCREAM comes from behind the stitches.",
    sfx: SFX.boneSnap,
    effects: { inventory: { add: 'west_wing_key' }, stats: { sanity: -25 } },
    choices: [{ text: 'GET OUT OF HERE', next: 'westWingExit' }],
  },
  checkLockers: {
    speaker: 'Narrator',
    text: "You pull open the ajar locker. It's empty, save for a collection of human teeth arranged on the metal shelf to spell out the word: 'LIAR'.",
    sfx: SFX.doorCreak,
    textEffects: [{ word: "'LIAR'", effect: 'red' }],
    choices: [{ text: 'Go back to the main slab', next: 'pullSheet' }],
  },
};
