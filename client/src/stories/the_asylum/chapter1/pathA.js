import { BGM, SFX } from '../../../data/audioData.js';
import { BG } from '../backgrounds.js';

export const pathA = {
  // ===================================================================
  // PATH A — THE ESCAPE ARTIST (Stealth/Puzzle) - MASSIVELY EXPANDED
  // ===================================================================
  A_nursesStation: {
    speaker: 'Narrator',
    text: 'The station is a Jackson Pollock of viscera and desperation. Papers are plastered to surfaces with drying blood.',
    background: BG.hallway_start,
    ambientSfx: [{ triggerWord: 'viscera', sfx: SFX.gore }],
    effects: { stats: { sanity: -2 } },
    choices: [{ text: '...', next: 'A_nursesStation_b' }],
  },
  A_nursesStation_b: {
    speaker: 'Narrator',
    text: "A nurse is slumped over a desk, a letter opener in her spine. A monitor flashes static. A drawer is labeled 'MAINTENANCE'. A heavy security locker stands in the corner.",
    background: BG.hallway_start,
    ambientSfx: [
      { triggerWord: 'static', sfx: SFX.static },
      { triggerWord: 'slumped', sfx: SFX.waterDrip },
    ],
    effects: { stats: { sanity: -8 } },
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
    text: 'You cautiously touch her cold shoulder. As you do, her body emits a soft, gassy sigh. Her head lolls sideways with a wet, sucking sound.',
    background: BG.hallway_start,
    jumpscare: { type: 'glitch', sfx: 'glitch', duration: 400 },
    ambientSfx: [{ triggerWord: 'sucking sound', sfx: SFX.gore }],
    choices: [{ text: '...', next: 'A_searchNurse_b' }],
  },
  A_searchNurse_b: {
    speaker: 'Narrator',
    text: 'It reveals a keycard pinned to her uniform, soaked in blood. Her dead, milky eyes seem to follow you.',
    background: BG.hallway_start,
    effects: { inventory: { add: 'keycard' }, stats: { sanity: -10 } },
    choices: [
      { text: 'What about that letter opener?', next: 'A_searchNurse_2' },
    ],
  },
  A_searchNurse_2: {
    speaker: 'You',
    text: 'I might need that. This is... grim. But I need to survive. No matter what.',
    background: BG.hallway_start,
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
    text: 'You grip the handle, your knuckles brushing against her cold, clammy skin. You pull the bloody letter opener from her back.',
    background: BG.hallway_start,
    choices: [{ text: '...', next: 'A_takeLetterOpener_b' }],
  },
  A_takeLetterOpener_b: {
    speaker: 'Narrator',
    text: 'It makes a sickening, wet SQUISH as it comes free, followed by the sound of tearing sinew, releasing a fresh wave of the coppery smell of death.',
    background: BG.hallway_start,
    ambientSfx: [{ triggerWord: 'SQUISH', sfx: SFX.fleshTear }],
    effects: { inventory: { add: 'letter_opener' }, stats: { morality: -5 } },
    choices: [{ text: 'Okay. I have it.', next: 'A_nursesStation' }],
  },
  A_maintDrawer: {
    speaker: 'Narrator',
    text: "It's stuck fast. The wood is swollen and warped with blood and other fluids. You'll need something to pry it open.",
    background: BG.hallway_start,
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
    text: 'The crowbar makes short work of the drawer, splintering it into pieces. Inside is a rolled-up vent schematic. An escape route is circled in red.',
    background: BG.hallway_start,
    sfx: SFX.woodSplinter,
    effects: { inventory: { add: 'elevator_schematic' } },
    choices: [{ text: 'Find that vent grate.', next: 'A_findVent' }],
  },
  A_openDrawer: {
    speaker: 'Narrator',
    text: 'The letter opener is barely strong enough. You jam it into the seam and pry. With a loud CRACK, the drawer pops open, but the tip of the opener snaps off.',
    background: BG.hallway_start,
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
    text: 'The monitor shows a grainy security feed of a padded cell. In the corner, a person is rocking back and forth. They look up at the camera.',
    background: BG.hallway_start,
    visualEffect: 'glitch',
    sfx: SFX.static,
    choices: [{ text: '...', next: 'A_checkMonitor_b' }],
  },
  A_checkMonitor_b: {
    speaker: 'Narrator',
    text: "Their face is twisted in a silent scream. It's you. The date on the screen is from three years ago. The words 'LET ME OUT' appear before the feed cuts out.",
    background: BG.hallway_start,
    textEffects: [
      { word: "It's you.", effect: 'shock' },
      { word: 'LET ME OUT', effect: 'red' },
    ],
    effects: { stats: { sanity: -15 } },
    choices: [
      { text: "That's... that's not possible...", next: 'A_nursesStation' },
    ],
  },
  A_examineLocker: {
    speaker: 'Narrator',
    text: "It's a heavy steel locker. A note taped to it is written in shaky, blood-smeared handwriting: 'Idiot janitor, the code is the date of the incident.'",
    background: BG.hallway_start,
    choices: [
      { text: 'Look for clues about the date.', next: 'A_guessLockerCode' },
      { text: 'Forget it.', next: 'A_nursesStation' },
    ],
  },
  A_guessLockerCode: {
    speaker: 'Narrator',
    text: "You find a yellowed newspaper on the floor nearby, dated October 23, 1987. The headline reads: 'Freak Electrical Accident at Asylum Claims Janitor'.",
    background: BG.hallway_start,
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
    background: BG.hallway_start,
    sfx: SFX.alarm,
    effects: { stats: { stamina: -5 } },
    choices: [{ text: 'Try again.', next: 'A_guessLockerCode' }],
  },
  A_openLocker: {
    speaker: 'Narrator',
    text: "The code works. The heavy door swings open. Inside are thick rubber gloves, a heavy, rust-stained crowbar, and a small, brass key labeled 'FC-01'.",
    background: BG.hallway_start,
    sfx: SFX.unlock,
    effects: {
      inventory: { add: ['rubber_gloves', 'crowbar', 'fan_control_key'] },
    },
    choices: [{ text: 'These look useful.', next: 'A_nursesStation' }],
  },
  A_findVent: {
    speaker: 'Narrator',
    text: 'Following the schematic, you find the vent grate low on the wall, half-hidden behind a fallen cabinet. The screws are rusted solid.',
    background: BG.hallway_start,
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
    text: 'You wedge the crowbar into the seam. The metal groans and screeches as you put your weight into it, your muscles straining.',
    background: BG.hallway_start,
    effects: { stats: { stamina: -10 } },
    choices: [{ text: '...', next: 'A_openVent_b' }],
  },
  A_openVent_b: {
    speaker: 'Narrator',
    text: 'With a final, loud SHREIK of tortured metal, the grate rips from the wall. The opening leads into a dark, cramped space that stinks of decay.',
    background: BG.hallway_start,
    effects: { stats: { stamina: -5 } },
    ambientSfx: [{ triggerWord: 'SHREIK', sfx: SFX.scraping }],
    choices: [{ text: 'Enter the vents.', next: 'A_ventCrawl_1' }],
  },
  A_ventCrawl_1: {
    speaker: 'Narrator',
    text: 'You crawl into the suffocating darkness, the metal cold against your skin. The vent is tight, scraping your back. The shaft splits. Left or right?',
    background: BG.maint_corridor,
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
    text: "You crawl towards the dripping. The shaft ends in a grate overlooking a shower room. The floor is covered in blood and hair. A patient's severed hand lies near the drain.",
    background: BG.maint_corridor,
    effects: { stats: { sanity: -10 } },
    choices: [{ text: 'Go back.', next: 'A_ventCrawl_1' }],
  },
  A_ventCrawl_2_correct: {
    speaker: 'Narrator',
    text: 'You follow the humming. It leads to another split. One path is blocked by a massive, spinning fan blade, but you see the corridor on the other side.',
    background: BG.maint_corridor,
    revisitText:
      'Back at the split in the vent. The fan is still blocking one path.',
    ambientSfx: [{ triggerWord: 'spinning', sfx: SFX.fan_whir }],
    choices: [{ text: '...', next: 'A_ventCrawl_2_correct_b' }],
  },
  A_ventCrawl_2_correct_b: {
    speaker: 'Narrator',
    text: 'The other path continues into darkness, a foul draft blowing from it.',
    background: BG.maint_corridor,
    choices: [
      { text: 'Try to get past the fan.', next: 'A_ventFanFail' },
      { text: 'Explore the dark path.', next: 'A_janitorsLairEntry' },
    ],
  },
  A_ventFanFail: {
    speaker: 'Narrator',
    text: "You inch closer to the fan. It's moving too fast, a blur of deadly steel. A loose piece of your clothing gets snagged and is instantly shredded. You need to turn it off.",
    background: BG.maint_corridor,
    choices: [{ text: 'Find another way.', next: 'A_ventCrawl_2_correct' }],
  },
  A_janitorsLairEntry: {
    speaker: 'Narrator',
    text: "The foul draft leads you to a grate. You look down into a small, squalid room. The Janitor's private lair. It's a workshop of human misery.",
    background: BG.janitor_lair,
    effects: { stats: { sanity: -10 } },
    choices: [{ text: '...', next: 'A_janitorsLairEntry_b' }],
  },
  A_janitorsLairEntry_b: {
    speaker: 'Narrator',
    text: 'Tools made of sharpened bone hang on the walls. Jars filled with formaldehyde and floating eyeballs line a shelf. This is where he brings his victims.',
    background: BG.janitor_lair,
    ambientSfx: [{ triggerWord: 'eyeballs', sfx: SFX.bone_saw }],
    effects: { stats: { sanity: -10 } },
    choices: [{ text: 'Drop down into his lair.', next: 'A_janitorsLair' }],
  },
  A_janitorsLair: {
    speaker: 'Narrator',
    text: 'You drop silently into the horrifying room. A single door leads out into the maintenance corridor. You can see the Fan Control room across the hall from here.',
    background: BG.janitor_lair,
    choices: [{ text: '...', next: 'A_janitorsLair_b' }],
  },
  A_janitorsLair_b: {
    speaker: 'Narrator',
    text: 'On the workbench, amidst clamps and bloody saws, is a keycard and a syringe filled with a green, viscous fluid.',
    background: BG.janitor_lair,
    choices: [
      { text: 'Take the syringe.', next: 'A_takeSyringe' },
      { text: 'Take the keycard.', next: 'A_takeLairKeycard' },
      { text: 'Sneak out the door.', next: 'A_maintCorridor_Entry' },
    ],
  },
  A_takeSyringe: {
    speaker: 'Narrator',
    text: "You pick up the syringe. A label reads 'Adrenal Stimulant'. Could be useful in a pinch, but using a dirty needle from this place is a huge risk.",
    background: BG.janitor_lair,
    effects: { inventory: { add: 'adrenaline_syringe' } },
    choices: [{ text: '...I might need this.', next: 'A_janitorsLair' }],
  },
  A_takeLairKeycard: {
    speaker: 'Narrator',
    text: "You take the keycard. It's labeled 'Junction Box Access'.",
    background: BG.janitor_lair,
    effects: { inventory: { add: 'junction_keycard' } },
    choices: [{ text: 'This could be important.', next: 'A_janitorsLair' }],
  },
  A_maintCorridor_Entry: {
    speaker: 'Narrator',
    text: 'You are in a claustrophobic maze of rusting pipes and humming electrical conduits. The air is cold and smells of rust and ozone.',
    background: BG.maint_corridor,
    bgm: BGM.maintenance,
    choices: [{ text: '...', next: 'A_maintCorridor_Entry_b' }],
  },
  A_maintCorridor_Entry_b: {
    speaker: 'Narrator',
    text: 'You hear a rhythmic, wet dragging sound echoing from deeper within, growing louder, closer.',
    background: BG.maint_corridor,
    sfx: SFX.janitor_drag,
    effects: { setCheckpoint: true },
    choices: [{ text: 'I have to face him.', next: 'A_maintCorridor_1' }],
  },
  A_maintCorridor_1: {
    speaker: 'Narrator',
    npc: 'janitor',
    text: 'Around a corner, you see him. A hulking Janitor, his face hidden by a stained sackcloth hood, dragging a bloody mop made of what looks like human hair.',
    background: BG.maint_corridor,
    choices: [{ text: '...', next: 'A_maintCorridor_1_b' }],
  },
  A_maintCorridor_1_b: {
    speaker: 'Narrator',
    text: 'He patrols a long stretch of corridor. To your left is a dark alcove. To your right, a room labeled "Junction Box 03". Further down is a door labeled "Fan Control".',
    background: BG.maint_corridor,
    revisitText:
      'Back in the maintenance corridor. The Janitor is still on his patrol. I need to be careful.',
    revisitSpeaker: 'You',
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
      {
        text: 'Examine a heavily bolted side door.',
        next: 'A_doorToPathB',
      },
    ],
  },
  A_doorToPathB: {
    speaker: 'Narrator',
    background: BG.maint_corridor,
    text: "You notice a heavy, rusted door marked 'Hydrotherapy Wing'. It's bolted shut from this side. It would be extremely noisy to open.",
    choices: [
      {
        text: 'Use the crowbar to force it open.',
        next: 'A_forceDoorToPathB',
        requires: { inventory: ['crowbar'] },
      },
      { text: 'Leave it. Too risky.', next: 'A_maintCorridor_1' },
    ],
  },
  A_forceDoorToPathB: {
    speaker: 'Narrator',
    background: BG.maint_corridor,
    text: "With a deafening series of screeches and groans, you wrench the bolts from the doorframe. The Janitor roars from down the hall, but you're already through, slamming the door behind you. You've switched paths, but he knows where you are now.",
    sfx: SFX.scraping,
    effects: { stats: { stamina: -20 }, flags: { set: 'janitor_knows_hydro' } },
    choices: [
      { text: "You're in the flooded wing now.", next: 'B_followHumming' },
    ],
  },
  A_watchPatrol: {
    speaker: 'Narrator',
    text: 'From the shadows, you watch his grim patrol. He drags his mop from one end of the corridor to the other, a slow, predictable route.',
    background: BG.maint_corridor,
    choices: [{ text: '...', next: 'A_watchPatrol_b' }],
  },
  A_watchPatrol_b: {
    speaker: 'Narrator',
    text: 'He lingers at the far end for a few moments, scraping something off the wall, before turning back. You could probably make a dash for a side room.',
    background: BG.maint_corridor,
    choices: [
      {
        text: 'Wait, then run for the Junction Box room. (Costs Stamina)',
        next: 'A_runForJunction',
      },
      {
        text: 'Wait, then run for the Fan Control room. (Costs Stamina)',
        next: 'A_runForFanControl',
      },
      { text: 'Stay hidden.', next: 'A_maintCorridor_1' },
    ],
  },
  A_runForFanControl: {
    speaker: 'Narrator',
    text: "You wait for him to turn, then sprint down the hall to the Fan Control door, your heart hammering in your chest. You fumble with the handle. It's locked.",
    background: BG.maint_corridor,
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
    text: 'The key slides in and turns. You slip inside the room just as you hear the Janitor starting his patrol back. The door clicks shut behind you.',
    background: BG.maint_corridor,
    sfx: SFX.unlock,
    choices: [{ text: 'That was too close.', next: 'A_fanControlRoom' }],
  },
  A_fanControlRoom: {
    speaker: 'Narrator',
    text: "The room contains a control panel for the ventilation fan. The emergency shut-off lever is here, but it's protected by a cage secured with a heavy, rusted bolt.",
    background: BG.maint_corridor,
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
    text: 'You try to creep past. A loose pipe shifts under your foot with a loud CLANG. The Janitor stops and turns his head with a slow, sickening crack of bone.',
    background: BG.maint_corridor,
    ambientSfx: [{ triggerWord: 'crack', sfx: SFX.boneSnap }],
    choices: [{ text: '...', next: 'A_sneakFail_b' }],
  },
  A_sneakFail_b: {
    speaker: 'Narrator',
    text: 'He sees you. He drops his mop and charges, faster than anything that big should move, letting out a guttural, inhuman ROARRRRRRRR....!!!! that smells of rot and murder.',
    background: BG.maint_corridor,
    textEffects: [{ word: 'ROARRRRRRRR....!!!!', effect: 'fear' }],
    choices: [
      { text: 'He catches you. The world goes black.', next: 'A_janitorCatch' },
    ],
  },
  A_janitorCatch: {
    isDeath: true,
    background: BG.maint_corridor,
    text: "The Janitor's massive, grimy hands close around your throat. He lifts you off the ground, your feet kicking uselessly as he squeezes. The last thing you hear is the sound of your own neck snapping.",
    textEffects: [{ word: 'snapping', effect: 'shock' }],
  },
  A_runForJunction: {
    speaker: 'Narrator',
    text: 'You wait for him to turn his back, then sprint for the side room. You throw the door open and slam it shut behind you just as his meaty fist smashes against it.',
    background: BG.maint_corridor,
    effects: { stats: { stamina: -15 } },
    choices: [{ text: 'That was too close.', next: 'A_junctionBoxRoom' }],
  },
  A_junctionBoxRoom: {
    speaker: 'Narrator',
    text: 'The room is filled with humming machinery. A large junction box is on the wall, its panel hanging open. Three thick, sparking cables have come loose.',
    background: BG.maint_corridor,
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
    text: 'You reach for a cable. A massive jolt of electricity throws you across the room. Your vision goes white, and you smell burning hair and cooking meat. Your own.',
    background: BG.maint_corridor,
    sfx: SFX.electric_spark_heavy,
    textEffects: [{ word: 'cooking meat. Your own.', effect: 'red' }],
    effects: { stats: { health: -40, sanity: -10 } },
    choices: [{ text: 'Agh... stupid, stupid!', next: 'A_junctionBoxRoom' }],
  },
  A_cableSuccess: {
    speaker: 'Narrator',
    text: 'The rubber gloves insulate you. You wrestle each heavy cable back into its socket. With a deafening CLANG, the lights in the corridor flicker and a distant whirring starts.',
    background: BG.maint_corridor,
    sfx: SFX.electric_spark_heavy,
    effects: { flags: { set: 'A_powerRestored' } },
    choices: [{ text: 'Time to get out of here.', next: 'A_maintCorridor_1' }],
  },
  A_stopFanSuccess: {
    speaker: 'Narrator',
    text: 'You wedge the crowbar under the bolt and heave. The bolt snaps with a loud CRACK. You throw open the cage and pull the emergency lever down.',
    background: BG.maint_corridor,
    effects: { stats: { stamina: -15 } },
    ambientSfx: [
      { triggerWord: 'CRACK', sfx: SFX.boneSnap },
      { triggerWord: 'lever', sfx: SFX.lever_creak_heavy },
    ],
    choices: [{ text: '...', next: 'A_stopFanSuccess_b' }],
  },
  A_stopFanSuccess_b: {
    speaker: 'Narrator',
    text: 'With a groan of tortured metal, the massive fan blades grind to a halt. The sudden silence is terrifying. And then you hear a bloodcurdling roar from down the corridor. He knows.',
    background: BG.maint_corridor,
    effects: { stats: { stamina: -5 } },
    sfx: SFX.monster_roar,
    textEffects: [{ word: 'roar', effect: 'anger' }],
    choices: [{ text: "He's coming!", next: 'A_chaseStart' }],
  },
  A_chaseStart: {
    speaker: 'Narrator',
    text: 'Heavy, running footsteps are getting closer. The Janitor is coming. You scramble back to the now-motionless fan blades and slip into the main ventilation shaft.',
    background: BG.maint_corridor,
    bgm: BGM.descent, // Chase Music
    effects: { setCheckpoint: true },
    choices: [{ text: 'RUN!', next: 'A_chase_1' }],
  },
  A_chase_1: {
    speaker: 'Narrator',
    text: 'The shaft is pitch black and slick with some foul ooze. You can hear him right behind you, his metal-toed boots clanging on the vent floor. The shaft splits. Left or Right?',
    background: BG.maint_corridor,
    choices: [
      { text: 'Go Left', next: 'A_chase_2_correct' },
      { text: 'Go Right', next: 'A_chase_2_fail' },
    ],
    timer: 6,
    defaultChoiceIndex: 1,
  },
  A_chase_2_fail: {
    speaker: 'Narrator',
    text: "You take the right path. It's a dead end. A heavy grate blocks the way. The Janitor's hulking form fills the tunnel behind you, blotting out the light.",
    background: BG.maint_corridor,
    choices: [{ text: 'Trapped like a rat.', next: 'A_janitorCatch' }],
  },
  A_chase_2_correct: {
    speaker: 'Narrator',
    text: 'You scramble down the left path. Ahead, a cloud of scalding steam is venting across the shaft, completely blocking the way!',
    background: BG.maint_corridor,
    ambientSfx: [{ triggerWord: 'steam', sfx: SFX.steam_hiss }],
    choices: [{ text: '...', next: 'A_chase_2_correct_b' }],
  },
  A_chase_2_correct_b: {
    speaker: 'Narrator',
    text: 'You can see an old shutoff valve on the wall just before the steam cloud. His grimy hand reaches through the darkness, just missing your leg.',
    background: BG.maint_corridor,
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
    background: BG.maint_corridor,
    effects: { stats: { health: -80 } },
    choices: [{ text: 'It hurts...', next: 'A_janitorCatch' }],
  },
  A_chase_turn_valve: {
    speaker: 'Narrator',
    text: 'You push yourself to the limit, your lungs burning. You grab the valve and turn with all your might. The steam cuts off with a hiss. You stumble through, exhausted, but alive.',
    background: BG.maint_corridor,
    effects: { stats: { stamina: -30 } },
    choices: [{ text: 'Keep going!', next: 'A_chase_3' }],
  },
  A_chase_use_syringe: {
    speaker: 'Narrator',
    text: 'You fumble for the syringe and jam it into your thigh. A jolt of pure fire floods your veins. You sprint through the steam before it can even touch you.',
    background: BG.maint_corridor,
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
    background: BG.maint_corridor,
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
    text: 'You kick the grate with the last of your strength. It flies open, and you spill out into the cold, rain-soaked air of a different part of the asylum grounds. You made it out.',
    background: BG.courtyard_rainy,
    bgm: BGM.courtyard,
    sfx: SFX.rain,
    effects: { flags: { set: 'A_completed' }, stats: { stamina: -10 } },
    choices: [
      { text: 'Keep moving', next: { chapter: 'chapter2', key: 'start' } },
    ],
  },
};
