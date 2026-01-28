// src/data/voiceData.js

/**
 * A map to define voice preferences for characters.
 * The system will try to find a voice that includes the name string.
 * It provides fallbacks for different browsers/platforms.
 */
export const voiceMap = {
  // Asylum Characters
  narrator: {
    names: ['Microsoft David', 'Google US English', 'Daniel', 'Alex', 'Fred', 'Tom'], // Standard, clear male voice
    pitch: 0.8,
    rate: 0.9,
  },
  ghost: {
    // Lily
    names: ['Microsoft Zira', 'Google UK English Female', 'Samantha', 'Fiona', 'Moira'],
    pitch: 1.4,
    rate: 0.8,
  },
  doctor: {
    // Dr. Finch
    names: ['Microsoft David', 'Google US English', 'Daniel'],
    pitch: 0.6,
    rate: 0.8,
  },
  harris: {
    // Wounded Researcher
    names: ['Microsoft Mark', 'Google US English', 'Alex'],
    pitch: 0.9,
    rate: 0.7,
  },
  echo: {
    // Ghostly Doctors
    names: ['Microsoft Zira', 'Google UK English Female', 'Samantha'],
    pitch: 1.2,
    rate: 1.1,
  },
  player: {
    // Player's thoughts (Default/Horror)
    names: ['Microsoft Mark', 'Google US English', 'Alex'],
    pitch: 1,
    rate: 1,
  },
  // Starship Wanderer Characters
  ship_ai: {
    names: ['Microsoft Zira', 'Google UK English Female', 'Samantha', 'Fiona'],
    pitch: 1.2,
    rate: 1,
  },
  captain: {
    // Player's thoughts (Sci-fi)
    names: ['Microsoft David', 'Google US English', 'Daniel'],
    pitch: 1,
    rate: 0.9,
  },
  // Whispers of the Abyss Characters
  lyra: {
    // Spectral Guide
    names: ['Microsoft Zira', 'Google UK English Female', 'Samantha', 'Fiona'],
    pitch: 1.3,
    rate: 0.9,
  },
  goblin: {
    // Gribble
    names: ['Microsoft Mark', 'Google US English', 'Alex'],
    pitch: 1.5,
    rate: 1.2,
  },
};