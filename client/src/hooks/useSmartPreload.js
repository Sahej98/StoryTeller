
import { useEffect, useRef } from 'react';

// Cache to keep track of loaded images to avoid re-requesting/decoding
const imageCache = new Set();
const audioCache = new Set();

const preloadImage = (src) => {
    if (!src || imageCache.has(src)) return;
    const img = new Image();
    img.src = src;
    img.onload = () => imageCache.add(src);
    img.onerror = () => console.warn(`Failed to preload image: ${src}`);
};

const preloadAudio = (src) => {
    if (!src || audioCache.has(src)) return;
    const audio = new Audio();
    audio.src = src;
    audio.oncanplaythrough = () => audioCache.add(src);
    audio.onerror = () => console.warn(`Failed to preload audio: ${src}`);
    audio.load(); // Start loading
};

export const useSmartPreload = (currentNode, storyData, characters) => {
    // We use a ref to prevent excessive processing on every render if node hasn't changed
    const lastNodeRef = useRef(null);

    useEffect(() => {
        if (!currentNode || !storyData) return;

        // Identity check to avoid re-running logic if node object is same reference
        if (lastNodeRef.current === currentNode) return;
        lastNodeRef.current = currentNode;

        // 1. Preload assets for the CURRENT node (High Priority)
        // Background
        if (currentNode.background) preloadImage(currentNode.background);

        // Character Sprite (Speaker)
        if (currentNode.speaker && characters && characters[currentNode.speaker]?.sprite) {
            preloadImage(characters[currentNode.speaker].sprite);
        }

        // Character Sprite (NPCs)
        if (currentNode.npc && characters) {
            const npcs = Array.isArray(currentNode.npc) ? currentNode.npc : [currentNode.npc];
            npcs.forEach(npcKey => {
                if (characters[npcKey]?.sprite) preloadImage(characters[npcKey].sprite);
            });
        }

        // Jumpscares
        if (currentNode.jumpscare) {
            if (currentNode.jumpscare.type === 'image' && currentNode.jumpscare.image) {
                preloadImage(currentNode.jumpscare.image);
            }
            if (currentNode.jumpscare.type === 'sprite' && currentNode.jumpscare.character && characters[currentNode.jumpscare.character]?.sprite) {
                preloadImage(characters[currentNode.jumpscare.character].sprite);
            }
        }

        // 2. Preload assets for IMMEDIATE NEXT nodes (Medium Priority)
        if (currentNode.choices && Array.isArray(currentNode.choices)) {
            currentNode.choices.forEach(choice => {
                // Determine next node location
                let nextChapterKey, nextNodeKey;

                // If 'next' is an object { chapter, key }
                if (typeof choice.next === 'object' && choice.next !== null) {
                    nextChapterKey = choice.next.chapter;
                    nextNodeKey = choice.next.key;
                } else {
                    // Implicit next within same chapter structure requires us to know current chapter.
                    // This logic assumes we can find the node in storyData structure.
                    // Since currentNode doesn't natively know its parent chapter key in this isolation,
                    // we have to iterate or pass it in.
                    // OPTIMIZATION: We scan storyData to find the current node's chapter for context.
                    for (const chKey in storyData) {
                        if (storyData[chKey][choice.next]) {
                            nextChapterKey = chKey;
                            nextNodeKey = choice.next;
                            break;
                        }
                        // Also check if current node is in this chapter to assume same chapter navigation
                        const keys = Object.keys(storyData[chKey]);
                        // This is a bit expensive, simplified: assume if choice.next is string, it's same chapter
                        // Ideally passed from hook args. 
                    }
                }

                // If we found a target
                if (nextChapterKey && nextNodeKey && storyData[nextChapterKey] && storyData[nextChapterKey][nextNodeKey]) {
                    const nextNode = storyData[nextChapterKey][nextNodeKey];
                    if (nextNode.background) preloadImage(nextNode.background);
                    if (nextNode.bgm) preloadAudio(nextNode.bgm); // Optional: audio preloading can be heavy
                }
            });
        }

    }, [currentNode, storyData, characters]);
};
