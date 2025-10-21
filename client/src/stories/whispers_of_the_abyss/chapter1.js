import { BGM, SFX } from '../../data/audioData.js';
import { BG } from './backgrounds.js';

export const chapter1 = {
  start: {
    speaker: 'Narrator',
    text: "You awaken with a gasp, black mud filling your mouth. The air is thick, heavy with the stench of decay and stagnant water. Gnarled, weeping trees claw at a bruised twilight sky. You don't know who you are, or how you got here.",
    background: BG.swamp_start,
    bgm: BGM.fantasy_ambient,
    choices: [{ text: 'Push yourself up from the mud.', next: 'start_2' }],
  },
  start_2: {
    speaker: 'Lyra',
    npc: 'lyra',
    text: "Well, look what the swamp dredged up. Another lost soul. Or are you just lost? The armor's a bit much for a casual stroll. Don't bother trying to remember your name. The Abyss steals them first.",
    textEffects: [{ word: 'steals', effect: 'fear' }],
    choices: [
      { text: 'Who... what are you?', next: 'start_3' },
      { text: 'The Abyss? Where am I?', next: 'start_4' },
    ],
  },
  start_3: {
    speaker: 'You',
    text: 'A ghost? A spirit? Your voice is... in my head. Are you real?',
    choices: [{ text: '...', next: 'start_5' }],
  },
  start_4: {
    speaker: 'You',
    text: "What is this place? The Abyss? I don't understand.",
    choices: [{ text: '...', next: 'start_5' }],
  },
  start_5: {
    speaker: 'Lyra',
    npc: 'lyra',
    text: "Oh, I'm as real as the mud on your face, tin can. Let's just say I'm a... long-term resident. This place, the Shadowfen, is bleeding into your world because its heart is sick. And you, my forgotten knight, are the first interesting thing to happen in a century.",
    choices: [{ text: 'What do you want from me?', next: 'hub' }],
  },
  hub: {
    speaker: 'Lyra',
    npc: 'lyra',
    bgm: BGM.fantasy_ambient,
    text: "The path ahead splits. To the left, the whispers are stronger... angrier. To the right, something glitters in the muck. The choice, as they say, is yours. Try not to die immediately; it's dreadfully boring.",
    revisitText:
      "Still dithering? The Abyss isn't known for its patience. Left is spooky, right is shiny. Pick one.",
    choices: [
      { text: 'Follow the angry whispers to the left.', next: 'left_path' },
      {
        text: 'Investigate the glittering object to the right.',
        next: 'right_path',
      },
    ],
  },
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
  right_path: {
    speaker: 'Narrator',
    text: "You find a crude goblin camp. A single, gangly goblin is poking at a campfire, trying to cook a large, suspicious-looking mushroom. It hasn't seen you yet. It has a rusty shiv tucked into its belt.",
    choices: [
      { text: 'Sneak up and attack the goblin.', next: 'attack_goblin' },
      { text: 'Announce your presence.', next: 'talk_goblin' },
    ],
  },
  attack_goblin: {
    speaker: 'Narrator',
    text: "You creep through the reeds and bring the pommel of your sword down on the back of the goblin's head. It slumps over without a sound. You can take its shiv and the mushroom it was cooking.",
    effects: { stats: { morality: -10 } },
    choices: [{ text: 'Take its belongings.', next: 'take_goblin_stuff' }],
  },
  take_goblin_stuff: {
    speaker: 'Narrator',
    text: 'You pocket the crude shiv and the strange, rubbery mushroom.',
    effects: { inventory: { add: ['goblin_shiv', 'strange_mushroom'] } },
    choices: [{ text: 'Leave the camp.', next: 'hub' }],
  },
  talk_goblin: {
    speaker: 'Gribble',
    npc: 'goblin',
    text: "Whoa! Big shiny! Don't squash Gribble! Gribble just cooking dinner. You want some mushroom? Gribble shares! Is good squish!",
    ambientSfx: [{ triggerWord: 'Gribble', sfx: SFX.goblin_giggle }],
    effects: { stats: { morality: 5 } },
    choices: [
      {
        text: '"I mean you no harm. I am just passing through."',
        next: 'goblin_peace',
      },
      {
        text: '"Give me your weapon and anything else of value."',
        next: 'goblin_threaten',
      },
    ],
  },
  goblin_peace: {
    speaker: 'Lyra',
    npc: 'lyra',
    text: 'How disappointingly noble. Fine. Be friends with the snot monster. See if I care.',
    choices: [{ text: 'Head back to the main path.', next: 'hub' }],
  },
  goblin_threaten: {
    speaker: 'Gribble',
    npc: 'goblin',
    text: 'Okay, okay! No need for pokey bits! Take shiv, is good for stabbing... things. Gribble is just poor goblin!',
    effects: { inventory: { add: 'goblin_shiv' }, stats: { morality: -5 } },
    choices: [{ text: 'Now get out of my sight.', next: 'hub' }],
  },
};
