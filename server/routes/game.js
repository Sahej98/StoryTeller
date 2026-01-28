import express from 'express';
import { Story } from '../models/story.js';
import { applyEffects, getViewModel } from '../engine/gameEngine.js';

const router = express.Router();

// Helper to get nested properties from a plain JS object.
// Required because we use .lean() on the Story model.
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

router.post('/action', async (req, res) => {
    const { action, payload } = req.body;
    const { storyId, currentState, chapterKey, nodeKey, choiceText, loadedState } = payload;

    try {
        const story = await Story.findOne({ id: storyId }).lean();
        if (!story) return res.status(404).json({ message: "Story not found" });

        let finalState;
        let finalChanges = {
            stats: [],
            inventory: { add: [], remove: [], loreAdded: [] },
            flags: [],
            relationships: [],
            charactersDiscovered: []
        };

        const mergeChanges = (source) => {
            finalChanges.stats.push(...source.stats);
            finalChanges.inventory.add.push(...source.inventory.add);
            finalChanges.inventory.remove.push(...source.inventory.remove);
            finalChanges.inventory.loreAdded.push(...source.inventory.loreAdded);
            finalChanges.flags.push(...source.flags);
            finalChanges.relationships.push(...source.relationships);
            finalChanges.charactersDiscovered.push(...source.charactersDiscovered);
        };

        switch (action) {
            case 'start':
            case 'restart': {
                const firstChapterKey = chapterKey || (story.storyDetails.chapters ? Object.keys(story.storyDetails.chapters)[0] : null);
                const startNodeKey = nodeKey || 'start';
                const characters = story.characters || {};
                const initialRelationships = Object.keys(characters).reduce((acc, charKey) => { acc[charKey] = 0; return acc; }, {});

                finalState = {
                    playerStats: { sanity: 100, health: 100, stamina: 100, morality: 50 },
                    inventory: [],
                    flags: [],
                    discoveredLore: [],
                    visitedNodes: [],
                    characters: [],
                    highestChapterUnlocked: currentState?.highestChapterUnlocked || 1,
                    currentPosition: { chapter: firstChapterKey, key: startNodeKey },
                    checkpoint: { chapter: firstChapterKey, key: startNodeKey },
                    relationships: initialRelationships,
                };
                break;
            }

            case 'loadCheckpoint': {
                finalState = {
                    ...currentState,
                    currentPosition: currentState.checkpoint,
                    playerStats: { ...currentState.playerStats, health: 100, stamina: 100 },
                };
                break;
            }

            case 'load': {
                finalState = loadedState;
                break;
            }

            case 'choice': {
                const currentNodeOnServer = getNested(story.storyData, `${currentState.currentPosition.chapter}.${currentState.currentPosition.key}`);

                if (!currentNodeOnServer || !Array.isArray(currentNodeOnServer.choices)) {
                    return res.status(400).json({ message: "Invalid node or choices not found in current game state." });
                }

                const serverChoice = currentNodeOnServer.choices.find(c => c.text === choiceText);

                if (!serverChoice) {
                    return res.status(400).json({ message: `Choice "${choiceText}" not found for the current node.` });
                }

                const { newState: stateAfterChoice, changes: choiceChanges } = applyEffects(currentState, story, serverChoice.effects);
                mergeChanges(choiceChanges);

                const nextChapterKey = serverChoice.next?.chapter || stateAfterChoice.currentPosition.chapter;
                const nextNodeKey = (typeof serverChoice.next === 'object' && serverChoice.next !== null) ? serverChoice.next.key : serverChoice.next;

                if (nextNodeKey === null) {
                    finalState = { ...stateAfterChoice, currentPosition: { chapter: nextChapterKey, key: null } };
                    break;
                }

                const nextNode = getNested(story.storyData, `${nextChapterKey}.${nextNodeKey}`);

                if (nextNode?.isDeath) {
                    res.json({ status: 'DEATH', text: nextNode.text, nextOnDeath: nextNode.nextOnDeath || null });
                    return;
                }

                const { newState: stateAfterNode, changes: nodeChanges } = applyEffects(stateAfterChoice, story, nextNode?.effects);
                mergeChanges(nodeChanges);

                const newVisitedNodes = [...stateAfterNode.visitedNodes];
                const currentPosString = `${currentState.currentPosition.chapter}/${currentState.currentPosition.key}`;
                if (!newVisitedNodes.includes(currentPosString)) {
                    newVisitedNodes.push(currentPosString);
                }

                const newPosition = { chapter: nextChapterKey, key: nextNodeKey };

                let newHighestChapter = stateAfterNode.highestChapterUnlocked;
                if (nextChapterKey !== currentState.currentPosition.chapter) {
                    const nextChapterDetails = getNested(story.storyDetails.chapters, nextChapterKey);
                    if (nextChapterDetails?.number) {
                        newHighestChapter = Math.max(newHighestChapter, nextChapterDetails.number);
                    }
                }

                finalState = {
                    ...stateAfterNode,
                    currentPosition: newPosition,
                    visitedNodes: newVisitedNodes,
                    highestChapterUnlocked: newHighestChapter,
                };
                break;
            }

            default:
                return res.status(400).json({ message: "Invalid action" });
        }

        const gameContext = getViewModel(story, finalState);
        res.json({ status: 'OK', gameContext, changes: finalChanges });

    } catch (err) {
        console.error('Game action error:', err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
