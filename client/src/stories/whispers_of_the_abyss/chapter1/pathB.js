import { SFX } from '../../../data/audioData.js';

export const pathB = {
  right_path: {
      speaker: 'Narrator',
      text: "You find a crude goblin camp. A single, gangly goblin is poking at a campfire, trying to cook a large, suspicious-looking mushroom. It hasn't seen you yet. It has a rusty shiv tucked into its belt.",
      choices: [
          {text: 'Sneak up and attack the goblin.', next: 'attack_goblin'},
          {text: 'Announce your presence.', next: 'talk_goblin'},
      ]
  },
  attack_goblin: {
      speaker: 'Narrator',
      text: "You creep through the reeds and bring the pommel of your sword down on the back of the goblin's head. It slumps over without a sound. You can take its shiv and the mushroom it was cooking.",
      effects: {stats: {morality: -10}},
      choices: [{text: 'Take its belongings.', next: 'take_goblin_stuff'}]
  },
  take_goblin_stuff: {
      speaker: 'Narrator',
      text: 'You pocket the crude shiv and the strange, rubbery mushroom.',
      effects: {inventory: {add: ['goblin_shiv', 'strange_mushroom']}},
      choices: [{text: 'Leave the camp.', next: 'hub'}]
  },
  talk_goblin: {
      speaker: 'Gribble',
      npc: 'goblin',
      text: "Whoa! Big shiny! Don't squash Gribble! Gribble just cooking dinner. You want some mushroom? Gribble shares! Is good squish!",
      ambientSfx: [{ triggerWord: 'Gribble', sfx: SFX.goblin_giggle }],
      effects: {stats: {morality: 5}},
      choices: [
          {text: '"I mean you no harm. I am just passing through."', next: 'goblin_peace'},
          {text: '"Give me your weapon and anything else of value."', next: 'goblin_threaten'},
      ]
  },
  goblin_peace: {
      speaker: 'Lyra',
      npc: 'lyra',
      text: 'How disappointingly noble. Fine. Be friends with the snot monster. See if I care.',
      choices: [{text: 'Head back to the main path.', next: 'hub'}]
  },
  goblin_threaten: {
      speaker: 'Gribble',
      npc: 'goblin',
      text: "Okay, okay! No need for pokey bits! Take shiv, is good for stabbing... things. Gribble is just poor goblin!",
      effects: {inventory: {add: 'goblin_shiv'}, stats: {morality: -5}},
      choices: [{text: 'Now get out of my sight.', next: 'hub'}]
  }
};