// client/src/data/editorTemplates.js

export const templates = {
    nodes: {
        BASIC_CHOICE: {
            description: 'A simple node with two choices leading to different outcomes.',
            nodes: {
                basic_choice_start: {
                    speaker: 'Narrator',
                    text: 'You stand at a crossroads. The path splits left and right.',
                    choices: [
                        { text: 'Go left.', next: 'basic_choice_left' },
                        { text: 'Go right.', next: 'basic_choice_right' },
                    ],
                },
                basic_choice_left: {
                    speaker: 'Narrator',
                    text: 'You went left and found a serene grove.',
                    choices: [{ text: 'Continue...', next: '' }],
                },
                basic_choice_right: {
                    speaker: 'Narrator',
                    text: 'You went right and found a dark cave.',
                    choices: [{ text: 'Continue...', next: '' }],
                },
            },
        },
        STAT_CHANGE: {
            description: 'A choice that directly increases or decreases a player stat like Sanity or Morality.',
            nodes: {
                stat_choice_start: {
                    speaker: 'Narrator',
                    text: 'You find a wallet on the ground, filled with cash.',
                    choices: [
                        { text: 'Take the money. (Morality -10)', next: 'stat_choice_end', effects: { stats: { morality: -10 } } },
                        { text: 'Leave it. (Morality +5)', next: 'stat_choice_end', effects: { stats: { morality: 5 } } },
                    ]
                },
                stat_choice_end: {
                    speaker: 'Narrator',
                    text: 'The deed is done. You feel the weight of your decision.',
                    choices: [{ text: 'Continue...', next: '' }]
                }
            }
        },
        ITEM_GET_AND_USE: {
            description: 'A two-part template. One node gives an item, another has a choice that requires it.',
            nodes: {
                item_get_start: {
                    speaker: 'Narrator',
                    text: 'You find a rusty key on a hook.',
                    effects: { inventory: { add: 'rusty_key' } },
                    choices: [{ text: 'Take the key.', next: 'item_get_door' }]
                },
                item_get_door: {
                    speaker: 'Narrator',
                    text: 'Ahead is a heavy, locked door.',
                    choices: [
                        { text: 'Use the rusty key.', next: 'item_get_end', requires: { inventory: ['rusty_key'] }, effects: { inventory: { remove: 'rusty_key' } } },
                        { text: "I can't open this.", next: 'item_get_end' }
                    ]
                },
                item_get_end: {
                    speaker: 'Narrator',
                    text: 'You move on.',
                    choices: [{ text: 'Continue...', next: '' }]
                }
            }
        },
        FLAG_CHECK: {
            description: 'A choice that is only enabled if a specific story flag has been set previously.',
            nodes: {
                flag_check_start: {
                    speaker: 'Narrator',
                    text: 'A guard stands before you. He looks angry.',
                    choices: [
                        { text: 'Tell him you were sent by the captain.', next: 'flag_check_success', requires: { flags: ['spoke_to_captain'] } },
                        { text: 'Try to sneak past.', next: 'flag_check_fail' }
                    ]
                },
                flag_check_success: {
                    speaker: 'Guard',
                    text: '"The captain sent you? Alright then, pass."',
                    choices: [{ text: 'Continue...', next: '' }]
                },
                flag_check_fail: {
                    speaker: 'Guard',
                    text: '"Hey! Get back here!"',
                    choices: [{ text: 'Continue...', next: '' }]
                }
            }
        },
        TIMED_CHOICE: {
            description: 'A node with a timer. If the player doesn\'t choose in time, a default choice is made.',
            nodes: {
                timed_choice_start: {
                    speaker: 'Narrator',
                    text: 'The ceiling begins to collapse! You have to move NOW!',
                    timer: 5,
                    defaultChoiceIndex: 1, // Index of the choice to trigger on timeout (0-based)
                    choices: [
                        { text: 'Dive left!', next: 'timed_choice_success' },
                        { text: 'Freeze in fear!', next: 'timed_choice_fail' }
                    ]
                },
                timed_choice_success: {
                    speaker: 'Narrator',
                    text: 'You dive out of the way just in time.',
                    choices: [{ text: 'Continue...', next: '' }]
                },
                timed_choice_fail: {
                    speaker: 'Narrator',
                    text: 'You hesitated too long and were crushed.',
                    isDeath: true
                }
            }
        },
        DEATH_NODE: {
            description: 'A node that triggers a game over, with an option for a custom redirect on "Continue".',
            nodes: {
                death_node_trigger: {
                    speaker: 'Narrator',
                    text: 'You drink the mysterious potion.',
                    choices: [{ text: '...', next: 'death_node_outcome' }]
                },
                death_node_outcome: {
                    isDeath: true,
                    text: 'It was poison. As your vision fades, you realize your mistake.', // Custom death message
                    nextOnDeath: 'death_node_continue', // Optional: Node to go to if player clicks "Continue"
                },
                death_node_continue: {
                    speaker: 'Narrator',
                    text: 'You awaken in a strange limbo, given a second chance.',
                    choices: [{ text: 'Continue...', next: '' }]
                }
            }
        },
        RELATIONSHIP_CHANGE: {
            description: 'Choices that positively or negatively impact a relationship with a defined character.',
            nodes: {
                relationship_start: {
                    speaker: 'ally',
                    text: 'I\'m pinned down! Help me!',
                    choices: [
                        { text: 'Help your ally. (Relationship +15)', next: 'relationship_end', effects: { relationships: { ally: 15 } } },
                        { text: 'Save yourself. (Relationship -20)', next: 'relationship_end', effects: { relationships: { ally: -20 } } },
                    ]
                },
                relationship_end: {
                    speaker: 'Narrator',
                    text: 'Your ally will remember what you did today.',
                    choices: [{ text: 'Continue...', next: '' }]
                }
            }
        },
        DISCOVER_NPC: {
            description: 'Discover a new character and establish your initial relationship with them.',
            nodes: {
                discover_npc_start: {
                    speaker: 'Narrator',
                    text: 'A wary stranger watches you from the shadows.',
                    choices: [{ text: 'Approach them.', next: 'discover_npc_interact' }]
                },
                discover_npc_interact: {
                    speaker: 'stranger',
                    text: '"Who are you? What do you want?"',
                    effects: { relationships: { stranger: 0 } }, // This discovers the NPC
                    choices: [
                        { text: '"I mean you no harm."', next: 'discover_npc_end', effects: { relationships: { stranger: 5 } } },
                        { text: '"Stay out of my way."', next: 'discover_npc_end', effects: { relationships: { stranger: -10 } } },
                    ]
                },
                discover_npc_end: { text: 'They watch you, having taken measure of your character.', choices: [] }
            }
        },
        HUB_AND_SPOKE_MODEL: {
            description: 'A central hub node that branches to multiple locations (spokes), which then lead back to the hub. Great for creating explorable areas.',
            nodes: {
                hub_start: {
                    speaker: 'Narrator',
                    text: 'You are in the town square. From here, you can visit the market, the tavern, or the blacksmith.',
                    choices: [
                        { text: 'Go to the market.', next: 'hub_spoke_market' },
                        { text: 'Go to the tavern.', next: 'hub_spoke_tavern' },
                        { text: 'Go to the blacksmith.', next: 'hub_spoke_blacksmith' },
                    ],
                },
                hub_spoke_market: {
                    speaker: 'Narrator',
                    text: 'The market is bustling with people. You see nothing of interest right now.',
                    choices: [{ text: 'Return to the town square.', next: 'hub_start' }],
                },
                hub_spoke_tavern: {
                    speaker: 'Narrator',
                    text: 'The tavern is dark and smells of ale. You see a quest board on the wall.',
                    choices: [{ text: 'Return to the town square.', next: 'hub_start' }],
                },
                hub_spoke_blacksmith: {
                    speaker: 'Narrator',
                    text: 'The blacksmith is hammering away at a piece of steel. The heat is intense.',
                    choices: [{ text: 'Return to the town square.', next: 'hub_start' }],
                },
            },
        },
        NPC_CONVERSATION_TREE: {
            description: 'A branching conversation with an NPC. Some dialogue options are only available if you have a positive relationship.',
            nodes: {
                convo_start: {
                    speaker: 'ally',
                    text: 'Thank you for helping me back there. I owe you one.',
                    choices: [
                        { text: '"It was nothing."', next: 'convo_friendly' },
                        { text: '"You\'re a liability."', next: 'convo_hostile', effects: { relationships: { ally: -10 } } },
                        { text: '"About that favor you owe me..."', next: 'convo_favor', requires: { relationships: { ally: 20 } } },
                    ],
                },
                convo_friendly: {
                    speaker: 'ally',
                    text: 'You\'re too modest. Here, take this. You\'ve earned it.',
                    effects: { relationships: { ally: 10 } },
                    choices: [{ text: 'Thank you.', next: 'convo_end' }],
                },
                convo_hostile: {
                    speaker: 'ally',
                    text: 'A liability? After all I\'ve done? Fine. See if I help you again.',
                    choices: [{ text: 'I don\'t need your help.', next: 'convo_end' }],
                },
                convo_favor: {
                    speaker: 'ally',
                    text: 'Of course! I have some information that might help you. The guard captain carries a special key...',
                    choices: [{ text: 'Interesting.', next: 'convo_end' }]
                },
                convo_end: {
                    speaker: 'Narrator',
                    text: 'The conversation is over.',
                    choices: [{ text: 'Continue...', next: '' }]
                }
            },
        },
        MORALITY_DILEMMA: {
            description: 'A difficult choice where both options have significant but opposing consequences for the player\'s Morality stat.',
            nodes: {
                morality_dilemma_start: {
                    speaker: 'Narrator',
                    text: 'A starving child begs you for your last piece of food. You need it to survive the journey ahead.',
                    choices: [
                        { text: 'Give the child your food. (Morality +20, Health -10)', next: 'morality_dilemma_end', effects: { stats: { morality: 20, health: -10 } } },
                        { text: 'Keep the food for yourself. (Morality -20)', next: 'morality_dilemma_end', effects: { stats: { morality: -20 } } },
                    ]
                },
                morality_dilemma_end: {
                    speaker: 'Narrator',
                    text: 'You live with your choice.',
                    choices: [{ text: 'Continue...', next: '' }]
                }
            }
        },
        STEALTH_CHOICE: {
            description: 'A simple stealth challenge. One choice allows you to proceed, while the other alerts a guard and leads to a fail state.',
            nodes: {
                stealth_start: {
                    speaker: 'Narrator',
                    text: 'A guard patrols the hallway. You can either duck behind some crates or try to run for the door.',
                    choices: [
                        { text: 'Duck behind the crates.', next: 'stealth_success' },
                        { text: 'Make a run for it.', next: 'stealth_fail' },
                    ],
                },
                stealth_success: {
                    speaker: 'Narrator',
                    text: 'You wait until the guard passes and slip away unnoticed.',
                    choices: [{ text: 'Continue...', next: '' }],
                },
                stealth_fail: {
                    speaker: 'Guard',
                    text: '"Hey! Stop right there!"',
                    choices: [{ text: 'You\'ve been caught!', next: '' }],
                },
            },
        },
        INFORMATION_GATHERING: {
            description: 'A structure for gathering clues. The final path only opens after finding all necessary pieces of information (flags).',
            nodes: {
                info_hub: {
                    speaker: 'Narrator',
                    text: 'You need to figure out the password for the secret door. You can talk to the Innkeeper or look at the notice board.',
                    choices: [
                        { text: 'Talk to the Innkeeper.', next: 'info_clue_A' },
                        { text: 'Check the notice board.', next: 'info_clue_B' },
                        { text: 'Try the secret door.', next: 'info_final_door' },
                    ],
                },
                info_clue_A: {
                    speaker: 'Innkeeper',
                    text: '"The password? It has something to do with the year this town was founded."',
                    effects: { flags: { set: 'knows_password_is_year' } },
                    choices: [{ text: 'Return to the main room.', next: 'info_hub' }],
                },
                info_clue_B: {
                    speaker: 'Narrator',
                    text: 'A plaque on the notice board reads: "Founded in the year 1887."',
                    effects: { flags: { set: 'knows_founding_year' } },
                    choices: [{ text: 'Return to the main room.', next: 'info_hub' }],
                },
                info_final_door: {
                    speaker: 'Narrator',
                    text: 'You approach the secret door.',
                    choices: [
                        {
                            text: 'Say the password "1887".',
                            next: 'info_success',
                            requires: { flags: ['knows_password_is_year', 'knows_founding_year'] },
                        },
                        { text: 'I don\'t know the password yet.', next: 'info_hub' },
                    ],
                },
                info_success: {
                    speaker: 'Narrator',
                    text: 'The door slides open.',
                    choices: []
                }
            },
        },
        REVISIT_TEXT: {
            description: 'A node that displays different text on the second visit.',
            nodes: {
                revisit_text_start: {
                    speaker: 'Narrator',
                    text: 'You enter a dusty library. A large book sits open on a pedestal.',
                    revisitText: 'You are back in the library. The book is still open.',
                    revisitSpeaker: 'You', // Optional: change speaker on revisit
                    choices: [
                        { text: 'Read the book.', next: 'revisit_text_read' },
                        { text: 'Leave.', next: 'revisit_text_end' }
                    ]
                },
                revisit_text_read: {
                    speaker: 'Narrator',
                    text: 'The book tells a tale of ancient kings. A flag has been set.',
                    effects: { flags: { set: 'read_the_book' } },
                    choices: [{ text: 'Return to the library entrance.', next: 'revisit_text_start' }]
                },
                revisit_text_end: {
                    speaker: 'Narrator',
                    text: 'You leave the library.',
                    choices: [{ text: 'Continue...', next: '' }]
                }
            }
        },
        JUMPSCARE: {
            description: 'A node with a pre-configured jumpscare effect.',
            nodes: {
                jumpscare_setup: {
                    speaker: 'Narrator',
                    text: 'The room is quiet. Too quiet. You examine the painting on the wall.',
                    choices: [{ text: 'Look closer...', next: 'jumpscare_trigger' }]
                },
                jumpscare_trigger: {
                    speaker: 'Narrator',
                    text: 'Suddenly, a horrifying face lunges from the canvas!',
                    jumpscare: { type: 'image', image: 'https://i.imgur.com/GahF34s.png', sfx: 'jumpscare' },
                    visualEffect: 'rumble',
                    effects: { stats: { sanity: -20 } },
                    choices: [{ text: 'AHH!', next: '' }]
                }
            }
        },
        COMPLEX_REQUIREMENT: {
            description: 'A choice that requires multiple conditions to be met (stats, items, and flags).',
            nodes: {
                complex_req_start: {
                    speaker: 'Narrator',
                    text: 'The ancient guardian bars the way. "Only the worthy may pass," it booms.',
                    choices: [
                        {
                            text: 'Present the holy relic while having high morality.',
                            next: 'complex_req_success',
                            requires: {
                                inventory: ['holy_relic'],
                                stats: { morality: 70 },
                                flags: ['spoke_to_elder']
                            }
                        },
                        { text: 'Attempt to fight the guardian.', next: 'complex_req_fail' }
                    ]
                },
                complex_req_success: { text: 'The guardian recognizes your worth and allows you to pass.', choices: [] },
                complex_req_fail: { text: 'The guardian effortlessly strikes you down.', isDeath: true },
            }
        },
        COMBINED_EFFECTS_CHOICE: {
            description: 'A single choice that affects stats, inventory, and flags all at once.',
            nodes: {
                combined_effects_start: {
                    speaker: 'Narrator',
                    text: 'You find a cursed altar with a glowing dagger.',
                    choices: [
                        {
                            text: 'Perform the ritual. (Sanity -20, Morality -15, Get Dagger)',
                            next: 'combined_effects_end',
                            effects: {
                                stats: { sanity: -20, morality: -15 },
                                inventory: { add: 'cursed_dagger' },
                                flags: { set: 'performed_ritual' }
                            }
                        },
                        { text: 'Leave the altar alone.', next: 'combined_effects_end' }
                    ]
                },
                combined_effects_end: { text: 'You walk away, changed or not.', choices: [] }
            }
        },
        SET_CHECKPOINT: {
            description: 'A node that silently saves the player\'s progress as a checkpoint before a difficult section.',
            nodes: {
                set_checkpoint_start: {
                    speaker: 'Narrator',
                    text: 'You stand before a rickety rope bridge over a bottomless chasm. There is no turning back.',
                    effects: { setCheckpoint: true },
                    choices: [{ text: 'Cross the bridge.', next: 'set_checkpoint_danger' }]
                },
                set_checkpoint_danger: {
                    speaker: 'Narrator',
                    text: 'Halfway across, the ropes begin to snap!',
                    isDeath: true
                }
            }
        },
        ATMOSPHERE_CHANGE: {
            description: 'A node that changes the background image and background music (BGM).',
            nodes: {
                atmosphere_change_start: {
                    speaker: 'Narrator',
                    text: 'You are in a calm forest.',
                    background: 'https://images.unsplash.com/photo-1500356536437-1838615c8a6e',
                    bgm: '/audio/bg/ambient.mp3',
                    choices: [{ text: 'As night falls...', next: 'atmosphere_change_end' }]
                },
                atmosphere_change_end: {
                    speaker: 'Narrator',
                    text: '...the forest becomes a place of terror.',
                    background: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7',
                    bgm: '/audio/bg/tension.mp3',
                    choices: []
                }
            }
        },
        ENVIRONMENTAL_PUZZLE_SEQUENCE: {
            description: 'A sequence of choices representing an environmental puzzle. The player must perform actions in the correct order.',
            nodes: {
                puzzle_start: {
                    speaker: 'Narrator',
                    text: 'You are in a room with three levers on the wall: one red, one blue, and one green. A heavy portcullis blocks the exit.',
                    choices: [
                        { text: 'Pull the red lever.', next: 'puzzle_fail' },
                        { text: 'Pull the blue lever.', next: 'puzzle_step2' },
                        { text: 'Pull the green lever.', next: 'puzzle_fail' },
                    ],
                },
                puzzle_step2: {
                    speaker: 'Narrator',
                    text: 'You pull the blue lever. A grinding sound echoes. The red and green levers remain.',
                    choices: [
                        { text: 'Pull the red lever.', next: 'puzzle_success' },
                        { text: 'Pull the green lever.', next: 'puzzle_fail' },
                    ],
                },
                puzzle_success: {
                    speaker: 'Narrator',
                    text: 'You pull the red lever. With a final CLANG, the portcullis rises!',
                    choices: [{ text: 'Proceed.', next: '' }],
                },
                puzzle_fail: {
                    speaker: 'Narrator',
                    text: 'You pull the wrong lever. A trap is sprung, and the room begins to fill with sand! You have to start over.',
                    choices: [{ text: 'Reset the puzzle.', next: 'puzzle_start' }],
                },
            },
        },
        END_CHAPTER: {
            description: 'A node with a choice that ends the current chapter, triggering the "To Be Continued" screen.',
            nodes: {
                end_chapter_node: {
                    speaker: 'Narrator',
                    text: 'You have reached the end of this part of the story.',
                    choices: [{ text: 'Continue to the next chapter...', next: null }],
                },
            },
        },
        END_STORY: {
            description: 'A node with a choice that ends the entire story, triggering the final story end screen.',
            nodes: {
                end_story_node: {
                    speaker: 'Narrator',
                    text: 'Your long journey is finally over.',
                    choices: [{ text: 'See the ending.', next: 'END_STORY' }],
                },
            },
        },
        AMBIENT_SFX_EFFECT: {
            description: 'A node that uses ambient SFX triggered by specific words, and dynamic text effects.',
            nodes: {
                ambient_effect_start: {
                    speaker: 'Narrator',
                    text: 'A cold wind blows through the broken window as you hear a faint whisper on the air. Suddenly, the entire room begins to shake!',
                    ambientSfx: [
                        { triggerWord: 'wind', sfx: 'wind-howl' },
                        { triggerWord: 'whisper', sfx: 'whisper' }
                    ],
                    textEffects: [
                        { word: 'shake', effect: 'shake' },
                        { word: 'cold wind', effect: 'whisper' }
                    ],
                    visualEffect: 'rumble',
                    choices: [{ text: 'What is happening?!', next: '' }]
                }
            }
        }
    }
};