

// src/stories/the_asylum/common.js

// Characters
export const characters = {
  player: {
    name: 'You',
    sprite: '/images/the_asylum/main_char_sprite.png', // Placeholder for player sprite
  },
  ghost: {
    name: 'Lily',
    sprite: '/images/the_asylum/lily_char_sprite.png', // Placeholder for ghost child sprite
  },
  doctor: {
    name: 'Dr. Finch',
    sprite: 'https://i.imgur.com/bT1xZ9g.png', // Placeholder for sinister doctor
  },
  director_echo: {
      name: "Director's Echo",
      sprite: 'https://i.imgur.com/Y1pE2iA.png', // Using the transparent echo sprite for his psychic presence
  },
  'Echo of Barlowe': {
      name: "Echo of Barlowe",
      sprite: 'https://i.imgur.com/Y1pE2iA.png',
  },
  'Archivist\'s Sorrow': {
      name: "Archivist's Sorrow",
      sprite: 'https://i.imgur.com/Y1pE2iA.png',
  },
  harris: {
    name: 'Harris',
    sprite: 'https://i.imgur.com/g8iL3hH.png', // Wounded man
  },
  echo: {
    name: 'Echo',
    sprite: 'https://i.imgur.com/Y1pE2iA.png', // Transparent, glitchy sprite for doctor ghosts
  },
  surgeon: {
    name: 'The Surgeon',
    sprite: 'https://i.imgur.com/Y1pE2iA.png', // Doctor ghost for infirmary
  },
  technician: {
    name: 'The Technician',
    sprite: 'https://i.imgur.com/8aZ5Y7r.png', // New patrolling threat for Chapter 2
  },
  skitter: {
    name: 'Skitter',
    sprite: 'https://i.imgur.com/3o1s8Q3.png', // Small lab creature
  },
  figure: {
    name: '???',
    sprite: 'https://i.imgur.com/3o1s8Q3.png', // Placeholder for shadowy figure/monster
  },
  janitor: {
    name: 'The Janitor',
    sprite: 'https://i.imgur.com/8aZ5Y7r.png', 
  },
  monster: {
    name: 'Subject 32',
    sprite: 'https://i.imgur.com/u1s3G8q.png',
  },
  watcher: {
      name: 'The Watcher',
      sprite: 'https://i.imgur.com/sC3eT2y.png', // Tall, gaunt patient
  },
  corpse_rats: {
      name: 'Corpse Rats',
      sprite: 'https://i.imgur.com/3o1s8Q3.png', // Placeholder sprite for rats
  },
  toxic_flora: {
    name: 'Toxic Flora',
    sprite: 'https://i.imgur.com/VOHg2Fv.png', // Placeholder for plant monster
  },
  corpse_amalgam: {
    name: 'Corpse Amalgam',
    sprite: 'https://i.imgur.com/u1s3G8q.png', // Stitched monster in the morgue
  },
  grave_worm: {
    name: 'Grave Worm',
    sprite: 'https://i.imgur.com/u1s3G8q.png', // Placeholder for tunnel creature
  },
  cryo_stalker: {
    name: 'Cryo-Stalker',
    sprite: 'https://i.imgur.com/3o1s8Q3.png', // Placeholder for thawed lab creature
  },
  'failed subject': {
    name: 'Failed Subject',
    sprite: 'https://i.imgur.com/u1s3G8q.png', // Generic monster sprite for Chapter 5
  },
  'ghostly musicians': {
      name: 'Ghostly Musicians',
      sprite: 'https://i.imgur.com/Y1pE2iA.png', // Generic ghost sprite for Chapter 6
  },
};

// Items (Key, Lore, Usable)
export const items = {
  // Chapter 1 Items (Consolidated)
  bedroom_key: { name: 'Bent Key', description: 'A small, bent key, slick with some kind of oil.' },
  keycard: { name: 'Bloody Keycard', description: "A standard-issue keycard, covered in a nurse's blood." },
  rubber_gloves: { name: 'Rubber Gloves', description: 'Thick, high-voltage electrician gloves. They smell of ozone.' },
  crowbar: { name: 'Crowbar', description: 'A heavy iron crowbar. Good for leverage or for caving in a skull.' },
  letter_opener: { name: 'Letter Opener', description: 'A sharp, steel letter opener. It was used as a murder weapon.' },
  broken_letter_opener: { name: 'Broken Letter Opener', description: 'The tip snapped off when you used it to pry something open.' },
  fan_control_key: { name: 'Fan Control Key', description: "A small brass key labeled 'FC-01'." },
  valve_handle: { name: 'Valve Handle', description: 'A rusty, heavy valve handle for controlling water flow.' },
  small_key: { name: 'Small, Rusty Key', description: 'A small key, recovered from a corpse. It looks like it fits a medical box.' },
  main_ward_key: { name: 'Main Ward Key', description: 'An ornate key, the final reward for appeasing the spirits of the flooded wing.' },
  coolant_canister: { name: 'Corrosive Coolant', description: 'A canister of industrial coolant. Highly corrosive. Could be used as a makeshift weapon.' },
  researcher_keycard: { name: "Researcher's Keycard", description: "A keycard belonging to one of the lab's researchers." },
  metal_pipe: { name: 'Iron Pipe', description: 'A heavy length of iron pipe. A solid weapon.' },
  elevator_schematic: { name: 'Vent Schematic', lore: { title: 'Schematic Notes', content: "'Janitor is the only one with the override key for the main fan. Don't let him catch you. He takes things apart.'" } },
  old_newspaper: { name: 'Old Newspaper Clipping', lore: { title: 'Asylum Accident (10/23/1987)', content: "A freak electrical accident at Blackwood Asylum today resulted in the tragic death of a janitor, Elias Thorne. An internal investigation is underway, though asylum officials state it was simply a 'terrible accident'." } },
  melted_tape: { name: 'Pristine Audio Tape', lore: { title: 'Dr. Crane: Final Recording', content: "(STATIC)...The specimen is unstable! The reaction is... it's too hot! The containment is failing! OH GOD, THE PAIN! I'M BURNING! (SCREAMING)..." } },
  drowned_locket: { name: 'Drowned Locket', lore: { title: 'Patient 14: Final Session', content: "Dr. Blackwood insisted the patient confront her aquaphobia in the hydro-chamber. He held her under. He called it 'immersion therapy'. He called her screams 'a breakthrough'." } },
  broken_watch: { name: 'Broken Pocket Watch', description: "Dr. Adler's watch, stopped at the exact moment of his death. A memory of time." },
  adler_note: { name: "Dr. Adler's Note", lore: { title: "Dr. Adler's Ambition", content: "Dr. Adler believed he could manipulate time by inducing extreme trauma. His notes claim his fall was intentional, an attempt to 'break free' from linear perception. He did not succeed." } },
  researcher_log: { name: "Researcher's Log", lore: { title: 'Log: Psych-Reactive Agent', content: "Subject 32's exposure to the agent is a disaster. Uncontrolled bone growth. It's a monster. We put it in the vents. Subject 47 is next. The agent must be destroyed." } },

  // Chapter 2 Items
  service_elevator_key: { name: 'Service Elevator Key', description: "A heavy, greasy key for the lab's service elevator. Found inside the Cryo-Stalker." },
  frequency_tuner: { name: 'Frequency Tuner', description: 'A device used in sonic experiments to calibrate and emit specific frequencies. Found in the Sensory Lab.' },
  replacement_igniter: { name: 'Crematorium Igniter', description: 'A specialized, high-temperature igniter for the crematorium furnace.' },
  sulfuric_acid: { name: 'Sulfuric Acid', description: 'A bottle of highly corrosive sulfuric acid from the embalming room.'},
  hydrogen_peroxide: { name: 'Hydrogen Peroxide', description: 'A bottle of concentrated hydrogen peroxide from the morgue office.'},
  acetone: { name: 'Acetone', description: 'A can of industrial acetone from the pathology lab.'},
  sealant_tape: { name: 'Sealant Tape', description: 'Industrial-grade sealant tape for repairing high-pressure pipes.'},
  morgue_office_key: { name: 'Morgue Office Key', description: "A small key labeled 'Coroner'. It was found near the body of Patient #113." },
  acidic_compound: { name: 'Acidic Compound', description: 'A volatile, smoking mixture that can dissolve organic tissue. A temporary solution.' },
  coroner_office_key: { name: 'Coroner\'s Office Key', description: 'The key to the Coroner\'s private office, found on his body.'},
  crematorium_key: { name: 'Crematorium Key', description: 'The key to the crematorium furnace, found in the Coroner\'s office.'},
  acid_formula_part_1: { name: 'Acid Formula Scrap 1', lore: {title: 'Formula Scrap 1', content: '...cid, 1 part Hydrogen Peroxide...'}},
  acid_formula_part_2: { name: 'Acid Formula Scrap 2', lore: {title: 'Formula Scrap 2', content: '...and 2 parts Acetone. Mix in that order ONLY.'}},
  acid_formula_part_3: { name: 'Acid Formula Scrap 3', lore: {title: 'Formula Scrap 3', content: 'To dissolve the Amalgam...'}},
  chemical_catalyst: { name: 'Chemical Catalyst', description: 'A volatile chemical agent from the lab, required to super-heat the crematorium furnace.' },
  biomass_sample: { name: 'Biomass Sample', description: 'A quivering sample of flesh from the Corpse Amalgam. Required for calibration.' },
  placeholder_power_cell: { name: 'Cryo-Power Cell', description: 'A high-density power cell, kept stable at low temperatures. Needed for the Bio-Resonance Neutralizer.' },
  neutralizer_agent: { name: 'Neutralizer Agent', description: 'A permanent solution to the Amalgam problem, created in the Bio-Resonance Lab.'},
  film_reel_a: { name: 'Film Reel: "Sunrise"', description: 'A reel of film labeled with a simple drawing of a sunrise.' },
  film_reel_b: { name: 'Film Reel: "Storm"', description: 'A reel of film labeled with a drawing of a lightning bolt.' },
  film_reel_c: { name: 'Film Reel: "Void"', description: 'A reel of film labeled with a simple black circle.' },
  film_reel_d: { name: 'Film Reel: "Heartbeat"', description: 'A reel of film labeled with an EKG waveform.' },
  projector_lens: { name: 'Projector Lens', description: 'A large, specialized lens for the therapy wing\'s film projector.'},
  hydro_pump_key: { name: 'Hydro-pump Key', description: 'A key found in the Doctor\'s office in the Surgical Wing. Labeled "HP-01".'},
  pump_motor: { name: 'Pump Motor', description: 'A replacement motor for the Hydrotherapy wing\'s main pump.' },
  replacement_bulb: { name: 'Projector Bulb', description: 'A high-intensity bulb for the film projector.'},
  sheet_music_1: { name: 'Sheet Music Scrap 1', description: 'A torn piece of sheet music showing the notes "C, A..."' },
  sheet_music_2: { name: 'Sheet Music Scrap 2', description: 'The rest of the melody: "...G, E."' },
  painting_solvent: { name: 'Painting Solvent', description: 'A strong chemical solvent used to strip paint from canvases.'},
  employee_id: { name: 'Employee ID Card', description: "An ID card for a junior staff member, Dr. Evans. Might open a locker." },
  ambulance_keycard: { name: 'Ambulance Bay Keycard', description: 'A high-level keycard for emergency exits.'},
  sedative_vial: { name: 'Sedative Vial', description: 'A powerful sedative. Could be used to tranquilize a patient... or something else.'},
  surgical_manual: { name: 'Surgical Manual', lore: {title: 'Implant Extraction Protocol', content: 'CAUTION: Device is volatile. Extraction requires a fine-tipped #11 scalpel to sever the bio-conduits, and a retractor to hold the chest cavity open without damaging the power cell.'}},
  fine_tipped_scalpel: { name: '#11 Scalpel', description: 'A surgeon\'s scalpel with a very fine, sharp point, used for delicate work.'},
  retractor: { name: 'Surgical Retractor', description: 'A tool used to hold open a wound or incision during surgery.'},
  pharmacy_key: { name: 'Pharmacy Key', description: 'The key to the infirmary\'s pharmacy, found on a doctor\'s corpse.'},
  sterilization_key: { name: 'Sterilization Key', description: 'A key for the sterilization room, where surgical tools are kept.' },
  alarm_schematic: { name: 'Alarm Schematic', description: 'A wiring diagram for the pressure plates around the operating table.' },
  surgical_restraints: { name: 'Surgical Restraints', description: 'Heavy leather and metal restraints for securing a patient to an operating table.'},
  cryo_coolant_canister: { name: 'Cryo-Coolant Canister', description: 'A canister of super-cooled liquid. Can instantly freeze organic matter.' },
  specimen_food: { name: 'Specimen Food Pellets', description: 'A small bag of nutrient pellets. Smells awful.' },
  hazmat_suit: { name: 'Hazmat Suit', description: 'An insulated suit for handling hazardous materials and extreme temperatures.' },
  cryo_laser: { name: 'Cryo-Laser', description: 'A prototype weapon that fires a beam of intense cold. One shot only.' },
  archives_keycard: {name: 'Archives Keycard', description: 'A keycard providing access to the high-security specimen archives in the morgue.'},

  // Chapter 3 Items
  elysium_folder: { name: "'Elysium' Folder", lore: { title: 'Elysium File: Subject 47', content: "'Subject 47 is the perfect vessel. We must use them to anchor LILY's fractured mind. Procedure requires repeated cerebral boring to install conduits. The subject's screaming is... loud. Recommend removing vocal cords.'" } },
  
  // -- Security Wing Items --
  chiefs_keycard: {name: "Chief's Keycard", description: "A high-level keycard belonging to Chief Barlowe."},
  chiefs_password: {name: "Chief's Password", description: "A tattered note with a password scrawled on it: ELYSIUM."},
  security_exit_key: {name: 'Security Exit Key', description: 'An ornate key from the Chief of Security\'s private office.'},
  sturdy_flashlight: {name: 'Sturdy Flashlight', description: 'A heavy, metal flashlight. Good for dark places or as a blunt instrument.'},
  bolt_cutters: { name: 'Bolt Cutters', description: 'Heavy-duty bolt cutters from the armory.'},
  fuse: { name: 'Fuse', description: 'A standard electrical fuse.'},

  // -- Records Wing Items --
  fountain_pen: {name: 'Fountain Pen', description: 'A beautiful, ink-stained fountain pen. It belonged to the Archivist.'},
  pressed_flower: {name: 'Pressed Flower', description: 'A delicate, pressed flower used as a bookmark. It belonged to the Archivist.'},
  termination_notice: {name: 'Termination Notice', description: 'A formal notice of termination for the Head Archivist, citing "emotional instability".'},

  // -- Personnel Wing Items --
  master_personnel_key: { name: 'Master Personnel Key', description: 'An ornate key from the Legacy Plaque. It should open the rooftop fire escape.'},
  solder_wire: { name: 'Solder Wire', description: 'A spool of solder wire, needed to repair electrical components.'},
  vacuum_tube: { name: 'Vacuum Tube', description: 'An old vacuum tube, required to repair the rooftop radio tower.'},
  rooftop_key: {name: 'Rooftop Key', description: 'A small, rusty key for the rooftop maintenance shed.'},
  legacy_locket: {name: 'Legacy Locket', description: 'A small, silver locket. An item of betrayal.'},
  legacy_epaulette: {name: 'Legacy Epaulette', description: 'A decorative shoulder piece from a guard uniform. An item of betrayal.'},
  legacy_glasses: {name: 'Legacy Glasses', description: 'A pair of spectacles. An item of betrayal.'},
  legacy_award: {name: 'Legacy Award', description: 'A tarnished "Employee of the Year" award. An item of betrayal.'},
  legacy_cufflink: {name: 'Legacy Cufflink', description: 'A single, silver cufflink. An item of betrayal.'},
  legacy_yearbook: {name: 'Legacy Yearbook Photo', description: 'A photo of a smiling staff member, circled in red. An item of betrayal.'},
  
  // -- Stat & Recovery Items --
  flask_of_whiskey: { name: "Guard's Flask", description: "A flask of cheap, strong whiskey. Might calm the nerves." },
  first_aid_kit: { name: 'First-Aid Kit', description: 'A well-stocked first-aid kit from the staff infirmary.'},
  
  // -- Generic & Cross-Chapter Lore --
  nurses_diary: { name: "Nurse's Diary", lore: {title: 'A Nurse\'s Fear', content: "'He brought his own daughter here. Lily. Such a sweet, sad girl. He calls her psychic sensitivity a gift, but it's a curse. The Director's experiments on her are getting worse. I tried to speak out, but he... he threatened me. All of us. He called us his 'Legacy of Betrayal'. We are all just tools to him.'"}},

  // Chapter 4 Items
  finch_diary: { name: "Dr. Finch's Diary", lore: { title: "Finch's Final Entry", content: 'Lily is a ghost in the machine I built. Her mind shattered, and I tried to use Subject 47 to piece it back together. Now her angry spirit is trapped here. And so are we all. 47 is the only one who can free her... or destroy her.' } },

  // Chapter 5 Items
  'lily\'s locket': { name: "Lily's Locket", description: "A small, tarnished silver locket. It feels cold to the touch. This is one of her memories." },
  'welding torch': { name: 'Welding Torch', description: 'An industrial torch for cutting through metal. It needs fuel.'},
  
  // Chapter 6 Items
  'faded score': { name: 'Faded Score', description: 'The original, complete score for the final performance. A memory of music.'},
  'wilted rose': { name: 'Wilted Rose', description: 'A single, perfectly preserved, but wilted rose. A memory of love.'},
  'velvet mask': { name: 'Velvet Mask', description: 'A simple, elegant mask worn by the lead performer. A memory of sorrow.'},
};