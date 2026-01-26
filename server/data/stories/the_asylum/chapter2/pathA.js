import { BGM, SFX } from '../../../audioData.js';
import { BG } from '../backgrounds.js';

export const pathA = {
  // ================================================================================================================================
  // PATH A — THE MORGUE (ESCAPE: THE PATH OF FILTH)
  // ================================================================================================================================
  A_morgue_entry: {
    speaker: 'Narrator',
    text: "You find a stairwell leading down into a chilling darkness. The air grows rank with the smell of formaldehyde and rot. This is the path to the morgue, the asylum's final, cold repository.",
    background: BG.morgue_receiving,
    bgm: BGM.descent,
    effects: { stats: { sanity: -5 } },
    ambientSfx: [{ triggerWord: 'rot', sfx: SFX.waterDrip }],
    choices: [
      { text: 'Descend into the cold.', next: 'A_morgue_receiving' },
      { text: 'This is a bad idea. Go back.', next: 'hub' },
    ],
  },
  A_morgue_receiving: {
    speaker: 'Narrator',
    text: "You enter the morgue's receiving room. Empty, stained gurneys line the walls like silent sentinels. The silence here is absolute, broken only by a maddening, rhythmic drip. Doors lead to the Autopsy Theater, Cold Storage, the Embalming Room, the Crematorium, the Coroner's Office, and the Pathology Lab.",
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
      { text: 'Go back upstairs.', next: 'hub' },
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
    text: 'The autopsy theater is dominated by a stained steel table under a harsh, buzzing light. The room is a temple to dissection, every surface gleaming with a sterile menace.',
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
    jumpscare: { type: 'text', text: 'SCREAM', sfx: 'scream' },
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
    text: 'Following the formula, you mix the volatile chemicals. The resulting compound smokes and hisses, a promise of violent dissolution. It should be enough to temporarily disable the amalgam.',
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
      { text: 'I need to find the module.', next: 'A_crematorium_entry' },
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
    text: 'Among the ash and bone fragments is a heat-resistant container. Inside is the heavy, greasy key for the Service Elevator.',
    background: BG.morgue_crematorium,
    effects: { inventory: { add: 'service_elevator_key' } },
    choices: [
      {
        text: 'This key is for the main lab elevator.',
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
        requires: { inventory: ['placeholder_power_cell', 'biomass_sample'] },
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
      inventory: { remove: ['placeholder_power_cell', 'biomass_sample'] },
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
    text: 'With the Amalgam gone, the Pathology Lab is safe to explore. A previously blocked maintenance hatch is now accessible.',
    background: BG.morgue_pathology,
    choices: [
      {
        text: "Search the Coroner's body.",
        next: 'A_search_coroner_cleared',
        requires: { notFlags: ['has_coroner_key'] },
      },
      {
        text: 'Search the lab benches.',
        next: 'A_search_pathology_bench_cleared',
        requires: { notFlags: ['has_acetone'] },
      },
      { text: 'Enter the Bio-Resonance Lab.', next: 'A_bio_lab_entry' },
      {
        text: 'Escape through the maintenance hatch.',
        next: 'A_escape_morgue',
      },
    ],
  },
  A_search_coroner_cleared: {
    speaker: 'Narrator',
    text: "You find the key to the Coroner's main office on his body.",
    effects: { inventory: { add: 'coroner_office_key' } },
    choices: [{ text: 'Got it.', next: 'A_pathology_cleared' }],
  },
  A_search_pathology_bench_cleared: {
    speaker: 'Narrator',
    text: 'On a gore-splattered bench, you find a can of acetone and another scrap of the acid formula.',
    effects: { inventory: { add: ['acetone', 'acid_formula_part_1'] } },
    choices: [{ text: 'Take the items.', next: 'A_pathology_cleared' }],
  },
  A_escape_morgue: {
    speaker: 'Narrator',
    text: 'The hatch opens into a dark, narrow service tunnel. You crawl through the filth and darkness, emerging into a different, unfamiliar section of the asylum.',
    background: BG.courtyard_rainy,
    bgm: BGM.courtyard,
    effects: { flags: { set: 'A_ch2_escaped' } },
    choices: [{ text: "I'm out. But where am I now?", next: 'end_chapter' }],
  },
};
