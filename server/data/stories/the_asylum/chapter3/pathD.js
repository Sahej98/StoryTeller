import { BGM, SFX } from '../../../audioData.js';
import { BG } from '../backgrounds.js';

export const pathD = {
  // ===================================================================
  // PATH D: THE GRAND STAIRCASE & CONFRONTATION
  // ===================================================================
  escape_broadcast_route: {
    speaker: 'Narrator',
    text: "You climb to the stormy rooftop, the Director's secrets clutched in your hand. You hook up the audio recorder from his office to the newly repaired radio tower's input.",
    background: BG.window_rain,
    choices: [{ text: 'It\'s time the whole world knew.', next: 'broadcast_secrets' }]
  },

  broadcast_secrets: {
    speaker: 'You',
    text: "You hold down the broadcast button and read from the Elysium file. Your voice, amplified by the storm, booms across the asylum grounds and beyond. '...Subject 47 is the perfect vessel... anchor LILY\'s fractured mind... screaming is loud... recommend removing vocal cords...'",
    bgm: BGM.descent,
    sfx: SFX.static,
    choices: [{ text: '...', next: 'broadcast_reaction' }]
  },

  broadcast_reaction: {
    speaker: 'Narrator',
    text: 'A psychic SCREAM of pure fury erupts from the Director\'s office below, shaking the very foundations of the building. The shimmering barrier over the Grand Staircase shatters like glass.',
    sfx: SFX.reality_warp,
    visualEffect: 'rumble',
    effects: { flags: { set: 'staircase_unlocked' } },
    choices: [{ text: 'He knows. It\'s time.', next: 'D_ascend_stairs' }]
  },

  D_ascend_stairs: {
    speaker: 'Narrator',
    text: "You descend from the roof and approach the now-unblocked Grand Staircase. The air grows cold, and the Director's spectral echo waits for you at the top.",
    background: BG.admin_wing,
    choices: [{ text: 'Ascend the stairs to face him.', next: 'D_confrontation' }]
  },

  D_confrontation: {
    speaker: "Director's Echo",
    npc: "director_echo",
    text: "'You DARE?! You air my secrets like dirty laundry? You are nothing but a broken tool, a failed experiment! I will unmake you!'",
    textEffects: [{ word: 'DARE?!', effect: 'anger' }, { word: 'unmake you!', effect: 'shock' }],
    choices: [{ text: 'I am more than just your experiment.', next: 'D_psychic_battle_1' }]
  },

  D_psychic_battle_1: {
    speaker: "Director's Echo",
    npc: "director_echo",
    text: "'My staff was loyal! They saw my vision! They built a legacy with me!'",
    choices: [
      { text: '"They were your victims, trapped by guilt."', next: 'D_psychic_battle_2', requires: { flags: ['C_completed'] } },
      { text: '"Your vision was madness."', next: 'D_psychic_battle_fail' }
    ]
  },

  D_psychic_battle_2: {
    speaker: "Director's Echo",
    npc: "director_echo",
    text: 'His form wavers. "Lies! My security was absolute! This facility was impenetrable!"',
    choices: [
      { text: '"Your chief of security was a paranoid wreck who couldn\'t even protect his own office."', next: 'D_psychic_battle_3', requires: { flags: ['A_completed'] } }, // This flag would be set on completing path A
      { text: '"You couldn\'t even protect yourself."', next: 'D_psychic_battle_fail' }
    ]
  },

  D_psychic_battle_3: {
    speaker: "Director's Echo",
    npc: "director_echo",
    text: 'He staggers back, clutching his head. "Insolent creature! You know nothing of my work! Of Elysium!"',
    choices: [
      { text: '"I know everything. I read my file."', next: 'D_battle_win', requires: { flags: ['B_completed'] } },
      { text: 'I will destroy you.', next: 'D_psychic_battle_fail' }
    ]
  },

  D_psychic_battle_fail: {
    speaker: "Director's Echo",
    isDeath: true,
    text: "'You have gall, but no substance. You are an incomplete thought.' His echo rushes forward, and your mind is wiped clean, leaving only a perfect, beautiful, silent blackness."
  },

  D_battle_win: {
    speaker: "Director's Echo",
    npc: "director_echo",
    text: 'Your words, backed by the truth from the files, strike him like a physical blow. His form flickers violently. "Enough... you have proven... resilient. The truth you truly seek is in my office. Let us see if you can handle it."',
    sfx: SFX.ghost_scream,
    choices: [{ text: 'The path is open.', next: 'D_to_chapter_4' }]
  },

  D_to_chapter_4: {
    speaker: 'Narrator',
    text: 'The echo fades, leaving the path to the office clear. You ascend the final steps, the weight of your own history heavy on your shoulders, and push open the doors.',
    choices: [{ text: 'Enter the lion\'s den.', next: { chapter: 'chapter4', key: 'start' } }]
  },

  // Fallback / Early Exit
  end_chapter_early: {
    speaker: 'Narrator',
    text: "You've found a way out of the wing, bypassing the Director's direct influence for now. But you feel a sense of incompletion, of secrets left uncovered. Still, you press on. You've made it to the next stage.",
    choices: [{ text: 'What awaits me now?', next: { chapter: 'chapter4', key: 'start' } }]
  },
};
