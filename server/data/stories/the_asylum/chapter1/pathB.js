import { BGM, SFX } from '../../../audioData.js';
import { BG } from '../backgrounds.js';

export const pathB = {
  // ===================================================================
  // PATH B — ECHOES OF THE PAST (Puzzle/Lore) - MASSIVELY EXPANDED
  // ===================================================================
  B_followHumming: {
    speaker: 'Narrator',
    text: 'You follow the low, resonant humming to a flooded wing. Ankle-deep, murky water covers the floor, and the air is thick with the smell of mold and decay.',
    background: BG.flooded_wing,
    bgm: BGM.supernatural,
    sfx: SFX.waterDrip,
    choices: [{ text: '...', next: 'B_followHumming_b' }],
  },
  B_followHumming_b: {
    speaker: 'Narrator',
    text: "The humming seems to come from an old grandfather clock at the far end of the hall. Doors lead to what were once doctors' offices.",
    background: BG.flooded_wing,
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
    text: 'The clock is the source of the hum. Its face is missing a hand and a gear. Three slots are carved into its base, shaped like a tape reel, a locket, and a watch.',
    background: BG.flooded_wing,
    choices: [{ text: '...', next: 'B_clock_b' }],
  },
  B_clock_b: {
    speaker: 'Narrator',
    text: 'A plaque reads: "Remember our failures, lest they be repeated." You must present the memories of the doctors who died here.',
    background: BG.flooded_wing,
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
    text: 'The door is charred and melted. Inside, the room is a blackened husk. A skeleton in a lab coat is fused to a melted steel desk, its jaw open in a silent scream.',
    background: BG.flooded_wing,
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
    text: "As you approach, a ghostly image of Dr. Crane flickers into existence. 'The specimen is unstable! The reaction is... it's too hot!' he screams.",
    background: BG.flooded_wing,
    visualEffect: 'glitch',
    sfx: SFX.ghostly_moan,
    choices: [{ text: '...', next: 'B_examineCrane_b' }],
  },
  B_examineCrane_b: {
    speaker: 'Echo',
    npc: 'echo',
    speakerKey: 'doctor',
    text: "Spectral flames engulf him. The heat in the room intensifies, and your skin feels like it's starting to burn. You see something in the skeleton's charred hand.",
    background: BG.flooded_wing,
    effects: { stats: { sanity: -10, health: -5 } },
    choices: [{ text: "Take what's in its hand.", next: 'B_takeTape' }],
  },
  B_takeTape: {
    speaker: 'Narrator',
    text: "You reach into the skeleton's grasp. The bones crumble to dust as you take the object: a single, pristine audio tape, untouched by the flames.",
    background: BG.flooded_wing,
    choices: [{ text: '...', next: 'B_takeTape_b' }],
  },
  B_takeTape_b: {
    speaker: 'Narrator',
    text: "As you touch it, you feel an intense heat and hear the man's final, agonized screams in your mind. A memory of fire.",
    background: BG.flooded_wing,
    sfx: SFX.scream,
    effects: { inventory: { add: 'melted_tape' }, stats: { sanity: -10 } },
    choices: [
      { text: 'This is a piece of what happened here.', next: 'B_craneOffice' },
    ],
  },
  B_craneDrawer: {
    speaker: 'Narrator',
    text: 'The drawer is a solid mass of melted metal. You might be able to force it with a tool.',
    background: BG.flooded_wing,
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
    background: BG.flooded_wing,
    sfx: SFX.scraping,
    effects: { inventory: { add: 'valve_handle' } },
    choices: [{ text: 'This looks important.', next: 'B_craneOffice' }],
  },
  B_craneBox: {
    speaker: 'Narrator',
    text: "A small locked box, requiring a key. A note on it says 'Patient 14 - Effects'.",
    background: BG.flooded_wing,
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
    background: BG.flooded_wing,
    effects: { inventory: { add: 'drowned_locket' } },
    choices: [{ text: 'Take the locket.', next: 'B_craneOffice' }],
  },
  B_blackwoodOffice: {
    speaker: 'Narrator',
    text: 'This office is filled with diagrams of hydrotherapy equipment. A huge, glass-walled water tank dominates the room. Submerged at the bottom is a bloated, pale corpse.',
    background: BG.flooded_wing,
    choices: [{ text: '...', next: 'B_blackwoodOffice_b' }],
  },
  B_blackwoodOffice_b: {
    speaker: 'Narrator',
    text: 'A small, rusty key is tied to her wrist with a piece of string. A large valve on the side of the tank is missing its handle.',
    background: BG.flooded_wing,
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
    text: "As your hand enters the icy water, the corpse's eyes snap open. A spectral force grabs your arm, trying to pull you in! You scramble back just as its teeth snap shut.",
    background: BG.flooded_wing,
    jumpscare: true,
    sfx: SFX.water_splash_heavy,
    effects: { stats: { sanity: -15, health: -10 } },
    choices: [{ text: "I'm not doing that again!", next: 'B_blackwoodOffice' }],
  },
  B_drainTank: {
    speaker: 'Echo',
    npc: 'echo',
    speakerKey: 'doctor',
    text: 'You attach the handle and turn. With a groan, the tank begins to drain. A ghostly Dr. Blackwood appears, holding the patient under.',
    background: BG.flooded_wing,
    sfx: SFX.water_drain,
    visualEffect: 'glitch',
    choices: [{ text: '...', next: 'B_drainTank_b' }],
  },
  B_drainTank_b: {
    speaker: 'Echo',
    npc: 'echo',
    speakerKey: 'doctor',
    text: "'The results justify the means,' he whispers, his voice watery and distorted. He holds her until she stops struggling, then vanishes.",
    background: BG.flooded_wing,
    choices: [
      { text: 'The tank is empty now.', next: 'B_blackwoodOffice_drained' },
    ],
  },
  B_blackwoodOffice_drained: {
    speaker: 'Narrator',
    background: BG.flooded_wing,
    text: 'The tank is empty, the ghostly vision faded. The small key sits on the wrist of the corpse. At the bottom of the tank, you now see a large maintenance drain.',
    revisitText:
      'The tank is empty. The drain at the bottom looks like a possible way down.',
    choices: [
      { text: 'Take the small key.', next: 'B_takeSmallKey' },
      {
        text: 'Pry open the drain with the crowbar.',
        next: 'B_drainToPathD',
        requires: { inventory: ['crowbar'] },
      },
      { text: 'Leave.', next: 'B_followHumming' },
    ],
  },
  B_takeSmallKey: {
    speaker: 'Narrator',
    background: BG.flooded_wing,
    text: 'You take the small key from the corpse. Its skin is cold and rubbery.',
    effects: { inventory: { add: 'small_key' }, stats: { sanity: -10 } },
    choices: [{ text: 'Now, where does this go?', next: 'B_craneOffice' }],
  },
  B_drainToPathD: {
    speaker: 'Narrator',
    background: BG.flooded_wing,
    text: 'You climb into the empty tank and force the grate open with the crowbar. It leads into a tight, slimy pipe. You slide down, landing in the damp, buzzing service tunnels below.',
    sfx: SFX.water_drain,
    choices: [
      { text: 'You are now in the service tunnels.', next: 'D_tunnel_1' },
    ],
  },
  B_adlerOffice: {
    speaker: 'Narrator',
    text: 'The window of this office is shattered. The floor is covered in glass. A deep, body-shaped crater is in the center of the room, as if someone fell from a great height.',
    background: BG.flooded_wing,
    choices: [{ text: '...', next: 'B_adlerOffice_b' }],
  },
  B_adlerOffice_b: {
    speaker: 'Narrator',
    text: 'At the bottom of the crater, amidst the debris, you see a smashed pocket watch. A small note is pinned to the wall.',
    background: BG.flooded_wing,
    choices: [
      { text: 'Read the note.', next: 'B_readAdlerNote' },
      { text: 'Take the broken watch.', next: 'B_takeWatch' },
      { text: 'Leave.', next: 'B_followHumming' },
    ],
  },
  B_readAdlerNote: {
    speaker: 'Narrator',
    text: "The note is a research proposal. 'By inducing extreme gravitational trauma, it should be possible to sever the consciousness from the linear flow of time.'",
    background: BG.flooded_wing,
    choices: [{ text: '...', next: 'B_readAdlerNote_b' }],
  },
  B_readAdlerNote_b: {
    speaker: 'Narrator',
    text: "'I will be the first to witness eternity.' It's signed by Dr. Adler. It seems he tested his theory on himself.",
    background: BG.flooded_wing,
    effects: { inventory: { add: 'adler_note' } },
    choices: [{ text: 'He was insane.', next: 'B_adlerOffice' }],
  },
  B_takeWatch: {
    speaker: 'Echo',
    npc: 'echo',
    speakerKey: 'doctor',
    text: "You climb into the crater. A ghostly Dr. Adler stands on the shattered window ledge above. 'Time is a cage!' he screams, and leaps.",
    background: BG.flooded_wing,
    sfx: SFX.windHowl,
    choices: [{ text: '...', next: 'B_takeWatch_b' }],
  },
  B_takeWatch_b: {
    speaker: 'Narrator',
    text: 'You feel a sudden, terrifying vertigo, the sensation of falling, the rush of wind, the final, bone-shattering impact. A memory of time. You pick up the broken watch.',
    background: BG.flooded_wing,
    effects: { inventory: { add: 'broken_watch' }, stats: { sanity: -15 } },
    choices: [{ text: 'I have what I need from here.', next: 'B_adlerOffice' }],
  },
  B_clockSolved: {
    speaker: 'Narrator',
    text: 'You place the three objects into their respective slots. The humming intensifies to a deafening roar. The room shakes, and the water in the hallway begins to boil.',
    background: BG.flooded_wing,
    sfx: SFX.puzzleSuccess,
    effects: {
      inventory: { remove: ['melted_tape', 'drowned_locket', 'broken_watch'] },
    },
    choices: [{ text: 'What is happening?', next: 'B_finalVision' }],
  },
  B_finalVision: {
    speaker: 'Narrator',
    text: 'The world dissolves into a searing white light. You are in a pristine lab. The three doctors are arguing around a containment unit holding a pulsating, black mass.',
    background: BG.flooded_wing,
    sfx: SFX.reality_warp,
    visualEffect: 'glitch',
    choices: [{ text: '...', next: 'B_finalVision_b' }],
  },
  B_finalVision_b: {
    speaker: 'Narrator',
    text: "'It's too unstable!' Crane shouts. 'We proceed,' Blackwood scoffs. The mass ruptures, tearing the room apart. You are thrown back into your own time.",
    background: BG.flooded_wing,
    effects: { stats: { sanity: -25 } },
    choices: [{ text: 'That... that was the incident.', next: 'B_escape' }],
  },
  B_escape: {
    speaker: 'Narrator',
    text: 'You stand before the clock. The traumatic vision has ended. The front of the clock swings open, revealing a single, ornate key hanging from a hook.',
    background: BG.flooded_wing,
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
};
