import React from 'react';

export const GlobalStyles = () => (
  <style>{`
    :root {
        --animation-speed-fast: 0.5s;
        --animation-speed-med: 0.8s;
        --animation-speed-slow: 1.2s;
        --ease-out-cubic: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        --horror-red: #8a0303;
        --ui-background: rgba(10, 0, 0, 0.7);
        --ui-border: 1px solid rgba(138, 3, 3, 0.5);
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
    @keyframes slideUpIn { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes slideDownOut { from { transform: translateY(0); opacity: 1; } to { transform: translateY(100%); opacity: 0; } }
    @keyframes blink { 50% { opacity: 0; } }
    @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
    @keyframes screenShake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
      20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
     @keyframes shake-subtle {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-1px) translateY(1px); }
      20%, 40%, 60%, 80% { transform: translateX(1px) translateY(-1px); }
    }
    @keyframes timer-bar-deplete {
        from { width: 100%; }
        to { width: 0%; }
    }
    @keyframes flicker-light {
      0%, 100% { opacity: 0; }
      20% { opacity: 0.08; }
      21% { opacity: 0; }
      35% { opacity: 0.05; }
      36% { opacity: 0.1; }
      37% { opacity: 0.04; }
      38% { opacity: 0; }
      60% { opacity: 0.1; }
      62% { opacity: 0; }
    }
    @keyframes grain {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(5%, -5%); }
      50% { transform: translate(-5%, 5%); }
      75% { transform: translate(5%, 5%); }
    }
    @keyframes heartbeat {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    @keyframes glitch-effect {
        0%, 100% { transform: translate(0, 0); }
        10% { transform: translate(-2px, -2px); }
        20% { transform: translate(3px, 1px); }
        30% { transform: translate(-1px, 2px); }
        40% { transform: translate(2px, -3px); }
        50% { transform: translate(-3px, 0px); }
        60% { transform: translate(1px, -1px); }
        70% { transform: translate(-2px, 3px); }
        80% { transform: translate(3px, -2px); }
        90% { transform: translate(-1px, 1px); }
    }
    @keyframes text-shake {
        0%, 100% { transform: translate(0, 0) rotate(0); }
        10% { transform: translate(-2px, -1px) rotate(-1deg); }
        20% { transform: translate(1px, 2px) rotate(0.5deg); }
        30% { transform: translate(-1px, -2px) rotate(1deg); }
        40% { transform: translate(2px, 1px) rotate(-0.5deg); }
        50% { transform: translate(-2px, 0px) rotate(-1deg); }
        60% { transform: translate(1px, -1px) rotate(0.5deg); }
        70% { transform: translate(-1px, 2px) rotate(1deg); }
        80% { transform: translate(2px, -2px) rotate(-0.5deg); }
        90% { transform: translate(-1px, 1px) rotate(0); }
    }
    .game-viewport {
      position: relative; width: 100vw; height: 100vh;
      background-size: cover; background-position: center;
      transition: background-image var(--animation-speed-slow) ease-in-out;
      display: flex; justify-content: center; align-items: center;
      padding: 2rem; box-sizing: border-box; overflow: hidden; background-color: #000;
    }
    .game-viewport.screen-shake {
      animation: screenShake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
     .game-viewport.low-sanity {
        filter: saturate(0.8) contrast(1.1);
        animation: shake-subtle 2s cubic-bezier(.36,.07,.19,.97) both infinite;
    }
    .effect-flicker::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: #fff;
        z-index: 2;
        opacity: 0;
        pointer-events: none;
        animation: flicker-light 8s infinite step-end;
    }
    .effect-glitch {
        animation: glitch-effect 0.3s steps(2, end) infinite;
    }
    .effect-glitch .film-grain-overlay::after {
        opacity: 0.3;
        animation-duration: 0.4s;
    }
    .jumpscare-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background-color: #000;
      display: flex; justify-content: center; align-items: center; z-index: 999;
      animation: fadeIn 0.1s, fadeOut 0.2s 0.6s forwards;
    }
    .jumpscare-sprite {
      transform: scale(2.5);
      animation: fadeIn 0.1s;
      filter: drop-shadow(0 0 30px rgba(255,0,0,0.8));
    }
    .vignette {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      box-shadow: inset 0 0 200px rgba(0,0,0,0.7); pointer-events: none;
      transition: box-shadow var(--animation-speed-slow) ease;
    }
    .vignette.low-sanity {
        box-shadow: inset 0 0 250px rgba(0,0,0,1), inset 0 0 80px rgba(138, 3, 3, 0.5);
    }
    .film-grain-overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    }
    .film-grain-overlay::after {
        content: "";
        position: absolute;
        width: 200%; height: 200%;
        top: -50%; left: -50%;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAD///8/Pz8/Pz9DQ0N0I/yPAAAABHRSTlMAAAAAAIh0kDMAAAAdSURBVDjLY2CgDmBggkQwUggQBREbmdEJAK4QAlCrIu2sAAAAAElFTkSuQmCC');
        animation: grain 1.5s steps(4) infinite;
        opacity: 0.1;
    }
    .start-screen-container {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        text-align: center; color: white; z-index: 10; animation: fadeIn 2s; gap: 1rem;
    }
    .start-screen-container h1 {
        font-family: 'Special Elite', cursive; font-size: clamp(2.5rem, 5vw, 3.5rem);
        margin-bottom: 1rem; text-shadow: 0 0 10px var(--horror-red), 0 0 20px var(--horror-red);
    }
    .start-button, .load-button {
        background: rgba(0,0,0,0.5); color: #ccc; border: 2px solid var(--horror-red);
        padding: 1rem 2.5rem; border-radius: 0; font-size: 1.2rem; font-family: 'Special Elite', cursive;
        font-weight: 600; cursor: pointer; transition: all 0.3s ease;
        box-shadow: 0 0 15px rgba(138, 3, 3, 0.5);
    }
    .start-button:hover, .load-button:hover { background: var(--horror-red); color: white; transform: scale(1.05); }
    .load-button { border-color: #555; box-shadow: 0 0 15px rgba(100, 100, 100, 0.5); }
    .load-button:hover { background: #444; }
    .dialogue-wrapper {
        position: absolute; bottom: 3%; left: 0; right: 0; display: grid;
        grid-template-columns: 1fr clamp(400px, 50vw, 700px) 1fr;
        align-items: flex-end; gap: 2rem; padding: 0 2rem; box-sizing: border-box; z-index: 10;
        animation: slideUpIn var(--animation-speed-med) var(--ease-out-cubic) forwards;
    }
    .dialogue-wrapper.hidden { animation: slideDownOut var(--animation-speed-med) var(--ease-out-cubic) forwards; }
    .character-sprite {
        max-height: 50vh; max-width: 25vw; object-fit: contain;
        filter: drop-shadow(0 10px 15px rgba(0,0,0,0.8)) brightness(0.7);
        transition: all var(--animation-speed-fast) ease; animation: fadeIn var(--animation-speed-med);
    }
    .character-sprite.player { justify-self: end; grid-column: 1; }
    .character-sprite.npc { justify-self: start; grid-column: 3; }
    .character-sprite.active {
        filter: drop-shadow(0 10px 20px rgba(0,0,0,1)) brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.1));
        transform: scale(1.05);
        animation: breathe 4s ease-in-out infinite, fadeIn var(--animation-speed-med);
    }
    .story-container {
      position: relative; background-color: var(--ui-background); border-radius: 4px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6); padding: 1rem 1.5rem; padding-top: 2.5rem;
      width: 100%; backdrop-filter: blur(8px); border: var(--ui-border); grid-column: 2;
    }
    .speaker-name {
        position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%);
        background: var(--horror-red); color: white; padding: 0.3rem 1.5rem; border-radius: 2px;
        font-size: 1.1rem; font-weight: bold; box-shadow: 0 0 10px rgba(0,0,0,0.7);
        white-space: nowrap; font-family: 'Special Elite', cursive;
        transition: all var(--animation-speed-fast) ease;
    }
    .speaker-name.ghost {
        background: #5a7a7a;
        text-shadow: 0 0 8px #fff;
        animation: breathe 3s ease-in-out infinite;
    }
    .speaker-name.doctor {
        background: #3d1a1a;
        animation: screenShake 0.8s infinite;
    }
    .story-text {
      font-size: clamp(1.1rem, 2vw, 1.2rem); line-height: 1.6; margin: 0;
      color: #ddd; min-height: 80px; text-shadow: 0 1px 5px rgba(0,0,0,0.7);
    }
    .text-effect-red {
        color: var(--horror-red);
        font-weight: bold;
    }
    .text-effect-shake {
        display: inline-block;
        animation: text-shake 0.4s cubic-bezier(.36,.07,.19,.97) both infinite;
    }
    .text-effect-whisper {
        opacity: 0.8;
        font-style: italic;
        color: #b0c4de;
        text-shadow: 0 0 5px #b0c4de;
    }
    .cursor {
      display: inline-block; width: 2px; height: 1.2rem; background-color: #ccc;
      animation: blink 1s step-end infinite; vertical-align: bottom;
    }
    .choices-modal {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
        display: flex; flex-direction: column; justify-content: center; align-items: center;
        z-index: 20; animation: fadeIn var(--animation-speed-fast) ease;
    }
    .choices-modal.hidden { display: none; }
    .choices-container {
      display: flex; flex-direction: column; gap: 1rem;
      width: 100%; max-width: 500px; padding: 1rem;
    }
    .choice-button, .restart-button {
      background: rgba(138, 3, 3, 0.4); color: white; border: 1px solid rgba(138, 3, 3, 0.8);
      padding: 1rem; border-radius: 4px; font-size: 1.1rem; font-family: 'Lora', serif;
      font-weight: 500; cursor: pointer; transition: all 0.2s ease-in-out; width: 100%;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4); opacity: 0;
      animation: slideUpIn var(--animation-speed-fast) var(--ease-out-cubic) forwards;
      position: relative; overflow: hidden;
    }
    .choice-button:nth-child(2) { animation-delay: 0.1s; }
    .choice-button:hover, .restart-button:hover {
      background: rgba(138, 3, 3, 0.7); border-color: rgba(255, 50, 50, 1); transform: translateY(-3px);
    }
    .choice-timer-bar {
      position: absolute; bottom: 0; left: 0; height: 4px;
      background-color: var(--horror-red);
      box-shadow: 0 0 10px var(--horror-red);
      animation-name: timer-bar-deplete;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }
    .restart-button { background: rgba(100, 100, 100, 0.4); border-color: rgba(100, 100, 100, 0.8); }
    .restart-button:hover { background: rgba(120, 120, 120, 0.6); }
    
    .top-right-controls {
        position: absolute; top: 20px; right: 20px; z-index: 30;
        display: flex; gap: 10px;
    }
    .game-button {
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.2); color: white; width: 50px; height: 50px;
        border-radius: 50%; cursor: pointer; display: flex;
        justify-content: center; align-items: center; transition: background-color 0.2s ease;
    }
    .game-button:hover { background: rgba(0, 0, 0, 0.7); }
    .game-button svg { width: 24px; height: 24px; }

    /* Settings Modal */
    .settings-modal-overlay {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
        display: flex; justify-content: center; align-items: center; z-index: 40;
        animation: fadeIn 0.3s ease;
    }
    .settings-panel {
        background-color: var(--ui-background);
        border: var(--ui-border);
        border-radius: 8px;
        padding: 2rem;
        width: 100%;
        max-width: 400px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.8);
        color: #f0f0f0;
    }
    .settings-panel h2 {
        font-family: 'Special Elite', cursive;
        text-align: center;
        margin-top: 0;
        margin-bottom: 2rem;
        color: var(--horror-red);
        text-shadow: 0 0 5px rgba(138, 3, 3, 0.8);
    }
    .settings-panel .settings-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    .settings-button {
      flex: 1;
      background: rgba(100, 100, 100, 0.4); color: white; border: 1px solid rgba(100, 100, 100, 0.8);
      padding: 0.8rem; border-radius: 4px; font-size: 1rem; font-family: 'Special Elite', cursive;
      cursor: pointer; transition: all 0.2s ease-in-out;
    }
    .settings-button.save { background-color: rgba(138, 3, 3, 0.4); border-color: rgba(138, 3, 3, 0.8); }
    .settings-button:hover { transform: translateY(-2px); background-color: rgba(120,120,120,0.6); }
    .settings-button.save:hover { background-color: rgba(138, 3, 3, 0.7); }
    .volume-control {
        margin-bottom: 1.5rem;
    }
    .volume-control label {
        display: block;
        margin-bottom: 0.5rem;
        font-family: 'Lora', serif;
        font-size: 1rem;
    }
    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      height: 8px;
      background: rgba(0,0,0,0.5);
      border-radius: 5px;
      border: 1px solid rgba(255,255,255,0.2);
      outline: none;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: var(--horror-red);
      cursor: pointer;
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: 0 0 5px rgba(0,0,0,0.5);
    }
    input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: var(--horror-red);
      cursor: pointer;
      border-radius: 50%;
      border: 2px solid #fff;
    }
    
    /* HUD */
    .hud-container {
        position: absolute;
        top: 20px; left: 20px; z-index: 30;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: fadeIn 1s 1s backwards;
        background: var(--ui-background);
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: var(--ui-border);
        backdrop-filter: blur(8px);
    }
    .stat-display, .inventory-display {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'Special Elite', cursive;
        font-size: 1.1rem;
        color: #ccc;
    }
    .stat-display .icon, .inventory-display .icon {
        color: var(--horror-red);
        filter: drop-shadow(0 0 5px var(--horror-red));
    }
    .stat-display .icon.low-sanity-pulse {
        animation: heartbeat 1.5s ease-in-out infinite;
    }
    .inventory-display {
        cursor: pointer;
        transition: color 0.2s;
        border-left: 1px solid rgba(255,255,255,0.2);
        padding-left: 1rem;
    }
    .inventory-display:hover {
        color: white;
    }

    /* Inventory Modal */
    .inventory-modal-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .inventory-item {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .inventory-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
    .inventory-item-name {
        font-family: 'Special Elite', cursive;
        font-size: 1.2rem;
        color: var(--horror-red);
        margin: 0 0 0.25rem 0;
    }
    .inventory-item-desc {
        font-family: 'Lora', serif;
        font-size: 1rem;
        color: #ccc;
        margin: 0;
    }

    /* Journal */
    .journal-button {
      background: rgba(100, 100, 100, 0.4); color: white; border: 1px solid rgba(100, 100, 100, 0.8);
      padding: 0.8rem; border-radius: 4px; font-size: 1rem; font-family: 'Special Elite', cursive;
      cursor: pointer; transition: all 0.2s ease-in-out; width: 100%; margin-bottom: 1.5rem;
    }
    .journal-button:hover { background: rgba(120, 120, 120, 0.6); transform: translateY(-2px); }
    .journal-panel { max-width: 600px; }
    .journal-entry-list { list-style: none; padding: 0; margin: 0; max-height: 60vh; overflow-y: auto; }
    .journal-entry {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .journal-entry:last-child { border-bottom: none; margin-bottom: 0; }
    .journal-entry-title {
        font-family: 'Special Elite', cursive;
        font-size: 1.3rem;
        color: var(--horror-red);
        margin: 0 0 0.5rem 0;
    }
    .journal-entry-content {
        font-family: 'Lora', serif;
        font-size: 1.1rem;
        color: #ccc;
        margin: 0;
        line-height: 1.7;
        white-space: pre-wrap;
    }

    /* Chapter Transition */
    .chapter-transition-screen {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background-color: #000;
      display: flex; flex-direction: column; justify-content: center; align-items: center;
      z-index: 1000;
      color: white;
      text-align: center;
      animation: fadeIn 1.5s, fadeOut 1.5s 3.5s forwards;
    }
    .chapter-number {
      font-family: 'Lora', serif;
      font-size: 1.5rem;
      color: #888;
      opacity: 0;
      animation: slideUpIn 1s 0.5s var(--ease-out-cubic) forwards;
    }
    .chapter-title {
      font-family: 'Special Elite', cursive;
      font-size: clamp(2rem, 5vw, 3rem);
      color: var(--horror-red);
      text-shadow: 0 0 10px var(--horror-red);
      margin: 0.5rem 0 0 0;
      opacity: 0;
      animation: slideUpIn 1s 0.8s var(--ease-out-cubic) forwards;
    }
    /* To Be Continued Screen */
    .to-be-continued-screen {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        text-align: center; color: white; z-index: 10; animation: fadeIn 2s; gap: 1.5rem;
    }
    .to-be-continued-screen h2 {
        font-family: 'Special Elite', cursive; font-size: clamp(2.5rem, 5vw, 3.5rem);
        margin-bottom: 1rem; color: #ccc;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
    }
    .to-be-continued-screen .main-menu-button {
        background: rgba(100, 100, 100, 0.4); color: white; border: 1px solid rgba(100, 100, 100, 0.8);
        padding: 1rem 2.5rem; border-radius: 0; font-size: 1.2rem; font-family: 'Special Elite', cursive;
        font-weight: 600; cursor: pointer; transition: all 0.3s ease;
    }
    .to-be-continued-screen .main-menu-button:hover {
        background: rgba(120, 120, 120, 0.6); transform: scale(1.05);
    }

    /* Chapter Select Screen */
    .chapter-select-container {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      width: 100%; height: 100%; animation: fadeIn 1s; padding: 2rem; box-sizing: border-box;
    }
    .chapter-select-title {
      font-family: 'Special Elite', cursive; font-size: 2.5rem; color: #eee;
      text-shadow: 0 0 10px var(--horror-red); margin-bottom: 2rem;
    }
    .chapter-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
      width: 100%;
      max-width: 1000px;
      max-height: 70vh;
      overflow-y: auto;
      padding: 0 1rem;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none;  /* IE and Edge */
    }
    .chapter-grid::-webkit-scrollbar {
      display: none; /* Chrome, Safari, and Opera */
    }
    .chapter-button {
      background: var(--ui-background); border: var(--ui-border);
      color: #ccc; padding: 1.2rem; text-align: left;
      font-family: 'Lora', serif; font-size: 1.1rem;
      display: flex; flex-direction: column;
      transition: all 0.2s ease; cursor: pointer;
      min-height: 100px;
      justify-content: space-between;
    }
    .chapter-button:not(:disabled):hover {
      background: rgba(138, 3, 3, 0.4);
      border-color: var(--horror-red);
      transform: translateY(-5px);
    }
    .chapter-button:disabled {
      background: rgba(10, 10, 10, 0.5);
      border-color: #333;
      color: #555;
      cursor: not-allowed;
    }
    .chapter-button-number {
      font-family: 'Special Elite', cursive;
      color: var(--horror-red);
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    .chapter-button:disabled .chapter-button-number { color: #555; }
    .chapter-button-title { 
      flex-grow: 1; 
      font-size: 1.2rem;
      font-weight: bold;
    }
    .lock-icon { margin-left: auto; color: #555; align-self: flex-end; }
    .back-button {
        background: transparent; color: #888; border: 1px solid #555;
        padding: 0.8rem 2rem; margin-top: 2rem;
        font-family: 'Special Elite', cursive; font-size: 1rem;
        cursor: pointer; transition: all 0.3s ease;
    }
    .back-button:hover { color: #ccc; border-color: #888; }


    /* Caution Screen */
    .caution-screen {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background-color: #000;
      display: flex; justify-content: center; align-items: center;
      z-index: 1001; animation: fadeIn 0.5s;
    }
    .caution-box {
      border: 2px solid var(--horror-red);
      padding: 2rem 3rem;
      text-align: center;
      max-width: 500px;
      background: rgba(10, 0, 0, 0.8);
    }
    .caution-title {
      font-family: 'Special Elite', cursive;
      color: var(--horror-red);
      font-size: 3rem;
      margin: 0 0 1rem 0;
      text-shadow: 0 0 10px var(--horror-red);
      animation: heartbeat 2s infinite;
    }
    .caution-text {
      font-family: 'Lora', serif;
      font-size: 1.1rem;
      color: #ccc;
      line-height: 1.6;
    }
    .proceed-button {
        background: rgba(138, 3, 3, 0.6); color: white; border: 1px solid var(--horror-red);
        padding: 0.8rem 2.5rem; margin-top: 1.5rem;
        font-family: 'Special Elite', cursive; font-size: 1.2rem;
        cursor: pointer; transition: all 0.3s ease;
    }
    .proceed-button:hover { background: var(--horror-red); }

  `}</style>
);
