import { BGM, SFX } from '../../data/audioData.js';

export const chapter4 = {
  start: {
    speaker: 'Narrator',
    text: "The keycard grants you access. You push the heavy oak door open and step into Dr. Finch's office. It's a large, opulent room, dominated by a huge mahogany desk. The air is thick with the scent of old books and fresh blood.",
    background:
      'https://images.unsplash.com/photo-1618001408542-a36363574636?q=80&w=1964&auto=format&fit=crop',
    bgm: BGM.ambient,
    choices: [
      { text: 'Approach the desk', next: 'approachDesk' },
      { text: 'Examine the bookshelves', next: 'examineBookshelves' },
      { text: 'Look out the large window', next: 'lookOutWindow' },
    ],
  },
  examineBookshelves: {
    speaker: 'Narrator',
    text: 'The shelves are filled with medical texts and strange, leather-bound tomes on occultism. One book is pulled out slightly. Its title is "On the Transference of Consciousness".',
    choices: [
      { text: 'Pull the book', next: 'pullBook' },
      { text: 'Leave it and check the desk', next: 'approachDesk' },
    ],
  },
  pullBook: {
    speaker: 'Narrator',
    text: "You pull the book. It's not a book, but a lever. With a grinding sound, a section of the bookshelf swings inward, revealing a hidden, dark passage reeking of formaldehyde.",
    sfx: SFX.secretDoor,
    choices: [
      { text: 'Enter the secret passage', next: 'secretPassage' },
      { text: 'Ignore it for now', next: 'approachDesk' },
    ],
  },
  secretPassage: {
    speaker: 'Narrator',
    text: 'The passage leads to a small, private observation room overlooking a surgical theater below. Instruments stained with old blood lie on trays next to restraints and a wicked-looking cranial drill. You realize this is where Finch watched his torturous experiments.',
    background:
      'https://images.unsplash.com/photo-1518291341432-864f25858973?q=80&w=1974&auto=format&fit=crop',
    effects: { stats: { sanity: -20 } },
    choices: [{ text: 'Return to the office', next: 'start' }],
  },
  lookOutWindow: {
    speaker: 'Narrator',
    text: "The large window behind the desk offers a panoramic view of the asylum grounds and the raging storm. In a flash of lightning, you see the small figure from the courtyard again, this time standing RIGHT BELOW THE WINDOW, looking up at YOU. It raises a hand and writes 'LIAR' backwards on the glass in blood.",
    sfx: SFX.thunder,
    jumpscare: true,
    effects: { stats: { sanity: -15 } },
    choices: [{ text: 'Step back from the window', next: 'start' }],
  },
  approachDesk: {
    speaker: 'Narrator',
    npc: 'doctor',
    text: "A figure sits in the high-backed leather chair, facing the window. As you get closer, you see it's Dr. Finch himself. He's unnaturally still. A silver letter opener is driven to the hilt in his chest, and a dark, coagulated stain is spreading across his white shirt.",
    choices: [
      { text: 'Check if he is alive', next: 'checkFinch' },
      { text: 'Search the desk', next: 'searchDesk' },
    ],
  },
  checkFinch: {
    speaker: 'Narrator',
    npc: 'doctor',
    text: "You reach out and touch his shoulder. His body slumps forward, revealing a face locked in an expression of PURE TERROR, his eyes wide and bloody. He's been dead for some time. A leather-bound diary is clutched in his hand.",
    textEffects: [{ word: 'PURE TERROR', effect: 'shake' }],
    choices: [
      { text: 'Pry the diary from his cold, dead fingers', next: 'takeDiary' },
      { text: 'Leave him and search the desk', next: 'searchDesk' },
    ],
  },
  takeDiary: {
    speaker: 'Narrator',
    text: 'His fingers are stiff with rigor mortis. You have to break one to get the diary free. The sound of it SNAPPING echoes in the silent room.',
    sfx: SFX.boneSnap,
    effects: { inventory: { add: 'finch_diary' }, stats: { sanity: -5 } },
    choices: [{ text: 'Read the final entry', next: 'readDiary' }],
  },
  readDiary: {
    speaker: 'Narrator',
    text: "It reads: 'Lily is gone. Her consciousness fractured. I tried to anchor it in 47, a human key, but it was incomplete. Now her psychic echo haunts this place, a ghost in the machine I built. She cannot leave. And as long as she is here, neither can I. 47 is the only one who can either fix her or destroy what's left. I must see which...'",
    choices: [{ text: 'A ghost... Lily...', next: 'lilyAppears' }],
  },
  searchDesk: {
    speaker: 'Narrator',
    text: 'On the desk, amidst scattered papers soaked in blood, is an active audio recorder. A single red light blinks, indicating it is still recording.',
    choices: [
      { text: 'Play the recording', next: 'playRecording' },
      { text: 'Check his body first', next: 'checkFinch' },
    ],
  },
  playRecording: {
    speaker: 'Dr. Finch',
    text: "(STATIC)...It's me. She found me. I don't know how she got out of the tank, but she's HERE. She's so ANGRY. OH GOD, LILY, I'M SORRY... (A child's giggle, then a wet, tearing sound, a sickening crunch, and a final, choked gasp).",
    sfx: SFX.static,
    textEffects: [
      { word: 'HERE', effect: 'shake' },
      { word: 'ANGRY', effect: 'red' },
      { word: 'OH GOD', effect: 'shake' },
      { word: 'tearing sound', effect: 'red' },
    ],
    ambientSfx: [
      { triggerWord: 'giggle', sfx: SFX.childLaughter },
      { triggerWord: 'tearing sound', sfx: SFX.fleshTear },
      { triggerWord: 'crunch', sfx: SFX.boneSnap },
    ],
    effects: { stats: { sanity: -30 } },
    choices: [{ text: 'Who is Lily?', next: 'lilyAppears' }],
  },
  lilyAppears: {
    speaker: 'Lily',
    npc: 'ghost',
    text: "The room temperature plummets. The ghost of the little girl, Lily, flickers into existence behind Finch's chair. Her white dress is stained with blood. 'He was a bad man,' she whispers, her eyes sad. 'He broke his toys. Now, it's your turn. Will you help me be whole again? Or will you try to run, just like he did?'",
    bgm: BGM.softHaunt,
    textEffects: [
      { word: "'He was a bad man,'", effect: 'whisper' },
      { word: "'He broke his toys.'", effect: 'whisper' },
    ],
    choices: [
      { text: 'I will help you.', next: 'end_help' },
      { text: 'What do you want from me?', next: 'end_question' },
      { text: 'You murdered him!', next: 'end_accuse' },
    ],
  },
  end_help: {
    speaker: 'Narrator',
    text: "A faint smile touches her lips. 'My memories are scattered across this place, locked in pain. Find them. Bring them to me in the old Chapel. Then we can leave together.' Her form dissolves, leaving you alone with the dead man and a terrible choice.",
    choices: [
      { text: 'To be continued...', next: null }, // End of current content
    ],
  },
  end_question: {
    speaker: 'Lily',
    text: "'I want what he stole from me! MY MIND! MY LIFE!' she SHRIEKS, the windows rattling in their frames. Finch's corpse convulses on the desk. 'Find my memories. Bring them to the Chapel. Or I'll take YOURS instead!' She vanishes, leaving only a chilling echo.",
    effects: { stats: { sanity: -15 } },
    textEffects: [
      { word: 'SHRIEKS', effect: 'shake' },
      { word: 'YOURS', effect: 'red' },
    ],
    jumpscare: true,
    choices: [
      { text: 'To be continued...', next: null }, // End of current content
    ],
  },
  end_accuse: {
    speaker: 'Lily',
    text: "'He DESERVED it,' she says, her voice flat and cold as the grave. 'And SO WILL YOU if you get in my way. Find my memories. Bring them to the Chapel. It's your only way out.' The room falls silent as she disappears.",
    effects: { relationships: { lily: -10 } },
    textEffects: [
      { word: 'DESERVED', effect: 'red' },
      { word: 'SO WILL YOU', effect: 'red' },
    ],
    choices: [
      { text: 'To be continued...', next: null }, // End of current content
    ],
  },
};
