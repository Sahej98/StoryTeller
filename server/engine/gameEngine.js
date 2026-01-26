function getNested(data, path) {
    if (!path) return undefined;
    const keys = path.split('.');
    let current = data;
    for (const key of keys) {
        if (current === undefined || current === null) return undefined;
        if (typeof current === 'object') {
            current = current[key];
        } else {
            return undefined;
        }
    }
    return current;
}

export function applyEffects(state, story, effects) {
    const newState = JSON.parse(JSON.stringify(state));
    const changes = {
        stats: [],
        inventory: { add: [], remove: [], loreAdded: [] },
        flags: [],
        relationships: [],
        charactersDiscovered: []
    };

    if (!effects || typeof effects !== 'object') {
        return { newState, changes };
    }

    const plainEffects = effects.toObject ? effects.toObject() : effects;
    if (Object.keys(plainEffects).length === 0) {
        return { newState, changes };
    }
    console.log('[GameEngine] Processing effects:', JSON.stringify(plainEffects));


    if (plainEffects.stats && typeof plainEffects.stats === 'object' && Object.keys(plainEffects.stats).length > 0) {
        console.log(`[GameEngine] Stat change effects found:`, plainEffects.stats);
        if (!newState.playerStats) {
            newState.playerStats = { sanity: 100, health: 100, stamina: 100, morality: 50 };
        }

        for (const stat of Object.keys(plainEffects.stats)) {
            const change = plainEffects.stats[stat];
            if (typeof change !== 'number' || change === 0) continue;

            const currentValue = newState.playerStats[stat] || 0;
            let newValue = currentValue + change;

            if (['health', 'stamina', 'sanity', 'morality'].includes(stat)) {
                newValue = Math.max(0, Math.min(100, newValue));
            }

            const actualChange = newValue - currentValue;

            console.log(`[GameEngine] Applying stat change for '${stat}': From ${currentValue} to ${newValue}. Requested: ${change}, Applied: ${actualChange}`);

            newState.playerStats[stat] = newValue;
            if (actualChange !== 0) {
                changes.stats.push({ stat, change: actualChange });
            }
        }
    }

    if (plainEffects.inventory && typeof plainEffects.inventory === 'object') {
        if (!newState.inventory) newState.inventory = [];
        if (!newState.discoveredLore) newState.discoveredLore = [];

        if (plainEffects.inventory.add) {
            const itemsToAdd = Array.isArray(plainEffects.inventory.add) ? plainEffects.inventory.add : [plainEffects.inventory.add];
            console.log(`[GameEngine] Processing inventory 'add' effects for:`, itemsToAdd);
            itemsToAdd.forEach(item => {
                if (typeof item === 'string' && !newState.inventory.includes(item)) {
                    newState.inventory.push(item);
                    changes.inventory.add.push(item);
                    console.log(`[GameEngine] Added '${item}' to inventory.`);

                    const itemDef = getNested(story, `items.${item}`);
                    if (itemDef?.lore && !newState.discoveredLore.includes(item)) {
                        newState.discoveredLore.push(item);
                        changes.inventory.loreAdded.push(item);
                        console.log(`[GameEngine] Added lore for '${item}' to journal.`);
                    }
                }
            });
        }

        if (plainEffects.inventory.remove) {
            const itemsToRemove = Array.isArray(plainEffects.inventory.remove) ? plainEffects.inventory.remove : [plainEffects.inventory.remove];
            console.log(`[GameEngine] Processing inventory 'remove' effects for:`, itemsToRemove);
            newState.inventory = newState.inventory.filter(item => {
                if (itemsToRemove.includes(item)) {
                    changes.inventory.remove.push(item);
                    console.log(`[GameEngine] Removed '${item}' from inventory.`);
                    return false;
                }
                return true;
            });
        }
    }

    if (plainEffects.flags && typeof plainEffects.flags === 'object') {
        if (!newState.flags) newState.flags = [];

        if (plainEffects.flags.set) {
            const flagsToSet = Array.isArray(plainEffects.flags.set) ? plainEffects.flags.set : [plainEffects.flags.set];
            console.log(`[GameEngine] Processing flag 'set' effects for:`, flagsToSet);
            flagsToSet.forEach(flag => {
                if (typeof flag === 'string' && !newState.flags.includes(flag)) {
                    newState.flags.push(flag);
                    changes.flags.push(flag);
                    console.log(`[GameEngine] Set flag '${flag}'.`);
                }
            });
        }
    }

    if (plainEffects.relationships && typeof plainEffects.relationships === 'object' && Object.keys(plainEffects.relationships).length > 0) {
        console.log(`[GameEngine] Relationship change effects found:`, plainEffects.relationships);
        if (!newState.relationships) newState.relationships = {};
        if (!newState.characters) newState.characters = [];

        for (const charKey of Object.keys(plainEffects.relationships)) {
            const change = plainEffects.relationships[charKey];
            if (typeof change !== 'number' || change === 0) continue;

            const currentValue = newState.relationships[charKey] || 0;
            let newValue = currentValue + change;
            newValue = Math.max(-100, Math.min(100, newValue));

            const actualChange = newValue - currentValue;
            console.log(`[GameEngine] Applying relationship change for '${charKey}': From ${currentValue} to ${newValue}. Requested: ${change}, Applied: ${actualChange}`);

            newState.relationships[charKey] = newValue;
            if (actualChange !== 0) {
                changes.relationships.push({ character: charKey, change: actualChange });
            }

            if (!newState.characters.includes(charKey)) {
                newState.characters.push(charKey);
                changes.charactersDiscovered.push(charKey);
                console.log(`[GameEngine] Discovered new character: '${charKey}'.`);
            }
        }
    }

    if (plainEffects.setCheckpoint) {
        console.log(`[GameEngine] Setting checkpoint to:`, state.currentPosition);
        newState.checkpoint = state.currentPosition;
    }

    return { newState, changes };
};

function checkRequirements(reqs, gameState) {
    if (!reqs) return { disabled: false };
    const { playerStats, inventory, flags, relationships } = gameState;

    if (reqs.stats) {
        for (const stat in reqs.stats) {
            if ((playerStats[stat] || 0) < reqs.stats[stat]) return { disabled: true };
        }
    }
    if (reqs.inventory) {
        const required = Array.isArray(reqs.inventory) ? reqs.inventory : [reqs.inventory];
        for (const item of required) {
            if (!inventory.includes(item)) return { disabled: true };
        }
    }
    if (reqs.flags) {
        const required = Array.isArray(reqs.flags) ? reqs.flags : [reqs.flags];
        for (const flag of required) {
            if (!flags.includes(flag)) return { disabled: true };
        }
    }
    if (reqs.notFlags) {
        const forbidden = Array.isArray(reqs.notFlags) ? reqs.notFlags : [reqs.notFlags];
        for (const flag of forbidden) {
            if (flags.includes(flag)) return { disabled: true };
        }
    }
    if (reqs.relationships) {
        for (const charKey in reqs.relationships) {
            const requiredValue = reqs.relationships[charKey];
            const currentValue = relationships?.[charKey] || 0;
            if (requiredValue > 0 && currentValue < requiredValue) {
                return { disabled: true };
            }
            if (requiredValue <= 0 && currentValue > requiredValue) {
                return { disabled: true };
            }
        }
    }
    return { disabled: false };
}

export function getViewModel(story, gameState) {
    if (!gameState || !gameState.currentPosition) {
        return { gameState, view: null };
    }

    const { chapter, key } = gameState.currentPosition;
    if (!chapter || key === null) {
        return { gameState, view: { currentNode: null, processedChoices: [] } };
    }

    const currentNode = getNested(story.storyData, `${chapter}.${key}`);

    if (!currentNode) {
        console.error(`Node not found: ${chapter}.${key}`);
        return { gameState, view: null };
    }

    const processedChoices = (currentNode.choices || []).map(choice => {
        const { disabled } = checkRequirements(choice.requires, gameState);
        return { ...choice, isDisabled: disabled };
    });

    const hasRevisitText = gameState.visitedNodes.includes(`${chapter}/${key}`) && currentNode.revisitText;

    const getSpeakerKey = () => {
        const sKey = hasRevisitText && currentNode.revisitSpeaker ? currentNode.revisitSpeaker : currentNode.speaker;
        if (!sKey) return 'narrator';
        if (sKey === 'You') return 'player';
        return sKey.toLowerCase();
    };

    const speakerKey = getSpeakerKey();
    const speakerInfo = getNested(story.characters, speakerKey);
    let speakerName = speakerInfo ? speakerInfo.name : speakerKey;

    if (speakerKey === 'harris' && !gameState.flags.includes('met_harris')) {
        speakerName = '???';
    }

    if (speakerName && speakerName !== '???') {
        speakerName = speakerName.charAt(0).toUpperCase() + speakerName.slice(1);
    }

    const textToDisplay = hasRevisitText ? currentNode.revisitText : currentNode.text;

    const isPlayerInScene = currentNode.speaker === 'player' || !!currentNode.npc || currentNode.speaker === 'You';
    const npcToDisplay = Array.isArray(currentNode.npc) ? currentNode.npc : (currentNode.npc ? [currentNode.npc] : []);

    const view = {
        currentNode,
        processedChoices,
        speakerKey,
        speakerName,
        textToDisplay,
        isPlayerInScene,
        npcToDisplay,
    };

    return { gameState, view };
}