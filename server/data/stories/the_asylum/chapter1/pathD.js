import { BGM, SFX } from '../../../audioData.js';
import { BG } from '../backgrounds.js';

export const pathD = {
  // ===================================================================
  // PATH D — THE HIVE (Survival/Action) - DIALOGUE TREE EXPANSION
  // ===================================================================
  D_serviceStairs: {
    speaker: 'Narrator',
    text: 'You descend a set of rickety iron stairs into a service tunnel. The air is damp and smells of rust and something else... something sickly sweet, like rotting meat and honey.',
    background: BG.service_tunnel,
    bgm: BGM.lab,
    sfx: SFX.electric,
    revisitText:
      'You are at the top of the service tunnel stairs. The smell of decay is stronger now, almost choking.',
    choices: [
      { text: 'Proceed into the tunnel.', next: 'D_tunnel_1' },
      { text: 'Go back upstairs.', next: 'hallwayEntry' },
    ],
  },
  D_tunnel_1: {
    speaker: 'Narrator',
    npc: 'harris',
    text: 'You find a man slumped against the wall, clutching a gruesome wound in his side. The flesh around it is pulsating and growing crystalline structures.',
    background: BG.service_tunnel,
    choices: [
      { text: 'Approach the wounded man.', next: 'D_harris_dialogue_start' },
    ],
  },
  D_harris_dialogue_start: {
    speaker: 'Harris',
    npc: 'harris',
    background: BG.service_tunnel,
    revisitText: "Harris is looking worse. He's muttering about the coolant system and something called Subject 32.",
    text: "'Don't... don't go any further,' he rasps, coughing up blood. 'It's a hive now... Subject 32... it... broke containment. It's in the vents... listening.'",
    textEffects: [
      {
        word: "'Don't... don't go any further,' he rasps, coughing up blood. 'It's a hive now... Subject 32... it... broke containment. It's in the vents... listening.'",
        effect: 'tremble',
      },
    ],
    choices: [
      { text: '"Who are you? Are you okay?"', next: 'D_harris_compassion' },
      {
        text: '"A hive? What are you talking about?"',
        next: 'D_harris_direct',
      },
      { text: '"I don\'t have time for this."', next: 'D_harris_leave' },
    ],
  },
  D_harris_compassion: {
    speaker: 'Harris',
    npc: 'harris',
    background: BG.service_tunnel,
    text: "My name's Harris... a researcher. That... thing did this to me. It's a monster, Subject 32... it fears intense cold.",
    effects: {
      relationships: { harris: 10 },
      stats: { morality: 5 },
      flags: { set: 'met_harris' },
    },
    choices: [{ text: '...', next: 'D_harris_compassion_b' }],
  },
  D_harris_compassion_b: {
    speaker: 'Harris',
    npc: 'harris',
    background: BG.service_tunnel,
    text: "The pumping station... coolant system... please, I have a keycard. It'll get you through the security office. Help me, and it's yours.",
    choices: [
      {
        text: '"I\'ll help you, but what can I do?"',
        next: 'D_harris_accept_help',
      },
      { text: '"Just give me the keycard."', next: 'D_harris_demand_card' },
    ],
  },
  D_harris_direct: {
    speaker: 'Harris',
    npc: 'harris',
    background: BG.service_tunnel,
    text: "It's an experiment... gone wrong. It made this place a nest. Listens for sound. I'm not going to make it... in my pocket... keycard... take it. Stop it...",
    effects: { relationships: { harris: -5 } },
    choices: [
      {
        text: 'Take the keycard from his pocket.',
        next: 'D_harris_take_card_direct',
      },
      { text: '(Leave him)', next: 'D_harris_leave' },
    ],
  },
  D_harris_leave: {
    speaker: 'Narrator',
    text: 'You step over the dying man, ignoring his pleas. Your survival is all that matters.',
    background: BG.service_tunnel,
    effects: { stats: { morality: -10 }, relationships: { harris: -20 } },
    choices: [{ text: 'Continue down the tunnel.', next: 'D_tunnel_2' }],
  },
  D_harris_accept_help: {
    speaker: 'Harris',
    text: "'Thank you... there's an adrenal stimulant... in the security office... it might be enough to get me on my feet. Please, hurry.'",
    background: BG.service_tunnel,
    choices: [{ text: '"I\'ll be back."', next: 'D_tunnel_2' }],
  },
  D_harris_demand_card: {
    speaker: 'Narrator',
    npc: 'harris',
    text: 'He glares at you, his wounded body trembling with a flash of anger, then his expression sags with defeat.',
    background: BG.service_tunnel,
    effects: { stats: { morality: -5 }, relationships: { harris: -10 } },
    choices: [{ text: '...', next: 'D_harris_demand_card_b' }],
  },
  D_harris_demand_card_b: {
    speaker: 'Harris',
    npc: 'harris',
    text: "'Fine... just take it. In my pocket. Now go... leave me to die.'",
    background: BG.service_tunnel,
    choices: [
      {
        text: 'Take the keycard and leave.',
        next: 'D_harris_take_card_direct',
      },
    ],
  },
  D_harris_take_card_direct: {
    speaker: 'Narrator',
    text: 'You take the keycard from the dying researcher. He gives one last shuddering breath and his eyes go vacant.',
    background: BG.service_tunnel,
    effects: { inventory: { add: 'researcher_keycard' } },
    choices: [{ text: 'Continue into the hive.', next: 'D_tunnel_2' }],
  },
  D_tunnel_2: {
    speaker: 'Narrator',
    text: 'The tunnel opens into a larger area. The walls are covered in a pulsating, organic webbing that seems to breathe.',
    background: BG.service_tunnel,
    ambientSfx: [{ triggerWord: 'pulsating', sfx: SFX.flesh_squirming }],
    choices: [{ text: '...', next: 'D_tunnel_2_b' }],
  },
  D_tunnel_2_b: {
    speaker: 'Narrator',
    text: 'To your right is a security office. Straight ahead, a thick tendril blocks the path to the Pumping Station. A chittering sound comes from the vents.',
    background: BG.service_tunnel,
    ambientSfx: [
      { triggerWord: 'chittering', sfx: SFX.monster_breathing_close },
    ],
    revisitText:
      'You are back at the entrance to the hive. The security office is to your right. The tendril blocks the way forward.',
    choices: [
      { text: 'Try to get past the tendril.', next: 'D_tendrilBlock' },
      { text: 'Check the security office.', next: 'D_securityOffice' },
      { text: 'Climb a rickety ladder upwards.', next: 'D_ladderToPathA' },
      {
        text: 'Go back to the wounded researcher.',
        next: 'D_returnToHarris',
        requires: { notFlags: ['D_helpedFinch'] },
      },
    ],
  },
  D_ladderToPathA: {
    speaker: 'Narrator',
    background: BG.service_tunnel,
    text: "You climb the rusty ladder to a ceiling hatch. Pushing it open, you emerge into the wreckage of the Nurses' Station, the smell of blood thick in the air. You've found a shortcut into another part of the asylum.",
    choices: [
      { text: 'This looks... busy.', next: 'A_nursesStation' },
    ]
  },
  D_returnToHarris: {
    speaker: 'Narrator',
    npc: 'harris',
    text: 'You return to where you left Harris. He is still barely conscious, his breathing shallow.',
    background: BG.service_tunnel,
    choices: [
      {
        text: 'Use the Adrenaline Syringe.',
        next: 'D_administerSyringe',
        requires: { inventory: ['adrenaline_syringe'] },
      },
      { text: '"I haven\'t found anything yet."', next: 'D_tunnel_2' },
    ],
  },
  D_administerSyringe: {
    speaker: 'Harris',
    npc: 'harris',
    text: "You inject him with the stimulant. He gasps, color returning to his face. 'Gods... thank you. My name is Harris. Here, take this.' He hands you his keycard.",
    background: BG.service_tunnel,
    effects: {
      inventory: { remove: 'adrenaline_syringe' },
      inventory: { add: 'researcher_keycard' },
      stats: { morality: 10 },
      relationships: { harris: 20 },
      flags: { set: ['D_helpedFinch', 'met_harris'] },
    },
    choices: [
      { text: '"Glad I could help. Let\'s get moving."', next: 'D_tunnel_2' },
    ],
  },
  D_tendrilBlock: {
    speaker: 'Narrator',
    text: 'The tendril is thick and rubbery. It pulses with a faint inner light. You need something to get through it.',
    background: BG.service_tunnel,
    choices: [
      {
        text: 'Cut it with the clean scalpel.',
        next: 'D_cutTendril',
        requires: { inventory: ['clean_scalpel'] },
      },
      { text: 'Go to the security office.', next: 'D_securityOffice' },
    ],
  },
  D_cutTendril: {
    speaker: 'Narrator',
    text: "You slice into the tendril. It lets out a psychic shriek that pierces your skull, and sprays you with acidic ichor. The path is clear, but you've alerted the hive.",
    background: BG.service_tunnel,
    sfx: SFX.fleshTear,
    effects: { stats: { health: -15, sanity: -10 } },
    choices: [{ text: 'Enter the Pumping Station.', next: 'D_pumpingStation' }],
  },
  D_securityOffice: {
    speaker: 'Narrator',
    text: 'The office is ransacked. A terminal is still active. You also see a heavy iron pipe on the floor, and a canister of corrosive coolant under the desk.',
    background: BG.service_tunnel,
    choices: [
      { text: 'Use the terminal.', next: 'D_useTerminal' },
      { text: 'Take the iron pipe.', next: 'D_takePipe' },
      { text: 'Take the coolant canister.', next: 'D_takeCoolant' },
      { text: 'Search for medical supplies.', next: 'D_findSyringe' },
      { text: 'Leave.', next: 'D_tunnel_2' },
    ],
  },
  D_findSyringe: {
    speaker: 'Narrator',
    text: "You find a first-aid kit under a desk. Inside is a single syringe of 'Adrenal Stimulant'.",
    background: BG.service_tunnel,
    effects: { inventory: { add: 'adrenaline_syringe' } },
    choices: [{ text: 'This could be useful.', next: 'D_securityOffice' }],
  },
  D_takePipe: {
    speaker: 'Narrator',
    text: 'You pick up the heavy iron pipe. It feels solid and reassuring in your hands.',
    background: BG.service_tunnel,
    effects: { inventory: { add: 'metal_pipe' } },
    choices: [{ text: 'A decent weapon.', next: 'D_securityOffice' }],
  },
  D_takeCoolant: {
    speaker: 'Narrator',
    text: 'You take the canister. A warning label shows it can melt through organic material. It feels volatile.',
    background: BG.service_tunnel,
    effects: { inventory: { add: 'coolant_canister' } },
    choices: [{ text: 'This could be very useful.', next: 'D_securityOffice' }],
  },
  D_useTerminal: {
    speaker: 'Narrator',
    text: "The terminal displays two options: 'Read Logs' and 'System Power Control'.",
    background: BG.service_tunnel,
    choices: [
      { text: 'Read Logs.', next: 'D_readTerminal' },
      { text: 'Access Power Control.', next: 'D_powerPuzzle' },
      { text: 'Step away.', next: 'D_securityOffice' },
    ],
  },
  D_readTerminal: {
    speaker: 'Narrator',
    text: "Last log: 'It's learned to mimic sounds. Lured Jenkins to his death. We have to activate the pump purge. Overload the system. It's the only way.'",
    background: BG.service_tunnel,
    effects: { inventory: { add: 'researcher_log' } },
    choices: [{ text: 'I know what I need to do.', next: 'D_useTerminal' }],
  },
  D_powerPuzzle: {
    speaker: 'Narrator',
    text: "You access the power grid. Main power is flowing to 'Life Support'. You need to divert it to the 'Bulkhead Door'.",
    background: BG.service_tunnel,
    choices: [{ text: '...', next: 'D_powerPuzzle_b' }],
  },
  D_powerPuzzle_b: {
    speaker: 'Narrator',
    text: "However, the 'Emergency Containment' protocol is drawing auxiliary power and must be disabled first.",
    background: BG.service_tunnel,
    choices: [
      { text: 'Divert power to Bulkhead.', next: 'D_powerPuzzle_fail' },
      { text: 'Disable Emergency Containment.', next: 'D_powerPuzzle_step2' },
      { text: 'Exit.', next: 'D_useTerminal' },
    ],
  },
  D_powerPuzzle_fail: {
    speaker: 'Narrator',
    text: 'ERROR. Cannot divert main power while auxiliary protocols are active. A loud alarm blares, and you hear the creature screech from the next room.',
    background: BG.service_tunnel,
    sfx: SFX.alarm,
    choices: [{ text: 'Try again.', next: 'D_powerPuzzle' }],
  },
  D_powerPuzzle_step2: {
    speaker: 'Narrator',
    text: 'Emergency Containment disabled. The lights in the tunnel dim. You can now divert main power.',
    background: BG.service_tunnel,
    choices: [
      {
        text: 'Divert power from Life Support to Bulkhead Door.',
        next: 'D_powerOn',
      },
    ],
  },
  D_pumpingStation: {
    speaker: 'Narrator',
    text: 'You enter the pumping station. The central chamber has a grated floor over a deep reservoir of murky water.',
    background: BG.service_tunnel,
    choices: [{ text: '...', next: 'D_pumpingStation_b' }],
  },
  D_pumpingStation_b: {
    speaker: 'Narrator',
    npc: 'monster',
    text: 'The creature, a pulsating mass of bone and flesh, is clinging to the ceiling. You need to get past it to reach the pump controls on the far wall.',
    background: BG.service_tunnel,
    sfx: SFX.flesh_squirming,
    choices: [
      { text: 'Try to sneak past it.', next: 'D_sneakPast' },
      {
        text: 'Throw the coolant at it.',
        next: 'D_useCoolant',
        requires: { inventory: ['coolant_canister'] },
      },
      { text: 'Make a loud noise to distract it.', next: 'D_distractCreature' },
    ],
  },
  D_sneakPast: {
    speaker: 'Narrator',
    text: 'You try to creep along the wall. It twitches. A long, bony limb snaps down, impaling the floor where you were a second ago. It sees you.',
    background: BG.service_tunnel,
    choices: [{ text: 'FIGHT!', next: 'D_fightCreature' }],
  },
  D_distractCreature: {
    speaker: 'Narrator',
    text: 'You bang the pipe against the railing. The creature screeches and drops to the other side of the room to investigate the sound. This is your chance!',
    background: BG.service_tunnel,
    choices: [{ text: 'Run for the pump controls!', next: 'D_activatePump' }],
  },
  D_useCoolant: {
    speaker: 'Narrator',
    text: 'You throw the canister. It bursts on the creature, which shrieks as the liquid dissolves its flesh. It thrashes wildly, wounded but enraged, giving you an opening.',
    background: BG.service_tunnel,
    sfx: SFX.monster_roar,
    effects: {
      inventory: { remove: 'coolant_canister' },
      stats: { morality: -5 },
    },
    choices: [{ text: 'Run for the pump controls!', next: 'D_activatePump' }],
  },
  D_fightCreature: {
    speaker: 'Narrator',
    text: 'It drops from the ceiling and lunges at you, a nightmare of clicking bone and dripping flesh.',
    background: BG.service_tunnel,
    choices: [
      {
        text: 'Swing the pipe at its head.',
        next: 'D_fightWin',
        requires: { inventory: ['metal_pipe'] },
      },
      { text: 'Dodge.', next: 'D_fightDodge' },
    ],
  },
  D_fightDodge: {
    speaker: 'Narrator',
    text: "You try to dodge, but it's too fast. A sharp, bony talon rips through your side. The pain is immense, and the world starts to go grey.",
    background: BG.service_tunnel,
    effects: { stats: { health: -100 } },
    choices: [{ text: "It's over.", next: 'D_creatureDeath' }],
  },
  D_fightWin: {
    speaker: 'Narrator',
    text: 'You swing the heavy pipe with all your might. It connects with a sickening CRUNCH. The creature stumbles back, momentarily stunned. You see your chance!',
    background: BG.service_tunnel,
    textEffects: [{ word: 'CRUNCH', effect: 'shock' }],
    sfx: SFX.boneSnap,
    effects: { stats: { stamina: -20 } },
    choices: [{ text: 'Run for the pump controls!', next: 'D_activatePump' }],
  },
  D_creatureDeath: {
    isDeath: true,
    background: BG.service_tunnel,
    text: 'The creature pins you to the grated floor. You look down into the dark water below as its claws tear you apart. Your last sensation is your own blood raining down.',
  },
  D_activatePump: {
    speaker: 'Narrator',
    text: "You reach the controls and hit 'Emergency Purge'. A klaxon blares. WARNING: CHAMBER FLOOD IN 30 SECONDS. You have to get out NOW!",
    background: BG.service_tunnel,
    sfx: SFX.pumpWhine,
    choices: [{ text: 'Get out of the pump room!', next: 'D_pumpEscape' }],
  },
  D_pumpEscape: {
    speaker: 'Narrator',
    text: "Water gushes into the chamber. The creature is being pulled towards the drain, but it's thrashing and trying to crawl towards you! You have to run!",
    background: BG.service_tunnel,
    choices: [
      {
        text: 'Sprint for the exit! (Costs Stamina)',
        next: 'D_powerOn',
        requires: { stats: { stamina: 25 } },
      },
      { text: "I'm too slow...", next: 'D_drownDeath' },
    ],
    timer: 10,
    defaultChoiceIndex: 1,
  },
  D_drownDeath: {
    isDeath: true,
    background: BG.service_tunnel,
    text: "You're not fast enough. The torrent of water slams you against a wall, and the chamber fills completely. You are trapped, washed away with the monster.",
  },
  D_powerOn: {
    speaker: 'Narrator',
    text: "You make it out just as the floodgate slams shut. You're soaked, but alive. You make it back and reroute the power. A confirmation flashes: BULKHEAD POWER ONLINE.",
    background: BG.service_tunnel,
    sfx: SFX.alarm,
    bgm: BGM.descent,
    choices: [{ text: '...', next: 'D_powerOn_b' }],
  },
  D_powerOn_b: {
    speaker: 'Narrator',
    text: "Then, a furious, enraged ROAR!!!! echoes from the flooded chamber. It survived. And it's coming for you.",
    background: BG.service_tunnel,
    textEffects: [{ word: 'ROAR!!!!', effect: 'anger' }],
    effects: {
      flags: { set: 'D_powerRestored' },
      setCheckpoint: true,
      stats: { stamina: -25 },
    },
    choices: [{ text: 'I have to run. NOW.', next: 'D_chaseBegin' }],
  },
  D_chaseBegin: {
    speaker: 'Narrator',
    text: "You burst out of the security office. The creature, dripping and mangled, is crawling on the ceiling, moving impossibly fast. It's between you and the bulkhead door.",
    background: BG.service_tunnel,
    choices: [
      { text: 'Run straight for the door!', next: 'D_chase_1' },
      {
        text: 'Try to create a diversion!',
        next: 'D_chase_diversion',
        requires: { inventory: ['metal_pipe'] },
      },
    ],
  },
  D_chase_diversion: {
    speaker: 'Narrator',
    text: 'You throw the pipe down a side tunnel. The creature, distracted by the sound, scuttles off to investigate. You run for the bulkhead door.',
    background: BG.service_tunnel,
    effects: { stats: { stamina: -10 } },
    choices: [
      {
        text: 'Almost there!',
        next: 'D_checkOnHarris',
        requires: { flags: ['D_helpedFinch'] },
      },
      { text: 'Almost there!', next: 'D_escapeAlone' },
    ],
  },
  D_chase_1: {
    speaker: 'Narrator',
    text: 'You sprint towards the door. The creature drops from the ceiling in front of you, blocking your path. Its maw opens, revealing rows of needle-like teeth.',
    background: BG.service_tunnel,
    choices: [
      {
        text: 'Slide under its legs! (Costs Stamina)',
        next: 'D_chase_slide',
        requires: { stats: { stamina: 30 } },
      },
      { text: 'Try to dodge around it.', next: 'D_creatureDeath' },
    ],
    timer: 4,
    defaultChoiceIndex: 1,
  },
  D_chase_slide: {
    speaker: 'Narrator',
    text: 'You slide through the muck on the floor, under its thrashing limbs. You scramble to your feet and keep running for the door.',
    background: BG.service_tunnel,
    effects: { stats: { stamina: -25 } },
    choices: [
      {
        text: 'Keep running!',
        next: 'D_checkOnHarris',
        requires: { flags: ['D_helpedFinch'] },
      },
      { text: 'Keep running!', next: 'D_escapeAlone' },
    ],
  },
  D_checkOnHarris: {
    speaker: 'Narrator',
    npc: 'harris',
    text: 'You run back towards the stairs. Harris, on his feet, sees you. "The door... it\'s open," you yell. "I heard it. Let\'s go!" Behind you, the creature gets closer.',
    background: BG.service_tunnel,
    choices: [{ text: 'Escape with Harris.', next: 'D_escape' }],
  },
  D_escapeAlone: {
    speaker: 'Narrator',
    text: "You don't look back. You run for the now-open bulkhead door and seal it behind you. You hear a faint scream from the tunnel before it's cut off by the thick steel.",
    background: BG.service_tunnel,
    choices: [{ text: 'You did what you had to do.', next: 'D_escape' }],
  },
  D_escape: {
    speaker: 'Narrator',
    text: "You find yourself in a sterile, white laboratory corridor. You are out of the service tunnels, but have entered the heart of the asylum's research wing.",
    background: BG.lab_corridor,
    effects: { flags: { set: 'D_completed' } },
    choices: [
      {
        text: 'This is where it all started.',
        next: { chapter: 'chapter2', key: 'start' },
      },
    ],
  },
};
