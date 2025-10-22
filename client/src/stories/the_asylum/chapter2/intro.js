import { BGM } from '../../../data/audioData.js';
import { BG } from '../backgrounds.js';

export const intro = {
  // ===================================================================
  // DYNAMIC START ROUTER
  // ===================================================================
  start: {
    speaker: 'Narrator',
    text: '', // This is intentionally blank to immediately process the single available choice.
    choices: [
      { text: '...', next: 'start_from_A', requires: { flags: ['A_completed'] } },
      { text: '...', next: 'start_from_B', requires: { flags: ['B_completed'] } },
      { text: '...', next: 'start_from_C', requires: { flags: ['C_completed'] } },
      { text: '...', next: 'start_from_D', requires: { flags: ['D_completed'] } },
      // This is the default path if no completion flag is found (e.g., starting a new game at Chapter 2)
      { text: '...', next: 'hub' } 
    ]
  },
  
  start_from_A: {
    speaker: 'Narrator',
    text: "You stumble out of the maintenance vent into the cold, rain-soaked air of the West Wing grounds. The Janitor's roars fade behind you. Before you is the entrance to a new wing, its sign hanging crookedly: 'Where Hope Sleeps'.",
    background: BG.west_wing_entrance,
    bgm: BGM.tension,
    choices: [{ text: 'Enter the West Wing.', next: 'hub' }]
  },

  start_from_B: {
    speaker: 'Narrator',
    text: "Clutching the ornate key from the clock, you unlock a heavy door at the end of the flooded wing. It opens into a new area of the asylum. The air here is colder, stagnant. A sign hangs crookedly: 'Where Hope Sleeps'.",
    background: BG.west_wing_entrance,
    bgm: BGM.tension,
    choices: [{ text: 'Enter the West Wing.', next: 'hub' }]
  },

  start_from_C: {
    speaker: 'Narrator',
    text: "You find yourself in a dusty storage closet, the psychic screams of the Children's Ward finally silenced. A door marked 'Maintenance Access' leads you into a new part of the asylum. The air is cold and still. A sign hangs crookedly: 'Where Hope Sleeps'.",
    background: BG.west_wing_entrance,
    bgm: BGM.tension,
    choices: [{ text: 'Enter the West Wing.', next: 'hub' }]
  },

  start_from_D: {
    speaker: 'Narrator',
    text: "You seal the bulkhead door, leaving the monstrous Subject 32 behind. You are in a sterile, white laboratory corridor at the entrance to a new wing. The air is cold. A sign hangs crookedly: 'Where Hope Sleeps'.",
    background: BG.west_wing_entrance,
    bgm: BGM.tension,
    choices: [{ text: 'Explore the West Wing.', next: 'hub' }]
  },

  // ===================================================================
  // HUB & INTRO
  // ===================================================================
  hub: {
    speaker: 'Narrator',
    text: "You stand at the entrance to the West Wing. The air is colder, stagnant with the ghost of forgotten suffering. Each wing seems to hold its own dark purpose, and likely, its own way out. A central elevator could be one escape, but the other wings are just as likely to hide a path forward.",
    background: BG.west_wing_entrance,
    bgm: BGM.tension,
    revisitText: "You are back at the entrance to the West Wing. The silence is heavy and judgmental. The Morgue, Rec Therapy, Surgical Wing, and Sensory Lab each present a potential path to escape.",
    effects: { setCheckpoint: true },
    choices: [
      { text: 'Descend to the Morgue Complex', next: 'A_morgue_entry' },
      { text: 'Investigate Aural & Ocular Therapy', next: 'B_rec_entry' },
      { text: 'Search the Surgical & Pharmaceutical Wing', next: 'C_infirmary_entry' },
      { text: 'Find the Sensory Experimentation Lab', next: 'D_lab_entry' },
    ]
  },

  // ================================================================================================================================
  // ESCAPE & CHAPTER END
  // ================================================================================================================================
  end_chapter: {
    speaker: 'Narrator',
    text: 'Whether you escaped through filth, illusion, blood, or science, the path has led you here. You step into a grand, marbled lobby, the Central Administration wing. The air is cold, still, and carries the faint, sterile scent of ozone. The chaotic, visceral horror of the wings is gone, replaced by a cold, intellectual dread.',
    background: BG.admin_wing,
    bgm: BGM.ambient,
    choices: [{text: '...', next: 'end_chapter_2'}]
  },
  end_chapter_2: {
    speaker: 'You',
    text: "This place... it's different. This is not a place of monsters, but of the men who create them. And I feel, with a certainty that chills me to the bone, that I have just stepped into the Director's personal domain.",
    background: BG.admin_wing,
    choices: [{text: 'My story is written here.', next: {chapter: 'chapter3', key: 'start'}}]
  }
};
