// Characters
export const characters = {
  player: {
    name: 'Captain',
    sprite: 'https://i.imgur.com/DjjndwJ.png',
  },
  ship_ai: {
    name: 'AURA',
    sprite: 'https://i.imgur.com/sC3eT2y.png',
  },
};

// Items
export const items = {
  datapad: {
    name: 'Damaged Datapad',
    description: 'A datapad belonging to the former chief engineer. The screen is cracked.',
    lore: {
      title: 'Engineer\'s Final Log',
      content: "The cascade failure originated in the warp core. AURA sealed the section, but the feedback loop is still... unstable. I tried to create a bypass, but the energy surge... it was too much. If anyone finds this, the primary coolant valve in Engineering must be manually reset. Don't trust the automated diagnostics."
    }
  },
  plasma_cutter: {
    name: 'Plasma Cutter',
    description: 'An industrial-grade plasma cutter. Capable of slicing through reinforced durasteel.',
  },
  fusion_core: {
      name: 'Stabilized Fusion Core',
      description: 'A miniature fusion core, humming with contained energy. It can be used to restore power to a primary system.',
  }
};