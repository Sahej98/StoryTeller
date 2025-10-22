import { BGM, SFX } from '../../../data/audioData.js';
import { BG } from '../backgrounds.js';

export const pathD = {
  // ================================================================================================================================
  // PATH D — SENSORY LAB (ESCAPE: THE MAIN LIFT)
  // ================================================================================================================================
  D_lab_entry: {
    speaker: 'Narrator',
    text: 'You enter a sterile, white control room. A large computer terminal sits in the center. Doors lead to Specimen Storage and a Sensory Deprivation Chamber. A sealed service elevator is on the far wall; this looks like a primary way out, but it is dead and locked.',
    background: BG.lab_control_room,
    bgm: BGM.lab,
    revisitText:
      'The lab control room. The elevator awaits its three components, all of which must be somewhere in this wing.',
    choices: [
      { text: 'Access the terminal.', next: 'D_terminal' },
      { text: 'Enter Specimen Storage.', next: 'D_specimen_storage' },
      {
        text: 'Enter the Sensory Deprivation Chamber.',
        next: 'D_deprivation_chamber',
      },
      { text: 'Enter the locked Lab Sub-Level.', next: 'D_sublevel_door' },
      { text: 'Examine the Service Elevator.', next: 'D_elevator' },
      { text: 'Leave.', next: 'hub' },
    ],
  },
  D_specimen_storage: {
    speaker: 'Narrator',
    text: 'Rows of cages and tanks line the walls. You find a canister of cryo-coolant, a film reel labeled "Void", and a small bag of specimen food pellets.',
    background: BG.lab_specimen_storage,
    effects: {
      inventory: {
        add: ['cryo_coolant_canister', 'film_reel_c', 'specimen_food'],
      },
    },
    choices: [{ text: 'Take the items.', next: 'D_lab_entry' }],
  },
  // Deprivation Chamber Maze (15+ nodes)
  D_deprivation_chamber: {
    speaker: 'You',
    text: "This is it. The sensory deprivation chamber. It's pitch black. I have to go inside to find the codes.",
    background: BG.lab_deprivation_chamber,
    choices: [
      { text: 'Step into the darkness.', next: 'D_deprivation_puzzle_1' },
    ],
  },
  D_deprivation_puzzle_1: {
    speaker: 'Narrator',
    text: 'You are plunged into absolute darkness and silence. Your own heartbeat is a deafening drum. A faint whisper echoes from your left. Another from your right. You must choose the right path.',
    background: BG.lab_deprivation_chamber,
    bgm: null,
    sfx: SFX.heartbeat,
    effects: { stats: { sanity: -10 } },
    choices: [
      {
        text: 'Follow the left whisper ("turn back").',
        next: 'D_deprivation_fail',
      },
      {
        text: 'Follow the right whisper ("come closer").',
        next: 'D_deprivation_puzzle_2',
      },
    ],
  },
  D_deprivation_puzzle_2: {
    speaker: 'Narrator',
    text: 'You move forward. The whispers shift. One in front of you says "the only way out is through". One behind you says "it\'s a trap".',
    background: BG.lab_deprivation_chamber,
    effects: { stats: { sanity: -5 } },
    choices: [
      { text: 'Move forward.', next: 'D_deprivation_puzzle_3' },
      { text: 'Retreat.', next: 'D_deprivation_fail' },
    ],
  },
  D_deprivation_puzzle_3: {
    speaker: 'Narrator',
    text: 'You feel a wall in front of you. The whispers are on all sides now. "Lost", "Alone", "Forgotten". But one, directly to your right, whispers a sequence of numbers.',
    background: BG.lab_deprivation_chamber,
    effects: { stats: { sanity: -10 } },
    choices: [
      { text: 'Focus on the numbers.', next: 'D_deprivation_success' },
      {
        text: 'Listen to the despairing whispers.',
        next: 'D_deprivation_fail_sanity',
      },
    ],
  },
  D_deprivation_fail: {
    speaker: 'Narrator',
    text: 'You follow the wrong whisper. It leads you into a wall. The whispers laugh as your sanity frays. You find yourself back at the entrance.',
    background: BG.lab_deprivation_chamber,
    effects: { stats: { sanity: -15 } },
    choices: [{ text: 'Try again.', next: 'D_deprivation_puzzle_1' }],
  },
  D_deprivation_fail_sanity: {
    speaker: 'Narrator',
    text: 'You listen to the voices of despair and they overwhelm you. You collapse, your mind shattering into a million pieces.',
    background: BG.lab_deprivation_chamber,
    isDeath: true,
  },
  D_deprivation_success: {
    speaker: 'Narrator',
    text: 'You follow the correct whisper. Your hand finds a small, metallic plate on the wall. The lab security override codes are etched into it. You emerge, blinking, into the light.',
    background: BG.lab_deprivation_chamber,
    effects: { flags: { set: 'found_lab_codes' } },
    choices: [{ text: 'I have the codes.', next: 'D_lab_entry' }],
  },

  // Sub-level & Cryo-Bay (30+ nodes)
  D_sublevel_door: {
    speaker: 'Narrator',
    text: 'A heavy door is labeled "Lab Sub-Level". It is sealed by a sonic lock, which seems to control access to where the key components are stored.',
    background: BG.lab_control_room,
    choices: [
      {
        text: 'Attempt to bypass the lock.',
        next: 'D_bypass_sonic_lock',
        requires: { inventory: ['finchs_research_notes'] },
      },
      { text: 'I need a way to open this.', next: 'D_lab_entry' },
    ],
  },
  D_bypass_sonic_lock: {
    speaker: 'Narrator',
    text: "Following the instructions in Finch's notes, you realize you don't need a special tool, just the ability to input the right frequency on the lock's keypad. You enter the sequence from the notes. The lock shrieks and slides open.",
    sfx: SFX.puzzleSuccess,
    choices: [{ text: 'Enter the sub-level.', next: 'D_sublevel_entry' }],
  },
  D_sublevel_entry: {
    speaker: 'Narrator',
    text: 'You descend into a colder, more clinical area. Doors lead to Specimen Holding, the Behavioral Lab, the new Vivisection Lab, and the Cryo-Storage Wing.',
    background: BG.lab_sublevel,
    choices: [
      { text: 'Enter Specimen Holding.', next: 'D_sublevel_holding_entry' },
      { text: 'Enter the Behavioral Lab.', next: 'D_behavioral_lab' },
      { text: 'Enter the Vivisection Lab.', next: 'D_vivisection_entry' },
      { text: 'Enter the Cryo-Storage Wing.', next: 'D_cryo_entry' },
    ],
  },
  D_behavioral_lab: {
    speaker: 'Narrator',
    text: "This room contains a one-way mirror looking into an empty, padded cell. On a terminal, you find Finch's research notes on sonic frequencies, which mention a bypass for the sonic lock on this level. You also find a Frequency Tuner on a workbench.",
    background: BG.lab_behavioral,
    effects: {
      inventory: { add: ['finchs_research_notes', 'frequency_tuner'] },
    },
    choices: [
      {
        text: 'This is what I need for the elevator and the lock.',
        next: 'D_sublevel_entry',
      },
    ],
  },
  D_sublevel_holding_entry: {
    speaker: 'Narrator',
    text: 'The specimen holding area is a nightmare. Cages hold failed experiments. One cage, however, contains a terminal that controls the distribution of key components. A small, skittering creature has made a nest on top of it.',
    background: BG.lab_sublevel_holding,
    npc: 'skitter',
    choices: [
      { text: 'Try to scare the creature away.', next: 'D_scare_skitter' },
      {
        text: 'Lure the creature away with food.',
        next: 'D_lure_skitter',
        requires: { inventory: ['specimen_food'] },
      },
      { text: 'I need some bait to lure it away.', next: 'D_sublevel_entry' },
    ],
  },
  D_scare_skitter: {
    isDeath: true,
    text: 'You make a sudden move. The creature shrieks and leaps at your face, its claws digging into your eyes and its teeth finding your throat.',
  },
  D_lure_skitter: {
    speaker: 'Narrator',
    text: 'You toss a handful of the pellets into the far corner of the room. The skittering creature immediately abandons its perch on the terminal and scurries over to hungrily devour the food. The terminal is now accessible.',
    background: BG.lab_sublevel_holding,
    effects: { inventory: { remove: 'specimen_food' } },
    choices: [
      { text: 'Access the terminal.', next: 'D_sublevel_terminal' },
      { text: 'Leave it for now.', next: 'D_sublevel_entry' },
    ],
  },
  D_sublevel_terminal: {
    speaker: 'Narrator',
    text: 'You access the terminal. Using the override codes, you can release the spare parts. You dispense a replacement motor for the Hydrotherapy pump and a spare projector lens.',
    background: BG.lab_sublevel_terminal,
    effects: { inventory: { add: ['pump_motor', 'projector_lens'] } },
    choices: [{ text: '[PATH CHANGER] Take the items.', next: 'D_lab_entry' }],
  },
  D_vivisection_entry: {
    speaker: 'Narrator',
    text: 'This lab is a Bosch painting of gore. Half-dissected creatures are on display in glass tanks. In the center is a surgical table with a grotesque, partially dissected creature. A terminal next to it is active.',
    background: BG.lab_behavioral,
    choices: [
      { text: 'Access the terminal.', next: 'D_vivisection_terminal' },
      { text: 'Leave.', next: 'D_sublevel_entry' },
    ],
  },
  D_vivisection_terminal: {
    speaker: 'Narrator',
    text: "The terminal screen shows a diagram of the creature's unique biology. Log Entry: 'Organism designated 'Stalker'. Unable to extract the power regulator chip from its sternum while biological functions are active. Attempting remote surgical override to induce cardiac arrest for safe removal.'",
    background: BG.lab_sublevel_terminal,
    choices: [
      { text: 'Initiate Surgical Override.', next: 'D_vivisection_puzzle' },
      { text: 'Back away.', next: 'D_vivisection_entry' },
    ],
  },
  D_vivisection_puzzle: {
    speaker: 'Narrator',
    text: "The terminal displays a complex waveform. 'Calibrate the resonance scalpel to match the subject's cardiac frequency.' A simple mini-game of matching patterns appears. It seems more like a test of nerve than skill.",
    background: BG.lab_sublevel_terminal,
    choices: [
      { text: 'Match the top frequency.', next: 'D_vivisection_success' },
      { text: 'Match the bottom frequency.', next: 'D_vivisection_fail' },
    ],
  },
  D_vivisection_fail: {
    speaker: 'Narrator',
    text: "You select the wrong frequency. The machine emits a piercing shriek. The creature on the table convulses, and its eyes snap open. The terminal flashes: 'FATAL ERROR. SUBJECT REVIVED.' The Cryo-Stalker leaps from the table!",
    background: BG.lab_behavioral,
    sfx: SFX.monster_roar,
    jumpscare: {
      type: 'sprite',
      character: 'cryo_stalker',
      sfx: 'monster_roar',
    },
    choices: [{ text: 'RUN!', next: 'D_cryo_chase' }],
  },
  D_vivisection_success: {
    speaker: 'Narrator',
    text: "You match the frequency. The terminal confirms: 'Calibration successful. Inducing cardiac arrest.' The creature on the table goes limp. A compartment on the surgical table opens, revealing the Power Regulator Chip. You take it. But then, the terminal flashes red: 'WARNING: CATASTROPHIC REANIMATION PROTOCOL INITIATED.' The creature's 'corpse' begins to frost over and twitch.",
    background: BG.lab_sublevel_terminal,
    sfx: SFX.puzzleSuccess,
    effects: { inventory: { add: 'power_regulator_chip' } },
    choices: [{ text: 'What have I done?', next: 'D_vivisection_chase_start' }],
  },
  D_vivisection_chase_start: {
    speaker: 'Narrator',
    npc: 'cryo_stalker',
    text: 'The creature, now encased in a shell of ice, rises from the table. The Cryo-Stalker is born. It lets out a chittering scream and lunges!',
    background: BG.lab_behavioral,
    sfx: SFX.monster_roar,
    jumpscare: {
      type: 'sprite',
      character: 'cryo_stalker',
      sfx: 'monster_roar',
    },
    choices: [{ text: 'GET OUT!', next: 'D_cryo_chase' }],
  },
  D_cryo_entry: {
    speaker: 'Narrator',
    text: 'The air here is freezing. Frost covers everything. Rows of cryo-pods line the walls. One is shattered, its occupant missing. You need a hazmat suit to proceed deeper.',
    background: BG.lab_cryo_bay,
    choices: [
      { text: 'Find a hazmat suit.', next: 'D_find_suit' },
      { text: 'This is too cold.', next: 'D_sublevel_entry' },
    ],
  },
  D_find_suit: {
    speaker: 'Narrator',
    text: 'You find a hazmat suit in a locker. It will protect you from the cold. Tucked into its pocket is a datapad.',
    background: BG.lab_cryo_bay,
    effects: { inventory: { add: 'hazmat_suit' } },
    choices: [
      { text: 'Suit up and check the datapad.', next: 'D_cryo_datapad' },
    ],
  },
  D_cryo_datapad: {
    speaker: 'Narrator',
    text: "Datapad Log: 'We moved the Stalker specimen to the Vivisection Lab for extraction of the chip. The damn thing's body temperature is dropping so fast it's flash-freezing the entire wing. I'm not going back in there without a suit.'",
    background: BG.lab_cryo_bay,
    choices: [
      {
        text: 'So the power regulator is in the Vivisection Lab.',
        next: 'D_cryo_deep',
      },
    ],
  },
  D_cryo_deep: {
    speaker: 'Narrator',
    text: 'Deeper in, the cryo-bay ends in a shattered pod. Whatever was inside is long gone. A chill runs down your spine. This is a dead end. You hear a faint skittering from the vents above.',
    background: BG.lab_cryo_bay,
    choices: [
      { text: 'This was a waste of time. Get out.', next: 'D_sublevel_entry' },
    ],
  },
  D_cryo_chase: {
    speaker: 'Narrator',
    npc: 'cryo_stalker',
    text: 'The Cryo-Stalker is fast. You can try to use a prototype Cryo-Laser on a workbench to freeze it, or make a run for it.',
    background: BG.lab_cryo_bay,
    choices: [
      { text: 'Grab the Cryo-Laser and fire.', next: 'D_use_cryo_laser' },
      { text: 'Run!', next: 'D_cryo_run' },
    ],
  },
  D_use_cryo_laser: {
    speaker: 'Narrator',
    text: 'You grab the weapon and fire. The beam hits the creature, freezing it solid. It SHATTERS into a million pieces. You are safe. Amidst the icy fragments, you find a heavy, greasy key.',
    textEffects: [{ word: 'SHATTERS', effect: 'shock' }],
    background: BG.lab_cryo_bay,
    effects: { inventory: { add: ['cryo_laser', 'service_elevator_key'] } },
    choices: [
      {
        text: 'The elevator key... Now I have all three parts.',
        next: 'D_sublevel_entry',
      },
    ],
  },
  D_cryo_run: {
    isDeath: true,
    text: "You run, but it's faster in the cold. It tackles you, its icy claws piercing your suit and your flesh.",
  },

  // Elevator Gauntlet (15+ nodes)
  D_terminal: {
    speaker: 'Narrator',
    text: 'The terminal requires override codes to access the elevator controls.',
    background: BG.lab_control_room,
    choices: [
      {
        text: 'Enter the override codes.',
        next: 'D_terminal_success',
        requires: { flags: ['found_lab_codes'] },
      },
    ],
  },
  D_terminal_success: {
    speaker: 'Narrator',
    text: 'CODES ACCEPTED. You can now access the elevator controls. You need to install the Power Regulator Chip to restore power.',
    background: BG.lab_control_room,
    revisitText: 'Elevator control is active. Awaiting component installation.',
    choices: [
      {
        text: 'Install the Power Regulator Chip.',
        next: 'D_install_chip',
        requires: { inventory: ['power_regulator_chip'] },
      },
      { text: 'Go back.', next: 'D_lab_entry' },
    ],
  },
  D_install_chip: {
    speaker: 'Narrator',
    text: "You install the chip. The terminal whirs and the elevator's power indicator turns green. POWER RESTORED. A heavy THUNK echoes as the magnetic clamps on the elevator disengage automatically.",
    background: BG.lab_control_room,
    textEffects: [{ word: 'THUNK', effect: 'shock' }],
    effects: { flags: { set: 'elevator_powered', set: 'clamps_released' } },
    choices: [{ text: 'Just the key now.', next: 'D_terminal_success' }],
  },
  D_elevator: {
    speaker: 'Narrator',
    text: 'The service elevator. The final exit. The light is green. The clamps are released. It needs the key and the frequency tuner to be installed.',
    background: BG.lab_control_room,
    choices: [
      {
        text: 'Install all components and escape.',
        next: 'D_lab_escape',
        requires: {
          inventory: ['service_elevator_key', 'frequency_tuner'],
          flags: ['elevator_powered'],
        },
      },
      { text: 'I still need to complete all the steps.', next: 'D_lab_entry' },
    ],
  },
  D_lab_escape: {
    speaker: 'Narrator',
    text: 'You install the final components. The elevator hums to life, and the heavy doors grind open. You step inside, leaving the horrors of the West Wing behind.',
    background: BG.lab_control_room,
    bgm: BGM.descent,
    sfx: SFX.unlock,
    effects: { flags: { set: 'D_ch2_escaped' } },
    choices: [{ text: 'The elevator descends...', next: 'end_chapter' }],
  },
};
