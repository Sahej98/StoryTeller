import { BGM, SFX } from '../../data/audioData.js';
import { BG } from './backgrounds.js';

export const chapter2 = {
  // ===================================================================
  // HUB & INTRO - DYNAMIC
  // ===================================================================
  start: {
    speaker: 'Narrator',
    text: "You've made it to the West Wing. The air here is colder, stagnant with the ghost of forgotten suffering. A sign hangs crookedly: 'Where Hope Sleeps'. Your only way forward is a sealed service elevator at the heart of this wing's experimental lab. To escape, you'll need its key, its power restored, and its lockdown clamps released.",
    background: BG.west_wing_entrance,
    bgm: BGM.tension,
    textEffects: [{ word: "'Where Hope Sleeps'", effect: 'whisper' }],
    revisitText:
      'You are back at the entrance to the West Wing. The silence is heavy and judgmental. You can hear the faint, rhythmic clanking of The Technician somewhere in the walls. You need to find the elevator key from the Morgue, the power regulator from the Surgical Wing, and the frequency tuner from Rec Therapy.',
    effects: { setCheckpoint: true },
    choices: [
      {
        text: 'Descend to the Morgue Complex (Path A)',
        next: 'A_morgue_entry',
      },
      {
        text: 'Investigate Aural & Ocular Therapy (Path B)',
        next: 'B_rec_entry',
      },
      {
        text: 'Search the Surgical & Pharmaceutical Wing (Path C)',
        next: 'C_infirmary_entry',
      },
      {
        text: 'Find the Sensory Experimentation Lab (Path D)',
        next: 'D_lab_entry',
      },
    ],
  },

  // ================================================================================================================================
  // PATH A — THE MORGUE (DIRECTOR'S CUT EXPANSION: 80+ NODES)
  // ================================================================================================================================
  A_morgue_entry: {
    speaker: 'Narrator',
    text: 'You find a stairwell leading down into a chilling darkness. The air grows rank with the smell of formaldehyde and rot. This is the path to the morgue.',
    background: BG.morgue_receiving,
    bgm: BGM.descent,
    effects: { stats: { sanity: -5 } },
    ambientSfx: [{ triggerWord: 'rot', sfx: SFX.waterDrip }],
    choices: [
      { text: 'Descend into the cold.', next: 'A_morgue_receiving' },
      { text: 'This is a bad idea. Go back.', next: 'start' },
    ],
  },
  A_morgue_receiving: {
    speaker: 'Narrator',
    text: "You enter the morgue's receiving room. Empty gurneys line the walls. Doors lead to the Autopsy Theater, Cold Storage, the Embalming Room, the Crematorium, the Coroner's Office, and the Pathology Lab.",
    background: BG.morgue_receiving,
    revisitText:
      'The receiving room is quiet but the sense of dread is stronger. Autopsy, Cold Storage, Embalming, Crematorium, Office, and Pathology Lab await.',
    choices: [
      { text: 'Examine the note on the gurney.', next: 'A_read_gurney_note' },
      { text: 'Enter the Autopsy Theater.', next: 'A_autopsy_entry' },
      { text: 'Enter Cold Storage.', next: 'A_cold_storage_entry' },
      { text: 'Enter the Embalming Room.', next: 'A_embalming_entry' },
      { text: 'Enter the Crematorium.', next: 'A_crematorium_entry' },
      { text: "Try the Coroner's Office door.", next: 'A_office_door' },
      { text: 'Approach the Pathology Lab.', next: 'A_pathology_approach' },
      { text: 'Go back upstairs.', next: 'start' },
    ],
  },
  A_read_gurney_note: {
    speaker: 'Narrator',
    text: "The note reads: 'Coroner's gone mad. He's stitching things together in Pathology. He locked his office and took the key with him. I saw him put it on the gurney for Patient #113 before they took it to cold storage.'",
    background: BG.morgue_receiving,
    sfx: SFX.paperRustle,
    choices: [
      {
        text: 'So the office key is in cold storage.',
        next: 'A_morgue_receiving',
      },
    ],
  },

  // Morgue - Autopsy & Embalming (20+ nodes)
  A_autopsy_entry: {
    speaker: 'Narrator',
    text: 'The autopsy theater is dominated by a stained steel table under a harsh, buzzing light. The room is a temple to dissection.',
    background: BG.morgue_autopsy,
    bgm: BGM.descent,
    ambientSfx: [
      { triggerWord: 'buzzing', sfx: SFX.lightBuzz },
      { triggerWord: 'dissection', sfx: SFX.waterDrip },
    ],
    revisitText: 'The autopsy room. Instruments of deconstruction await.',
    choices: [
      { text: 'Check the instrument trays.', next: 'A_instrument_trays' },
      { text: 'Examine a locked cabinet.', next: 'A_autopsy_cabinet' },
      { text: 'Search for clues.', next: 'A_autopsy_clues' },
      { text: 'Leave.', next: 'A_morgue_receiving' },
    ],
  },
  A_instrument_trays: {
    speaker: 'Narrator',
    text: 'Trays of wicked-looking instruments lie neatly arranged, including a heavy, motorized bone saw. It seems to be missing its blade.',
    background: BG.morgue_autopsy,
    choices: [
      {
        text: 'Take the bone saw motor.',
        next: 'A_takeBoneSaw',
        requires: { notFlags: ['has_bone_saw'] },
      },
      {
        text: 'Combine motor with blade.',
        next: 'A_assemble_saw',
        requires: {
          inventory: ['bone_saw_motor', 'saw_blade'],
          notFlags: ['has_bone_saw'],
        },
      },
      { text: 'Leave the tools.', next: 'A_autopsy_entry' },
    ],
  },
  A_takeBoneSaw: {
    speaker: 'You',
    text: "Just the motor housing. The blade is missing. I'll need to find it.",
    background: BG.morgue_autopsy,
    effects: { inventory: { add: 'bone_saw_motor' } },
    choices: [{ text: 'Keep looking.', next: 'A_autopsy_entry' }],
  },
  A_assemble_saw: {
    speaker: 'Narrator',
    text: 'You attach the blade to the motor. With a satisfying click, the bone saw is complete. As your fingers close around the grip, a flash of a memory not your own assaults you: the high-pitched WHINE of the motor, the spray of bone dust, a scream that is abruptly cut short.',
    background: BG.morgue_autopsy,
    sfx: SFX.drill_whirr,
    jumpscare: true,
    textEffects: [{ word: 'WHINE', effect: 'shock' }],
    effects: {
      inventory: { add: 'bone_saw' },
      inventory: { remove: ['bone_saw_motor', 'saw_blade'] },
      stats: { sanity: -10, morality: -5 },
      flags: { set: 'has_bone_saw' },
    },
    choices: [{ text: 'This... will be useful.', next: 'A_autopsy_entry' }],
  },
  A_autopsy_clues: {
    speaker: 'Narrator',
    text: 'Tucked under a blotter, you find a torn scrap of paper with hastily scrawled chemical symbols. It looks like part of a formula.',
    background: BG.morgue_autopsy,
    effects: { inventory: { add: 'acid_formula_part_3' } },
    choices: [{ text: 'Take the formula scrap.', next: 'A_autopsy_entry' }],
  },
  A_autopsy_cabinet: {
    speaker: 'Narrator',
    text: "A locked medical cabinet. It requires the key from the Coroner's office.",
    background: BG.morgue_autopsy,
    choices: [
      {
        text: "Use the Coroner's Office Key.",
        next: 'A_unlock_autopsy_cabinet',
        requires: { inventory: ['coroner_office_key'] },
      },
      { text: 'I need that key.', next: 'A_autopsy_entry' },
    ],
  },
  A_unlock_autopsy_cabinet: {
    speaker: 'Narrator',
    text: 'The key turns with a click. Inside is a bottle of concentrated hydrogen peroxide and a heavy wrench.',
    background: BG.morgue_autopsy,
    sfx: SFX.unlock,
    effects: { inventory: { add: ['hydrogen_peroxide', 'wrench'] } },
    choices: [{ text: 'Take the items.', next: 'A_autopsy_entry' }],
  },
  A_embalming_entry: {
    speaker: 'Narrator',
    text: 'The embalming room is lined with shelves of chemicals. A faded recipe chart hangs on the wall. The room reeks of chemicals, but one shelf seems to hold the components for a powerful solvent.',
    background: BG.morgue_embalming,
    revisitText: 'The embalming room. The chemicals are waiting.',
    choices: [
      {
        text: 'Examine the shelves of chemicals.',
        next: 'A_embalming_chemicals',
      },
      {
        text: 'Attempt to mix the acidic compound.',
        next: 'A_check_for_acid_mix',
      },
      { text: 'Leave.', next: 'A_morgue_receiving' },
    ],
  },
  A_embalming_chemicals: {
    speaker: 'Narrator',
    text: 'The shelves are stocked with various chemicals. You find bottles of formaldehyde, glycerin, methanol, and sulfuric acid.',
    background: BG.morgue_embalming,
    choices: [
      {
        text: 'Take a bottle of Sulfuric Acid.',
        next: 'A_take_acid',
        requires: { notFlags: ['has_sulfuric_acid'] },
      },
      { text: 'Leave the chemicals.', next: 'A_embalming_entry' },
    ],
  },
  A_take_acid: {
    speaker: 'You',
    text: 'This stuff is no joke. It could eat through metal... or flesh.',
    background: BG.morgue_embalming,
    effects: {
      inventory: { add: 'sulfuric_acid' },
      flags: { set: 'has_sulfuric_acid' },
    },
    choices: [{ text: 'Handle with care.', next: 'A_embalming_entry' }],
  },
  A_check_for_acid_mix: {
    speaker: 'Narrator',
    text: 'You check the formula scraps. It requires Sulfuric Acid, Hydrogen Peroxide, and Acetone.',
    background: BG.morgue_embalming,
    choices: [
      {
        text: 'Mix the acidic compound.',
        next: 'A_mix_acid',
        requires: {
          inventory: [
            'acid_formula_part_1',
            'acid_formula_part_2',
            'acid_formula_part_3',
            'sulfuric_acid',
            'hydrogen_peroxide',
            'acetone',
          ],
        },
      },
      { text: "I'm missing something.", next: 'A_embalming_entry' },
    ],
  },
  A_mix_acid: {
    speaker: 'Narrator',
    text: 'Following the formula, you mix the volatile chemicals. The resulting compound smokes and hisses. It should be enough to temporarily disable the amalgam.',
    background: BG.morgue_embalming,
    sfx: SFX.steam_hiss,
    effects: {
      inventory: { add: 'acidic_compound' },
      inventory: { remove: ['sulfuric_acid', 'hydrogen_peroxide', 'acetone'] },
    },
    choices: [{ text: 'Time to clear a path.', next: 'A_embalming_entry' }],
  },

  // Morgue - Cold Storage & Archives (20+ nodes)
  A_cold_storage_entry: {
    speaker: 'Narrator',
    text: 'The cold storage is lined with refrigerated lockers. The air is cold, but not freezing. A logbook is on a desk. A door leads deeper into the Specimen Archives. A dumbwaiter is frozen shut.',
    background: BG.morgue_cold_storage,
    ambientSfx: [{ triggerWord: 'cold', sfx: SFX.windHowl }],
    revisitText:
      'Cold storage. The iced-over dumbwaiter is on the far wall. The path to the archives is open.',
    choices: [
      { text: 'Read the locker logbook.', next: 'A_read_locker_log' },
      { text: 'Examine locker A-07.', next: 'A_open_locker_113' },
      { text: 'Enter the Specimen Archives.', next: 'A_archives_entry' },
      {
        text: 'Examine the iced-over dumbwaiter (Path Changer).',
        next: 'A_iced_dumbwaiter',
      },
      { text: 'Leave.', next: 'A_morgue_receiving' },
    ],
  },
  A_read_locker_log: {
    speaker: 'Narrator',
    text: "Log: 'Finch's experiments are reanimating tissue... Bay C is a lost cause. Patient #113 is in Bay A, the one who swallowed the office key.'",
    background: BG.morgue_cold_storage,
    sfx: SFX.paperRustle,
    choices: [
      {
        text: 'Patient 113... from the Surgical Wing ledger.',
        next: 'A_cold_storage_entry',
      },
    ],
  },
  A_open_locker_113: {
    speaker: 'Narrator',
    text: "You slide out the slab. The body of Patient #113 is gaunt and still. On the gurney next to it is a small key. This must be for the Coroner's Office.",
    background: BG.morgue_cold_storage,
    sfx: SFX.unlock,
    effects: {
      flags: { set: 'body_113_ready' },
      inventory: { add: 'morgue_office_key' },
    },
    choices: [{ text: 'Take the key.', next: 'A_cold_storage_entry' }],
  },
  A_iced_dumbwaiter: {
    speaker: 'Narrator',
    text: "This dumbwaiter is completely sealed by a thick layer of ice. The metal is too cold to touch. You'll need a powerful heat source to melt this.",
    background: BG.morgue_cold_storage,
    choices: [
      {
        text: 'Use the Soldering Iron.',
        next: 'A_melt_ice',
        requires: { inventory: ['soldering_iron'] },
      },
      { text: 'Go back.', next: 'A_cold_storage_entry' },
    ],
  },
  A_melt_ice: {
    speaker: 'Narrator',
    text: "You use the soldering iron on the ice. It slowly melts with a loud HISS, revealing a dumbwaiter shaft leading to the Surgical Wing's specimen room.",
    background: BG.morgue_cold_storage,
    sfx: SFX.steam_hiss,
    textEffects: [{ word: 'HISS', effect: 'shake' }],
    choices: [
      {
        text: '[PATH CHANGER] Climb into the dumbwaiter.',
        next: 'C_dumbwaiter_arrival',
      },
    ],
  },
  A_archives_entry: {
    speaker: 'Narrator',
    text: 'This area is even colder. Jars containing organs and failed experiments line the walls. A keycard reader controls access to a high-security section. The floor is slick with ice.',
    background: BG.morgue_specimen_archives,
    choices: [
      { text: 'Examine the jars.', next: 'A_examine_jars' },
      {
        text: 'Use a keycard on the reader.',
        next: 'A_archives_keycard',
        requires: { inventory: ['archives_keycard'] },
      },
      { text: 'Return to Cold Storage.', next: 'A_cold_storage_entry' },
    ],
  },
  A_examine_jars: {
    speaker: 'Narrator',
    text: "You find a jar labeled 'Patient #84 - Ocular Nerves'. Inside, a pair of eyes float, following your movement. In another jar, you find a pristine saw blade suspended in formaldehyde.",
    background: BG.morgue_specimen_archives,
    effects: { stats: { sanity: -10 }, inventory: { add: 'saw_blade' } },
    choices: [{ text: 'Take the saw blade.', next: 'A_archives_entry' }],
  },
  A_archives_keycard: {
    speaker: 'Narrator',
    text: 'The reader flashes green and a heavy door slides open, revealing a small, climate-controlled vault.',
    background: BG.morgue_specimen_archives,
    sfx: SFX.unlock,
    choices: [{ text: 'Enter the vault.', next: 'A_archives_vault' }],
  },
  A_archives_vault: {
    speaker: 'Narrator',
    text: "Inside the vault, you find a single, crucial item on a pedestal: a canister labeled 'Chemical Catalyst'. A note attached says 'For emergency incineration protocol only'.",
    background: BG.morgue_specimen_archives,
    effects: { inventory: { add: 'chemical_catalyst' } },
    choices: [
      { text: 'This must be for the crematorium.', next: 'A_archives_entry' },
    ],
  },

  // Morgue - Crematorium (15+ nodes)
  A_crematorium_entry: {
    speaker: 'Narrator',
    text: 'A single, massive furnace dominates this room. The door is locked. A logbook sits on a small desk. The fuel line leading to the furnace is ruptured and leaking. A door leads to Waste Disposal.',
    background: BG.morgue_crematorium,
    revisitText:
      'The furnace is cold and silent. It needs a key, an igniter, a catalyst, and the fuel line is broken.',
    choices: [
      { text: 'Try the door.', next: 'A_crematorium_door' },
      { text: 'Read the crematorium log.', next: 'A_read_crematorium_log' },
      { text: 'Examine the fuel line.', next: 'A_examine_fuel_line' },
      { text: 'Examine the control panel.', next: 'A_examine_igniter_slot' },
      { text: 'Go to Waste Disposal.', next: 'A_waste_disposal_entry' },
      { text: 'Leave.', next: 'A_morgue_receiving' },
    ],
  },
  A_crematorium_door: {
    speaker: 'Narrator',
    text: 'The furnace door is locked tight. It requires a specific key.',
    background: BG.morgue_crematorium,
    choices: [
      {
        text: 'Use the Crematorium Key.',
        next: 'A_crematorium_unlocked',
        requires: { inventory: ['crematorium_key'] },
      },
      {
        text: "I need the key from the Coroner's office.",
        next: 'A_crematorium_entry',
      },
    ],
  },
  A_crematorium_unlocked: {
    speaker: 'Narrator',
    text: 'The key works. The heavy furnace door groans open.',
    background: BG.morgue_crematorium,
    sfx: SFX.unlock,
    effects: { flags: { set: 'furnace_unlocked' } },
    choices: [{ text: 'Now to get it working.', next: 'A_crematorium_entry' }],
  },
  A_read_crematorium_log: {
    speaker: 'Narrator',
    text: "A special entry is circled in red: 'Per Dr. Finch's direct order, Subject 113 ingested a heat-proof container for the Service Elevator Key. Item must be recovered from the ash. NOTE: Standard incineration insufficient. Requires chemical catalyst from archives.'",
    background: BG.morgue_crematorium,
    sfx: SFX.paperRustle,
    choices: [
      { text: "So that's how I get the key.", next: 'A_crematorium_entry' },
    ],
  },
  A_examine_fuel_line: {
    speaker: 'Narrator',
    text: 'The fuel line is clearly broken. It will need to be repaired before the furnace can be used.',
    background: BG.morgue_crematorium,
    choices: [
      {
        text: 'Repair the line.',
        next: 'A_repair_fuel_line',
        requires: { inventory: ['wrench', 'sealant_tape'] },
      },
      { text: 'I need tools to fix this.', next: 'A_crematorium_entry' },
    ],
  },
  A_repair_fuel_line: {
    speaker: 'Narrator',
    text: 'You use the wrench to tighten the fitting and wrap the rupture with sealant tape. The hissing stops. The fuel line is secure.',
    background: BG.morgue_crematorium,
    effects: { flags: { set: 'fuel_line_fixed' } },
    sfx: SFX.puzzleSuccess,
    choices: [{ text: 'One step closer.', next: 'A_crematorium_entry' }],
  },
  A_examine_igniter_slot: {
    speaker: 'Narrator',
    text: 'The control panel has an empty slot labeled "IGNITER MODULE".',
    background: BG.morgue_crematorium,
    choices: [
      {
        text: 'Install the igniter.',
        next: 'A_install_igniter',
        requires: { inventory: ['replacement_igniter'] },
      },
      {
        text: 'I need to find the module. Probably in the Surgical Wing.',
        next: 'A_crematorium_entry',
      },
    ],
  },
  A_install_igniter: {
    speaker: 'Narrator',
    text: 'You install the new igniter. The control panel lights up. Furnace systems are now ready.',
    background: BG.morgue_crematorium,
    sfx: SFX.electric,
    effects: { flags: { set: 'furnace_igniter_fixed' } },
    choices: [
      { text: 'Now for the fuel...', next: 'A_crematorium_ready_check' },
    ],
  },
  A_crematorium_ready_check: {
    speaker: 'Narrator',
    text: "The furnace is almost ready. You've fixed the igniter and the fuel line, and unlocked the door. All that's left is to bring the body and add the catalyst.",
    background: BG.morgue_crematorium,
    choices: [
      {
        text: 'Use the furnace.',
        next: 'A_use_furnace',
        requires: {
          flags: [
            'body_113_ready',
            'fuel_line_fixed',
            'furnace_igniter_fixed',
            'furnace_unlocked',
          ],
          inventory: ['chemical_catalyst'],
        },
      },
      { text: "I'm not ready yet.", next: 'A_crematorium_entry' },
    ],
  },
  A_use_furnace: {
    speaker: 'Narrator',
    text: 'With a heavy heart and turning stomach, you place the body into the furnace, add the catalyst, and activate the sequence. A terrifying ROAR of white-hot flame erupts. After a few minutes of intense heat, it falls silent. You open the ash tray.',
    background: BG.morgue_crematorium,
    sfx: SFX.monster_roar,
    textEffects: [{ word: 'ROAR', effect: 'shock' }],
    effects: { stats: { morality: -15, sanity: -10 } },
    choices: [{ text: 'Search the ashes.', next: 'A_get_elevator_key' }],
  },
  A_get_elevator_key: {
    speaker: 'Narrator',
    text: 'Among the ash and bone fragments is a heat-resistant container. Inside is the heavy, greasy key for the Service Elevator. One piece of the puzzle is complete.',
    background: BG.morgue_crematorium,
    effects: { inventory: { add: 'service_elevator_key' } },
    choices: [
      {
        text: '[OBJECTIVE COMPLETE] I have the key.',
        next: 'A_morgue_receiving',
      },
    ],
  },
  A_waste_disposal_entry: {
    speaker: 'Narrator',
    text: 'This room contains a massive, industrial grinder for disposing of biological waste. It seems to be jammed with something metallic. You find some sealant tape on a shelf.',
    background: BG.morgue_waste_disposal,
    effects: { inventory: { add: 'sealant_tape' } },
    choices: [
      { text: 'Try to clear the grinder.', next: 'A_clear_grinder' },
      { text: 'Return to the crematorium.', next: 'A_crematorium_entry' },
    ],
  },
  A_clear_grinder: {
    speaker: 'Narrator',
    text: "You reach into the grinder's maw. Your fingers brush against something cold and sharp. With a tug, you pull free a replacement igniter for the crematorium.",
    background: BG.morgue_waste_disposal,
    effects: { inventory: { add: 'replacement_igniter' } },
    choices: [{ text: 'This is what I need.', next: 'A_waste_disposal_entry' }],
  },

  // Morgue - Office & Pathology (25+ nodes)
  A_office_door: {
    speaker: 'Narrator',
    text: "The Coroner's Office door is locked.",
    background: BG.morgue_receiving,
    choices: [
      {
        text: "Use the key from Patient #113's gurney.",
        next: 'A_office_entry',
        requires: { inventory: ['morgue_office_key'] },
      },
      { text: 'Go back.', next: 'A_morgue_receiving' },
    ],
  },
  A_office_entry: {
    speaker: 'Narrator',
    text: 'You unlock the door to a cramped office. A logbook is open on the desk. A hidden door is behind a bookcase.',
    background: BG.morgue_coroner_office,
    choices: [
      { text: 'Read the logbook.', next: 'A_read_office_log' },
      { text: 'Move the bookcase.', next: 'A_secret_study_entry' },
      { text: 'Leave.', next: 'A_morgue_receiving' },
    ],
  },
  A_read_office_log: {
    speaker: 'Coroner',
    text: "'Finch's experiments are an abomination. The latest one... the amalgam in pathology... it's a mockery of life. It guards my private study. I can hear it dragging itself around in there. I have to get out.'",
    background: BG.morgue_coroner_office,
    textEffects: [{ word: 'abomination', effect: 'anger' }],
    choices: [{ text: 'An amalgam?', next: 'A_office_entry' }],
  },
  A_secret_study_entry: {
    speaker: 'Narrator',
    text: 'You push the bookcase aside, revealing a hidden door to the Coroner\'s private study. Inside, you find another scrap of the acid formula and a key labeled "Crematorium".',
    background: BG.morgue_coroner_study,
    effects: { inventory: { add: ['acid_formula_part_2', 'crematorium_key'] } },
    choices: [{ text: 'Take the items.', next: 'A_office_entry' }],
  },
  A_pathology_approach: {
    speaker: 'Narrator',
    text: 'The door to the pathology lab is ajar. A low, wet gurgle and the sound of something heavy being dragged across tile comes from within.',
    background: BG.morgue_receiving,
    ambientSfx: [{ triggerWord: 'gurgle', sfx: SFX.monsterGurgle }],
    choices: [
      { text: 'Enter the Pathology Lab.', next: 'A_pathology_entry' },
      {
        text: "I need to be prepared for what's in there.",
        next: 'A_morgue_receiving',
      },
    ],
  },
  A_pathology_entry: {
    speaker: 'Narrator',
    npc: 'corpse_amalgam',
    text: 'The lab is a charnel house. A grotesque mass of stitched-together limbs and torsos, the Corpse Amalgam, is patrolling the room. On the far side is the body of the Coroner. A new door is visible, leading to a Bio-Resonance Lab.',
    background: BG.morgue_pathology,
    revisitText:
      "The Amalgam is still patrolling. I need to get to the Coroner's body or the Bio-Resonance lab.",
    choices: [
      {
        text: 'Use the acidic compound to stun it.',
        next: 'A_stun_amalgam',
        requires: { inventory: ['acidic_compound'] },
      },
      {
        text: 'Use the Neutralizer Agent to destroy it.',
        next: 'A_destroy_amalgam',
        requires: { inventory: ['neutralizer_agent'] },
      },
      { text: 'Try to sneak past it.', next: 'A_sneak_amalgam' },
      { text: 'Leave.', next: 'A_morgue_receiving' },
    ],
  },
  A_sneak_amalgam: {
    speaker: 'Narrator',
    text: "You try to sneak past. It senses you, turning with a sickening rip of stitches. It's too fast.",
    background: BG.morgue_pathology,
    isDeath: true,
  },
  A_stun_amalgam: {
    speaker: 'Narrator',
    text: 'You throw the acid. The amalgam shrieks as it begins to dissolve, collapsing into a twitching heap. It will reform, but you have a few precious moments.',
    background: BG.morgue_pathology,
    sfx: SFX.flesh_sac_burst,
    effects: {
      inventory: { remove: ['acidic_compound'] },
      flags: { set: 'amalgam_stunned' },
    },
    choices: [{ text: 'Now is my chance!', next: 'A_pathology_stunned' }],
  },
  A_pathology_stunned: {
    speaker: 'Narrator',
    text: 'The Amalgam is stunned. You can quickly search the room or enter the Bio-Resonance lab before it recovers.',
    background: BG.morgue_pathology,
    choices: [
      { text: "Search the Coroner's body.", next: 'A_search_coroner' },
      { text: 'Search the lab benches.', next: 'A_search_pathology_bench' },
      { text: 'Enter the Bio-Resonance Lab.', next: 'A_bio_lab_entry' },
      { text: 'Get a biomass sample from the Amalgam.', next: 'A_get_sample' },
    ],
  },
  A_get_sample: {
    speaker: 'Narrator',
    text: "You quickly use your scalpel to cut a piece of the twitching biomass. It's warm and writhes in your hand.",
    background: BG.morgue_pathology,
    effects: { inventory: { add: 'biomass_sample' }, stats: { sanity: -10 } },
    choices: [
      { text: 'Disgusting, but necessary.', next: 'A_pathology_stunned' },
    ],
  },
  A_search_coroner: {
    speaker: 'Narrator',
    text: "You find the key to the Coroner's main office on his body.",
    background: BG.morgue_pathology,
    effects: { inventory: { add: 'coroner_office_key' } },
    choices: [{ text: 'Got it.', next: 'A_pathology_stunned' }],
  },
  A_search_pathology_bench: {
    speaker: 'Narrator',
    text: 'On a gore-splattered bench, you find a can of acetone and another scrap of the acid formula.',
    background: BG.morgue_pathology,
    effects: { inventory: { add: ['acetone', 'acid_formula_part_1'] } },
    choices: [{ text: 'Take the items.', next: 'A_pathology_stunned' }],
  },
  A_bio_lab_entry: {
    speaker: 'Narrator',
    text: "This seems to be the Coroner's private research area. A large machine, a 'Bio-Resonance Neutralizer', sits in the center. It's missing a power cell and needs calibration.",
    background: BG.morgue_bio_resonance_lab,
    choices: [
      { text: 'Examine the neutralizer.', next: 'A_examine_neutralizer' },
      { text: 'Search the lab.', next: 'A_search_bio_lab' },
      { text: 'Leave.', next: 'A_pathology_entry' },
    ],
  },
  A_search_bio_lab: {
    speaker: 'Narrator',
    text: "You find the Coroner's final research notes, detailing his attempt to create a sonic frequency to destroy the Amalgam permanently. It requires a biomass sample to calibrate.",
    background: BG.morgue_bio_resonance_lab,
    lore: {
      title: "Coroner's Last Gambit",
      content:
        'The amalgam is a mistake. My mistake. Acid only slows it. But if I can isolate its resonant frequency... I can tear it apart at a cellular level. I need a sample... and more power. The cryo-bay in the lab should have a spare power cell.',
    },
    choices: [{ text: 'A permanent solution.', next: 'A_bio_lab_entry' }],
  },
  A_examine_neutralizer: {
    speaker: 'Narrator',
    text: 'The machine has an empty power cell slot and a calibration chamber for a biomass sample.',
    background: BG.morgue_bio_resonance_lab,
    choices: [
      {
        text: 'Install power cell and calibrate.',
        next: 'A_create_neutralizer',
        requires: { inventory: ['power_cell', 'biomass_sample'] },
      },
      { text: "I'm missing components.", next: 'A_bio_lab_entry' },
    ],
  },
  A_create_neutralizer: {
    speaker: 'Narrator',
    text: 'You install the power cell and place the sample in the chamber. The machine hums to life, emitting a low thrumming sound. After a moment, a vial of glowing blue liquid is dispensed: the Neutralizer Agent.',
    background: BG.morgue_bio_resonance_lab,
    sfx: SFX.puzzleSuccess,
    effects: {
      inventory: { add: 'neutralizer_agent' },
      inventory: { remove: ['power_cell', 'biomass_sample'] },
    },
    choices: [
      { text: 'Time to end this abomination.', next: 'A_bio_lab_entry' },
    ],
  },
  A_destroy_amalgam: {
    speaker: 'Narrator',
    text: 'You throw the Neutralizer Agent. It shatters on the Amalgam. Instead of dissolving, the creature begins to vibrate violently. It lets out a silent, psychic scream as it disintegrates into fine dust, leaving the path clear permanently.',
    background: BG.morgue_pathology,
    sfx: SFX.reality_warp,
    effects: { flags: { set: 'amalgam_destroyed' } },
    choices: [{ text: "It's finally over.", next: 'A_pathology_cleared' }],
  },
  A_pathology_cleared: {
    speaker: 'Narrator',
    text: 'With the Amalgam gone, the Pathology Lab is safe to explore.',
    background: BG.morgue_pathology,
    choices: [
      {
        text: "Search the Coroner's body.",
        next: 'A_search_coroner',
        requires: { notFlags: ['has_coroner_key'] },
      },
      {
        text: 'Search the lab benches.',
        next: 'A_search_pathology_bench',
        requires: { notFlags: ['has_acetone'] },
      },
      { text: 'Enter the Bio-Resonance Lab.', next: 'A_bio_lab_entry' },
      { text: 'Leave.', next: 'A_morgue_receiving' },
    ],
  },

  // Morgue - Flooded Tunnels Path Changer (10+ nodes)
  A_flooded_tunnel_entry: {
    speaker: 'Narrator',
    text: 'You drop into a flooded maintenance tunnel. This must connect to the lower levels of the morgue. The water is murky and something unseen brushes against your leg.',
    background: BG.morgue_flooded_tunnel,
    npc: 'grave_worm',
    choices: [{ text: 'This place is a maze.', next: 'A_tunnel_maze_1' }],
  },
  A_tunnel_maze_1: {
    speaker: 'Narrator',
    text: 'The tunnel splits. You hear a skittering sound from the left path. The right path is eerily silent.',
    background: BG.morgue_flooded_tunnel,
    choices: [
      { text: 'Go left.', next: 'A_tunnel_worm_death' },
      { text: 'Go right.', next: 'A_tunnel_maze_2' },
    ],
  },
  A_tunnel_worm_death: {
    isDeath: true,
    text: 'You follow the sound. A pale, sightless Grave Worm erupts from the water, its maw of needle-like teeth closing around your torso.',
  },
  A_tunnel_maze_2: {
    speaker: 'Narrator',
    text: "You wade through the silent tunnel until you reach a drainage pump. It's offline. The controls are on the other side of a collapsed section you can't get through.",
    background: BG.morgue_flooded_tunnel,
    choices: [
      {
        text: 'I need to find another way to activate it.',
        next: 'A_morgue_receiving',
      },
    ],
  },

  // ================================================================================================================================
  // PATH B — AURAL & OCULAR THERAPY (DIRECTOR'S CUT EXPANSION: 80+ NODES)
  // ================================================================================================================================
  B_rec_entry: {
    speaker: 'Narrator',
    text: 'You enter a large, multi-level room for Aural & Ocular Therapy. The lower level is a rec room patrolled by The Watcher, a patient with extreme photosensitivity. The upper level contains an observation deck and other therapy rooms.',
    background: BG.rec_therapy_upper,
    bgm: BGM.softHaunt,
    revisitText:
      'Back in the Rec Wing. The Watcher is still down there. I need to find all four film reels, a new lens, and a new bulb to work the projector.',
    choices: [
      { text: 'Explore the upper level.', next: 'B_rec_upper' },
      { text: 'Descend to the lower Rec Room.', next: 'B_rec_lower' },
      { text: 'Leave.', next: 'start' },
    ],
  },
  // Upper Level Hub (25+ nodes)
  B_rec_upper: {
    speaker: 'Narrator',
    text: "You're on the upper observation deck. Doors lead to a Projection Booth, Art Therapy, Music Therapy, and a Hydrotherapy Wing.",
    background: BG.rec_therapy_upper,
    revisitText: 'The upper deck. So many rooms, so many horrors.',
    choices: [
      { text: 'Enter the Projection Booth.', next: 'B_projection_booth' },
      { text: 'Enter the Art Therapy Room.', next: 'B_art_therapy' },
      { text: 'Enter the Music Therapy Room.', next: 'B_music_therapy' },
      { text: 'Enter the Hydrotherapy Wing.', next: 'B_hydro_entry' },
      { text: 'Check the Observation Rooms.', next: 'B_observation_entry' },
      { text: 'Go back.', next: 'B_rec_entry' },
    ],
  },
  B_observation_entry: {
    speaker: 'Narrator',
    text: 'A series of small, dark rooms with one-way mirrors look down on the therapy rooms below. One looks into Art Therapy, another into Music Therapy.',
    background: BG.rec_therapy_observation,
    choices: [
      { text: 'Observe the Art Room.', next: 'B_observe_art' },
      { text: 'Observe the Music Room.', next: 'B_observe_music' },
      { text: 'Leave.', next: 'B_rec_upper' },
    ],
  },
  B_observe_art: {
    speaker: 'Narrator',
    text: "Looking through the glass, you see the paintings. From this angle, a hidden message is visible under the black paint on one canvas: 'The melody sets the spirit free.'",
    background: BG.rec_therapy_observation,
    choices: [
      { text: 'A clue for the Music Room.', next: 'B_observation_entry' },
    ],
  },
  B_observe_music: {
    speaker: 'Narrator',
    text: 'You see the piano. A spectral figure is playing a haunting, complex melody, far more intricate than the one on the sheet music. It seems to be a loop of their final moments.',
    background: BG.rec_therapy_observation,
    choices: [{ text: "I can't replicate that.", next: 'B_observation_entry' }],
  },
  B_projection_booth: {
    speaker: 'Narrator',
    text: 'The projection booth houses a large film projector. It looks like it needs a new lens, a new bulb, and four film reels to be loaded in a specific sequence.',
    background: BG.rec_therapy_projection,
    choices: [
      {
        text: 'Examine the projector more closely.',
        next: 'B_examine_projector',
      },
      { text: 'Search the booth.', next: 'B_search_booth' },
      { text: 'Leave.', next: 'B_rec_upper' },
    ],
  },
  B_examine_projector: {
    speaker: 'Narrator',
    text: 'The lens is shattered and the bulb is burnt out. Without replacements, this is useless. There are four empty spools, waiting for film.',
    background: BG.rec_therapy_projection,
    choices: [
      {
        text: 'Install new lens.',
        next: 'B_install_lens',
        requires: { inventory: ['projector_lens'] },
      },
      {
        text: 'Install new bulb.',
        next: 'B_install_bulb',
        requires: { inventory: ['replacement_bulb'] },
      },
      { text: "I'm missing parts.", next: 'B_projection_booth' },
    ],
  },
  B_search_booth: {
    speaker: 'Narrator',
    text: "Amongst scattered papers, you find a technician's log.",
    background: BG.rec_therapy_projection,
    choices: [
      { text: 'Read the log.', next: 'B_read_tech_log' },
      { text: 'Leave.', next: 'B_projection_booth' },
    ],
  },
  B_read_tech_log: {
    speaker: 'Narrator',
    text: "'Patient #84 is responding to the visual therapy. The art room holds the key to the order. But the damn lens shattered. Spare is in the lab sub-level. The bulb blew too, check the music room.'",
    background: BG.rec_therapy_projection,
    sfx: SFX.paperRustle,
    choices: [
      {
        text: 'So the lens is in the lab, and the bulb is in the music room.',
        next: 'B_projection_booth',
      },
    ],
  },
  B_install_lens: {
    speaker: 'Narrator',
    text: 'You replace the shattered lens with the new one. The projector is one step closer to working.',
    background: BG.rec_therapy_projection,
    sfx: SFX.puzzleSuccess,
    effects: { flags: { set: 'projector_lens_fixed' } },
    choices: [{ text: 'Now for the bulb and films.', next: 'B_check_reels' }],
  },
  B_install_bulb: {
    speaker: 'Narrator',
    text: 'You replace the burnt-out bulb. The projector hums faintly, ready for power and film.',
    background: BG.rec_therapy_projection,
    sfx: SFX.puzzleSuccess,
    effects: { flags: { set: 'projector_bulb_fixed' } },
    choices: [{ text: 'Now for the lens and films.', next: 'B_check_reels' }],
  },
  B_check_reels: {
    speaker: 'Narrator',
    text: 'The projector is ready. Do you have all four film reels?',
    background: BG.rec_therapy_projection,
    choices: [
      {
        text: 'Load the film reels.',
        next: 'B_load_reels_prompt',
        requires: {
          inventory: [
            'film_reel_a',
            'film_reel_b',
            'film_reel_c',
            'film_reel_d',
          ],
          flags: ['projector_lens_fixed', 'projector_bulb_fixed'],
        },
      },
      { text: "I'm missing something.", next: 'B_projection_booth' },
    ],
  },
  B_load_reels_prompt: {
    speaker: 'You',
    text: 'I have all four reels, and the projector is fixed. I just need to remember the order from the art room... Sunrise, Storm, Heartbeat, Void.',
    background: BG.rec_therapy_projection,
    choices: [
      { text: 'Load the reels in order.', next: 'B_load_reels_success' },
    ],
  },
  B_load_reels_success: {
    speaker: 'Narrator',
    text: 'You load the reels in the correct sequence. The projector whirs to life, casting a complex series of images onto the screen below. On the lower level, you hear a heavy grinding sound as a hidden panel slides open, revealing the Frequency Tuner. The Watcher stops his patrol and stares, mesmerized.',
    background: BG.rec_therapy_projection,
    sfx: SFX.puzzleSuccess,
    visualEffect: 'glitch',
    effects: { flags: { set: 'watcher_pacified' } },
    choices: [
      {
        text: '[OBJECTIVE COMPLETE] The tuner is revealed.',
        next: 'B_rec_entry',
      },
    ],
  },
  B_art_therapy: {
    speaker: 'Narrator',
    text: "The walls are covered in disturbing children's drawings. One depicts a sequence of four symbols: a sun, a lightning bolt, a heart, and a black circle. Another painting is completely black. A door leads to Painting Storage.",
    background: BG.rec_therapy_art,
    choices: [
      { text: 'Examine the sequence drawing.', next: 'B_art_therapy_clue' },
      { text: 'Examine the black painting.', next: 'B_black_painting' },
      { text: 'Search the room.', next: 'B_search_art_room' },
      { text: 'Enter Painting Storage.', next: 'B_painting_storage' },
      { text: 'Leave.', next: 'B_rec_upper' },
    ],
  },
  B_painting_storage: {
    speaker: 'Narrator',
    text: "Old canvases are stacked here. Most are ruined, but you find a triptych of paintings that seem to tell a story. They're out of order.",
    background: BG.rec_therapy_painting_storage,
    choices: [{ text: 'This is another puzzle.', next: 'B_art_therapy' }],
  },
  B_art_therapy_clue: {
    speaker: 'You',
    text: 'Sunrise, Storm, Heartbeat, Void. That has to be the order for the film reels.',
    background: BG.rec_therapy_art,
    effects: { flags: { set: 'knows_reel_order' } },
    choices: [{ text: 'Keep looking.', next: 'B_art_therapy' }],
  },
  B_search_art_room: {
    speaker: 'Narrator',
    text: 'Behind a canvas dripping with black paint, you find a film reel labeled with a lightning bolt.',
    background: BG.rec_therapy_art,
    effects: { inventory: { add: 'film_reel_b' } },
    choices: [{ text: 'Take the reel.', next: 'B_rec_upper' }],
  },
  B_black_painting: {
    speaker: 'Narrator',
    text: "It's a canvas coated in thick, black oil paint. It seems... newer than the others. You might be able to remove the paint.",
    background: BG.rec_therapy_art,
    choices: [
      {
        text: 'Use the painting solvent.',
        next: 'B_use_solvent',
        requires: { inventory: ['painting_solvent'] },
      },
      { text: 'Leave it.', next: 'B_art_therapy' },
    ],
  },
  B_use_solvent: {
    speaker: 'Narrator',
    text: "You apply the solvent. The black paint melts away, revealing a hidden painting underneath: a detailed diagram of the Hydrotherapy Wing's pump system, with a note: 'Key kept by Head Surgeon'.",
    background: BG.rec_therapy_art,
    effects: { flags: { set: 'knows_hydro_key_location' } },
    choices: [
      { text: 'So the key is in the Surgical Wing.', next: 'B_art_therapy' },
    ],
  },
  B_music_therapy: {
    speaker: 'Narrator',
    text: "A dusty grand piano sits in the center of the room. Sheet music is open on the stand, but it's torn. One of the ivory keys is raised slightly.",
    background: BG.rec_therapy_music,
    choices: [
      { text: 'Examine the sheet music.', next: 'B_read_sheet_music' },
      { text: 'Examine the piano.', next: 'B_examine_piano' },
      { text: 'Search the room.', next: 'B_search_music_room' },
      { text: 'Leave.', next: 'B_rec_upper' },
    ],
  },
  B_search_music_room: {
    speaker: 'Narrator',
    text: 'Under a floorboard, you find the other half of the sheet music.',
    background: BG.rec_therapy_music,
    effects: { inventory: { add: 'sheet_music_2' } },
    choices: [{ text: 'Now I have the full melody.', next: 'B_music_therapy' }],
  },
  B_read_sheet_music: {
    speaker: 'You',
    text: 'The notes are C, A, G, E. A simple, haunting tune. Maybe if I play it...',
    background: BG.rec_therapy_music,
    effects: {
      flags: { set: 'knows_piano_tune' },
      inventory: { add: 'sheet_music_1' },
    },
    choices: [{ text: 'Go back.', next: 'B_music_therapy' }],
  },
  B_examine_piano: {
    speaker: 'Narrator',
    text: 'The piano is old but seems functional.',
    background: BG.rec_therapy_music,
    choices: [
      {
        text: 'Play the melody C-A-G-E.',
        next: 'B_play_piano',
        requires: {
          flags: ['knows_piano_tune'],
          inventory: ['sheet_music_1', 'sheet_music_2'],
        },
      },
      { text: "I don't know the full melody.", next: 'B_music_therapy' },
    ],
  },
  B_play_piano: {
    speaker: 'Narrator',
    text: 'You play the simple melody. As the last note fades, a hidden compartment in the piano clicks open. Inside is a replacement projector bulb and another film reel.',
    background: BG.rec_therapy_music,
    sfx: SFX.puzzleSuccess,
    effects: { inventory: { add: ['replacement_bulb', 'film_reel_d'] } },
    choices: [{ text: 'Take the items.', next: 'B_rec_upper' }],
  },

  // Hydrotherapy & Path Changers (25+ nodes)
  B_hydro_entry: {
    speaker: 'Narrator',
    text: 'The Hydrotherapy wing is a multi-room complex. This first room contains a large, empty hydrotherapy pool. The air smells of chlorine and mildew. Doors lead to the Locker Rooms and the Sauna.',
    background: BG.rec_therapy_hydrotherapy,
    revisitText: 'The hydrotherapy pool. The pump is waiting for its motor.',
    choices: [
      { text: 'Enter the Locker Rooms.', next: 'B_locker_rooms' },
      { text: 'Enter the Sauna.', next: 'B_sauna' },
      { text: 'Examine the pump controls.', next: 'B_examine_pump' },
      { text: 'Leave.', next: 'B_rec_upper' },
    ],
  },
  B_locker_rooms: {
    speaker: 'Narrator',
    text: 'The locker rooms are damp and filled with rusted lockers. Most are empty, but one is locked with a simple padlock.',
    background: BG.rec_therapy_lockers,
    choices: [
      { text: 'Search the lockers.', next: 'B_search_lockers' },
      {
        text: 'Try to break the padlock.',
        next: 'B_break_padlock',
        requires: { inventory: ['crowbar'] },
      },
      { text: 'Return to the pool room.', next: 'B_hydro_entry' },
    ],
  },
  B_search_lockers: {
    speaker: 'Narrator',
    text: 'You find a can of painting solvent in one of the open lockers.',
    background: BG.rec_therapy_lockers,
    effects: { inventory: { add: 'painting_solvent' } },
    choices: [
      { text: 'This might be useful in the art room.', next: 'B_locker_rooms' },
    ],
  },
  B_break_padlock: {
    speaker: 'Narrator',
    text: 'You smash the padlock with the crowbar. Inside the locker is a film reel labeled with an EKG waveform.',
    background: BG.rec_therapy_lockers,
    sfx: SFX.scraping,
    effects: { inventory: { add: 'film_reel_d' } },
    choices: [{ text: 'Take the film reel.', next: 'B_locker_rooms' }],
  },
  B_sauna: {
    speaker: 'Narrator',
    text: 'The sauna is filled with scalding steam. A maintenance panel is on the far wall, but the steam is too thick to see. A small valve is near the door.',
    background: BG.rec_therapy_sauna,
    sfx: SFX.steam_hiss,
    choices: [
      { text: 'Try to reach the panel.', next: 'B_sauna_burn' },
      {
        text: 'Turn the valve with the wrench.',
        next: 'B_sauna_clear',
        requires: { inventory: ['wrench'] },
      },
      { text: 'Find a way to shut off the steam.', next: 'B_hydro_entry' },
    ],
  },
  B_sauna_burn: {
    isDeath: true,
    text: 'You step into the steam. The heat is unbearable, searing your lungs. You collapse before you can even scream.',
  },
  B_sauna_clear: {
    speaker: 'Narrator',
    text: 'You use the wrench to shut off the steam. The room clears, revealing a maintenance panel. You open it and find another film reel.',
    background: BG.rec_therapy_sauna,
    effects: { inventory: { add: 'film_reel_b' } },
    choices: [{ text: 'Take the reel.', next: 'B_hydro_entry' }],
  },
  B_examine_pump: {
    speaker: 'Narrator',
    text: 'The motor is completely fried. A note taped to it reads "Replacement motor in Lab Sub-Level".',
    background: BG.rec_therapy_hydrotherapy,
    choices: [
      {
        text: 'Install the pump motor.',
        next: 'B_install_motor',
        requires: { inventory: ['pump_motor'] },
      },
      { text: 'I need to find that motor.', next: 'B_hydro_entry' },
    ],
  },
  B_install_motor: {
    speaker: 'Narrator',
    text: 'You install the motor. The pump whirs to life, but a red light indicates the drain is blocked. A secondary control panel asks for a key.',
    background: BG.rec_therapy_hydrotherapy,
    sfx: SFX.pumpWhine,
    choices: [
      {
        text: 'Use the Hydro-pump key.',
        next: 'B_unblock_drain',
        requires: { inventory: ['hydro_pump_key'] },
      },
      {
        text: 'I need to find the key. The surgical wing, maybe?',
        next: 'B_hydro_entry',
      },
    ],
  },
  B_unblock_drain: {
    speaker: 'Narrator',
    text: 'You use the key to activate the emergency drain purge. With a tremendous sucking sound, the blockage clears and the last of the murky water vanishes, revealing a maintenance tunnel.',
    background: BG.rec_therapy_hydrotherapy,
    sfx: SFX.water_drain,
    choices: [
      {
        text: '[PATH CHANGER] Enter the tunnel to the Morgue.',
        next: 'A_flooded_tunnel_entry',
      },
    ],
  },

  // Lower Level & Watcher (10+ nodes)
  B_rec_lower: {
    speaker: 'Narrator',
    text: 'You descend to the main floor. The Watcher is here, a hulking figure that shies away from any direct light. You must stay in the shadows to avoid his gaze. The area is larger than you thought, with multiple alcoves and hiding spots.',
    background: BG.rec_therapy_lower,
    revisitText:
      'The lower floor. The Watcher is still on patrol unless I can pacify him with the projector.',
    choices: [
      {
        text: 'Access the hidden panel (Watcher Pacified).',
        next: 'B_hidden_panel',
        requires: { flags: ['watcher_pacified'] },
      },
      {
        text: 'Try to sneak to the East alcove.',
        next: 'B_sneak_watcher_east',
        requires: { notFlags: ['watcher_pacified'] },
      },
      {
        text: 'Try to sneak to the West alcove.',
        next: 'B_sneak_watcher_west',
        requires: { notFlags: ['watcher_pacified'] },
      },
      { text: 'Go back upstairs.', next: 'B_rec_entry' },
    ],
  },
  B_watcher_death: {
    isDeath: true,
    text: "You step into a beam of light. The Watcher's head snaps in your direction. He lets out a gurgling shriek as he charges, his hands reaching for your eyes. He simply presses until the world is a final, searing explosion of red.",
  },
  B_sneak_watcher_east: {
    speaker: 'Narrator',
    text: 'You slip through the shadows to a small alcove on the east side. You find a film reel labeled with a simple drawing of a sun on a table.',
    background: BG.rec_therapy_lower,
    effects: { inventory: { add: 'film_reel_a' } },
    choices: [{ text: 'One down.', next: 'B_rec_lower' }],
  },
  B_sneak_watcher_west: {
    speaker: 'Narrator',
    text: "You make it to the west alcove. A corpse of a doctor is here, clutching a key labeled 'HP-01'.",
    background: BG.rec_therapy_lower,
    effects: { inventory: { add: 'hydro_pump_key' } },
    choices: [
      { text: 'This must be for the hydrotherapy pump.', next: 'B_rec_lower' },
    ],
  },
  B_hidden_panel: {
    speaker: 'Narrator',
    text: 'With the Watcher pacified by the film, you can safely approach the secret panel. You open it and retrieve the Frequency Tuner.',
    background: BG.rec_therapy_lower,
    effects: { inventory: { add: 'frequency_tuner' } },
    choices: [
      { text: '[OBJECTIVE COMPLETE] I have the tuner.', next: 'B_rec_lower' },
    ],
  },

  // ================================================================================================================================
  // PATH C — SURGICAL WING (DIRECTOR'S CUT "HEIST": 80+ NODES)
  // ================================================================================================================================
  C_infirmary_entry: {
    speaker: 'Narrator',
    text: "You find the infirmary. A spectral doctor, 'The Surgeon', glides silently around an operating table, attempting to complete some grisly procedure. He seems obsessed. The slightest noise will draw his attention.",
    background: BG.infirmary_main,
    bgm: BGM.softHaunt,
    npc: 'surgeon',
    revisitText:
      'Back in the infirmary. The Surgeon is still at his work. I need to be quiet.',
    choices: [
      { text: 'Sneak into the Patient Recovery ward.', next: 'C_patient_care' },
      {
        text: 'Sneak to the Operating Theater.',
        next: 'C_operating_theater_approach',
      },
      { text: "Sneak to the Doctor's Lounge.", next: 'C_doctors_lounge' },
      { text: 'Try the locked Pharmacy door.', next: 'C_pharmacy_door' },
      { text: 'Enter the X-Ray room.', next: 'C_xray_room' },
      { text: 'Leave.', next: 'start' },
    ],
  },
  C_surgeon_death: {
    isDeath: true,
    text: "You make a loud noise. The Surgeon senses you. He turns, his eyes burning with cold light. He's on you in an instant, his spectral scalpel phasing through your ribs to slice your heart to ribbons. You feel an unimaginable cold before everything ends.",
  },
  // Phase 1: Recon & Prep (30+ nodes)
  C_patient_care: {
    speaker: 'Narrator',
    text: 'You slip into a large room with rows of empty beds. On a bedside table, you find a surgical manual and a patient chart.',
    background: BG.infirmary_recovery,
    choices: [
      { text: 'Take the surgical manual.', next: 'C_take_manual' },
      { text: 'Read the patient chart.', next: 'C_read_chart' },
      { text: 'Search the other beds.', next: 'C_search_beds' },
      { text: 'Leave.', next: 'C_infirmary_entry' },
    ],
  },
  C_search_beds: {
    speaker: 'Narrator',
    text: "Under a pillow, you find a key labeled 'Sterilization'.",
    background: BG.infirmary_recovery,
    effects: { inventory: { add: 'sterilization_key' } },
    choices: [
      { text: 'This should get me the tools.', next: 'C_patient_care' },
    ],
  },
  C_take_manual: {
    speaker: 'Narrator',
    text: 'You take the surgical manual. It details complex implant procedures.',
    background: BG.infirmary_recovery,
    effects: { inventory: { add: 'surgical_manual' } },
    choices: [{ text: 'This is crucial.', next: 'C_patient_care' }],
  },
  C_read_chart: {
    speaker: 'Narrator',
    text: "Chart for Patient #113: 'Implant successful. Subject shows remarkable resilience. Dr. Finch is pleased. Body to be transferred to Morgue for post-mortem analysis as per standard procedure.' You find a keycard clipped to the back, labeled 'Archives'.",
    background: BG.infirmary_recovery,
    effects: { inventory: { add: 'archives_keycard' } },
    choices: [{ text: 'Take the keycard.', next: 'C_patient_care' }],
  },
  C_xray_room: {
    speaker: 'Narrator',
    text: "The X-Ray room is filled with hanging films. On a light box, an X-ray of Patient #113's chest is displayed, showing the regulator chip. An alarm schematic is tacked to a corkboard.",
    background: BG.infirmary_xray,
    choices: [
      { text: 'Take the X-Ray.', next: 'C_take_xray' },
      { text: 'Take the alarm schematic.', next: 'C_take_schematic' },
      { text: 'Leave.', next: 'C_infirmary_entry' },
    ],
  },
  C_take_xray: {
    effects: { inventory: { add: 'patient_xray' } },
    speaker: 'You',
    text: 'This shows exactly where the chip is. A guide for the procedure.',
    choices: [{ text: 'Back to the main room.', next: 'C_xray_room' }],
  },
  C_take_schematic: {
    effects: { inventory: { add: 'alarm_schematic' } },
    speaker: 'You',
    text: 'This shows a pressure plate under the operating table. I might be able to disable it.',
    choices: [{ text: 'I should be careful.', next: 'C_xray_room' }],
  },
  C_doctors_lounge: {
    speaker: 'Narrator',
    text: 'A small lounge for the surgeons. A half-eaten meal is rotting on a table. A locker stands in the corner.',
    background: BG.infirmary_lounge,
    choices: [
      { text: 'Search the room.', next: 'C_search_lounge' },
      { text: 'Check the locker.', next: 'C_lounge_locker' },
      { text: 'Leave.', next: 'C_infirmary_entry' },
    ],
  },
  C_search_lounge: {
    speaker: 'Narrator',
    text: "You find the Pharmacy Key on a hook by the door, and a guard's schedule on a clipboard.",
    background: BG.infirmary_lounge,
    effects: { inventory: { add: ['pharmacy_key', 'guard_schedule'] } },
    choices: [{ text: 'These are vital.', next: 'C_doctors_lounge' }],
  },
  C_lounge_locker: {
    speaker: 'Narrator',
    text: 'The locker is sealed. It seems to require an employee ID.',
    background: BG.infirmary_lounge,
    choices: [{ text: "I can't open this.", next: 'C_doctors_lounge' }],
  },
  C_pharmacy_door: {
    speaker: 'Narrator',
    text: 'The pharmacy is locked. You need a key.',
    background: BG.infirmary_main,
    choices: [
      {
        text: 'Use the Pharmacy Key.',
        next: 'C_pharmacy_entry',
        requires: { inventory: ['pharmacy_key'] },
      },
      {
        text: 'I need to find the key in the lounge.',
        next: 'C_infirmary_entry',
      },
    ],
  },
  C_pharmacy_entry: {
    speaker: 'Narrator',
    text: 'You unlock the pharmacy. Inside, you find a powerful sedative vial and a locked cabinet labeled "Surgical Tools".',
    background: BG.infirmary_pharmacy,
    effects: { inventory: { add: 'sedative_vial' } },
    choices: [
      { text: 'Examine the locked cabinet.', next: 'C_tools_cabinet' },
      { text: 'Leave.', next: 'C_infirmary_entry' },
    ],
  },
  C_tools_cabinet: {
    speaker: 'Narrator',
    text: 'This cabinet requires a specific key from sterilization.',
    background: BG.infirmary_pharmacy,
    choices: [
      {
        text: 'Use the Sterilization Key.',
        next: 'C_get_tools',
        requires: { inventory: ['sterilization_key'] },
      },
      { text: 'I need that key.', next: 'C_pharmacy_entry' },
    ],
  },
  C_get_tools: {
    speaker: 'Narrator',
    text: 'You unlock the cabinet and retrieve a fine-tipped scalpel and a surgical retractor.',
    background: BG.infirmary_pharmacy,
    effects: { inventory: { add: ['fine_tipped_scalpel', 'retractor'] } },
    choices: [{ text: 'Now I have the tools.', next: 'C_pharmacy_entry' }],
  },

  // Surgical Wing - Phase 2 & 3: The Heist and Escape (50+ nodes)
  C_operating_theater_approach: {
    speaker: 'Narrator',
    text: 'You creep closer to the operating table. The Surgeon is trying to operate on the corpse of Patient #113. A pressure plate is under the table. You must disable it first.',
    background: BG.infirmary_surgery,
    revisitText:
      'The Surgeon is still working. I need to sedate the corpse to stun him, then perform the extraction.',
    choices: [
      {
        text: 'Use soldering iron to bypass pressure plate.',
        next: 'C_bypass_alarm',
        requires: { inventory: ['soldering_iron', 'alarm_schematic'] },
      },
      {
        text: 'I need to disable that alarm first.',
        next: 'C_infirmary_entry',
      },
    ],
  },
  C_bypass_alarm: {
    speaker: 'Narrator',
    text: "You carefully rewire the pressure plate. A small light on the alarm panel turns from red to green. It's safe to approach.",
    background: BG.infirmary_surgery,
    effects: { flags: { set: 'alarm_disabled' } },
    choices: [
      { text: 'Now for the sedative.', next: 'C_sedate_corpse_prompt' },
    ],
  },
  C_sedate_corpse_prompt: {
    speaker: 'You',
    text: 'The alarm is off. Time to use the sedative.',
    background: BG.infirmary_surgery,
    choices: [
      {
        text: "Use the sedative on the corpse's IV drip.",
        next: 'C_sedate_corpse',
        requires: { inventory: ['sedative_vial'] },
      },
    ],
  },
  C_sedate_corpse: {
    speaker: 'Narrator',
    text: "You silently inject the sedative into the IV bag. As it enters the corpse's system, a wave of psychic feedback erupts, stunning The Surgeon. He freezes, clutching his head, giving you precious time. You have 30 seconds before he recovers.",
    background: BG.infirmary_surgery,
    sfx: SFX.reality_warp,
    effects: { flags: { set: 'surgeon_stunned' } },
    choices: [
      { text: 'Now! Perform the extraction!', next: 'C_extract_chip_start' },
    ],
  },
  C_extract_chip_start: {
    speaker: 'Narrator',
    text: 'You have a short window. You consult the manual. Step 1: Make incision along the sternum.',
    background: BG.infirmary_surgery,
    timer: 10,
    defaultChoiceIndex: 1,
    choices: [
      {
        text: 'Use the scalpel to make the incision.',
        next: 'C_extract_chip_step2',
        requires: {
          inventory: ['surgical_manual', 'fine_tipped_scalpel', 'retractor'],
        },
      },
      { text: "Panic! I'm missing the tools!", next: 'C_surgeon_recovers' },
    ],
  },
  C_extract_chip_step2: {
    speaker: 'Narrator',
    text: 'Incision made. Step 2: Insert retractor and open the chest cavity.',
    background: BG.infirmary_surgery,
    timer: 10,
    defaultChoiceIndex: 1,
    choices: [
      { text: 'Use the retractor.', next: 'C_extract_chip_step3' },
      { text: 'Hesitate.', next: 'C_surgeon_recovers' },
    ],
  },
  C_extract_chip_step3: {
    speaker: 'Narrator',
    text: 'Cavity is open. Step 3: Carefully sever the three bio-conduits from the chip.',
    background: BG.infirmary_surgery,
    timer: 10,
    defaultChoiceIndex: 1,
    choices: [
      { text: 'Sever the conduits.', next: 'C_grab_chip' },
      { text: 'My hand is shaking!', next: 'C_surgeon_recovers' },
    ],
  },
  C_surgeon_recovers: {
    speaker: 'Narrator',
    text: 'You hesitated too long. The Surgeon shakes off the psychic stun, his rage absolute. You have no time to react.',
    background: BG.infirmary_surgery,
    isDeath: true,
  },
  C_grab_chip: {
    speaker: 'Narrator',
    text: 'You sever the last conduit and grab the Power Regulator Chip. As you do, a blaring alarm fills the wing! The Surgeon shrieks with fury. You have to escape NOW!',
    background: BG.infirmary_surgery,
    sfx: SFX.alarm,
    effects: { inventory: { add: 'power_regulator_chip' } },
    choices: [{ text: '[OBJECTIVE COMPLETE] RUN!', next: 'C_escape_start' }],
  },
  C_escape_start: {
    speaker: 'Narrator',
    text: 'The Surgeon is coming for you, phasing through walls. The main exit is sealed! Your only options are the dumbwaiter to the Morgue or a barricaded door to the Lab wing!',
    background: BG.infirmary_main,
    bgm: BGM.descent,
    choices: [
      { text: 'Flee to the dumbwaiter!', next: 'C_dumbwaiter_escape' },
      {
        text: 'Break down the barricade!',
        next: 'C_barricade_escape',
        requires: { inventory: ['crowbar'] },
      },
    ],
  },
  C_dumbwaiter_escape: {
    speaker: 'Narrator',
    text: "You sprint for the dumbwaiter and throw yourself inside, pulling the door shut just as the Surgeon's scalpel phases through the wood, missing your face by an inch.",
    background: BG.infirmary_sterilization,
    choices: [{ text: 'Down to the Morgue...', next: 'A_morgue_entry' }],
  },
  C_barricade_escape: {
    speaker: 'Narrator',
    text: 'You smash the barricade with the crowbar and stumble into the sterile white halls of the Lab wing. You slam the door behind you, hoping it holds.',
    background: BG.lab_control_room,
    choices: [
      { text: '[PATH CHANGER] I made it to the Lab.', next: 'D_lab_entry' },
    ],
  },
  C_dumbwaiter_arrival: {
    speaker: 'Narrator',
    text: 'The dumbwaiter groans to a halt. You climb out into a small specimen storage room, filled with jars of organs. You are now in the Surgical Wing.',
    background: BG.infirmary_sterilization,
    choices: [
      { text: 'Search the room.', next: 'C_search_sterilization' },
      {
        text: '[PATH CHANGER] Explore the Surgical Wing.',
        next: 'C_infirmary_entry',
      },
    ],
  },
  C_search_sterilization: {
    speaker: 'Narrator',
    text: 'On a small shelf, you find a soldering iron.',
    background: BG.infirmary_sterilization,
    effects: { inventory: { add: 'soldering_iron' } },
    choices: [
      { text: 'This looks useful for electronics.', next: 'C_infirmary_entry' },
    ],
  },

  // ================================================================================================================================
  // PATH D — SENSORY LAB (DIRECTOR'S CUT GATEKEEPER: 80+ NODES)
  // ================================================================================================================================
  D_lab_entry: {
    speaker: 'Narrator',
    text: 'You enter a sterile, white control room. A large computer terminal sits in the center. Doors lead to Specimen Storage and a Sensory Deprivation Chamber. The sealed service elevator is on the far wall.',
    background: BG.lab_control_room,
    bgm: BGM.lab,
    revisitText:
      'The lab control room. The elevator awaits the three components.',
    choices: [
      { text: 'Access the terminal.', next: 'D_terminal' },
      { text: 'Enter Specimen Storage.', next: 'D_specimen_storage' },
      {
        text: 'Enter the Sensory Deprivation Chamber.',
        next: 'D_deprivation_chamber',
      },
      { text: 'Enter the locked Lab Sub-Level.', next: 'D_sublevel_door' },
      { text: 'Examine the Service Elevator.', next: 'D_elevator' },
      { text: 'Leave.', next: 'start' },
    ],
  },
  D_specimen_storage: {
    speaker: 'Narrator',
    text: 'Rows of cages and tanks line the walls. You find a canister of cryo-coolant and a film reel labeled "Void".',
    background: BG.lab_specimen_storage,
    effects: { inventory: { add: ['cryo_coolant_canister', 'film_reel_c'] } },
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
    text: 'A heavy door is labeled "Lab Sub-Level". It is sealed by a sonic lock.',
    background: BG.lab_control_room,
    choices: [
      {
        text: 'Use the Frequency Tuner.',
        next: 'D_sublevel_entry',
        requires: { inventory: ['frequency_tuner'] },
      },
      { text: 'I need the tuner from the Rec Wing.', next: 'D_lab_entry' },
    ],
  },
  D_sublevel_entry: {
    speaker: 'Narrator',
    text: 'The tuner emits a high-frequency pitch, and the door slides open. You descend into a colder, more clinical area. Doors lead to Specimen Holding, the Behavioral Lab, and the Cryo-Storage Wing.',
    background: BG.lab_sublevel,
    choices: [
      { text: 'Enter Specimen Holding.', next: 'D_sublevel_holding_entry' },
      { text: 'Enter the Behavioral Lab.', next: 'D_behavioral_lab' },
      { text: 'Enter the Cryo-Storage Wing.', next: 'D_cryo_entry' },
    ],
  },
  D_behavioral_lab: {
    speaker: 'Narrator',
    text: "This room contains a one-way mirror looking into an empty, padded cell. On a terminal, you find Finch's research notes on sonic frequencies.",
    background: BG.lab_behavioral,
    effects: { inventory: { add: 'finchs_research_notes' } },
    choices: [
      {
        text: 'These notes are the key to the sonic lock.',
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
      { text: 'Find a way to lure it away.', next: 'D_lure_skitter' },
      { text: 'Return to the sub-level hall.', next: 'D_sublevel_entry' },
    ],
  },
  D_scare_skitter: {
    isDeath: true,
    text: 'You make a sudden move. The creature shrieks and leaps at your face, its claws digging into your eyes and its teeth finding your throat.',
  },
  D_lure_skitter: {
    speaker: 'Narrator',
    text: 'You need bait. Something organic.',
    background: BG.lab_sublevel_holding,
    choices: [
      { text: 'I need to find something.', next: 'D_sublevel_holding_entry' },
    ], // This implies finding food elsewhere
  },
  D_sublevel_terminal: {
    speaker: 'Narrator',
    text: 'You access the terminal. Using the override codes, you can release the spare parts. You dispense a replacement motor for the Hydrotherapy pump and a spare projector lens.',
    background: BG.lab_sublevel_terminal,
    effects: { inventory: { add: ['pump_motor', 'projector_lens'] } },
    choices: [{ text: '[PATH CHANGER] Take the items.', next: 'D_lab_entry' }],
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
    text: 'You find a hazmat suit in a locker. It will protect you from the cold.',
    background: BG.lab_cryo_bay,
    effects: { inventory: { add: 'hazmat_suit' } },
    choices: [{ text: 'Suit up and go deeper.', next: 'D_cryo_deep' }],
  },
  D_cryo_deep: {
    speaker: 'Narrator',
    npc: 'cryo_stalker',
    text: "Deeper in, you find a high-density power cell, perfect for the Morgue's neutralizer. As you take it, a chittering sound echoes behind you. The Cryo-Stalker, a creature of frost and claws, is hunting you.",
    background: BG.lab_cryo_bay,
    effects: { inventory: { add: 'power_cell' } },
    choices: [{ text: 'I have to get out of here!', next: 'D_cryo_chase' }],
  },
  D_cryo_chase: {
    speaker: 'Narrator',
    text: 'The Cryo-Stalker is fast. You can try to use a prototype Cryo-Laser on a workbench to freeze it, or make a run for it.',
    background: BG.lab_cryo_bay,
    choices: [
      { text: 'Grab the Cryo-Laser and fire.', next: 'D_use_cryo_laser' },
      { text: 'Run!', next: 'D_cryo_run' },
    ],
  },
  D_use_cryo_laser: {
    speaker: 'Narrator',
    text: 'You grab the weapon and fire. The beam hits the creature, freezing it solid. It shatters into a million pieces. You are safe.',
    background: BG.lab_cryo_bay,
    effects: { inventory: { add: 'cryo_laser' } },
    choices: [{ text: 'Get back to the sub-level.', next: 'D_sublevel_entry' }],
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
    effects: { flags: { set: 'elevator_powered', set: 'clamps_released' } },
    choices: [{ text: 'Just the key now.', next: 'D_terminal_success' }],
  },
  D_elevator: {
    speaker: 'Narrator',
    text: 'The service elevator. The final exit. The light is green. The clamps are released. All it needs is the key.',
    background: BG.lab_control_room,
    choices: [
      {
        text: 'Use the Service Elevator Key.',
        next: 'D_final_trap',
        requires: {
          inventory: ['service_elevator_key'],
          flags: ['elevator_powered', 'clamps_released'],
        },
      },
      { text: 'I still need to complete all the steps.', next: 'D_lab_entry' },
    ],
  },
  D_final_trap: {
    speaker: "Director's Echo",
    speakerKey: 'director_echo',
    text: "'So close. But my creation will not be denied.' The lab plunges into darkness, red emergency lights flashing. The elevator door slams shut. 'The Master is coming.'",
    background: BG.lab_control_room,
    sfx: SFX.alarm,
    jumpscare: true,
    choices: [{ text: 'No!', next: 'D_technician_arrival' }],
  },
  D_technician_arrival: {
    speaker: 'Narrator',
    text: "A heavy, grinding sound comes from the main entrance. The Technician smashes through the door. It's between you and the now-active emergency exit terminal.",
    background: BG.lab_control_room,
    npc: 'technician',
    choices: [{ text: "It's a final boss fight.", next: 'D_technician_fight' }],
  },
  D_technician_fight: {
    speaker: 'Narrator',
    text: 'The Technician lumbers towards you. You can try to dodge past it to reach the terminal, or use the environment to your advantage.',
    background: BG.lab_control_room,
    choices: [
      {
        text: 'Use the Cryo-Coolant on it.',
        next: 'D_freeze_technician',
        requires: { inventory: ['cryo_coolant_canister'] },
      },
      { text: 'Dodge past it.', next: 'D_dodge_technician' },
    ],
  },
  D_dodge_technician: {
    isDeath: true,
    text: "You try to run past, but it's deceptively fast. It grabs you and with a single, brutal motion, snaps your spine.",
  },
  D_freeze_technician: {
    speaker: 'Narrator',
    text: 'You spray the coolant. The Technician freezes solid, giving you a precious few seconds to reach the terminal and override the lockdown.',
    background: BG.lab_control_room,
    sfx: SFX.steam_hiss,
    choices: [{ text: 'Override the lockdown!', next: 'D_lab_escape' }],
  },

  // ================================================================================================================================
  // ESCAPE
  // ================================================================================================================================
  D_lab_escape: {
    speaker: 'Narrator',
    text: "Lockdown overridden. You insert the key. All systems are green. The heavy doors grind open. You step inside, leaving the horrors of the West Wing behind as you descend into the asylum's administrative heart.",
    background: BG.lab_control_room,
    bgm: BGM.descent,
    sfx: SFX.unlock,
    choices: [
      {
        text: 'The nightmare continues.',
        next: { chapter: 'chapter3', key: 'start' },
      },
    ],
  },
};
