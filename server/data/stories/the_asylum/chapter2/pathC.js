import { BGM, SFX } from '../../../audioData.js';
import { BG } from '../backgrounds.js';

export const pathC = {
    // ================================================================================================================================
    // PATH C — SURGICAL WING (ESCAPE: THE EMERGENCY EXIT)
    // ================================================================================================================================
    C_infirmary_entry: {
        speaker: 'Narrator',
        text: "You find the infirmary. A spectral doctor, 'The Surgeon', glides silently around an operating table, attempting to complete some grisly procedure. He seems obsessed. The slightest noise will draw his attention.",
        background: BG.infirmary_main,
        bgm: BGM.softHaunt,
        npc: 'surgeon',
        revisitText: "Back in the infirmary. The Surgeon is still at his work. I need to be quiet.",
        choices: [
            { text: 'Sneak into the Patient Recovery ward.', next: 'C_patient_care' },
            { text: 'Sneak to the Operating Theater.', next: 'C_operating_theater_approach' },
            { text: 'Sneak to the Doctor\'s Lounge.', next: 'C_doctors_lounge' },
            { text: 'Try the locked Pharmacy door.', next: 'C_pharmacy_door' },
            { text: 'Enter the X-Ray room.', next: 'C_xray_room' },
            { text: 'Leave.', next: 'hub' }
        ]
    },
    C_surgeon_death: {
        isDeath: true,
        text: "You make a loud noise. The Surgeon senses you. He turns, his eyes burning with cold light. He's on you in an instant, his spectral scalpel phasing through your ribs to slice your heart to ribbons. You feel an unimaginable cold before everything ends.",
    },
    // Phase 1: Recon & Prep (30+ nodes)
    C_patient_care: {
        speaker: 'Narrator',
        text: 'You slip into a large room with rows of empty beds. On a bedside table, you find a surgical manual and a patient chart.',
        background: BG.infirmary_recovery,
        choices: [
            { text: 'Take the surgical manual.', next: 'C_take_manual' },
            { text: 'Read the patient chart.', next: 'C_read_chart' },
            { text: 'Search the other beds.', next: 'C_search_beds' },
            { text: 'Search the empty bed frames.', next: 'C_find_restraints' },
            { text: 'Leave.', next: 'C_infirmary_entry' }
        ]
    },
    C_find_restraints: {
        speaker: 'Narrator',
        text: "Tucked under one of the rusty bed frames, you find a set of heavy leather surgical restraints. They look... well-used.",
        background: BG.infirmary_recovery,
        effects: { inventory: { add: 'surgical_restraints' } },
        choices: [{ text: 'This seems grimly necessary.', next: 'C_patient_care' }]
    },
    C_search_beds: {
        speaker: 'Narrator',
        text: "You search the other beds. They are all stripped bare, the mattresses stained with untold misery. You find nothing of use.",
        background: BG.infirmary_recovery,
        choices: [{ text: 'Nothing here.', next: 'C_patient_care' }]
    },
    C_take_manual: {
        speaker: 'Narrator',
        text: 'You take the surgical manual. It details complex implant procedures.',
        background: BG.infirmary_recovery,
        effects: { inventory: { add: 'surgical_manual' } },
        choices: [{ text: 'This is crucial.', next: 'C_patient_care' }]
    },
    C_read_chart: {
        speaker: 'Narrator',
        text: "Chart for Patient #113: 'Implant successful. Subject shows remarkable resilience. Dr. Finch is pleased. Body to be transferred to Morgue for post-mortem analysis as per standard procedure.' You find a keycard clipped to the back, labeled 'Archives'.",
        background: BG.infirmary_recovery,
        effects: { inventory: { add: 'archives_keycard' } },
        choices: [{ text: 'Take the keycard.', next: 'C_patient_care' }]
    },
    C_xray_room: {
        speaker: 'Narrator',
        text: "The X-Ray room is filled with hanging films. On a light box, an X-ray of Patient #113's chest is displayed, showing the regulator chip. An alarm schematic is tacked to a corkboard.",
        background: BG.infirmary_xray,
        choices: [
            { text: 'Take the X-Ray.', next: 'C_take_xray' },
            { text: 'Take the alarm schematic.', next: 'C_take_schematic' },
            { text: 'Leave.', next: 'C_infirmary_entry' }
        ]
    },
    C_take_xray: {
        effects: { inventory: { add: 'patient_xray' } },
        speaker: 'You', text: 'This shows exactly where the chip is. A guide for the procedure.',
        choices: [{ text: 'Back to the main room.', next: 'C_xray_room' }]
    },
    C_take_schematic: {
        effects: { inventory: { add: 'alarm_schematic' } },
        speaker: 'You', text: 'This shows a pressure plate under the operating table. I might be able to disable it.',
        choices: [{ text: 'I should be careful.', next: 'C_xray_room' }]
    },
    C_doctors_lounge: {
        speaker: 'Narrator',
        text: "A small lounge for the surgeons. A half-eaten meal is rotting on a table. A locker stands in the corner.",
        background: BG.infirmary_lounge,
        choices: [
            { text: 'Search the room.', next: 'C_search_lounge' },
            { text: 'Check the locker.', next: 'C_lounge_locker' },
            { text: 'Leave.', next: 'C_infirmary_entry' },
        ]
    },
    C_search_lounge: {
        speaker: 'Narrator',
        text: "You find the Pharmacy Key on a hook by the door, and a guard's schedule on a clipboard.",
        background: BG.infirmary_lounge,
        effects: { inventory: { add: ['pharmacy_key', 'guard_schedule'] } },
        choices: [{ text: 'These are vital.', next: 'C_doctors_lounge' }]
    },
    C_lounge_locker: {
        speaker: 'Narrator',
        text: "The locker is sealed with a card reader. It requires an employee ID.",
        background: BG.infirmary_lounge,
        choices: [
            { text: 'Use the Employee ID Card.', next: 'C_lounge_locker_open', requires: { inventory: ['employee_id'] } },
            { text: "I don't have an ID card.", next: 'C_doctors_lounge' },
        ]
    },
    C_lounge_locker_open: {
        speaker: 'Narrator',
        text: "The ID card works. The locker clicks open. Inside, you find a soldering iron and a moldy sandwich.",
        background: BG.infirmary_lounge,
        sfx: SFX.unlock,
        effects: { inventory: { add: 'soldering_iron' } },
        choices: [{ text: 'Take the soldering iron.', next: 'C_doctors_lounge' }]
    },
    C_pharmacy_door: {
        speaker: 'Narrator',
        text: 'The pharmacy is locked. You need a key.',
        background: BG.infirmary_main,
        choices: [
            { text: 'Use the Pharmacy Key.', next: 'C_pharmacy_entry', requires: { inventory: ['pharmacy_key'] } },
            { text: 'I need to find the key in the lounge.', next: 'C_infirmary_entry' }
        ]
    },
    C_pharmacy_entry: {
        speaker: 'Narrator',
        text: 'You unlock the pharmacy. Inside, you find a powerful sedative vial and a locked cabinet labeled "Surgical Tools".',
        background: BG.infirmary_pharmacy,
        effects: { inventory: { add: 'sedative_vial' } },
        choices: [
            { text: 'Examine the locked cabinet.', next: 'C_tools_cabinet' },
            { text: 'Leave.', next: 'C_infirmary_entry' },
        ]
    },
    C_tools_cabinet: {
        speaker: 'Narrator',
        text: 'This cabinet requires a specific key from sterilization.',
        background: BG.infirmary_pharmacy,
        choices: [
            { text: 'Use the Sterilization Key.', next: 'C_get_tools', requires: { inventory: ['sterilization_key'] } },
            { text: 'I need that key.', next: 'C_pharmacy_entry' },
        ]
    },
    C_get_tools: {
        speaker: 'Narrator',
        text: 'You unlock the cabinet and retrieve a fine-tipped scalpel and a surgical retractor.',
        background: BG.infirmary_pharmacy,
        effects: { inventory: { add: ['fine_tipped_scalpel', 'retractor'] } },
        choices: [{ text: 'Now I have the tools.', next: 'C_pharmacy_entry' }]
    },

    // Surgical Wing - Phase 2 & 3: The Heist and Escape (50+ nodes)
    C_operating_theater_approach: {
        speaker: 'Narrator',
        text: "You creep closer to the operating table. The Surgeon is trying to operate on the corpse of Patient #113. A pressure plate is under the table. You must disable it first.",
        background: BG.infirmary_surgery,
        revisitText: "The Surgeon is still working. I need to disable the alarm, sedate the corpse to stun him, then perform the extraction.",
        choices: [
            { text: 'Use soldering iron to bypass pressure plate.', next: 'C_bypass_alarm', requires: { inventory: ['soldering_iron', 'alarm_schematic'] } },
            { text: 'I need to disable that alarm first.', next: 'C_infirmary_entry' }
        ]
    },
    C_bypass_alarm: {
        speaker: 'Narrator',
        text: 'You carefully rewire the pressure plate. A small light on the alarm panel turns from red to green. It\'s safe to approach.',
        background: BG.infirmary_surgery,
        effects: { flags: { set: 'alarm_disabled' } },
        choices: [{ text: 'Now for the sedative.', next: 'C_sedate_corpse_prompt' }]
    },
    C_sedate_corpse_prompt: {
        speaker: 'You',
        text: 'The alarm is off. Time to use the sedative.',
        background: BG.infirmary_surgery,
        choices: [{ text: 'Use the sedative on the corpse\'s IV drip.', next: 'C_sedate_corpse', requires: { inventory: ['sedative_vial'] } }]
    },
    C_sedate_corpse: {
        speaker: 'Narrator',
        text: "You silently inject the sedative into the IV bag. As it enters the corpse's system, a wave of psychic feedback erupts, stunning The Surgeon. Simultaneously, the corpse on the table begins to thrash violently, threatening to dislodge the delicate implant! You have a very short window to act.",
        background: BG.infirmary_surgery,
        sfx: SFX.reality_warp,
        effects: { flags: { set: 'surgeon_stunned' } },
        choices: [{ text: 'I have to stabilize the body first!', next: 'C_extract_chip_start' }]
    },
    C_extract_chip_start: {
        speaker: 'Narrator',
        text: "The corpse is thrashing on the table! You have to secure it before you can even think about making an incision. The Surgeon is already starting to stir.",
        background: BG.infirmary_surgery,
        timer: 15,
        defaultChoiceIndex: 2,
        choices: [
            { text: 'Use the surgical restraints to secure the body.', next: 'C_body_stabilized', requires: { inventory: ['surgical_restraints'] } },
            { text: 'Try to hold the body still with your hands.', next: 'C_stabilize_fail' },
            { text: 'Panic!', next: 'C_surgeon_recovers' },
        ]
    },
    C_stabilize_fail: {
        speaker: 'Narrator',
        text: "You try to hold the thrashing corpse, but it's unnaturally strong. It knocks your tools away. You've wasted too much time. The Surgeon recovers, his eyes burning with cold fury.",
        background: BG.infirmary_surgery,
        choices: [{ text: 'Too slow...', next: 'C_surgeon_death' }]
    },
    C_body_stabilized: {
        speaker: 'Narrator',
        text: "You quickly strap the limbs to the table. The thrashing is contained. Now you can begin the procedure. The Surgeon is recovering fast! Step 1: Make incision along the sternum.",
        background: BG.infirmary_surgery,
        timer: 10,
        defaultChoiceIndex: 1,
        choices: [
            { text: 'Use the scalpel to make the incision.', next: 'C_extract_chip_step2', requires: { inventory: ['surgical_manual', 'fine_tipped_scalpel', 'retractor'] } },
            { text: 'Panic! I\'m missing the tools!', next: 'C_surgeon_recovers' },
        ]
    },
    C_extract_chip_step2: {
        speaker: 'Narrator',
        text: "Incision made. Step 2: Insert retractor and open the chest cavity.",
        background: BG.infirmary_surgery,
        timer: 10,
        defaultChoiceIndex: 1,
        choices: [
            { text: 'Use the retractor.', next: 'C_extract_chip_step3' },
            { text: 'Hesitate.', next: 'C_surgeon_recovers' },
        ]
    },
    C_extract_chip_step3: {
        speaker: 'Narrator',
        text: "Cavity is open. Step 3: Carefully sever the three bio-conduits from the chip.",
        background: BG.infirmary_surgery,
        timer: 10,
        defaultChoiceIndex: 1,
        choices: [
            { text: 'Sever the conduits.', next: 'C_grab_chip' },
            { text: 'My hand is shaking!', next: 'C_surgeon_recovers' },
        ]
    },
    C_surgeon_recovers: {
        speaker: 'Narrator',
        text: "You hesitated too long. The Surgeon shakes off the psychic stun, his rage absolute. You have no time to react.",
        background: BG.infirmary_surgery,
        isDeath: true,
    },
    C_grab_chip: {
        speaker: 'Narrator',
        text: 'You sever the last conduit and grab the Power Regulator Chip. As you do, you also grab a high-security keycard from the tray. You have what you need. The Surgeon is fully recovered and shrieking with fury!',
        background: BG.infirmary_surgery,
        sfx: SFX.alarm,
        effects: { inventory: { add: ['power_regulator_chip', 'ambulance_keycard'] } },
        choices: [{ text: 'RUN!', next: 'C_escape_start' }]
    },
    C_escape_start: {
        speaker: 'Narrator',
        text: "The Surgeon is coming for you, phasing through walls. The main exit is sealed! Your only options are a locked Emergency Exit and a barricaded door to the Lab wing!",
        background: BG.infirmary_main,
        bgm: BGM.descent,
        choices: [
            { text: 'Use the keycard on the Emergency Exit.', next: 'C_escape_ambulance', requires: { inventory: ['ambulance_keycard'] } },
            { text: 'Break down the barricade to the Lab!', next: 'C_barricade_escape', requires: { inventory: ['crowbar'] } }
        ]
    },
    C_escape_ambulance: {
        speaker: 'Narrator',
        text: "The keycard works! You burst through a heavy steel door into a derelict ambulance bay. The storm howls outside, but you're free of the West Wing.",
        background: BG.courtyard_rainy,
        sfx: SFX.unlock,
        effects: { flags: { set: 'C_ch2_escaped' } },
        choices: [{ text: 'Another wing, another nightmare.', next: 'end_chapter' }]
    },
    C_barricade_escape: {
        speaker: 'Narrator',
        text: "You smash the barricade with the crowbar and stumble into the sterile white halls of the Lab wing. You slam the door behind you, hoping it holds.",
        background: BG.lab_control_room,
        choices: [{ text: '[PATH CHANGER] I made it to the Lab.', next: 'D_lab_entry' }]
    },
    C_dumbwaiter_arrival: {
        speaker: 'Narrator',
        text: 'The dumbwaiter groans to a halt. You climb out into a sterilization room, filled with autoclaves and trays of gleaming, unused instruments. You are now in the Surgical Wing.',
        background: BG.infirmary_sterilization,
        choices: [
            { text: 'Search the room.', next: 'C_search_sterilization' },
            { text: '[PATH CHANGER] Explore the Surgical Wing.', next: 'C_infirmary_entry' }
        ]
    },
    C_search_sterilization: {
        speaker: 'Narrator',
        text: "Hanging from a hook on the wall, you find a key labeled 'Surgical Tools'. This must be for the pharmacy cabinet.",
        background: BG.infirmary_sterilization,
        effects: { inventory: { add: 'sterilization_key' } },
        choices: [{ text: 'This will get me the tools for the job.', next: 'C_infirmary_entry' }]
    },
};
