import { BGM, SFX } from '../../../audioData.js';
import { BG } from '../backgrounds.js';

export const pathB = {
    // ================================================================================================================================
    // PATH B — REC THERAPY (ESCAPE: THE SILVER SCREEN)
    // ================================================================================================================================
    B_rec_entry: {
        speaker: 'Narrator',
        text: "You enter a large, multi-level room for Aural & Ocular Therapy. The lower level is a rec room patrolled by The Watcher, a patient with extreme photosensitivity. The upper level contains an observation deck and other therapy rooms.",
        background: BG.rec_therapy_upper,
        bgm: BGM.softHaunt,
        revisitText: "Back in the Rec Wing. The Watcher is still down there. I need to find all four film reels, a new lens, and a new bulb to work the projector.",
        choices: [
            { text: 'Explore the upper level.', next: 'B_rec_upper' },
            { text: 'Descend to the lower Rec Room.', next: 'B_rec_lower' },
            { text: 'Leave.', next: 'hub' },
        ]
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
        ]
    },
    B_observation_entry: {
        speaker: 'Narrator',
        text: "A series of small, dark rooms with one-way mirrors look down on the therapy rooms below. One looks into Art Therapy, another into Music Therapy.",
        background: BG.rec_therapy_observation,
        choices: [
            { text: 'Observe the Art Room.', next: 'B_observe_art' },
            { text: 'Observe the Music Room.', next: 'B_observe_music' },
            { text: 'Leave.', next: 'B_rec_upper' },
        ]
    },
    B_observe_art: {
        speaker: 'Narrator',
        text: "Through the one-way glass, you see the art room. Something about the completely black canvas feels wrong, like a void staring back. You feel an inexplicable urge to look closer.",
        background: BG.rec_therapy_observation,
        choices: [{ text: 'I should investigate that painting.', next: 'B_observation_entry' }]
    },
    B_observe_music: {
        speaker: 'Narrator',
        text: "You see the piano. A spectral figure is playing a haunting, complex melody, far more intricate than the one on the sheet music. It seems to be a loop of their final moments.",
        background: BG.rec_therapy_observation,
        choices: [{ text: "I can't replicate that.", next: 'B_observation_entry' }]
    },
    B_projection_booth: {
        speaker: 'Narrator',
        text: 'The projection booth houses a large film projector. It looks like it needs a new lens, a new bulb, and four film reels to be loaded in a specific sequence.',
        background: BG.rec_therapy_projection,
        choices: [
            { text: 'Examine the projector more closely.', next: 'B_examine_projector' },
            { text: 'Search the booth.', next: 'B_search_booth' },
            { text: 'Leave.', next: 'B_rec_upper' },
        ]
    },
    B_examine_projector: {
        speaker: 'Narrator',
        text: 'The lens is shattered and the bulb is burnt out. Without replacements, this is useless. There are four empty spools, waiting for film.',
        background: BG.rec_therapy_projection,
        choices: [
            { text: 'Install new lens.', next: 'B_install_lens', requires: { inventory: ['projector_lens'] } },
            { text: 'Install new bulb.', next: 'B_install_bulb', requires: { inventory: ['replacement_bulb'] } },
            { text: "I'm missing parts.", next: 'B_projection_booth' }
        ]
    },
    B_search_booth: {
        speaker: 'Narrator',
        text: "Amongst scattered papers, you find a technician's log.",
        background: BG.rec_therapy_projection,
        choices: [
            { text: 'Read the log.', next: 'B_read_tech_log' },
            { text: 'Leave.', next: 'B_projection_booth' }
        ]
    },
    B_read_tech_log: {
        speaker: 'Narrator',
        text: "'Patient #84 is responding to the visual therapy. The art room holds the key to the order. But the damn lens shattered. Spare is in the lab sub-level. The bulb blew too, check the music room.'",
        background: BG.rec_therapy_projection,
        sfx: SFX.paperRustle,
        choices: [{ text: "So the lens is in the lab, and the bulb is in the music room.", next: 'B_projection_booth' }]
    },
    B_install_lens: {
        speaker: 'Narrator',
        text: 'You replace the shattered lens with the new one. The projector is one step closer to working.',
        background: BG.rec_therapy_projection,
        sfx: SFX.puzzleSuccess,
        effects: { flags: { set: 'projector_lens_fixed' } },
        choices: [{ text: 'Now for the bulb and films.', next: 'B_check_reels' }]
    },
    B_install_bulb: {
        speaker: 'Narrator',
        text: 'You replace the burnt-out bulb. The projector hums faintly, ready for power and film.',
        background: BG.rec_therapy_projection,
        sfx: SFX.puzzleSuccess,
        effects: { flags: { set: 'projector_bulb_fixed' } },
        choices: [{ text: 'Now for the lens and films.', next: 'B_check_reels' }]
    },
    B_check_reels: {
        speaker: 'Narrator',
        text: 'The projector is ready. Do you have all four film reels?',
        background: BG.rec_therapy_projection,
        choices: [
            { text: 'Load the film reels.', next: 'B_load_reels_prompt', requires: { inventory: ['film_reel_a', 'film_reel_b', 'film_reel_c', 'film_reel_d'], flags: ['projector_lens_fixed', 'projector_bulb_fixed'] } },
            { text: "I'm missing something.", next: 'B_projection_booth' }
        ]
    },
    B_load_reels_prompt: {
        speaker: 'You',
        text: "I have all four reels, and the projector is fixed. I just need to remember the order from the art room... Sunrise, Storm, Heartbeat, Void.",
        background: BG.rec_therapy_projection,
        choices: [
            { text: 'Load the reels in order.', next: 'B_load_reels_success' }
        ]
    },
    B_load_reels_success: {
        speaker: 'Narrator',
        text: "You load the reels in the correct sequence. The projector whirs to life, casting a complex series of images onto the screen below... but it doesn't stop. It casts one final, steady image onto the far wall: a simple, wooden door.",
        background: BG.rec_therapy_projection,
        sfx: SFX.puzzleSuccess,
        visualEffect: 'glitch',
        effects: { flags: { set: 'watcher_pacified' } },
        choices: [{ text: 'A door...?', next: 'B_escape_projector' }]
    },
    B_escape_projector: {
        speaker: 'Narrator',
        text: "As you approach, the projected door shimmers and becomes solid. You reach out a trembling hand and touch real, solid wood. You turn the knob, and it opens into a cool, dark space beyond the asylum walls.",
        background: BG.rec_therapy_projection,
        sfx: SFX.secretDoor,
        effects: { flags: { set: 'B_ch2_escaped' } },
        choices: [{ text: 'A new wing. A new set of horrors.', next: 'end_chapter' }]
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
        ]
    },
    B_painting_storage: {
        speaker: 'Narrator',
        text: "Old canvases are stacked here. You find a set of three paintings, a triptych, depicting a man's terrible therapy. They seem to tell a story, but they are hung in the wrong order.",
        background: BG.rec_therapy_painting_storage,
        revisitText: "The triptych is still on the wall, waiting to be arranged.",
        choices: [
            { text: 'Examine the paintings.', next: 'B_painting_puzzle_observe' },
            { text: 'Leave.', next: 'B_art_therapy' }
        ]
    },
    B_painting_puzzle_observe: {
        speaker: 'Narrator',
        text: "The three panels show: (1) A man screaming at a blindingly bright sun. (2) The same man huddled in a pitch-black, shadowy corner. (3) The man being forcibly given an injection by a doctor.",
        background: BG.rec_therapy_painting_storage,
        choices: [
            { text: 'Try to arrange them: Injection, Sun, Shadows.', next: 'B_painting_puzzle_success' },
            { text: 'Try to arrange them: Sun, Shadows, Injection.', next: 'B_painting_puzzle_fail' },
            { text: 'Try to arrange them: Shadows, Injection, Sun.', next: 'B_painting_puzzle_fail' },
            { text: 'Leave the puzzle for now.', next: 'B_painting_storage' },
        ]
    },
    B_painting_puzzle_fail: {
        speaker: 'Narrator',
        text: "You rearrange the paintings, but nothing happens. The order must be wrong. You hear a faint, sorrowful sigh from the main rec room.",
        background: BG.rec_therapy_painting_storage,
        effects: { stats: { sanity: -2 } },
        choices: [{ text: 'Try again.', next: 'B_painting_puzzle_observe' }]
    },
    B_painting_puzzle_success: {
        speaker: 'Narrator',
        text: "You arrange the paintings to show the story in order: the injection, the induced photosensitivity, the resulting retreat into darkness. As you place the last panel, you hear a heavy CLICK from behind the wall.",
        background: BG.rec_therapy_painting_storage,
        sfx: SFX.secretDoor,
        choices: [{ text: '...', next: 'B_painting_puzzle_reward' }]
    },
    B_painting_puzzle_reward: {
        speaker: 'Narrator',
        text: "A small, hidden compartment slides open, revealing a key labeled 'HP-01'. This must be for the hydrotherapy pump.",
        background: BG.rec_therapy_painting_storage,
        effects: { inventory: { add: 'hydro_pump_key' } },
        choices: [{ text: 'This is what I needed.', next: 'B_art_therapy' }]
    },
    B_art_therapy_clue: {
        speaker: 'You',
        text: 'Sunrise, Storm, Heartbeat, Void. That has to be the order for the film reels.',
        background: BG.rec_therapy_art,
        effects: { flags: { set: 'knows_reel_order' } },
        choices: [{ text: 'Keep looking.', next: 'B_art_therapy' }]
    },
    B_search_art_room: {
        speaker: 'Narrator',
        text: 'Behind a canvas dripping with black paint, you find a film reel labeled with a lightning bolt.',
        background: BG.rec_therapy_art,
        effects: { inventory: { add: 'film_reel_b' } },
        choices: [{ text: 'Take the reel.', next: 'B_rec_upper' }]
    },
    B_black_painting: {
        speaker: 'Narrator',
        text: "It's a canvas coated in thick, black oil paint. It seems... newer than the others. You might be able to remove the paint.",
        background: BG.rec_therapy_art,
        choices: [
            { text: 'Use the painting solvent.', next: 'B_use_solvent', requires: { inventory: ['painting_solvent'] } },
            { text: 'Leave it.', next: 'B_art_therapy' }
        ]
    },
    B_use_solvent: {
        speaker: 'Narrator',
        text: "You apply the solvent. The black paint melts away, revealing the disturbing self-portrait of a tormented patient. As the face is revealed, your vision swims.",
        background: BG.rec_therapy_art,
        effects: { flags: { set: 'knows_hydro_key_location' } },
        choices: [{ text: 'What is this feeling?', next: 'B_solvent_vision' }]
    },
    B_solvent_vision: {
        speaker: 'Narrator',
        text: "For a second, you ARE the patient, dabbing black paint on the canvas with trembling hands. A voice whispers in your mind, a memory: 'He trapped me in here. Locked my soul in a C-A-G-E...' The vision fades, leaving you shaken. Underneath the portrait, you also see a small, painted diagram of the Hydrotherapy pump system, with a note: 'Key kept by Head Surgeon'.",
        visualEffect: 'glitch',
        sfx: SFX.whisper,
        textEffects: [{ word: 'C-A-G-E', effect: 'fear' }],
        effects: { flags: { set: 'knows_piano_tune' }, stats: { sanity: -5 } },
        choices: [{ text: 'C-A-G-E... and a clue for the pump.', next: 'B_art_therapy' }]
    },
    B_music_therapy: {
        speaker: 'Narrator',
        text: 'A dusty grand piano sits in the center of the room. Sheet music is open on the stand, but it\'s torn. One of the ivory keys is raised slightly.',
        background: BG.rec_therapy_music,
        choices: [
            { text: 'Examine the sheet music.', next: 'B_read_sheet_music' },
            { text: 'Examine the piano.', next: 'B_examine_piano' },
            { text: 'Search the room.', next: 'B_search_music_room' },
            { text: 'Leave.', next: 'B_rec_upper' }
        ]
    },
    B_search_music_room: {
        speaker: 'Narrator',
        text: "Under a floorboard, you find the other half of the sheet music.",
        background: BG.rec_therapy_music,
        effects: { inventory: { add: 'sheet_music_2' } },
        choices: [{ text: 'Now I have the full melody.', next: 'B_music_therapy' }]
    },
    B_read_sheet_music: {
        speaker: 'You',
        text: "The notes are C, A, G, E. A simple, haunting tune. Maybe if I play it...",
        background: BG.rec_therapy_music,
        effects: { inventory: { add: 'sheet_music_1' } },
        choices: [{ text: 'Go back.', next: 'B_music_therapy' }]
    },
    B_examine_piano: {
        speaker: 'Narrator',
        text: 'The piano is old but seems functional.',
        background: BG.rec_therapy_music,
        choices: [
            { text: 'Play the melody C-A-G-E.', next: 'B_play_piano', requires: { flags: ['knows_piano_tune'] } },
            { text: 'I don\'t know the full melody.', next: 'B_music_therapy' },
        ]
    },
    B_play_piano: {
        speaker: 'Narrator',
        text: 'You play the simple melody. As the last note fades, a hidden compartment in the piano clicks open. Inside is a replacement projector bulb and another film reel.',
        background: BG.rec_therapy_music,
        sfx: SFX.puzzleSuccess,
        effects: { inventory: { add: ['replacement_bulb', 'film_reel_d'] } },
        choices: [{ text: 'Take the items.', next: 'B_rec_upper' }]
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
            { text: 'Leave.', next: 'B_rec_upper' }
        ]
    },
    B_locker_rooms: {
        speaker: 'Narrator',
        text: "The locker rooms are damp and filled with rusted lockers. Most are empty, but one is locked with a simple padlock.",
        background: BG.rec_therapy_lockers,
        choices: [
            { text: 'Search the lockers.', next: 'B_search_lockers' },
            { text: 'Try to break the padlock.', next: 'B_break_padlock', requires: { inventory: ['crowbar'] } },
            { text: 'Return to the pool room.', next: 'B_hydro_entry' }
        ]
    },
    B_search_lockers: {
        speaker: 'Narrator',
        text: "You find a can of painting solvent in one of the open lockers.",
        background: BG.rec_therapy_lockers,
        effects: { inventory: { add: 'painting_solvent' } },
        choices: [{ text: 'This might be useful in the art room.', next: 'B_locker_rooms' }]
    },
    B_break_padlock: {
        speaker: 'Narrator',
        text: "You smash the padlock with the crowbar. Inside the locker is a film reel labeled with an EKG waveform.",
        background: BG.rec_therapy_lockers,
        sfx: SFX.scraping,
        effects: { inventory: { add: 'film_reel_d' } },
        choices: [{ text: 'Take the film reel.', next: 'B_locker_rooms' }]
    },
    B_sauna: {
        speaker: 'Narrator',
        text: "The sauna is filled with scalding steam. A maintenance panel is on the far wall, but the steam is too thick to see. A small valve is near the door.",
        background: BG.rec_therapy_sauna,
        sfx: SFX.steam_hiss,
        choices: [
            { text: 'Try to reach the panel.', next: 'B_sauna_burn' },
            { text: 'Turn the valve with the wrench.', next: 'B_sauna_clear', requires: { inventory: ['wrench'] } },
            { text: 'Find a way to shut off the steam.', next: 'B_hydro_entry' }
        ]
    },
    B_sauna_burn: {
        isDeath: true,
        text: "You step into the steam. The heat is unbearable, searing your lungs. You collapse before you can even scream.",
    },
    B_sauna_clear: {
        speaker: 'Narrator',
        text: 'You use the wrench to shut off the steam. The room clears, revealing a maintenance panel. You open it and find another film reel.',
        background: BG.rec_therapy_sauna,
        effects: { inventory: { add: 'film_reel_b' } },
        choices: [{ text: 'Take the reel.', next: 'B_hydro_entry' }]
    },
    B_examine_pump: {
        speaker: 'Narrator',
        text: 'The motor is completely fried. A note taped to it reads "Replacement motor in Lab Sub-Level".',
        background: BG.rec_therapy_hydrotherapy,
        choices: [
            { text: 'Install the pump motor.', next: 'B_install_motor', requires: { inventory: ['pump_motor'] } },
            { text: 'I need to find that motor.', next: 'B_hydro_entry' }
        ]
    },
    B_install_motor: {
        speaker: 'Narrator',
        text: 'You install the motor. The pump whirs to life, but a red light indicates the drain is blocked. A secondary control panel asks for a key.',
        background: BG.rec_therapy_hydrotherapy,
        sfx: SFX.pumpWhine,
        choices: [
            { text: 'Use the Hydro-pump key.', next: 'B_unblock_drain', requires: { inventory: ['hydro_pump_key'] } },
            { text: 'I need to find the key. The surgical wing, maybe?', next: 'B_hydro_entry' }
        ]
    },
    B_unblock_drain: {
        speaker: 'Narrator',
        text: 'You use the key to activate the emergency drain purge. With a tremendous sucking sound, the blockage clears and the last of the murky water vanishes, revealing a maintenance tunnel.',
        background: BG.rec_therapy_hydrotherapy,
        sfx: SFX.water_drain,
        choices: [{ text: '[PATH CHANGER] Enter the tunnel to the Morgue.', next: 'A_morgue_receiving' }]
    },

    // Lower Level & Watcher (10+ nodes)
    B_rec_lower: {
        speaker: 'Narrator',
        npc: 'watcher',
        text: "You descend to the main floor. The Watcher is here, a hulking figure that shies away from any direct light. You must stay in the shadows to avoid his gaze. The area is larger than you thought, with multiple alcoves and hiding spots.",
        background: BG.rec_therapy_lower,
        revisitText: "The lower floor. The Watcher is still on patrol unless I can pacify him with the projector.",
        choices: [
            { text: 'Try to sneak to the East alcove.', next: 'B_sneak_watcher_east', requires: { notFlags: ['watcher_pacified'] } },
            { text: 'Try to sneak to the West alcove.', next: 'B_sneak_watcher_west', requires: { notFlags: ['watcher_pacified'] } },
            { text: 'Go back upstairs.', next: 'B_rec_entry' },
        ]
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
        choices: [{ text: 'One down.', next: 'B_rec_lower' }]
    },
    B_sneak_watcher_west: {
        speaker: 'Narrator',
        text: "You make it to the west alcove. A corpse of a doctor is here, clutching an employee ID card.",
        background: BG.rec_therapy_lower,
        effects: { inventory: { add: 'employee_id' } },
        choices: [{ text: 'This could be useful for a locker.', next: 'B_rec_lower' }]
    },
};
