import { BGM, SFX } from '../../../data/audioData.js';

export const pathA = {
  left_path: {
    speaker: 'Narrator',
    npc: 'golem',
    visualEffect: 'rumble',
    text: 'You wade through grasping roots into a clearing. A humanoid figure made of twisted branches and mud lurches towards you, its empty eyes glowing with a faint, malevolent light. It lets out a low, groaning ROAR as it shambles forward.',
    choices: [
      { text: 'Draw your sword and fight.', next: 'fight_golem' },
      { text: 'Try to reason with it.', next: 'reason_golem' },
    ],
  },
  reason_golem: {
    speaker: 'Lyra',
    npc: 'lyra',
    text: "Oh, brilliant. Yes, talk to the mud monster. I'm sure it's a keen debater. It raises its thorny fists to pulp you. Heelllplessss...",
    choices: [{ text: 'Well, that was a mistake.', next: 'fight_golem' }],
  },
  fight_golem: {
    speaker: 'Narrator',
    text: 'You draw a longsword, its surface pitted with rust. The creature swings a heavy limb. You can either dodge its clumsy attack or try to block with your shield.',
    bgm: BGM.fantasy_combat,
    sfx: SFX.sword_draw,
    choices: [
      { text: 'Dodge the attack.', next: 'fight_golem_dodge' },
      { text: 'Block with your shield.', next: 'fight_golem_block' },
    ],
  },
  fight_golem_dodge: {
    speaker: 'Narrator',
    text: "You sidestep the slow attack and thrust your sword deep into the creature's chest. It shudders, the light in its eyes fades, and it collapses into a pile of mud and sticks. A small, glowing stone is left where its heart would be.",
    sfx: SFX.gore,
    effects: { inventory: { add: 'glowing_stone' }, stats: { stamina: -10 } },
    choices: [{ text: 'What is this thing?', next: 'hub' }],
  },
  fight_golem_block: {
    speaker: 'Narrator',
    text: 'You raise your shield, but the force of the blow is IMMENSE. The shield splinters, and the impact sends a jarring shock up your arm. You are knocked back, but the creature is off-balance.',
    textEffects: [{ word: 'IMMENSE', effect: 'shock' }],
    sfx: SFX.golem_smash,
    effects: { stats: { health: -15, stamina: -15 } },
    choices: [
      { text: 'Counter-attack while it recovers!', next: 'fight_golem_dodge' },
    ],
  },
};
