import { BGM, SFX } from '../../data/audioData.js';

export const chapter1 = {
  // ===================================================================
  // INTRO (SHARED)
  // ===================================================================
  start: {
    speaker: 'Narrator',
    text: 'The first thing you feel is a hammering in your skull, a symphony of agony conducted with ice picks. The first thing you taste is copper and bile, thick on your tongue. The first thing you smell is rot, antiseptic, and something metallic, like an abattoir where the drains have backed up.',
    background:
      '/images/the_asylum/chapter1/bg1.png',
    bgm: BGM.ambient,
    ambientSfx: [{ triggerWord: 'hammering', sfx: SFX.headThrob }],
    choices: [{ text: 'Force your eyes open.', next: 'start_2' }],
  },
  start_2: {
    speaker: 'Narrator',
    text: "Your eyelids peel open with a sticky, tearing sound. You're looking at a stained, peeling ceiling that seems to sweat a greasy film in the dim, flickering light. You are in a rusty hospital bed, the sheets stiff with dried fluids you pray are your own. Your body screams with a deep, cellular pain, as if it's been taken apart and put back together wrong.",
    ambientSfx: [{ triggerWord: 'flickering', sfx: SFX.lightBuzz }],
    choices: [{ text: 'Where... am I?', next: 'start_3' }],
  },
  start_3: {
    speaker: 'You',
    text: "What... what is this place? My head... I can't remember anything. Not my name, not my face, nothing but a gnawing, black void.",
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
    text: 'You raise a trembling hand. Your arms are a ruined canvas of old needle marks, track lines like rail yards of misery, and fresh, weeping bruises the color of a dead sunset. A plastic hospital band is cinched so tight it bites into your flesh. The name is smudged out, replaced with a raw, branded number: 47.',
    textEffects: [
      { word: 'branded', effect: 'red' },
      { word: 'weeping', effect: 'red' },
    ],
    effects: { flags: { set: 'is47' }, stats: { sanity: -5 } },
    choices: [{ text: '47... a brand, not a name.', next: 'inspectSelf_2' }],
  },
  inspectSelf_2: {
    speaker: 'Narrator',
    text: 'It looks like the number was burned into your skin with a heated tool, cauterizing the flesh into a puckered, angry wound. The flesh around it is red and weeping a clear, sticky fluid, smelling of cooked meat. The pain flares hot and white as you touch it.',
    ambientSfx: [{ triggerWord: 'weeping', sfx: SFX.fleshTear }],
    effects: { stats: { health: -5 } },
    choices: [{ text: 'This is wrong. Get up. Now.', next: 'getUp' }],
  },
  getUp: {
    speaker: 'You',
    text: "Okay... okay... ignore the pain. Just get up. Find out what's happening. Before whatever did this to me comes back.",
    choices: [{ text: '...', next: 'getUp_2' }],
  },
  getUp_2: {
    speaker: 'Narrator',
    text: 'You swing your legs over the side of the bed. Your vision tunnels to a pinprick of grey as your body screams in protest. The room is a cell: a single heavy steel door slick with condensation, and a barred window thick with grime that seems to stare back at you.',
    choices: [
      { text: 'Check the door.', next: 'checkDoor' },
      { text: 'Look out the window.', next: 'window' },
    ],
  },
  checkDoor: {
    speaker: 'Narrator',
    text: 'You pull on the heavy steel handle. It’s locked solid, cold and unforgiving. From the other side, you hear a wet, rhythmic dragging sound, like a butcher hauling a water-logged carcass across a concrete floor.',
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
    text: 'You press your ear to the cold steel. You hear ragged, inhuman breathing, like a bellows full of blood and phlegm. A low, wet gurgle. Then silence. A single, broken fingernail, caked in filth and dried viscera, scratches its way under the door from the other side. It wiggles, questing, twitching like a dying insect before slowly retracting.',
    jumpscare: true,
    visualEffect: 'flicker',
    ambientSfx: [{ triggerWord: 'scratches', sfx: SFX.scratching }],
    effects: { stats: { sanity: -15 } },
    choices: [{ text: 'WHAT THE HELL WAS THAT?!', next: 'listenDoor_2' }],
  },
  listenDoor_2: {
    speaker: 'You',
    text: 'No. No way. That thing is right outside. I need a weapon. I need to find another way out. NOW.',
    choices: [
      { text: 'Search the room frantically.', next: 'searchRoom_prompt' },
      { text: 'There must be another way out. The window.', next: 'window' },
    ],
  },
  knockDoor: {
    speaker: 'Narrator',
    text: 'You bang your fists against the steel. The dragging sound stops. A moment of suffocating silence, then a huge, bloodshot EYE appears in the small peephole, wide and unblinking, veined with yellow pus. It stares directly into your soul with a malevolent, hungry intelligence before vanishing.',
    jumpscare: true,
    textEffects: [
      { word: 'EYE', effect: 'red' },
      { word: 'stares', effect: 'shake' },
    ],
    effects: { stats: { sanity: -10 } },
    choices: [
      { text: 'I need to get out of here. NOW.', next: 'searchRoom_prompt' },
    ],
  },
  window: {
    speaker: 'Narrator',
    text: 'Rain lashes against the grimy, barred glass. In a brilliant flash of lightning, you see a small girl in a white dress standing in the courtyard below, digging in the mud with her bare hands. She stops, and slowly looks up, her face a pale, featureless blur, a canvas of skin with no eyes, no nose, no mouth. A perfect, horrible blank.',
    ambientSfx: [{ triggerWord: 'lightning', sfx: SFX.thunder }],
    textEffects: [
      { word: 'featureless blur', effect: 'whisper' },
      { word: 'horrible blank', effect: 'shake' },
    ],
    effects: { flags: { set: 'sawFigure' }, stats: { sanity: -10 } },
    choices: [{ text: 'What... what was that?', next: 'window_2' }],
  },
  window_2: {
    speaker: 'You',
    text: "Is she... real? A ghost? My mind is playing tricks on me. That can't be real. I need to stop staring and find a way out.",
    choices: [
      { text: 'Search the room.', next: 'searchRoom_prompt' },
      { text: 'Check the door again.', next: 'checkDoor' },
    ],
  },
  searchRoom_prompt: {
    speaker: 'You',
    text: 'Okay, think. There has to be something in this godforsaken room I can use.',
    choices: [{ text: 'Search the room.', next: 'searchRoom' }],
  },
  searchRoom: {
    speaker: 'Narrator',
    text: "You frantically search the small room. You rip the blood-stiff mattress off the frame, and a cloud of dust and dead skin flakes rises, choking you. Taped underneath is a small, bent key, slick with some kind of oil. On the back of the rusty headboard, someone has carved a desperate message into the metal with a fingernail: 'DON'T TRUST THE GIRL'.",
    ambientSfx: [{ triggerWord: 'rip', sfx: SFX.paperRustle }],
    effects: {
      inventory: { add: ['bedroom_key'] },
      flags: { set: 'foundKey' },
    },
    choices: [{ text: 'A key...', next: 'searchRoom_2' }],
  },
  searchRoom_2: {
    speaker: 'You',
    text: "'Don't trust the girl'... She must mean the one in the courtyard. This key is my only way out of here.",
    choices: [{ text: 'Use the key on the door.', next: 'hallwayEntry' }],
  },
  hallwayEntry: {
    speaker: 'Narrator',
    text: "The key turns with a heavy, grating CLUNK. You step into a long, dark hallway. The lights flicker erratically, casting twitching shadows that look like hanging bodies. To your right is a wrecked nurses' station, the source of a foul, coppery smell. Straight ahead, a strange, low-frequency humming sound vibrates through the floor. To your left, you hear faint, childish laughter. A sign points downstairs to a 'Service Tunnel'.",
    background:
      'https://images.unsplash.com/photo-1598214105267-144b574a2b3c?q=80&w=1974&auto=format&fit=crop',
    bgm: BGM.tension,
    sfx: SFX.unlock,
    ambientSfx: [
      { triggerWord: 'flicker', sfx: SFX.lightBuzz },
      { triggerWord: 'laughter', sfx: SFX.childLaughter },
      { triggerWord: 'humming', sfx: SFX.lab_drone },
    ],
    revisitText:
      "You're back in the main hallway. The air is thick with dread. The smells of blood, ozone, mold, and rot mingle into a nauseating perfume. Where to now?",
    revisitSpeaker: 'You',
    choices: [
      { text: "Right: The Nurses' Station (Path A)", next: 'A_nursesStation' },
      {
        text: 'Straight: Follow the humming (Path B)',
        next: 'B_followHumming',
      },
      { text: 'Left: Follow the laughter (Path C)', next: 'C_followLaughter' },
      {
        text: 'Downstairs: The Service Tunnel (Path D)',
        next: 'D_serviceStairs',
      },
    ],
  },

  // ===================================================================
  // PATH A — THE ESCAPE ARTIST (Stealth/Puzzle) - MASSIVELY EXPANDED
  // ===================================================================
  A_nursesStation: {
    speaker: 'Narrator',
    text: "The station is a Jackson Pollock of viscera and desperation. Papers are plastered to surfaces with drying blood. A nurse is slumped over a desk, a letter opener buried to the hilt in her spine, her head resting in a congealing pool of her own fluids that drips slowly to the floor. A monitor flashes static. A drawer is labeled 'MAINTENANCE'. A heavy security locker stands in the corner.",
    ambientSfx: [
      { triggerWord: 'viscera', sfx: SFX.gore },
      { triggerWord: 'static', sfx: SFX.static },
      { triggerWord: 'drips', sfx: SFX.waterDrip },
    ],
    effects: { stats: { sanity: -10 } },
    revisitText:
      'The dead nurse remains a grim centerpiece in the ruined station. The smell is getting worse.',
    choices: [
      { text: 'Check the monitor.', next: 'A_checkMonitor' },
      { text: 'Pry open the maintenance drawer.', next: 'A_maintDrawer' },
      { text: "Search the nurse's body.", next: 'A_searchNurse' },
      { text: 'Examine the security locker.', next: 'A_examineLocker' },
      { text: 'Go back to the main hallway.', next: 'hallwayEntry' },
    ],
  },
  A_searchNurse: {
    speaker: 'Narrator',
    text: 'You cautiously touch her cold shoulder. As you do, her body emits a soft, gassy sigh. Her head lolls sideways with a wet, sucking sound, revealing a keycard pinned to her uniform, soaked in blood. Her dead, milky eyes seem to follow you.',
    jumpscare: true,
    ambientSfx: [{ triggerWord: 'sucking sound', sfx: SFX.gore }],
    effects: { inventory: { add: 'keycard' }, stats: { sanity: -10 } },
    choices: [
      { text: 'What about that letter opener?', next: 'A_searchNurse_2' },
    ],
  },
  A_searchNurse_2: {
    speaker: 'You',
    text: 'I might need that. This is... grim. But I need to survive. No matter what.',
    choices: [
      {
        text: 'Take the letter opener. (Morality -5)',
        next: 'A_takeLetterOpener',
      },
      {
        text: "I can't bring myself to disturb a corpse like that.",
        next: 'A_nursesStation',
      },
    ],
  },
  A_takeLetterOpener: {
    speaker: 'Narrator',
    text: 'You grip the handle. Your knuckles brush against her cold, clammy skin. You pull the bloody letter opener from her back. It makes a sickening, wet SQUISH as it comes free, followed by the sound of tearing sinew, releasing a fresh wave of the coppery smell of death.',
    ambientSfx: [{ triggerWord: 'SQUISH', sfx: SFX.fleshTear }],
    effects: { inventory: { add: 'letter_opener' }, stats: { morality: -5 } },
    choices: [{ text: 'Okay. I have it.', next: 'A_nursesStation' }],
  },
  A_maintDrawer: {
    speaker: 'Narrator',
    text: "It's stuck fast. The wood is swollen and warped with blood and other fluids. You'll need something to pry it open.",
    choices: [
      {
        text: 'Use the letter opener.',
        next: 'A_openDrawer',
        requires: { inventory: ['letter_opener'] },
      },
      {
        text: 'Use the crowbar.',
        next: 'A_openDrawerCrowbar',
        requires: { inventory: ['crowbar'] },
      },
      { text: 'Leave it.', next: 'A_nursesStation' },
    ],
  },
  A_openDrawerCrowbar: {
    speaker: 'Narrator',
    text: 'The crowbar makes short work of the drawer, splintering it into pieces. Inside is a rolled-up vent schematic. A path is circled in red, leading from a grate in this hallway into a "Maintenance Corridor". An escape route.',
    sfx: SFX.woodSplinter,
    effects: { inventory: { add: 'elevator_schematic' } },
    choices: [{ text: 'Find that vent grate.', next: 'A_findVent' }],
  },
  A_openDrawer: {
    speaker: 'Narrator',
    text: 'The letter opener is barely strong enough. You jam it into the seam and pry with all your might. The wood groans and with a loud CRACK of splintering, the drawer pops open. The tip of the letter opener snaps off. Inside is a rolled-up vent schematic, a path circled in red.',
    sfx: SFX.woodSplinter,
    effects: {
      inventory: { add: 'elevator_schematic' },
      inventory: { remove: 'letter_opener' },
      inventory: { add: 'broken_letter_opener' },
    },
    choices: [{ text: 'Find that vent grate.', next: 'A_findVent' }],
  },
  A_checkMonitor: {
    speaker: 'Narrator',
    text: "The monitor shows a grainy security feed of a padded cell. In the corner, a person is rocking back and forth. They look up at the camera. Their face is twisted in a silent scream. It's you. The date on the screen is from three years ago. The words 'LET ME OUT' appear, scrawled in blood, before the feed cuts to static with a piercing electronic shriek.",
    visualEffect: 'glitch',
    sfx: SFX.static,
    textEffects: [
      { word: "It's you.", effect: 'shake' },
      { word: 'LET ME OUT', effect: 'red' },
    ],
    effects: { stats: { sanity: -15 } },
    choices: [
      { text: "That's... that's not possible...", next: 'A_nursesStation' },
    ],
  },
  A_examineLocker: {
    speaker: 'Narrator',
    text: "It's a heavy steel locker. A note taped to it is written in shaky, blood-smeared handwriting: 'Idiot janitor, the code is the date of the incident.' It needs a 4-digit code.",
    choices: [
      { text: 'Look for clues about the date.', next: 'A_guessLockerCode' },
      { text: 'Forget it.', next: 'A_nursesStation' },
    ],
  },
  A_guessLockerCode: {
    speaker: 'Narrator',
    text: "You find a yellowed, moldy newspaper on the floor nearby, dated October 23, 1987. The headline is stark: 'Freak Electrical Accident at Asylum Claims Janitor; Body Horribly Mutilated'.",
    effects: { inventory: { add: 'old_newspaper' } },
    choices: [
      { text: 'Enter 1023.', next: 'A_openLocker' },
      { text: 'Enter 1987.', next: 'A_lockerWrongCode' },
      { text: 'Leave it.', next: 'A_nursesStation' },
    ],
  },
  A_lockerWrongCode: {
    speaker: 'Narrator',
    text: 'ACCESS DENIED. A shrill, brief alarm blares, making you jump out of your skin.',
    sfx: SFX.alarm,
    effects: { stats: { stamina: -5 } },
    choices: [{ text: 'Try again.', next: 'A_guessLockerCode' }],
  },
  A_openLocker: {
    speaker: 'Narrator',
    text: "The code works. The heavy door swings open with a low groan. Inside the locker are a pair of thick rubber gloves, a heavy, rust-stained crowbar, and a small, brass key labeled 'FC-01'.",
    sfx: SFX.unlock,
    effects: {
      inventory: { add: ['rubber_gloves', 'crowbar', 'fan_control_key'] },
    },
    choices: [{ text: 'These look useful.', next: 'A_nursesStation' }],
  },
  A_findVent: {
    speaker: 'Narrator',
    text: "Following the schematic, you find the vent grate low on the wall, half-hidden behind a fallen cabinet. It's large enough to crawl through, but the screws are rusted solid.",
    choices: [
      {
        text: 'Use the crowbar to pry it open.',
        next: 'A_openVent',
        requires: { inventory: ['crowbar'] },
      },
      { text: 'I need a tool for this.', next: 'A_nursesStation' },
    ],
  },
  A_openVent: {
    speaker: 'Narrator',
    text: 'You wedge the crowbar into the seam. The metal groans and screeches as you put your weight into it, your muscles straining. With a final, loud SHREIK of tortured metal, the grate rips from the wall. The opening leads into a dark, cramped space that stinks of stagnant water and decay.',
    effects: { stats: { stamina: -15 } },
    ambientSfx: [{ triggerWord: 'SHREIK', sfx: SFX.scraping }],
    choices: [{ text: 'Enter the vents.', next: 'A_ventCrawl_1' }],
  },
  A_ventCrawl_1: {
    speaker: 'Narrator',
    text: 'You crawl into the suffocating darkness, the metal cold against your skin. The vent is tight, scraping your back. You hear rats skittering just out of sight. The shaft splits. Left or right?',
    sfx: SFX.ventCrawl,
    choices: [
      {
        text: 'Go left, towards a faint humming sound.',
        next: 'A_ventCrawl_2_correct',
      },
      {
        text: 'Go right, towards a dripping sound.',
        next: 'A_ventCrawl_2_deadEnd',
      },
    ],
  },
  A_ventCrawl_2_deadEnd: {
    speaker: 'Narrator',
    text: "You crawl towards the dripping. The shaft ends in a grate overlooking a shower room. The floor is covered in blood and clumps of hair. A patient's severed hand lies near the drain, its fingers twitching feebly. There's no way through here.",
    effects: { stats: { sanity: -10 } },
    choices: [{ text: 'Go back.', next: 'A_ventCrawl_1' }],
  },
  A_ventCrawl_2_correct: {
    speaker: 'Narrator',
    text: 'You follow the humming. It leads to another split. One path is blocked by a massive, spinning fan blade, but you see the corridor on the other side. The other path continues into darkness, a foul draft blowing from it.',
    ambientSfx: [{ triggerWord: 'spinning', sfx: SFX.fan_whir }],
    choices: [
      { text: 'Try to get past the fan.', next: 'A_ventFanFail' },
      { text: 'Explore the dark path.', next: 'A_janitorsLairEntry' },
    ],
  },
  A_ventFanFail: {
    speaker: 'Narrator',
    text: "You inch closer to the fan. It's moving too fast, a blur of deadly steel. A loose piece of your clothing gets snagged and is instantly shredded. It's impossible to get past. You need to turn it off.",
    choices: [{ text: 'Find another way.', next: 'A_ventCrawl_2_correct' }],
  },
  A_janitorsLairEntry: {
    speaker: 'Narrator',
    text: "The foul draft leads you to a grate. You look down into a small, squalid room. The Janitor's private lair. It's a workshop of human misery. Tools made of sharpened bone hang on the walls. Jars filled with formaldehyde and floating eyeballs line a shelf. In the corner is a bloody workbench. This is where he brings his victims.",
    background:
      'https://images.unsplash.com/photo-1615465997999-af32757a665a?q=80&w=1974&auto=format&fit=crop',
    ambientSfx: [{ triggerWord: 'eyeballs', sfx: SFX.bone_saw }],
    effects: { stats: { sanity: -20 } },
    choices: [{ text: 'Drop down into his lair.', next: 'A_janitorsLair' }],
  },
  A_janitorsLair: {
    speaker: 'Narrator',
    text: 'You drop silently into the horrifying room. A single door leads out into the maintenance corridor. You can see the Fan Control room across the hall from here. On the workbench, amidst clamps and bloody saws, is a keycard and a syringe filled with a green, viscous fluid.',
    choices: [
      { text: 'Take the syringe.', next: 'A_takeSyringe' },
      { text: 'Take the keycard.', next: 'A_takeLairKeycard' },
      { text: 'Sneak out the door.', next: 'A_maintCorridor_Entry' },
    ],
  },
  A_takeSyringe: {
    speaker: 'Narrator',
    text: "You pick up the syringe. A label reads 'Adrenal Stimulant'. Could be useful in a pinch, but using a dirty needle from this place is a huge risk.",
    effects: { inventory: { add: 'adrenaline_syringe' } },
    choices: [{ text: '...I might need this.', next: 'A_janitorsLair' }],
  },
  A_takeLairKeycard: {
    speaker: 'Narrator',
    text: "You take the keycard. It's labeled 'Junction Box Access'.",
    effects: { inventory: { add: 'junction_keycard' } },
    choices: [{ text: 'This could be important.', next: 'A_janitorsLair' }],
  },
  A_maintCorridor_Entry: {
    speaker: 'Narrator',
    text: 'You are in a claustrophobic maze of rusting pipes and humming electrical conduits. The air is cold and smells of rust and ozone. You hear a rhythmic, wet dragging sound echoing from deeper within, growing louder, closer.',
    background:
      'https://images.unsplash.com/photo-1544697333-913a5e84852f?q=80&w=1974&auto=format&fit=crop',
    bgm: BGM.maintenance,
    sfx: SFX.janitor_drag,
    effects: { setCheckpoint: true },
    choices: [{ text: 'I have to face him.', next: 'A_maintCorridor_1' }],
  },
  A_maintCorridor_1: {
    speaker: 'Narrator',
    text: 'You move deeper. Around a corner, you see him. A hulking Janitor, his face hidden by a stained sackcloth hood, dragging a bloody mop made of what looks like human hair and entrails. He patrols a long stretch of corridor, blocking the way forward. To your left is a dark alcove. To your right, a side room labeled "Junction Box 03". Further down the hall is another door, labeled "Fan Control".',
    effects: { flags: { set: 'A_sawJanitor' } },
    choices: [
      {
        text: 'Hide in the alcove and watch his patrol.',
        next: 'A_watchPatrol',
      },
      {
        text: 'Make a run for the Junction Box room.',
        next: 'A_runForJunction',
        requires: { stats: { stamina: 20 } },
      },
      { text: 'Try to sneak past him now.', next: 'A_sneakFail' },
    ],
  },
  A_watchPatrol: {
    speaker: 'Narrator',
    text: 'From the shadows, you watch his grim patrol. He drags his mop from one end of the corridor to the other, a slow, predictable route. He lingers at the far end for a few moments, scraping something off the wall, before turning back. You could probably make a dash for one of the side rooms when his back is turned.',
    choices: [
      {
        text: 'Wait for your chance, then run for the Junction Box room. (Costs Stamina)',
        next: 'A_runForJunction',
      },
      {
        text: 'Wait for your chance, then run for the Fan Control room. (Costs Stamina)',
        next: 'A_runForFanControl',
      },
      { text: 'Stay hidden.', next: 'A_maintCorridor_1' },
    ],
  },
  A_runForFanControl: {
    speaker: 'Narrator',
    text: "You wait for him to turn, then sprint down the hall to the Fan Control door, your heart hammering in your chest. You fumble with the handle. It's locked.",
    effects: { stats: { stamina: -10 } },
    choices: [
      {
        text: 'Use the brass key.',
        next: 'A_unlockFanControl',
        requires: { inventory: ['fan_control_key'] },
      },
      {
        text: 'Damn it! Try the Junction Box room instead. (Costs more Stamina)',
        next: 'A_runForJunction',
      },
    ],
  },
  A_unlockFanControl: {
    speaker: 'Narrator',
    text: 'The key slides in and turns. You slip inside the room just as you hear the Janitor starting his patrol back. You were almost caught. The door clicks shut behind you.',
    sfx: SFX.unlock,
    choices: [{ text: 'That was too close.', next: 'A_fanControlRoom' }],
  },
  A_fanControlRoom: {
    speaker: 'Narrator',
    text: "The room contains a single, massive control panel for the ventilation fan. The emergency shut-off lever is here, but it's protected by a cage secured with a heavy, rusted bolt. You'll need a tool to get it off.",
    choices: [
      {
        text: 'Use the crowbar on the bolt. (Costs Stamina)',
        next: 'A_stopFanSuccess',
        requires: { inventory: ['crowbar'] },
      },
      {
        text: 'I need a tool. I have to go back out there.',
        next: 'A_maintCorridor_1',
      },
    ],
  },
  A_sneakFail: {
    speaker: 'Narrator',
    text: 'You try to creep past. A loose pipe shifts under your foot with a loud CLANG. The Janitor stops. He turns his head with a slow, sickening crack of bone. He sees you. He drops his mop and charges, faster than anything that big should move, letting out a guttural, inhuman roar that smells of rot and murder.',
    ambientSfx: [{ triggerWord: 'crack', sfx: SFX.boneSnap }],
    textEffects: [{ word: 'inhuman roar', effect: 'shake' }],
    choices: [
      { text: 'He catches you. The world goes black.', next: 'A_janitorCatch' },
    ],
  },
  A_janitorCatch: {
    isDeath: true,
    text: "The Janitor's massive, grimy hands close around your throat. He lifts you off the ground, your feet kicking uselessly as he squeezes. Your vision darkens to pinpricks of light, and the last thing you hear is the sound of your own neck snapping.",
  },
  A_runForJunction: {
    speaker: 'Narrator',
    text: "You wait for him to turn his back, then sprint for the side room. You throw the door open and slam it shut behind you just as his meaty fist smashes against the other side, shaking the entire frame. You're safe, for now.",
    effects: { stats: { stamina: -15 } },
    choices: [{ text: 'That was too close.', next: 'A_junctionBoxRoom' }],
  },
  A_junctionBoxRoom: {
    speaker: 'Narrator',
    text: 'The room is filled with humming machinery. A large junction box is on the wall, its panel hanging open. Three thick, sparking cables have come loose from their sockets, showering the floor in arcs of electricity. A faded diagram on the panel shows which cable goes into which socket, labeled A, B, and C.',
    ambientSfx: [{ triggerWord: 'sparking', sfx: SFX.electric }],
    choices: [
      {
        text: 'Try to reconnect the cables with your bare hands.',
        next: 'A_cableZap',
      },
      {
        text: 'Use the rubber gloves to handle the cables.',
        next: 'A_cableSuccess',
        requires: { inventory: ['rubber_gloves'] },
      },
      {
        text: 'Leave the room and face the Janitor.',
        next: 'A_maintCorridor_1',
      },
    ],
  },
  A_cableZap: {
    speaker: 'Narrator',
    text: 'You reach for a cable. A massive jolt of electricity throws you across the room. Your vision goes white, and you smell burning hair and cooking meat. Your own. The pain is blinding and your heart stutters in your chest.',
    sfx: SFX.electric_spark_heavy,
    textEffects: [{ word: 'pain is blinding', effect: 'red' }],
    effects: { stats: { health: -40, sanity: -10 } },
    choices: [{ text: 'Agh... stupid, stupid!', next: 'A_junctionBoxRoom' }],
  },
  A_cableSuccess: {
    speaker: 'Narrator',
    text: 'The rubber gloves insulate you from the current. You carefully follow the diagram, wrestling each heavy cable back into its corresponding socket. With a deafening CLANG and a shower of sparks, the lights in the corridor flicker and a distant, heavy whirring sound starts up. You restored power to the main vents.',
    sfx: SFX.electric_spark_heavy,
    effects: { flags: { set: 'A_powerRestored' } },
    choices: [{ text: 'Time to get out of here.', next: 'A_maintCorridor_1' }],
  },
  A_stopFanSuccess: {
    speaker: 'Narrator',
    text: 'You wedge the crowbar under the bolt and heave with all your strength. The bolt snaps with a loud CRACK. You throw open the cage and pull the emergency lever down. With a groan of tortured metal, the massive fan blades grind to a halt. The sudden silence is terrifying. And then you hear a bloodcurdling roar from down the corridor. He knows.',
    effects: { stats: { stamina: -20 } },
    ambientSfx: [
      { triggerWord: 'CRACK', sfx: SFX.boneSnap },
      { triggerWord: 'groan', sfx: SFX.lever_creak_heavy },
    ],
    sfx: SFX.monster_roar,
    choices: [{ text: "He's coming!", next: 'A_chaseStart' }],
  },
  A_chaseStart: {
    speaker: 'Narrator',
    text: "Heavy, running footsteps are getting closer, faster than before. The Janitor is coming. You scramble back to the now-motionless fan blades and slip into the main ventilation shaft. There's no turning back now. The darkness swallows you whole.",
    bgm: BGM.descent, // Chase Music
    effects: { setCheckpoint: true },
    choices: [{ text: 'RUN!', next: 'A_chase_1' }],
  },
  A_chase_1: {
    speaker: 'Narrator',
    text: 'The shaft is pitch black and slick with some foul ooze. You can hear him right behind you, his metal-toed boots clanging on the vent floor, his guttural breathing like a death rattle. The shaft splits. Left or Right?',
    choices: [
      { text: 'Go Left', next: 'A_chase_2_correct' },
      { text: 'Go Right', next: 'A_chase_2_fail' },
    ],
    timer: 6,
    defaultChoiceIndex: 1,
  },
  A_chase_2_fail: {
    speaker: 'Narrator',
    text: "You take the right path. It's a dead end. A heavy grate blocks the way. There's nowhere to run. The Janitor's hulking form fills the tunnel behind you, blotting out the light.",
    choices: [{ text: 'Trapped like a rat.', next: 'A_janitorCatch' }],
  },
  A_chase_2_correct: {
    speaker: 'Narrator',
    text: 'You scramble down the left path. Ahead, a cloud of scalding steam is venting across the shaft, completely blocking the way! You can see an old shutoff valve on the wall just before the steam cloud. His grimy, powerful hand reaches through the darkness, just missing your leg.',
    ambientSfx: [{ triggerWord: 'steam', sfx: SFX.steam_hiss }],
    choices: [
      {
        text: 'Try to run through the steam. (High Damage)',
        next: 'A_chase_steam_burn',
      },
      {
        text: 'Use a final burst of speed to reach the valve. (Costs Stamina)',
        next: 'A_chase_turn_valve',
        requires: { stats: { stamina: 30 } },
      },
      {
        text: 'Use the Adrenaline Syringe.',
        next: 'A_chase_use_syringe',
        requires: { inventory: ['adrenaline_syringe'] },
      },
    ],
  },
  A_chase_steam_burn: {
    speaker: 'Narrator',
    text: 'The scalding steam sears your flesh. The pain is unimaginable. You collapse on the other side, vision swimming, your skin bubbling and peeling. The Janitor looms over you.',
    effects: { stats: { health: -80 } },
    choices: [{ text: 'It hurts...', next: 'A_janitorCatch' }],
  },
  A_chase_turn_valve: {
    speaker: 'Narrator',
    text: 'You push yourself to the limit, your lungs burning. You grab the valve and turn with all your might. The steam cuts off with a hiss. You stumble through, exhausted, but alive.',
    effects: { stats: { stamina: -30 } },
    choices: [{ text: 'Keep going!', next: 'A_chase_3' }],
  },
  A_chase_use_syringe: {
    speaker: 'Narrator',
    text: 'You fumble for the syringe and jam it into your thigh. A jolt of pure fire floods your veins. The world sharpens, your exhaustion vanishes. You sprint through the steam before it can even touch you, a manic grin on your face as you leave the Janitor in your dust.',
    sfx: SFX.syringe,
    effects: {
      stats: { stamina: 100, sanity: -20 },
      inventory: { remove: 'adrenaline_syringe' },
    },
    choices: [{ text: 'FASTER!', next: 'A_chase_3' }],
  },
  A_chase_3: {
    speaker: 'Narrator',
    text: "You see a faint light ahead. It's an exit grate! You can hear his ragged breathing just behind you. He's reaching for you!",
    effects: { stats: { health: -15, stamina: -10 } },
    choices: [
      {
        text: 'KICK THE GRATE! (Costs Stamina)',
        next: 'A_escape',
        requires: { stats: { stamina: 10 } },
      },
      { text: 'You hesitate, exhausted.', next: 'A_janitorCatch' },
    ],
  },
  A_escape: {
    speaker: 'Narrator',
    text: 'You kick the grate with the last of your strength. It flies open, and you spill out into the cold, rain-soaked air of a different part of the asylum grounds. You made it out of the maintenance block. But you are far from free.',
    bgm: BGM.courtyard,
    sfx: SFX.rain,
    effects: { flags: { set: 'A_completed' }, stats: { stamina: -10 } },
    choices: [
      { text: 'Keep moving', next: { chapter: 'chapter2', key: 'start' } },
    ],
  },

  // ===================================================================
  // PATH B — ECHOES OF THE PAST (Puzzle/Lore) - MASSIVELY EXPANDED
  // ===================================================================
  B_followHumming: {
    speaker: 'Narrator',
    text: "You follow the low, resonant humming to a flooded wing. Ankle-deep, murky water covers the floor, and the air is thick with the smell of mold and decay. The humming seems to come from an old grandfather clock at the far end of the hall. Doors lead to what were once doctors' offices.",
    background:
      'https://images.unsplash.com/photo-1594913262039-41a457a3a5f8?q=80&w=2070&auto=format&fit=crop',
    bgm: BGM.supernatural,
    sfx: SFX.waterDrip,
    revisitText:
      "You are in the flooded wing. The clock still hums, a beacon in the gloom. The water seems to ripple when you aren't looking at it.",
    choices: [
      { text: 'Examine the grandfather clock.', next: 'B_clock' },
      { text: "Dr. Crane's office (Pyromania).", next: 'B_craneOffice' },
      {
        text: "Dr. Blackwood's office (Hydrotherapy).",
        next: 'B_blackwoodOffice',
      },
      {
        text: "Dr. Adler's office (Gravitational Trauma).",
        next: 'B_adlerOffice',
      },
      { text: 'Go back to the main hallway.', next: 'hallwayEntry' },
    ],
  },
  B_clock: {
    speaker: 'Narrator',
    text: 'The large grandfather clock is the source of the hum. Its face is missing the minute hand and one of the gears. Three slots are carved into its base, shaped like a tape reel, a locket, and a pocket watch. A plaque reads: "Remember our failures, lest they be repeated." You must present the memories of the doctors who died here.',
    choices: [
      {
        text: 'Place the memories in the clock.',
        next: 'B_clockSolved',
        requires: {
          inventory: ['melted_tape', 'drowned_locket', 'broken_watch'],
        },
      },
      { text: 'I need to find these items.', next: 'B_followHumming' },
    ],
  },
  B_craneOffice: {
    speaker: 'Narrator',
    text: 'The door is charred and melted, the paint bubbled and black. Inside, the room is a blackened husk. A skeleton in a lab coat is fused to a melted steel desk, its jaw open in a silent scream. The air is still hot. A locked medical box sits on a shelf. The desk drawer is melted shut.',
    choices: [
      { text: 'Examine the skeleton.', next: 'B_examineCrane' },
      { text: 'Try to open the desk drawer.', next: 'B_craneDrawer' },
      { text: 'Examine the locked medical box.', next: 'B_craneBox' },
      { text: 'Leave.', next: 'B_followHumming' },
    ],
  },
  B_examineCrane: {
    speaker: 'Echo',
    npc: 'echo',
    speakerKey: 'doctor',
    text: "As you approach, a ghostly, transparent image of Dr. Crane flickers into existence. 'The specimen is unstable! The reaction is... it's too hot!' he screams, as spectral flames engulf him. The heat in the room intensifies, and your skin feels like it's starting to burn. You see something clutched in the skeleton's charred hand.",
    visualEffect: 'glitch',
    sfx: SFX.ghostly_moan,
    effects: { stats: { sanity: -10, health: -5 } },
    choices: [{ text: "Take what's in its hand.", next: 'B_takeTape' }],
  },
  B_takeTape: {
    speaker: 'Narrator',
    text: "You reach into the skeleton's grasp. The bones are brittle and crumble to dust as you take the object: a single, pristine audio tape, untouched by the flames. As your fingers touch it, you feel an intense wave of heat and hear the man's final, agonized screams in your mind. A memory of fire.",
    sfx: SFX.scream,
    effects: { inventory: { add: 'melted_tape' }, stats: { sanity: -10 } },
    choices: [
      { text: 'This is a piece of what happened here.', next: 'B_craneOffice' },
    ],
  },
  B_craneDrawer: {
    speaker: 'Narrator',
    text: 'The drawer is a solid mass of melted metal. You might be able to force it with a tool.',
    choices: [
      {
        text: 'Use the crowbar.',
        next: 'B_openCraneDrawer',
        requires: { inventory: ['crowbar'] },
      },
      { text: 'Leave it.', next: 'B_craneOffice' },
    ],
  },
  B_openCraneDrawer: {
    speaker: 'Narrator',
    text: 'You jam the crowbar into the warped metal and heave. It opens with a screech, revealing a heavy iron valve handle.',
    sfx: SFX.scraping,
    effects: { inventory: { add: 'valve_handle' } },
    choices: [{ text: 'This looks important.', next: 'B_craneOffice' }],
  },
  B_craneBox: {
    speaker: 'Narrator',
    text: "A small locked box, requiring a key. A note on it says 'Patient 14 - Effects'.",
    choices: [
      {
        text: 'Use the small key.',
        next: 'B_openCraneBox',
        requires: { inventory: ['small_key'] },
      },
      { text: 'Leave it.', next: 'B_craneOffice' },
    ],
  },
  B_openCraneBox: {
    speaker: 'Narrator',
    text: 'The key turns and the box opens. Inside is a single, beautiful silver locket.',
    effects: { inventory: { add: 'drowned_locket' } },
    choices: [{ text: 'Take the locket.', next: 'B_craneOffice' }],
  },
  B_blackwoodOffice: {
    speaker: 'Narrator',
    text: 'This office is filled with diagrams of hydrotherapy equipment. A huge, glass-walled water tank dominates the room. Submerged at the bottom is the bloated, pale corpse of a patient in a straitjacket. A small, rusty key is tied to her wrist with a piece of string. A large valve on the side of the tank is missing its handle.',
    ambientSfx: [{ triggerWord: 'tank', sfx: SFX.waterDrip }],
    choices: [
      {
        text: 'Attach the valve handle and drain the tank.',
        next: 'B_drainTank',
        requires: { inventory: ['valve_handle'] },
      },
      { text: 'Reach into the water for the key.', next: 'B_reachForKey' },
      { text: 'Leave.', next: 'B_followHumming' },
    ],
  },
  B_reachForKey: {
    speaker: 'Narrator',
    text: "As your hand enters the icy water, the corpse's eyes snap open. They are milky white and filled with hate. A spectral force grabs your arm, trying to pull you in! You scream and scramble back just as its teeth snap shut where your fingers were.",
    jumpscare: true,
    sfx: SFX.water_splash_heavy,
    effects: { stats: { sanity: -15, health: -10 } },
    choices: [{ text: "I'm not doing that again!", next: 'B_blackwoodOffice' }],
  },
  B_drainTank: {
    speaker: 'Echo',
    npc: 'echo',
    speakerKey: 'doctor',
    text: "You attach the handle and turn. With a groan, the tank begins to drain. As the water recedes, a ghostly Dr. Blackwood appears, holding the patient under. 'The results justify the means,' he whispers, his voice watery and distorted. He holds her until she stops struggling, then vanishes. You take the small key from her wrist.",
    sfx: SFX.water_drain,
    visualEffect: 'glitch',
    effects: { inventory: { add: 'small_key' }, stats: { sanity: -10 } },
    choices: [{ text: 'Now for the locket.', next: 'B_craneOffice' }],
  },
  B_adlerOffice: {
    speaker: 'Narrator',
    text: 'The window of this office is shattered. The floor is covered in glass and fallen plaster. A deep, body-shaped crater is in the center of the room, as if someone fell from a great height. At the bottom of the crater, amidst the debris, you see a smashed pocket watch. A small note is pinned to the wall.',
    choices: [
      { text: 'Read the note.', next: 'B_readAdlerNote' },
      { text: 'Take the broken watch.', next: 'B_takeWatch' },
      { text: 'Leave.', next: 'B_followHumming' },
    ],
  },
  B_readAdlerNote: {
    speaker: 'Narrator',
    text: "The note is a research proposal. 'By inducing extreme gravitational trauma (a fall from no less than 50 feet), it should be possible to sever the consciousness from the linear flow of time. I will be the first to witness eternity.' It's signed by Dr. Adler. It seems he tested his theory on himself.",
    effects: { inventory: { add: 'adler_note' } },
    choices: [{ text: 'He was insane.', next: 'B_adlerOffice' }],
  },
  B_takeWatch: {
    speaker: 'Echo',
    npc: 'echo',
    speakerKey: 'doctor',
    text: "You climb into the crater. A ghostly Dr. Adler stands on the shattered window ledge above. 'Time is a cage!' he screams, and leaps. You feel a sudden, terrifying vertigo, the sensation of falling, the rush of wind, the final, bone-shattering impact. A memory of time. You pick up the broken watch.",
    sfx: SFX.windHowl,
    effects: { inventory: { add: 'broken_watch' }, stats: { sanity: -15 } },
    choices: [{ text: 'I have what I need from here.', next: 'B_adlerOffice' }],
  },
  B_clockSolved: {
    speaker: 'Narrator',
    text: 'You place the three objects into their respective slots. The humming intensifies to a deafening roar. The room shakes, and the water in the hallway begins to boil and steam. The clock chimes once, a deep, sorrowful sound.',
    sfx: SFX.puzzleSuccess,
    effects: {
      inventory: { remove: ['melted_tape', 'drowned_locket', 'broken_watch'] },
    },
    choices: [{ text: 'What is happening?', next: 'B_finalVision' }],
  },
  B_finalVision: {
    speaker: 'Narrator',
    text: "The world dissolves into a searing white light. You are no longer in the asylum, but in a pristine lab. The three doctors are arguing around a containment unit holding a pulsating, black mass. 'It's too unstable!' Crane shouts. 'The psychometric readings are off the charts!' Blackwood scoffs, 'We proceed.' Adler just smiles, 'Think of what we'll learn.' The mass ruptures, and a wave of pure psychic energy tears the room, and the doctors, apart. You are thrown back into your own time.",
    sfx: SFX.reality_warp,
    visualEffect: 'glitch',
    effects: { stats: { sanity: -25 } },
    choices: [{ text: 'That... that was the incident.', next: 'B_escape' }],
  },
  B_escape: {
    speaker: 'Narrator',
    text: "You stand before the clock. The traumatic vision has ended. The front of the clock swings open, revealing not a hidden passage, but a single, ornate key hanging from a hook. It's the key to the main ward exit.",
    effects: {
      flags: { set: 'B_completed' },
      inventory: { add: 'main_ward_key' },
    },
    choices: [
      {
        text: 'This is my way out of this wing.',
        next: { chapter: 'chapter2', key: 'start' },
      },
    ],
  },

  // ===================================================================
  // PATH C — THE WRONG PLACE (Psychological/Surreal) - MASSIVELY EXPANDED
  // ===================================================================
  C_followLaughter: {
    speaker: 'Narrator',
    text: "You follow the laughter to the Children's Ward. The hallway is unnervingly clean, the walls painted with cheerful, faded murals of cartoon animals. It's utterly silent now. Doors lead to a Playroom, a Quiet Room, and a Classroom. You feel a profound sense of wrongness here.",
    background:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', // A clean, creepy hotel hallway as placeholder
    bgm: BGM.softHaunt,
    revisitText:
      "You are back in the eerily clean hallway of the Children's Ward. Something is deeply wrong here.",
    choices: [
      { text: 'Enter the Playroom.', next: 'C_playroom' },
      { text: 'Enter the Quiet Room.', next: 'C_quietroom' },
      { text: 'Enter the Classroom.', next: 'C_classroom' },
      { text: 'Examine the hallway more closely.', next: 'C_hallwayAnomaly' },
      { text: 'Go back to the main hallway.', next: 'hallwayEntry' },
    ],
  },
  C_hallwayAnomaly: {
    speaker: 'Narrator',
    text: 'You look closer at the murals. The cartoon rabbit has eyes that are too human, and they seem to follow you. The painted sun is weeping black tears. One of the floor tiles is perfectly clean, while the others are yellowed with age. You feel a creeping dread. This place is a lie.',
    effects: { stats: { sanity: -5 } },
    choices: [
      { text: "I need to find what's real.", next: 'C_followLaughter' },
    ],
  },
  C_playroom: {
    speaker: 'Narrator',
    text: 'The playroom is filled with vintage toys, all neatly arranged. Rocking horses, building blocks, dolls with vacant glass eyes. In the center of the room is a small table with a single, pristine, red apple on it. A music box on a shelf sits closed. One of the dolls is weeping silent, bloody tears.',
    choices: [
      { text: 'Take the Perfect Apple (Anomaly 1/5).', next: 'C_takeApple' },
      {
        text: 'Wipe the tears from the doll (Anomaly 2/5).',
        next: 'C_wipeTears',
      },
      { text: 'Open the music box.', next: 'C_musicBox' },
      { text: 'Leave.', next: 'C_followLaughter' },
    ],
  },
  C_takeApple: {
    speaker: 'Narrator',
    text: 'You pick up the apple. It feels real, but it has no scent. It is an anomaly, a thing of perfect order in a world of decay. The room flickers for a moment, and you see rusted, broken toys and child-sized bloodstains on the floor before it returns to "normal".',
    visualEffect: 'glitch',
    sfx: SFX.glitch,
    effects: {
      inventory: { add: 'perfect_apple' },
      flags: { set: 'C_anomaly1' },
    },
    choices: [{ text: 'One down.', next: 'C_playroom_after' }],
  },
  C_wipeTears: {
    speaker: 'Narrator',
    text: "You reach out and wipe the blood from the doll's cheek. It is warm and sticky. The doll's head slowly turns to look at you, its glass eyes now filled with a deep, ancient sorrow. This act of compassion is an anomaly here. The illusion wavers.",
    visualEffect: 'glitch',
    sfx: SFX.glitch,
    effects: { stats: { morality: 5 }, flags: { set: 'C_anomaly2' } },
    choices: [{ text: 'Two.', next: 'C_playroom_after' }],
  },
  C_musicBox: {
    speaker: 'Narrator',
    text: 'You open the music box. Instead of a sweet melody, it plays a discordant, screeching tune. A tiny, rotten human finger pops up and spins in place of a ballerina. You slam it shut.',
    sfx: SFX.musicBox,
    jumpscare: true,
    effects: { stats: { sanity: -10 } },
    choices: [{ text: 'Horrible.', next: 'C_playroom_after' }],
  },
  C_playroom_after: {
    speaker: 'Lily',
    text: "'Don't touch my things,' a voice whispers in your ear. You spin around, but no one is there.",
    sfx: SFX.shadow_whisper,
    effects: { stats: { sanity: -5 } },
    choices: [{ text: 'Leave.', next: 'C_checkAnomalies' }],
  },
  C_quietroom: {
    speaker: 'Narrator',
    text: 'This was a room for calming agitated children. The walls are padded. In the corner is a single, child-sized bed with a perfectly made blanket. A book lies on the pillow. The pages are completely, unnaturally blank.',
    choices: [
      { text: 'Take the Blank Book (Anomaly 3/5).', next: 'C_takeBook' },
      { text: 'Look under the bed.', next: 'C_underBed' },
      { text: 'Leave.', next: 'C_followLaughter' },
    ],
  },
  C_takeBook: {
    speaker: 'Narrator',
    text: 'You take the book. Its unnatural emptiness feels wrong in your hands. Another anomaly. The padded walls briefly appear torn and stained with dark, dried fluids before the illusion reasserts itself.',
    visualEffect: 'glitch',
    sfx: SFX.glitch,
    effects: { inventory: { add: 'blank_book' }, flags: { set: 'C_anomaly3' } },
    choices: [{ text: 'Three.', next: 'C_quietroom_after' }],
  },
  C_quietroom_after: {
    speaker: 'Narrator',
    text: 'The silence in here is now deafening. What now?',
    choices: [
      { text: 'Look under the bed.', next: 'C_underBed' },
      { text: 'Leave.', next: 'C_checkAnomalies' },
    ],
  },
  C_underBed: {
    speaker: 'Narrator',
    text: 'You kneel and look under the bed. Two small, pale hands dart out and grab your face, pulling you towards the darkness. You scream and scramble back. When you look again, there is nothing there.',
    jumpscare: true,
    effects: { stats: { sanity: -15, stamina: -10 } },
    choices: [{ text: 'Never again.', next: 'C_quietroom_after' }],
  },
  C_classroom: {
    speaker: 'Narrator',
    text: 'An old classroom. Chalk dust hangs in the air. On the blackboard, someone has written "I AM NOT REAL" over and over. A toy clock on the teacher\'s desk is ticking perfectly, its hands moving forward. On a medical tray is a single, gleaming scalpel, untouched by rust or time.',
    ambientSfx: [{ triggerWord: 'ticking', sfx: SFX.clock_tick_reverse }],
    choices: [
      { text: 'Take the Toy Clock (Anomaly 4/5).', next: 'C_takeClock' },
      { text: 'Take the Clean Scalpel (Anomaly 5/5).', next: 'C_takeScalpel' },
      { text: 'Look inside the desk.', next: 'C_openDesk' },
      { text: 'Leave.', next: 'C_followLaughter' },
    ],
  },
  C_takeClock: {
    speaker: 'Narrator',
    text: "You take the clock. In a place where time feels broken, its perfect function is a deep violation. An anomaly. The children's drawings on the wall morph into terrifying, monstrous shapes for a second.",
    visualEffect: 'glitch',
    sfx: SFX.glitch,
    effects: {
      inventory: { add: 'working_clock' },
      flags: { set: 'C_anomaly4' },
    },
    choices: [{ text: 'Four.', next: 'C_classroom_after' }],
  },
  C_takeScalpel: {
    speaker: 'Narrator',
    text: 'You take the scalpel. It is surgically clean. Impossible in this filthy place. Anomaly five. The words on the blackboard writhe like worms before settling back into place.',
    visualEffect: 'glitch',
    sfx: SFX.glitch,
    effects: {
      inventory: { add: 'clean_scalpel' },
      flags: { set: 'C_anomaly5' },
    },
    choices: [{ text: 'Five.', next: 'C_classroom_after' }],
  },
  C_classroom_after: {
    speaker: 'Narrator',
    text: 'The classroom feels wrong. You feel watched.',
    choices: [
      { text: 'Look inside the desk.', next: 'C_openDesk' },
      { text: 'Leave.', next: 'C_checkAnomalies' },
    ],
  },
  C_openDesk: {
    speaker: 'Narrator',
    text: "You open the teacher's desk. It is filled to the brim with human teeth. Hundreds of them, of all sizes. A small, child-like skull sits in the middle of them like a macabre jewel.",
    effects: { stats: { sanity: -10 } },
    choices: [{ text: 'Slam it shut.', next: 'C_classroom_after' }],
  },
  C_checkAnomalies: {
    speaker: 'Narrator',
    text: 'You feel a shift in the air, a weakening of the illusion.',
    choices: [
      {
        text: 'Continue.',
        next: 'C_lilyChaseStart',
        requires: {
          flags: [
            'C_anomaly1',
            'C_anomaly2',
            'C_anomaly3',
            'C_anomaly4',
            'C_anomaly5',
          ],
        },
      },
      { text: 'Go back to the ward.', next: 'C_followLaughter' },
    ],
  },
  C_lilyChaseStart: {
    speaker: 'Lily',
    npc: 'ghost',
    text: "'You broke my pretty room,' a little girl's voice whispers from right behind you, filled with cold rage. 'You broke all the rules. Now you have to play a new game. It's called HIDE.' You spin around. The hallway is twisting, warping, the murals on the wall screaming as the paint runs like blood. She is gliding towards you, her blank face a mask of fury.",
    bgm: BGM.descent,
    sfx: SFX.reality_warp,
    choices: [{ text: 'RUN!', next: 'C_chase_1' }],
  },
  C_chase_1: {
    speaker: 'Narrator',
    text: 'You run as the clean hallway around you decays in real time, plaster sloughing off to reveal weeping brickwork. Doors slam open and shut on their own. The floor ahead of you becomes the ceiling. You hear her laughter echoing from everywhere at once. You have to escape the twisting hallway!',
    choices: [
      {
        text: 'Leap across the chasm that just opened in the floor!',
        next: 'C_chase_Leap',
      },
      {
        text: 'Duck through a doorway that just appeared!',
        next: 'C_chase_Door',
      },
    ],
    timer: 5,
    defaultChoiceIndex: 1,
  },
  C_chase_Leap: {
    speaker: 'Narrator',
    text: 'You leap across the impossible gap, landing hard. But the perspective shifts again, and you find yourself running back the way you came, directly towards her.',
    effects: { stats: { stamina: -20, health: -10 } },
    choices: [{ text: "It's a trap!", next: 'C_lilyCatch' }],
  },
  C_chase_Door: {
    speaker: 'Narrator',
    text: "You dive through a shimmering doorway. You're in a long, dark corridor that seems to stretch into infinity. You hear her getting closer behind you. At the far end, you see a single, impossibly clean mirror.",
    choices: [{ text: 'Run for the mirror!', next: 'C_mirror' }],
  },
  C_lilyCatch: {
    speaker: 'Lily',
    isDeath: true,
    text: "'You can't run from my world,' she whispers as her icy hands phase through your chest and grip your heart. 'Now you can be one of my pretty things. Forever.'",
  },
  C_mirror: {
    speaker: 'Narrator',
    text: 'You sprint towards the mirror. Her chilling laughter is right behind you. As you reach it, your reflection holds out its hand. Do you take it?',
    choices: [
      { text: "Take your reflection's hand.", next: 'C_mirrorRealm' },
      { text: 'Smash the mirror.', next: 'C_smashMirrorFail' },
    ],
  },
  C_smashMirrorFail: {
    speaker: 'Narrator',
    text: "You try to smash the mirror, but your fist passes through it as if it's water. Lily's ghost emerges from the glass and embraces you in a soul-freezing hug.",
    choices: [{ text: 'Trapped.', next: 'C_lilyCatch' }],
  },
  C_mirrorRealm: {
    speaker: 'Narrator',
    text: 'You are pulled through the mirror into a twisted, negative version of the ward. The colors are inverted. Gravity feels wrong. Your reflection stands before you, but its face is a featureless mask of rage. This is her anger, given form. In the corner, you see the real Lily, a small, crying, translucent child. You have to reach her.',
    background:
      'https://images.unsplash.com/photo-1542337839-5147b3ce8431?q=80&w=2070&auto=format&fit=crop', // Inverted colors background
    choices: [
      { text: 'Confront the angry reflection.', next: 'C_confrontReflection' },
      { text: 'Go to the crying child.', next: 'C_comfortLily' },
    ],
  },
  C_confrontReflection: {
    speaker: 'Narrator',
    text: 'You face the reflection. It lets out a deafening psychic scream, and your mind is torn apart by pure, undiluted rage.',
    effects: { stats: { sanity: -100 } },
    choices: [{ text: 'Your mind breaks.', next: 'C_lilyCatch' }],
  },
  C_comfortLily: {
    speaker: 'Narrator',
    text: 'You ignore the monster and go to the crying child. You reach out, not with aggression, but with pity. "It\'s okay," you whisper. As you touch her, the angry reflection shrieks and shatters like glass. The world rights itself.',
    sfx: SFX.mirror_shatter,
    effects: { stats: { morality: 15 } },
    choices: [{ text: "It's over...", next: 'C_escape' }],
  },
  C_escape: {
    speaker: 'Lily',
    text: "'Thank you,' whispers the small, peaceful spirit of Lily, before fading away. You find yourself standing in a dusty, unused storage closet. She has freed you from her nightmare. You've escaped, but the memory of her rage chills you to the bone.",
    effects: { flags: { set: 'C_completed' } },
    choices: [
      {
        text: 'Find a way out of here.',
        next: { chapter: 'chapter2', key: 'start' },
      },
    ],
  },

  // ===================================================================
  // PATH D — THE HIVE (Survival/Action) - MASSIVELY EXPANDED
  // ===================================================================
  D_serviceStairs: {
    speaker: 'Narrator',
    text: 'You descend a set of rickety iron stairs into a service tunnel. The air is damp and smells of rust and something else... something sickly sweet, like rotting meat and honey. The only light comes from sparking electrical panels on the wall.',
    background:
      'https://images.unsplash.com/photo-1518600983133-273a35b1d973?q=80&w=2070&auto=format&fit=crop',
    bgm: BGM.lab,
    sfx: SFX.electric,
    revisitText:
      'You are at the top of the service tunnel stairs. The smell of decay is stronger now, almost choking.',
    choices: [
      { text: 'Proceed into the tunnel.', next: 'D_tunnel_1' },
      { text: 'Go back upstairs.', next: 'hallwayEntry' },
    ],
  },
  D_tunnel_1: {
    speaker: 'Narrator',
    npc: 'finch',
    text: "You find a man slumped against the wall, clutching a gruesome wound in his side. It's not a simple cut; the flesh around it is pulsating and growing crystalline, pulsating structures. He's wearing a researcher's lab coat. 'Don't... don't go any further,' he rasps, coughing up blood. 'It's a hive now... Subject 32... it... broke containment. It's in the vents... listening.'",
    choices: [
      { text: '"What is Subject 32?"', next: 'D_askAbout32' },
      {
        text: 'Use the adrenaline syringe on him. (Morality +10)',
        next: 'D_helpFinchSyringe',
        requires: { inventory: ['adrenaline_syringe'] },
      },
      { text: 'Leave him and press on. (Morality -10)', next: 'D_leaveFinch' },
    ],
  },
  D_helpFinchSyringe: {
    speaker: 'Finch',
    npc: 'finch',
    text: "You inject him with the stimulant. He gasps, color returning to his face. 'Gods... thank you. My name is Finch. The creature... it's drawn to sound, but fears intense cold. The pumping station has a coolant system... you might be able to use it. Here, take this.' He hands you his keycard.",
    effects: {
      inventory: { remove: 'adrenaline_syringe' },
      inventory: { add: 'researcher_keycard' },
      stats: { morality: 10 },
      flags: { set: 'D_helpedFinch' },
    },
    choices: [{ text: '"I\'ll see what I can do."', next: 'D_tunnel_2' }],
  },
  D_askAbout32: {
    speaker: 'Finch',
    npc: 'finch',
    text: "'An experiment... a psych-reactive agent fused with alien biology... it went wrong. It grows... it learns... it made this place its nest. It took the others. Their bodies are part of the walls now. It will take you too. The bulkhead door to the central labs is the only way out, but it has no power.'",
    choices: [{ text: 'Ask another question.', next: 'D_tunnel_1_afterAsk' }],
  },
  D_tunnel_1_afterAsk: {
    speaker: 'Narrator',
    text: 'The wounded researcher, Finch, looks at you with pleading eyes.',
    choices: [
      {
        text: 'Use the adrenaline syringe on him. (Morality +10)',
        next: 'D_helpFinchSyringe',
        requires: { inventory: ['adrenaline_syringe'] },
      },
      { text: 'Leave him and press on. (Morality -10)', next: 'D_leaveFinch' },
    ],
  },
  D_leaveFinch: {
    speaker: 'Narrator',
    text: 'You step over the dying man, ignoring his pleas. Your survival is all that matters.',
    effects: { stats: { morality: -10 } },
    choices: [{ text: 'Continue down the tunnel.', next: 'D_tunnel_2' }],
  },
  D_tunnel_2: {
    speaker: 'Narrator',
    text: 'The tunnel opens into a larger area. The walls are covered in a pulsating, organic webbing that seems to breathe. To your right is a small security office. Straight ahead, the path is blocked by a thick, vein-like tendril. Past that is the Pumping Station. The silence is broken by a wet, chittering sound from the vents above.',
    ambientSfx: [
      { triggerWord: 'chittering', sfx: SFX.monster_breathing_close },
      { triggerWord: 'pulsating', sfx: SFX.flesh_squirming },
    ],
    choices: [
      { text: 'Try to get past the tendril.', next: 'D_tendrilBlock' },
      { text: 'Check the security office.', next: 'D_securityOffice' },
    ],
  },
  D_tendrilBlock: {
    speaker: 'Narrator',
    text: 'The tendril is thick and rubbery. It pulses with a faint inner light. You need something to get through it.',
    choices: [
      {
        text: 'Cut it with the clean scalpel.',
        next: 'D_cutTendril',
        requires: { inventory: ['clean_scalpel'] },
      },
      { text: 'Go to the security office.', next: 'D_securityOffice' },
    ],
  },
  D_cutTendril: {
    speaker: 'Narrator',
    text: "You slice into the tendril. It lets out a psychic shriek that pierces your skull, and sprays you with acidic ichor. The path is clear, but the pain is intense, and you know you've alerted the entire hive to your presence.",
    sfx: SFX.fleshTear,
    effects: { stats: { health: -15, sanity: -10 } },
    choices: [{ text: 'Enter the Pumping Station.', next: 'D_pumpingStation' }],
  },
  D_securityOffice: {
    speaker: 'Narrator',
    text: 'The office is ransacked, covered in the same organic webbing. A terminal on a desk is still active. You also see a heavy iron pipe on the floor, and a canister of corrosive coolant under the desk.',
    choices: [
      { text: 'Use the terminal.', next: 'D_useTerminal' },
      { text: 'Take the iron pipe.', next: 'D_takePipe' },
      { text: 'Take the coolant canister.', next: 'D_takeCoolant' },
      { text: 'Leave.', next: 'D_tunnel_2' },
    ],
  },
  D_takePipe: {
    speaker: 'Narrator',
    text: 'You pick up the heavy iron pipe. It feels solid and reassuring in your hands.',
    effects: { inventory: { add: 'metal_pipe' } },
    choices: [{ text: 'A decent weapon.', next: 'D_securityOffice' }],
  },
  D_takeCoolant: {
    speaker: 'Narrator',
    text: 'You take the canister. A warning label shows it can melt through organic material. It feels volatile.',
    effects: { inventory: { add: 'coolant_canister' } },
    choices: [{ text: 'This could be very useful.', next: 'D_securityOffice' }],
  },
  D_useTerminal: {
    speaker: 'Narrator',
    text: "The terminal displays two options: 'Read Logs' and 'System Power Control'.",
    choices: [
      { text: 'Read Logs.', next: 'D_readTerminal' },
      { text: 'Access Power Control.', next: 'D_powerPuzzle' },
      { text: 'Step away.', next: 'D_securityOffice' },
    ],
  },
  D_readTerminal: {
    speaker: 'Narrator',
    text: "Last log: 'It's learned to mimic sounds. Lured Jenkins to his death with what sounded like his daughter crying. We have to activate the pump purge. Overload the system. It's the only way to flush it out of the main chamber. The manual for the bulkhead is in here somewhere. Power must be rerouted from Life Support to the Bulkhead.'",
    effects: { inventory: { add: 'researcher_log' } },
    choices: [{ text: 'I know what I need to do.', next: 'D_useTerminal' }],
  },
  D_powerPuzzle: {
    speaker: 'Narrator',
    text: "You access the power grid. Main power is flowing to 'Life Support'. You need to divert it to the 'Bulkhead Door'. However, the 'Emergency Containment' protocol is drawing auxiliary power and must be disabled first.",
    choices: [
      { text: 'Divert power to Bulkhead.', next: 'D_powerPuzzle_fail' },
      { text: 'Disable Emergency Containment.', next: 'D_powerPuzzle_step2' },
      { text: 'Exit.', next: 'D_useTerminal' },
    ],
  },
  D_powerPuzzle_fail: {
    speaker: 'Narrator',
    text: 'ERROR. Cannot divert main power while auxiliary protocols are active. A loud alarm blares, and you hear the creature screech from the next room.',
    sfx: SFX.alarm,
    choices: [{ text: 'Try again.', next: 'D_powerPuzzle' }],
  },
  D_powerPuzzle_step2: {
    speaker: 'Narrator',
    text: 'Emergency Containment disabled. The lights in the tunnel dim. You can now divert main power.',
    choices: [
      {
        text: 'Divert power from Life Support to Bulkhead Door.',
        next: 'D_powerOn',
      },
    ],
  },
  D_pumpingStation: {
    speaker: 'Narrator',
    text: 'You enter the pumping station. The central chamber has a grated floor over a deep reservoir of murky water. The creature, a pulsating mass of bone and flesh with too many limbs, is clinging to the ceiling above the main power conduit. You need to get past it to reach the pump controls on the far wall.',
    sfx: SFX.flesh_squirming,
    choices: [
      { text: 'Try to sneak past it.', next: 'D_sneakPast' },
      {
        text: 'Throw the coolant at it.',
        next: 'D_useCoolant',
        requires: { inventory: ['coolant_canister'] },
      },
      { text: 'Make a loud noise to distract it.', next: 'D_distractCreature' },
    ],
  },
  D_sneakPast: {
    speaker: 'Narrator',
    text: 'You try to creep along the wall. It twitches. A long, bony limb snaps down, impaling the floor where you were a second ago. It sees you.',
    choices: [{ text: 'FIGHT!', next: 'D_fightCreature' }],
  },
  D_distractCreature: {
    speaker: 'Narrator',
    text: 'You bang the pipe against the railing. The creature screeches and drops to the other side of the room to investigate the sound. This is your chance!',
    choices: [{ text: 'Run for the pump controls!', next: 'D_activatePump' }],
  },
  D_useCoolant: {
    speaker: 'Narrator',
    text: 'You throw the canister. It bursts on the creature, which lets out an unearthly shriek as the corrosive liquid dissolves its flesh. It thrashes wildly, wounded and enraged, but it gives you an opening.',
    sfx: SFX.monster_roar,
    effects: {
      inventory: { remove: 'coolant_canister' },
      stats: { morality: -5 },
    },
    choices: [{ text: 'Run for the pump controls!', next: 'D_activatePump' }],
  },
  D_fightCreature: {
    speaker: 'Narrator',
    text: 'It drops from the ceiling and lunges at you, a nightmare of clicking bone and dripping flesh.',
    choices: [
      {
        text: 'Swing the pipe at its head.',
        next: 'D_fightWin',
        requires: { inventory: ['metal_pipe'] },
      },
      { text: 'Dodge.', next: 'D_fightDodge' },
    ],
  },
  D_fightDodge: {
    speaker: 'Narrator',
    text: "You try to dodge, but it's too fast. A sharp, bony talon rips through your side. The pain is immense, and the world starts to go grey.",
    effects: { stats: { health: -100 } },
    choices: [{ text: "It's over.", next: 'D_creatureDeath' }],
  },
  D_fightWin: {
    speaker: 'Narrator',
    text: 'You swing the heavy pipe with all your might. It connects with a sickening CRUNCH. The creature stumbles back, momentarily stunned. You see your chance!',
    sfx: SFX.boneSnap,
    effects: { stats: { stamina: -20 } },
    choices: [{ text: 'Run for the pump controls!', next: 'D_activatePump' }],
  },
  D_creatureDeath: {
    isDeath: true,
    text: 'The creature pins you to the grated floor. You look down through the grate into the dark water below as its claws tear you apart. Your last sensation is the feeling of your own warm blood raining down into the reservoir.',
  },
  D_activatePump: {
    speaker: 'Narrator',
    text: "You reach the controls and hit the 'Emergency Purge' button. A klaxon blares. WARNING: CHAMBER FLOOD IN 30 SECONDS. A massive pump whines to life. You have to get out of here NOW, before you're washed away with it!",
    sfx: SFX.pumpWhine,
    choices: [{ text: 'Get out of the pump room!', next: 'D_pumpEscape' }],
  },
  D_pumpEscape: {
    speaker: 'Narrator',
    text: "Water begins to gush into the chamber. The creature is being pulled towards the drain, but it's thrashing and trying to crawl towards you! You have to run!",
    choices: [
      {
        text: 'Sprint for the exit! (Costs Stamina)',
        next: 'D_powerOn',
        requires: { stats: { stamina: 25 } },
      },
      { text: "I'm too slow...", next: 'D_drownDeath' },
    ],
    timer: 10,
    defaultChoiceIndex: 1,
  },
  D_drownDeath: {
    isDeath: true,
    text: "You're not fast enough. The torrent of water slams you against a wall, and the chamber fills completely. You are trapped, washed away into the dark depths with the monster.",
  },
  D_powerOn: {
    speaker: 'Narrator',
    text: "You make it out of the chamber just as the floodgate slams shut. You're soaked and exhausted, but alive. You make your way back to the security office and reroute the power. A confirmation message flashes: BULKHEAD POWER ONLINE. Alarms blare as you hear the heavy groan of the main bulkhead door unlocking. Then, a furious, enraged roar echoes from the flooded chamber. It survived. And it's coming for you.",
    sfx: SFX.alarm,
    bgm: BGM.descent,
    effects: {
      flags: { set: 'D_powerRestored' },
      setCheckpoint: true,
      stats: { stamina: -25 },
    },
    choices: [{ text: 'I have to run. NOW.', next: 'D_chaseBegin' }],
  },
  D_chaseBegin: {
    speaker: 'Narrator',
    text: "You burst out of the security office. The creature, dripping and mangled, is crawling on the ceiling, moving impossibly fast, its limbs scraping against the concrete. It's between you and the bulkhead door.",
    choices: [
      { text: 'Run straight for the door!', next: 'D_chase_1' },
      {
        text: 'Try to create a diversion!',
        next: 'D_chase_diversion',
        requires: { inventory: ['metal_pipe'] },
      },
    ],
  },
  D_chase_diversion: {
    speaker: 'Narrator',
    text: 'You throw the pipe down a side tunnel. The creature, distracted by the sound, scuttles off to investigate. You run for the bulkhead door.',
    effects: { stats: { stamina: -10 } },
    choices: [
      {
        text: 'Almost there!',
        next: 'D_checkOnFinch',
        requires: { flags: ['D_helpedFinch'] },
      },
      {
        text: 'Almost there!',
        next: 'D_escapeAlone',
        requires: { notFlags: ['D_helpedFinch'] },
      },
    ],
  },
  D_chase_1: {
    speaker: 'Narrator',
    text: 'You sprint towards the door. The creature drops from the ceiling in front of you, blocking your path. Its maw opens, revealing rows of needle-like teeth.',
    choices: [
      {
        text: 'Slide under its legs! (Costs Stamina)',
        next: 'D_chase_slide',
        requires: { stats: { stamina: 30 } },
      },
      { text: 'Try to dodge around it.', next: 'D_creatureDeath' },
    ],
    timer: 4,
    defaultChoiceIndex: 1,
  },
  D_chase_slide: {
    speaker: 'Narrator',
    text: 'You slide through the muck on the floor, under its thrashing limbs. You scramble to your feet and keep running for the door.',
    effects: { stats: { stamina: -25 } },
    choices: [
      {
        text: 'Keep running!',
        next: 'D_checkOnFinch',
        requires: { flags: ['D_helpedFinch'] },
      },
      {
        text: 'Keep running!',
        next: 'D_escapeAlone',
        requires: { notFlags: ['D_helpedFinch'] },
      },
    ],
  },
  D_checkOnFinch: {
    speaker: 'Narrator',
    text: 'You run back to where you left Finch. He\'s on his feet, looking stronger. "The door... it\'s open," you tell him. "I heard the commotion. Let\'s go!" Behind you, you hear the creature getting closer.',
    choices: [{ text: 'Escape with Finch.', next: 'D_escape' }],
  },
  D_escapeAlone: {
    speaker: 'Narrator',
    text: "You don't look back. You run for the now-open bulkhead door and seal it behind you. If Finch was still alive, he isn't anymore. You hear a faint scream from the tunnel before it's cut off by the thick steel.",
    choices: [{ text: 'You did what you had to do.', next: 'D_escape' }],
  },
  D_escape: {
    speaker: 'Narrator',
    text: "You find yourself in a sterile, white laboratory corridor. You are out of the service tunnels, but have entered the heart of the asylum's research wing. The true horror may have only just begun.",
    effects: { flags: { set: 'D_completed' } },
    choices: [
      {
        text: 'This is where it all started.',
        next: { chapter: 'chapter2', key: 'start' },
      },
    ],
  },
};
