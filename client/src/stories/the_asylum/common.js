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
  harris: {
    name: 'Harris',
    sprite: 'https://i.imgur.com/g8iL3hH.png', // Wounded man
  },
  echo: {
    name: 'Echo',
    sprite: 'https://i.imgur.com/Y1pE2iA.png', // Transparent, glitchy sprite for doctor ghosts
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
};

// Items (Key, Lore, Usable)
export const items = {
  // Chapter 1 - Path A Items
  rubber_gloves: {
    name: 'Rubber Gloves',
    description: 'Thick, high-voltage electrician gloves. They smell of ozone.',
  },
  crowbar: {
    name: 'Crowbar',
    description:
      'A heavy iron crowbar. Good for leverage or for caving in a skull.',
  },
  letter_opener: {
    name: 'Letter Opener',
    description:
      'A sharp, steel letter opener. It was used as a murder weapon.',
  },
  broken_letter_opener: {
    name: 'Broken Letter Opener',
    description: 'The tip snapped off when you used it to pry something open.',
  },
  elevator_schematic: {
    name: 'Vent Schematic',
    description:
      "A technical drawing of the wing's ventilation system. A path to the outside is circled in red.",
    lore: {
      title: 'Schematic Notes',
      content:
        "A note scribbled in the margins: 'Janitor is the only one with the override key for the main fan. Don't let him catch you. He takes things apart.'",
    },
  },
  fan_control_key: {
    name: 'Fan Control Key',
    description: "A small brass key labeled 'FC-01'.",
  },
  old_newspaper: {
    name: 'Old Newspaper Clipping',
    description:
      'A yellowed newspaper article dated October 23, 1987, detailing a fatal accident involving a janitor.',
    lore: {
      title: 'Asylum Accident (10/23/1987)',
      content:
        "A freak electrical accident at Blackwood Asylum today resulted in the tragic death of a janitor, Elias Thorne. Witnesses describe a horrific scene where Thorne was reportedly mutilated by a malfunctioning ventilation fan control system. An internal investigation is underway, though asylum officials state it was simply a 'terrible accident'.",
    },
  },
  adrenaline_syringe: {
    name: 'Adrenaline Syringe',
    description:
      "A syringe filled with a green fluid. The label is smudged, but you can make out the word 'Adrenal'. Using a dirty needle is risky.",
  },
  junction_keycard: {
    name: 'Junction Box Keycard',
    description:
      "A keycard for 'Junction Box Access'. Found in a very unpleasant place.",
  },

  // Chapter 1 - Path B Items
  melted_tape: {
    name: 'Pristine Audio Tape',
    description:
      "Dr. Crane's final words, perfectly preserved. A memory of fire.",
    lore: {
      title: 'Dr. Crane: Final Recording',
      content:
        "(STATIC)...The specimen is unstable! The reaction is... it's too hot! The containment is failing! OH GOD, THE PAIN! I'M BURNING! (SCREAMING)...",
    },
  },
  drowned_locket: {
    name: 'Drowned Locket',
    description:
      "A patient's silver locket, recovered from water. A memory of loss.",
    lore: {
      title: 'Patient 14: Final Session',
      content:
        "Dr. Blackwood insisted the patient confront her aquaphobia in the hydro-chamber. He held her under. He called it 'immersion therapy'. He called her screams 'a breakthrough'.",
    },
  },
  broken_watch: {
    name: 'Broken Pocket Watch',
    description:
      "Dr. Adler's watch, stopped at the exact moment of his death. A memory of time.",
  },
  valve_handle: {
    name: 'Valve Handle',
    description: 'A rusty, heavy valve handle for controlling water flow.',
  },
  clock_hand: {
    name: 'Ornate Clock Hand',
    description: 'A single, ornate minute hand from a grandfather clock.',
  },
  small_key: {
    name: 'Small, Rusty Key',
    description:
      'A small key, recovered from a corpse. It looks like it fits a medical box.',
  },
  adler_note: {
    name: "Dr. Adler's Note",
    description:
      "A research proposal for an experiment in 'gravitational trauma'.",
    lore: {
      title: "Dr. Adler's Ambition",
      content:
        "Dr. Adler believed he could manipulate time by inducing extreme trauma. His notes claim his fall was intentional, an attempt to 'break free' from linear perception. He did not succeed.",
    },
  },
  main_ward_key: {
    name: 'Main Ward Key',
    description:
      'An ornate key, the final reward for appeasing the spirits of the flooded wing.',
  },

  // Chapter 1 - Path C Items
  blank_book: {
    name: 'Blank Book',
    description:
      'A book whose pages are utterly blank. An anomaly of order in a world of chaos.',
  },
  shattered_mirror_shard: {
    name: 'Mirror Shard',
    description:
      'A piece of a shattered mirror. Your reflection in it is screaming.',
  },
  working_clock: {
    name: 'Working Toy Clock',
    description:
      'A simple toy clock, but its hands tick forwards, perfectly. A profound wrongness.',
  },
  clean_scalpel: {
    name: 'Clean Scalpel',
    description:
      'A perfectly clean, unused surgical scalpel. An anomaly in a place of filth.',
  },
  perfect_apple: {
    name: 'Perfect Apple',
    description:
      'A bright red apple, completely untouched by rot. An anomaly in a place of decay.',
  },

  // Chapter 1 - Path D Items
  operations_manual: {
    name: 'Bulkhead Operations Manual',
    description:
      "A technical manual detailing the emergency override for the lab's bulkhead door.",
    lore: {
      title: 'Manual Excerpt',
      content:
        'WARNING: Rerouting power from Life Support systems is an emergency measure only. All auxiliary power draws must be disabled prior to rerouting to prevent catastrophic system failure.',
    },
  },
  coolant_canister: {
    name: 'Corrosive Coolant',
    description:
      'A canister of industrial coolant. Highly corrosive. Could be used as a makeshift weapon.',
  },
  researcher_keycard: {
    name: "Researcher's Keycard",
    description: "A keycard belonging to one of the lab's researchers.",
  },
  researcher_log: {
    name: "Researcher's Log",
    description: "A digital log about a failed experiment on 'Subject 32'.",
    lore: {
      title: 'Log: Psych-Reactive Agent',
      content:
        "Subject 32's exposure to the agent is a disaster. Uncontrolled bone growth. It's a monster. We put it in the vents. Subject 47 is next. The agent must be destroyed.",
    },
  },
  metal_pipe: {
    name: 'Iron Pipe',
    description: 'A heavy length of iron pipe. A solid weapon.',
  },

  // Shared Items
  bedroom_key: {
    name: 'Bent Key',
    description: 'A small, bent key, slick with some kind of oil.',
  },
  keycard: {
    name: 'Bloody Keycard',
    description: "A standard-issue keycard, covered in a nurse's blood.",
  },

  // Chapter 2 Items
  west_wing_key: {
    name: 'Ornate Key',
    description:
      'A heavy, ornate key with a "W" engraved on it. It feels cold.',
  },
  patient_file: {
    name: 'Patient File #23',
    description:
      'A mouldy file for a patient named "The Watcher". Details his obsession with "the girl in the walls".',
    lore: {
      title: 'File #23: The Watcher',
      content:
        "Patient suffers from extreme paranoia. Claims a girl whispers to him from inside the walls. He has become violent, trying to 'free her' by carving into the plaster. He knows the building's secrets.",
    },
  },
  // Chapter 3 Items
  fuse: {
    name: 'Glass Fuse',
    description:
      'A small glass fuse, required to restore power to the security office.',
  },
  elysium_folder: {
    name: "'Elysium' Folder",
    description:
      'Your patient file. It details horrific experiments performed on you.',
    lore: {
      title: 'Elysium File: Subject 47',
      content:
        "'Subject 47 is the perfect vessel. We must use them to anchor LILY's fractured mind. Procedure requires repeated cerebral boring to install conduits. The subject's screaming is... loud. Recommend removing vocal cords.'",
    },
  },
  // Chapter 4 Items
  finch_diary: {
    name: "Dr. Finch's Diary",
    description: 'A leather-bound diary. The last page is a confession.',
    lore: {
      title: "Finch's Final Entry",
      content:
        'Lily is a ghost in the machine I built. Her mind shattered, and I tried to use Subject 47 to piece it back together. Now her angry spirit is trapped here. And so are we all. 47 is the only one who can free her... or destroy her.',
    },
  },
};
