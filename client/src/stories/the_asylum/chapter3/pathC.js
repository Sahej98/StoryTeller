import { BGM, SFX } from '../../../data/audioData.js';
import { BG } from '../backgrounds.js';

export const pathC = {
  // ===================================================================
  // PATH C: PERSONNEL WING
  // ===================================================================
  C_personnel_entry: {
    speaker: 'Narrator',
    text: 'This wing housed the asylum staff. It has an air of quiet desperation. Faded photographs of smiling employees line the walls, a gallery of the damned.',
    background: BG.personnel_wing,
    bgm: BGM.softHaunt,
    choices: [{ text: 'What secrets did they keep?', next: 'C_personnel_hub' }]
  },
  C_personnel_hub: {
    speaker: 'Narrator',
    text: 'You are in a common lounge. Doors lead to the Dormitories and Offices. In the center of the room is a large bronze plaque: "Our Legacy of Care - In recognition of our most dedicated staff."',
    background: BG.personnel_wing,
    revisitText: 'The personnel lounge. The plaque waits. I still need to find all six items of betrayal to unlock its secret.',
    choices: [
      { text: 'Examine the Legacy Plaque.', next: 'C_plaque' },
      { text: 'Search the Dormitories.', next: 'C_dormitories' },
      { text: 'Search the Offices.', next: 'C_offices' },
      { text: 'Return to the main hall.', next: 'hub' }
    ]
  },

  C_plaque: {
    speaker: 'Narrator',
    text: 'Six names are listed. Below them, six empty indentations. A note is scratched into the metal: "Their guilt is the key."',
    choices: [
      { text: 'Place the six Legacy items.', next: 'C_plaque_solve', requires: { inventory: ['legacy_locket', 'legacy_epaulette', 'legacy_glasses', 'legacy_award', 'legacy_cufflink', 'legacy_yearbook'] } },
      { text: 'I need to find their tokens of betrayal.', next: 'C_personnel_hub' }
    ]
  },
  C_plaque_solve: {
    speaker: 'Narrator',
    text: 'You place each item into its indentation. The locket of the nurse who gave up Lily, the epaulette of the guard who looked away... As the last item clicks into place, the plaque grinds open.',
    sfx: SFX.secretDoor,
    effects: { inventory: { remove: ['legacy_locket', 'legacy_epaulette', 'legacy_glasses', 'legacy_award', 'legacy_cufflink', 'legacy_yearbook'] }, inventory: { add: 'master_personnel_key' } },
    choices: [{ text: 'A Master Key. This must open the rooftop access.', next: 'C_personnel_hub' }]
  },

  C_dormitories: {
    speaker: 'Narrator',
    text: 'The dorms are rows of sterile, identical rooms. In one, under a pillow, you find a small silver locket. In another, a polished guard\'s epaulette is hidden in a drawer.',
    effects: { inventory: { add: ['legacy_locket', 'legacy_epaulette'] } },
    choices: [{ text: 'Two down.', next: 'C_personnel_hub' }]
  },

  C_offices: {
    speaker: 'Narrator',
    text: 'The staff offices. One desk holds a tarnished "Employee of the Year" award. Another has a single, silver cufflink. A third holds a pair of spectacles, neatly folded.',
    effects: { inventory: { add: ['legacy_award', 'legacy_cufflink', 'legacy_glasses'] } },
    choices: [{ text: 'Three more.', next: 'C_find_yearbook' }]
  },
  C_find_yearbook: {
    speaker: 'Narrator',
    text: "At the end of the hall is a small darkroom. Hanging to dry is a photo from a staff yearbook. One smiling face is circled in red. A memory of complicity.",
    effects: { inventory: { add: 'legacy_yearbook' } },
    choices: [{ text: 'That\'s all of them.', next: 'C_personnel_hub' }]
  },
  
  C_rooftop_door: {
    speaker: 'Narrator',
    text: 'A heavy door is labeled "Rooftop Access".',
    choices: [
      { text: 'Use the Master Personnel Key.', next: 'C_rooftop_entry', requires: { inventory: ['master_personnel_key'] } },
      { text: 'I need the master key from the plaque.', next: 'C_personnel_hub' }
    ]
  },

  C_rooftop_entry: {
    speaker: 'Narrator',
    text: 'You emerge onto the asylum\'s rooftop. The storm is raging here, wind and rain lashing at you. A massive radio tower sparks and groans, clearly broken. A small maintenance shed stands nearby.',
    background: BG.window_rain,
    sfx: SFX.rain,
    bgm: BGM.descent,
    choices: [
      { text: 'Investigate the Radio Tower.', next: 'C_radio_tower' },
      { text: 'Check the Maintenance Shed.', next: 'C_shed' },
      { text: 'Look for a way down.', next: 'C_fire_escape' },
    ]
  },

  C_shed: {
    speaker: 'Narrator',
    text: 'The shed is unlocked. Inside, you find a spool of solder wire and a new vacuum tube, along with a toolbox containing a rusty key.',
    effects: { inventory: { add: ['solder_wire', 'vacuum_tube', 'rooftop_key'] } },
    choices: [{ text: 'These must be for the radio tower.', next: 'C_rooftop_entry' }]
  },

  C_radio_tower: {
    speaker: 'Narrator',
    text: 'The control panel is fried. It needs a new vacuum tube and some wiring repairs.',
    choices: [
      { text: 'Repair the radio tower.', next: 'C_repair_radio', requires: { inventory: ['solder_wire', 'vacuum_tube', 'soldering_iron'] } }, // Soldering iron is from Path B Rec Therapy wing
      { text: 'I\'m missing the tools for this.', next: 'C_rooftop_entry' }
    ]
  },
  C_repair_radio: {
    speaker: 'Narrator',
    text: 'You replace the tube and carefully solder the broken connections. With a crackle of static, the tower powers on. A green light indicates it is broadcasting.',
    sfx: SFX.puzzleSuccess,
    effects: { flags: { set: 'repaired_radio_tower' }, inventory: {remove: ['solder_wire', 'vacuum_tube']} },
    choices: [{ text: 'Now... what to broadcast?', next: 'C_rooftop_entry' }]
  },

  C_fire_escape: {
      speaker: 'Narrator',
      text: 'A rickety fire escape leads down the side of the building.',
      choices: [
        {text: 'This is my way out.', next: 'C_escape_personnel'},
        {text: 'Stay on the roof.', next: 'C_rooftop_entry'},
      ]
  },

  C_escape_personnel: {
    speaker: 'Narrator',
    text: "You clamber down the rusty fire escape, the wind threatening to tear you from your grip. You land in a dark alley behind the Director's office. You've bypassed the main entrance.",
    effects: { flags: { set: 'C_completed' } },
    choices: [{ text: 'Now to face the man in charge.', next: { chapter: 'chapter4', key: 'start' } }]
  },
};
