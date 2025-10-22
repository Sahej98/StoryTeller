import { BGM, SFX } from '../../../data/audioData.js';
import { BG } from '../backgrounds.js';

export const intro = {
  // ===================================================================
  // INTRO (SHARED)
  // ===================================================================
  start: {
    speaker: 'Narrator',
    text: 'The first thing you feel is a hammering in your skull, a symphony of agony conducted with ice picks. The first thing you taste is copper and bile.',
    background: BG.start_room,
    bgm: BGM.ambient,
    ambientSfx: [{ triggerWord: 'hammering', sfx: SFX.headThrob }],
    choices: [{ text: '...', next: 'start_b' }],
  },
  start_b: {
    speaker: 'Narrator',
    text: 'The first thing you smell is rot, antiseptic, and something metallic, like an abattoir where the drains have backed up.',
    background: BG.start_room,
    choices: [{ text: 'Force your eyes open.', next: 'start_2' }],
  },
  start_2: {
    speaker: 'Narrator',
    text: "Your eyelids peel open with a sticky, tearing sound. You're looking at a stained, peeling ceiling that seems to sweat a greasy film in the dim, flickering light.",
    background: BG.start_room,
    ambientSfx: [{ triggerWord: 'flickering', sfx: SFX.lightBuzz }],
    choices: [{ text: '...', next: 'start_2_b' }],
  },
  start_2_b: {
    speaker: 'Narrator',
    text: "You are in a rusty hospital bed, the sheets stiff with dried fluids. Your body screams with a deep, cellular pain, as if it's been taken apart and put back together wrong. A low moan escapes your lips.",
    background: BG.start_room,
    choices: [{ text: 'Where... am I?', next: 'start_3' }],
  },
  start_3: {
    speaker: 'You',
    text: "Ugh... what... what is this place? My head... AGH! I can't remember anything. Not my name, not my face... nothing but a gnawing, black void.",
    background: BG.start_room,
    textEffects: [{ word: 'AGH!', effect: 'shock' }],
    choices: [
      { text: 'Look at your arms.', next: 'inspectSelf' },
      {
        text: 'Try to sit up, to get a better look at the room.',
        next: 'getUp',
      },
    ],
  },
  inspectSelf: {
    speaker: 'Narrator',
    text: 'You raise a trembling hand. Your arms are a ruined canvas of old needle marks and fresh, weeping bruises the color of a dead sunset.',
    background: BG.start_room,
    textEffects: [{ word: 'weeping', effect: 'red' }],
    effects: { stats: { sanity: -2 } },
    choices: [{ text: '...', next: 'inspectSelf_b' }],
  },
  inspectSelf_b: {
    speaker: 'Narrator',
    text: 'A plastic hospital band is cinched so tight it bites into your flesh. The name is smudged out, replaced with a raw, branded number: 47.',
    background: BG.start_room,
    textEffects: [{ word: 'branded', effect: 'red' }],
    effects: { flags: { set: 'is47' }, stats: { sanity: -3 } },
    choices: [{ text: '47... a brand, not a name.', next: 'inspectSelf_2' }],
  },
  inspectSelf_2: {
    speaker: 'Narrator',
    text: 'It looks like the number was burned into your skin, cauterizing the flesh into a puckered, angry wound. The flesh around it is red and weeping a clear, sticky fluid.',
    background: BG.start_room,
    ambientSfx: [{ triggerWord: 'weeping', sfx: SFX.fleshTear }],
    effects: { stats: { health: -5 } },
    choices: [{ text: 'This is wrong. Get up. Now.', next: 'getUp' }],
  },
  getUp: {
    speaker: 'You',
    text: "Okay... okay... ignore the pain. Just get up. Find out what's happening. Before whatever did this to me comes back.",
    background: BG.start_room,
    choices: [{ text: '...', next: 'getUp_2' }],
  },
  getUp_2: {
    speaker: 'Narrator',
    text: 'You swing your legs over the side of the bed. Your vision tunnels to a pinprick of grey as your body screams in protest.',
    background: BG.start_room,
    choices: [{ text: '...', next: 'getUp_2_b' }],
  },
  getUp_2_b: {
    speaker: 'Narrator',
    text: 'The room is a cell: a single heavy steel door slick with condensation, and a barred window thick with grime that seems to stare back at you.',
    background: BG.start_room,
    revisitText:
      'Standing in my cell again. The door is locked tight, the window looks out onto a stormy courtyard.',
    revisitSpeaker: 'You',
    choices: [
      { text: 'Check the door.', next: 'checkDoor' },
      { text: 'Look out the window.', next: 'window' },
    ],
  },
  checkDoor: {
    speaker: 'Narrator',
    text: 'You pull on the heavy steel handle. It’s locked solid, cold and unforgiving.',
    background: BG.start_room,
    choices: [{ text: '...', next: 'checkDoor_b' }],
  },
  checkDoor_b: {
    speaker: 'Narrator',
    text: 'From the other side, you hear a wet, rhythmic dragging sound, like a butcher hauling a water-logged carcass across a concrete floor.',
    background: BG.start_room,
    ambientSfx: [{ triggerWord: 'dragging', sfx: SFX.janitor_drag }],
    revisitText:
      'The door is still locked tight. The silence from the other side is somehow worse now.',
    choices: [
      { text: 'Pound on the door.', next: 'knockDoor' },
      { text: 'Press your ear to the cold metal.', next: 'listenDoor' },
      {
        text: 'Search the room for another way out.',
        next: 'searchRoom_prompt',
      },
    ],
  },
  listenDoor: {
    speaker: 'Narrator',
    text: 'You press your ear to the cold steel. You hear ragged, inhuman breathing, like a bellows full of blood and phlegm. A low, wet gurgle. Then silence.',
    background: BG.start_room,
    choices: [{ text: '...', next: 'listenDoor_b' }],
  },
  listenDoor_b: {
    speaker: 'Narrator',
    text: 'A single, broken fingernail, caked in filth and dried viscera, scratches its way under the door from the other side.',
    background: BG.start_room,
    ambientSfx: [{ triggerWord: 'scratches', sfx: SFX.scratching }],
    choices: [{ text: '...', next: 'listenDoor_c' }],
  },
  listenDoor_c: {
    speaker: 'Narrator',
    text: 'It wiggles, questing, twitching like a dying insect before slowly retracting.',
    background: BG.start_room,
    jumpscare: {
      type: 'image',
      image: 'https://i.imgur.com/GahF34s.png',
      sfx: SFX.jumpscare,
    },
    visualEffect: 'rumble',
    effects: { stats: { sanity: -15 } },
    choices: [{ text: 'WHAT THE HELL WAS THAT?!', next: 'listenDoor_2' }],
  },
  listenDoor_2: {
    speaker: 'You',
    text: 'AGHHHH! What the HELL WAS THAT?! No. No way. That thing is right outside. I need a weapon. I need to find another way out. NOW.',
    background: BG.start_room,
    textEffects: [
      { word: 'AGHHHH!', effect: 'shock' },
      { word: 'NOW.', effect: 'anger' },
    ],
    choices: [
      { text: 'Search the room frantically.', next: 'searchRoom_prompt' },
      { text: 'There must be another way out. The window.', next: 'window' },
    ],
  },
  knockDoor: {
    speaker: 'Narrator',
    text: 'You bang your fists against the steel. The dragging sound stops. A moment of suffocating silence follows.',
    background: BG.start_room,
    choices: [{ text: '...', next: 'knockDoor_b' }],
  },
  knockDoor_b: {
    speaker: 'Narrator',
    text: 'Then a huge, bloodshot EYE appears in the small peephole, wide and unblinking, veined with yellow pus. It stares directly into your soul before vanishing.',
    background: BG.start_room,
    jumpscare: { type: 'sprite', character: 'janitor', sfx: SFX.jumpscare },
    visualEffect: 'rumble',
    textEffects: [
      { word: 'EYE', effect: 'shock' },
      { word: 'stares', effect: 'shake' },
    ],
    effects: { stats: { sanity: -10 } },
    choices: [
      { text: 'I need to get out of here. NOW.', next: 'searchRoom_prompt' },
    ],
  },
  window: {
    speaker: 'Narrator',
    npc: 'ghost',
    background: BG.window_rain,
    revisitText: 'The courtyard is still there, stormy and bleak.',
    text: 'Rain lashes against the grimy, barred glass. In a brilliant flash of lightning, you see a small girl in a white dress standing in the courtyard below, digging in the mud.',
    ambientSfx: [{ triggerWord: 'lightning', sfx: SFX.thunder }],
    choices: [{ text: '...', next: 'window_b' }],
  },
  window_b: {
    speaker: 'Narrator',
    npc: 'ghost',
    background: BG.window_rain,
    visualEffect: 'glitch',
    text: 'She stops, and slowly looks up. Her face is a pale, featureless blur, a canvas of skin with no eyes, no nose, no mouth. A perfect, horrible blank.',
    textEffects: [
      { word: 'featureless blur', effect: 'whisper' },
      { word: 'horrible blank', effect: 'shake' },
    ],
    effects: { flags: { set: 'sawFigure' }, stats: { sanity: -10 } },
    choices: [{ text: 'What... what was that?', next: 'window_2' }],
  },
  window_2: {
    speaker: 'You',
    background: BG.window_no_rain,
    text: "Is she... real? A ghost? My mind is playing tricks on me. That can't be real. I need to stop staring and find a way out.",
    choices: [
      { text: 'Search the room.', next: 'searchRoom_prompt' },
      { text: 'Check the door again.', next: 'checkDoor' },
    ],
  },
  searchRoom_prompt: {
    speaker: 'You',
    text: 'Okay, think. There has to be something in this godforsaken room I can use.',
    background: BG.start_room,
    choices: [{ text: 'Search the room.', next: 'searchRoom' }],
  },
  searchRoom: {
    speaker: 'Narrator',
    text: 'You rip the blood-stiff mattress off the frame. A cloud of dust and dead skin flakes rises, choking you. Taped underneath is a small, bent key, slick with oil.',
    background: BG.start_room,
    revisitText: "I've already searched the bed and found the key.",
    ambientSfx: [{ triggerWord: 'rip', sfx: SFX.paperRustle }],
    choices: [{ text: '...', next: 'searchRoom_b' }],
  },
  searchRoom_b: {
    speaker: 'Narrator',
    text: "On the back of the rusty headboard, someone has carved a desperate message into the metal: 'DON'T TRUST THE GIRL'.",
    background: BG.start_room,
    effects: {
      inventory: { add: ['bedroom_key'] },
      flags: { set: 'foundKey' },
    },
    choices: [{ text: 'A key...', next: 'searchRoom_2' }],
  },
  searchRoom_2: {
    speaker: 'You',
    text: "'Don't trust the girl'... She must mean the one in the courtyard. This key is my only way out of here.",
    background: BG.start_room,
    choices: [{ text: 'Use the key on the door.', next: 'hallwayEntry' }],
  },
  hallwayEntry: {
    speaker: 'Narrator',
    text: 'The key turns with a heavy, grating CLUNK. You step into a long, dark hallway. The lights flicker erratically, casting twitching shadows that look like hanging bodies.',
    background: BG.hallway_start,
    bgm: BGM.tension,
    sfx: SFX.unlock,
    ambientSfx: [{ triggerWord: 'flicker', sfx: SFX.lightBuzz }],
    choices: [{ text: '...', next: 'hallwayEntry_b' }],
  },
  hallwayEntry_b: {
    speaker: 'Narrator',
    text: "To your right is a wrecked nurses' station. Straight ahead, a strange humming vibrates through the floor. To your left, you hear faint, childish laughter.",
    background: BG.hallway_start,
    ambientSfx: [
      { triggerWord: 'laughter', sfx: SFX.childLaughter },
      { triggerWord: 'humming', sfx: SFX.lab_drone },
    ],
    revisitText:
      "You're back in the main hallway. The air is thick with dread. The smells of blood, ozone, mold, and rot mingle into a nauseating perfume. Where to now?",
    revisitSpeaker: 'You',
    choices: [
      { text: "Right: The Nurses' Station", next: 'A_nursesStation' },
      {
        text: 'Straight: Follow the humming',
        next: 'B_followHumming',
      },
      { text: 'Left: Follow the laughter', next: 'C_followLaughter' },
      {
        text: 'Downstairs: The Service Tunnel',
        next: 'D_serviceStairs',
      },
    ],
  },
};
