import React from 'react';

export const GlobalStyles = () => (
  <style>{`
    :root {
      /* Base Theme */
      --primary-text-color: #e0e0e0;
      --secondary-text-color: #a0a0a0;
      --background-body: #121212;
      --background-ui: rgba(30, 30, 30, 0.85);
      --background-ui-solid: #1e1e1e;
      --border-ui: 1px solid rgba(255, 255, 255, 0.1);
      --disabled-color: #555;
      
      --title-font: 'Inter', sans-serif;
      --body-font: 'Source Serif Pro', serif;

      /* Story-specific overrides */
      --horror-accent: #b71c1c;
      --scifi-accent: #0277bd;
      --fantasy-accent: #6a1b9a;
      
      --horror-accent-rgb: 183, 28, 28;
      --scifi-accent-rgb: 2, 119, 189;
      --fantasy-accent-rgb: 106, 27, 154;


      /* Themed Accent Color */
      --accent-color: var(--horror-accent);
      --accent-color-rgb: var(--horror-accent-rgb);
    }

    .theme-horror { --accent-color: var(--horror-accent); --accent-color-rgb: var(--horror-accent-rgb); }
    .theme-scifi { --accent-color: var(--scifi-accent); --accent-color-rgb: var(--scifi-accent-rgb); }
    .theme-fantasy { --accent-color: var(--fantasy-accent); --accent-color-rgb: var(--fantasy-accent-rgb); }
    
    /* Keyframes */
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
    @keyframes slideUpIn { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes slideDownOut { from { transform: translateY(0); opacity: 1; } to { transform: translateY(50px); opacity: 0; } }
    @keyframes blink { 50% { opacity: 0; } }
    @keyframes screenShake {
      0%, 100% { transform: translate(0, 0); }
      10%, 30%, 50%, 70%, 90% { transform: translate(-8px, 4px) rotate(-1deg); }
      20%, 40%, 60%, 80% { transform: translate(4px, -6px) rotate(1deg); }
    }
     @keyframes shake-subtle {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-1px) translateY(1px); }
      50% { transform: translateX(1px) translateY(-1px); }
      75% { transform: translateX(-1px) translateY(-1px); }
    }
    @keyframes timer-bar-deplete { from { width: 100%; } to { width: 0%; } }
    @keyframes grain { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(5%, -5%); } 50% { transform: translate(-5%, 5%); } 75% { transform: translate(5%, 5%); } }
    @keyframes scanlines { 0% { background-position: 0 0; } 100% { background-position: 0 100%; } }
    @keyframes heartbeat { 0% { transform: scale(1); filter: drop-shadow(0 0 5px var(--horror-accent)); } 50% { transform: scale(1.1); filter: drop-shadow(0 0 15px var(--horror-accent)); } 100% { transform: scale(1); filter: drop-shadow(0 0 5px var(--horror-accent)); } }
    @keyframes text-shake-anim {
      0%, 100% { transform: translate(0, 0) rotate(0); }
      25% { transform: translate(1px, -1px) rotate(-0.2deg); }
      50% { transform: translate(-1px, 1px) rotate(0.2deg); }
      75% { transform: translate(1px, 1px) rotate(-0.2deg); }
    }
    @keyframes sparkle-anim {
      0%, 100% { opacity: 0.8; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.3); }
    }
    @keyframes autosave-anim {
        0% { opacity: 0; transform: translateY(20px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
    }
    @keyframes shock-anim {
      0% { transform: scale(1); }
      50% { transform: scale(1.4) rotate(4deg); }
      100% { transform: scale(1); }
    }
    @keyframes rumble-anim {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(-3px, 2px); }
      50% { transform: translate(3px, -2px); }
      75% { transform: translate(-2px, -3px); }
    }
    @keyframes continue-pulse {
      0%, 100% { transform: translateY(0); opacity: 0.7; }
      50% { transform: translateY(3px); opacity: 1; }
    }
    @keyframes stat-change-anim {
      0% { opacity: 0; transform: translateY(0); }
      20% { opacity: 1; transform: translateY(-20px); }
      80% { opacity: 1; transform: translateY(-20px); }
      100% { opacity: 0; transform: translateY(-40px); }
    }
    @keyframes jumpscare-zoom-shake {
      0% { transform: scale(1.5) translate(0, 0) rotate(0); opacity: 0; }
      5% { transform: scale(3) translate(-10px, 8px) rotate(-3deg); opacity: 1; }
      10% { transform: scale(3.1) translate(8px, -10px) rotate(2deg); }
      15% { transform: scale(3.2) translate(-5px, 5px) rotate(-1deg); }
      20% { transform: scale(3.3) translate(5px, -5px) rotate(1deg); }
      80% { transform: scale(4.5); opacity: 1; }
      100% { transform: scale(5); opacity: 0; }
    }
    @keyframes jumpscare-text-flash {
      0% { opacity: 0; transform: scale(1.2); }
      5% { opacity: 1; transform: scale(2) rotate(-4deg); }
      10% { opacity: 0.8; transform: scale(1.9) rotate(3deg); }
      15% { opacity: 1; transform: scale(2.1) rotate(-2deg); }
      80% { opacity: 1; transform: scale(2.5); }
      100% { opacity: 0; transform: scale(3); }
    }
    @keyframes jumpscare-glitch-anim {
      0% { opacity: 1; }
      10% { transform: translate(-5px, 3px); }
      20% { transform: translate(5px, -3px); }
      30% { opacity: 0.4; }
      40% { transform: translate(-8px, 6px); opacity: 1; }
      50% { transform: translate(8px, -6px); }
      60% { clip-path: inset(40% 0 40% 0); }
      70% { clip-path: inset(0 0 0 0); }
      80% { opacity: 0.2; }
      90% { opacity: 1; }
      100% { opacity: 0; }
    }
    @keyframes ken-burns {
        0% { transform: scale(1.05) translate(2%, -1%); }
        100% { transform: scale(1.15) translate(-2%, 1%); }
    }
    @keyframes underline-anim {
      from { width: 0; }
      to { width: 100%; }
    }

    /* Base Styles */
    .game-viewport { position: relative; width: 100vw; height: 100vh; background-size: cover; background-position: center; display: flex; justify-content: center; align-items: center; padding: 1rem; box-sizing: border-box; overflow: hidden; background-color: var(--background-body); }
    .game-viewport.screen-shake { animation: screenShake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
    .game-viewport.low-sanity { filter: saturate(0.7) contrast(1.2); animation: shake-subtle 3s ease-in-out both infinite; }
    .game-viewport.effect-rumble { animation: rumble-anim 0.4s ease-in-out both; }
    
    /* Background */
    .background-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; opacity: 0; transition: opacity 1.5s ease-in-out; z-index: 0; }
    .background-layer.active { opacity: 1; }

    /* Overlays */
    .jumpscare-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #000; display: flex; justify-content: center; align-items: center; z-index: 999; animation: fadeIn 0.05s; overflow: hidden; }
    .jumpscare-sprite { animation: jumpscare-zoom-shake 0.9s cubic-bezier(.36,.07,.19,.97) forwards; filter: drop-shadow(0 0 40px rgba(255,0,0,0.9)) brightness(1.2); will-change: transform, opacity; }
    .jumpscare-text { font-family: var(--title-font); font-size: clamp(8rem, 20vw, 15rem); color: var(--horror-accent); text-shadow: 0 0 20px #fff, 0 0 40px var(--horror-accent); animation: jumpscare-text-flash 0.9s ease-out forwards; text-align: center; will-change: transform, opacity; }
    .jumpscare-glitch-effect { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--background-body); animation: jumpscare-glitch-anim 0.4s steps(2, start) forwards; }
    .vignette { position: absolute; top: 0; left: 0; right: 0; bottom: 0; box-shadow: inset 0 0 150px rgba(0,0,0,0.8); pointer-events: none; transition: box-shadow 1.5s ease-in-out; z-index: 1; }
    .vignette.low-sanity { box-shadow: inset 0 0 200px rgba(0,0,0,1), inset 0 0 80px var(--horror-accent); }
    .film-grain-overlay, .scan-lines-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 2; overflow: hidden; }
    .film-grain-overlay::after { content: ""; position: absolute; width: 200%; height: 200%; top: -50%; left: -50%; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAD///8/Pz8/Pz9DQ0N0I/yPAAAABHRSTlMAAAAAAIh0kDMAAAAdSURBVDjLY2CgDmBggkQwUggQBREbmdEJAK4QAlCrIu2sAAAAAElFTkSuQmCC'); animation: grain 1.5s steps(4) infinite; opacity: 0.1; }
    .scan-lines-overlay::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.2) 50%), linear-gradient(90deg, rgba(255,255,255,0.05), rgba(0,0,0,0.02), rgba(255,255,255,0.05)); background-size: 100% 4px, 3px 100%; animation: scanlines 20s linear infinite; opacity: 0.2; }
    
    /* REDESIGNED START SCREEN */
    .start-screen-container { position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: space-between; text-align: center; color: var(--primary-text-color); z-index: 10; padding: 4rem; box-sizing: border-box; }
    .start-screen-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; filter: brightness(0.4) blur(3px); animation: ken-burns 40s ease-in-out infinite alternate; z-index: -2; }
    .start-screen-vignette { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(ellipse at center, transparent 40%, #121212 90%); pointer-events: none; z-index: -1; }
    .start-screen-title-container { animation: fadeIn 2s ease-out; }
    .start-screen-title { font-family: var(--title-font); font-size: clamp(2.5rem, 5vw, 3rem); font-weight: 700; margin: 0; text-shadow: 0 0 15px rgba(var(--accent-color-rgb), 0.5); letter-spacing: 4px; text-transform: uppercase; }
    .start-screen-menu-container { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.5rem; animation: fadeIn 2s ease-out 0.5s both; }
    .start-screen-menu-item { background: none; border: none; color: var(--secondary-text-color); font-family: var(--title-font); font-size: 1.5rem; font-weight: bold; cursor: pointer; transition: color 0.3s ease, transform 0.3s ease; position: relative; padding: 0.5rem 0; text-transform: uppercase; letter-spacing: 2px; }
    .start-screen-menu-item:not(:disabled):hover { color: var(--primary-text-color); transform: scale(1.05); }
    .start-screen-menu-item:disabled { color: #555; cursor: not-allowed; }
    .start-screen-menu-item::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background-color: var(--accent-color); transition: width 0.3s ease; }
    .start-screen-menu-item:not(:disabled):hover::after { animation: underline-anim 0.3s forwards; }

    /* In-Game UI */
    .dialogue-wrapper { position: absolute; bottom: 0; left: 0; right: 0; height: 100%; display: grid; grid-template-columns: 1fr clamp(450px, 60vw, 900px) 1fr; align-items: end; gap: 2rem; padding: 0 2rem 1rem 2rem; box-sizing: border-box; z-index: 10; transition: opacity 0.5s, transform 0.5s; pointer-events: none; }
    .dialogue-wrapper.hidden { opacity: 0; transform: translateY(20px); }
    .character-sprite { max-height: 80vh; max-width: 100%; object-fit: contain; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.8)) brightness(0.7); transition: all 0.5s ease; pointer-events: auto; }
    .character-sprite.player { justify-self: end; grid-column: 1; }
    .character-sprite.npc { justify-self: start; grid-column: 3; }
    .character-sprite.active { filter: drop-shadow(0 10px 20px rgba(0,0,0,1)) brightness(1); transform: scale(1.05); }
    .story-container { background: linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.85) 60%, transparent 100%); padding: 1.5rem 2rem; width: 100%; grid-column: 2; pointer-events: auto; text-align: left; border: none; border-top: 2px solid var(--accent-color); box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.3), 0 -2px 15px rgba(var(--accent-color-rgb), 0.3); }
    .speaker-name { font-family: var(--title-font); font-size: 1.3rem; margin: 0 0 0.75rem 0; color: var(--accent-color); font-weight: 700; text-shadow: 0 0 10px var(--accent-color); text-align: left; }
    .story-text { font-family: var(--body-font); font-size: 1.2rem; line-height: 1.7; margin: 0; color: var(--primary-text-color); min-height: 90px; text-shadow: 0 2px 5px rgba(0,0,0,0.8); max-width: 70ch; text-align: left; }
    .text-effect-red { color: #ff5252; font-weight: bold; text-shadow: 0 0 8px #ff5252; }
    .text-effect-shake { display: inline-block; animation: text-shake-anim 0.3s linear infinite; }
    .text-effect-whisper { opacity: 0.8; font-style: italic; color: #b0c4de; }
    .text-effect-shock { display: inline-block; animation: shock-anim 0.3s ease-out; font-weight: bold; color: #fff; }
    .text-effect-anger { color: var(--horror-accent); font-weight: bold; text-shadow: 0 0 8px var(--horror-accent); display: inline-block; animation: shake-subtle 0.4s linear infinite; }
    .text-effect-fear { display: inline-block; animation: text-shake-anim 0.4s linear infinite; color: var(--scifi-accent); font-style: italic; }
    .text-effect-tremble { display: inline-block; animation: text-shake-anim 0.8s linear infinite; opacity: 0.8; }
    .cursor { display: inline-block; width: 2px; height: 1.2rem; background-color: var(--primary-text-color); animation: blink 1s step-end infinite; vertical-align: bottom; }
    
    .continue-indicator { position: absolute; bottom: 0.5rem; left: 50%; transform: translateX(-50%); color: var(--primary-text-color); animation: continue-pulse 1.5s ease-in-out infinite; }
    .continue-click-area { position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 19; cursor: pointer; }
    
    /* Choices Modal */
    .choices-modal { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); backdrop-filter: blur(10px); display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 20; padding: 1rem; box-sizing: border-box; transition: opacity 0.4s ease; animation: fadeIn 0.4s ease; }
    .choices-modal.fade-out { opacity: 0; }
    .choices-container { display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 700px; align-items: center; }
    .choice-button, .restart-button { background: rgba(18, 18, 18, 0.8); backdrop-filter: blur(8px); color: var(--primary-text-color); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 6px; padding: 1.2rem 1.5rem; font-size: 1.2rem; font-family: var(--title-font); cursor: pointer; transition: all 0.2s ease-in-out; width: 100%; max-width: 500px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4); opacity: 0; animation: fadeIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; position: relative; overflow: hidden; text-align: center; }
    .choice-button:nth-child(2) { animation-delay: 0.07s; }
    .choice-button:nth-child(3) { animation-delay: 0.14s; }
    .choice-button:nth-child(4) { animation-delay: 0.21s; }
    .choice-button:hover, .restart-button:hover { background: rgba(var(--accent-color-rgb), 0.1); border-color: var(--accent-color); color: #fff; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.5), 0 0 15px rgba(var(--accent-color-rgb), 0.4); }
    .choice-timer-bar { position: absolute; bottom: 0; left: 0; height: 4px; background: var(--accent-color); box-shadow: 0 0 8px var(--accent-color); animation-name: timer-bar-deplete; animation-timing-function: linear; animation-fill-mode: forwards; }
        
    /* Control Bar & HUD */
    .control-bar { position: absolute; top: 1.5rem; left: 1.5rem; right: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; z-index: 20; pointer-events: none; }
    .control-bar.theme-horror .icon, .control-bar.theme-horror svg { color: var(--horror-accent); }
    .control-bar.theme-scifi .icon, .control-bar.theme-scifi svg { color: var(--scifi-accent); }
    .control-bar.theme-fantasy .icon, .control-bar.theme-fantasy svg { color: var(--fantasy-accent); }
    
    .control-bar-section { display: flex; pointer-events: auto; }
    .control-bar-section:first-child { align-items: center; gap: 1rem; }
    .control-bar-section:last-child { flex-direction: column; align-items: flex-end; gap: 0.75rem; }

    .hud-stats-container {
      display: flex;
      gap: 0.75rem;
      align-items: flex-start;
    }

    .stat-circle-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      filter: drop-shadow(0 3px 8px rgba(0,0,0,0.7));
    }

    .stat-circle-display {
      position: relative;
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-circle-svg {
      position: absolute;
      top: 0;
      left: 0;
      transform: rotate(-90deg); /* Start from the top */
    }

    .stat-circle-bg {
      stroke: rgba(0, 0, 0, 0.4);
      stroke-linecap: round;
    }

    .stat-circle-progress {
      stroke: var(--accent-color);
      stroke-linecap: round;
      transition: stroke-dashoffset 0.5s ease-out;
      filter: drop-shadow(0 0 3px var(--accent-color));
    }

    .stat-circle-icon {
      z-index: 1;
      color: #f0f0f0;
    }

    .stat-circle-value {
      font-family: var(--title-font);
      font-size: 0.85rem;
      font-weight: bold;
      color: var(--primary-text-color);
      text-shadow: 0 2px 4px rgba(0,0,0,0.9);
    }

    .stat-circle-display.low-sanity-pulse .stat-circle-progress,
    .stat-circle-display.low-sanity-pulse .stat-circle-icon {
      color: var(--horror-accent);
      stroke: var(--horror-accent);
      animation: heartbeat 1.5s ease-in-out infinite;
    }

    .game-action-button { background: rgba(18, 18, 18, 0.7); backdrop-filter: blur(5px); border: var(--border-ui); color: var(--secondary-text-color); border-radius: 50%; width: 44px; height: 44px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; position: relative; box-shadow: 0 3px 10px rgba(0,0,0,0.3); }
    .game-action-button:hover { color: var(--background-body); transform: scale(1.1); background: var(--accent-color); border-color: var(--accent-color); }
    .game-action-button:hover svg { color: var(--background-body); }
    
    .game-action-button span { position: absolute; bottom: -2px; right: -2px; background-color: var(--accent-color); color: var(--background-body); border-radius: 50%; font-size: 0.7rem; font-weight: bold; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; border: 2px solid var(--background-ui-solid); }
    
    .game-action-button svg { width: 22px; height: 22px; transition: color 0.3s ease; }

    /* Stat Change Indicator */
    .stat-change-container { position: absolute; top: 80px; left: 2rem; z-index: 50; pointer-events: none; display: flex; flex-direction: column; gap: 0.5rem; }
    .stat-change-indicator { display: flex; align-items: center; gap: 0.5rem; background-color: rgba(20, 20, 20, 0.9); padding: 0.4rem 0.8rem; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.1); font-family: var(--title-font); font-size: 1rem; text-shadow: none; box-shadow: 0 3px 10px rgba(0,0,0,0.5); animation: stat-change-anim 2.5s ease-out forwards; }
    .stat-change-indicator.increase { color: #81c784; }
    .stat-change-indicator.decrease { color: #e57373; }
    .stat-change-indicator span { font-weight: bold; }

    /* Universal Modals */
    .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.7); backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 30; animation: fadeIn 0.3s ease; }
    .modal-panel { background: var(--background-ui-solid); border: var(--border-ui); border-radius: 8px; padding: 2rem; width: 100%; max-width: 500px; box-shadow: 0 10px 40px rgba(0,0,0,0.8); color: var(--primary-text-color); }
    .modal-panel h2 { font-family: var(--title-font); text-align: center; margin-top: 0; margin-bottom: 2rem; color: var(--accent-color); text-shadow: 0 0 5px var(--accent-color); }
    .modal-actions { display: flex; gap: 1rem; margin-top: 2rem; }
    .modal-button { flex: 1; background: #333; color: white; border: 1px solid #555; padding: 0.8rem; border-radius: 4px; font-size: 1rem; font-family: var(--title-font); cursor: pointer; transition: all 0.2s ease-in-out; }
    .modal-button.primary { background-color: rgba(77, 208, 225, 0.2); border-color: var(--accent-color); }
    .modal-button:hover { background-color: #444; }
    .modal-button.primary:hover { background-color: var(--accent-color); color: var(--background-body); }
    .volume-control { margin-bottom: 1.5rem; }
    .volume-control label { display: block; margin-bottom: 0.5rem; font-family: var(--body-font); font-size: 1rem; }
    .settings-toggle { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    input[type="range"] { -webkit-appearance: none; width: 100%; height: 6px; background: rgba(0,0,0,0.5); border-radius: 5px; outline: none; transition: background 0.2s; }
    input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; background: var(--accent-color); cursor: pointer; border-radius: 50%; border: 2px solid #fff; }
    .inventory-modal-list, .journal-entry-list { list-style: none; padding: 0; margin: 0; max-height: 60vh; overflow-y: auto; }
    .inventory-item, .journal-entry { margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .inventory-item:last-child, .journal-entry:last-child { border-bottom: none; }
    .item-name, .journal-title { font-family: var(--title-font); font-size: 1.2rem; color: var(--accent-color); margin: 0 0 0.25rem 0; }
    .item-desc, .journal-content { font-family: var(--body-font); font-size: 1rem; color: var(--secondary-text-color); margin: 0; white-space: pre-wrap; }
    .journal-tabs { display: flex; border-bottom: var(--border-ui); margin-bottom: 1.5rem; }
    .journal-tab { background: none; border: none; color: var(--secondary-text-color); padding: 0.8rem 1.2rem; cursor: pointer; font-family: var(--title-font); font-size: 1rem; }
    .journal-tab.active { color: var(--accent-color); border-bottom: 2px solid var(--accent-color); }
    
    /* Other Screens */
    .menu-button { background: transparent; color: var(--primary-text-color); border: 2px solid var(--accent-color); padding: 0.8rem 2rem; font-size: 1.1rem; font-family: var(--title-font); cursor: pointer; transition: all 0.3s ease; }
    .menu-button.primary { background: rgba(var(--accent-color-rgb), 0.2); }
    .menu-button:hover { background: var(--accent-color); color: var(--background-body); transform: scale(1.05); }
    .back-button { margin-top: 2rem; }
    
    .selection-screen-container { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; text-align: center; animation: fadeIn 1s; padding: 3rem 2rem; box-sizing: border-box; }
    .selection-screen-header { margin-bottom: 2.5rem; }
    .selection-screen-title { font-family: var(--title-font); font-size: clamp(2rem, 5vw, 2.5rem); color: #eee; text-shadow: 0 0 10px var(--accent-color); margin: 0; }
    .selection-screen-subtitle { font-family: var(--body-font); font-style: italic; font-size: 1.2rem; color: var(--secondary-text-color); margin-top: 0.5rem; }

    .story-card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 2rem; width: 100%; max-width: 1400px; max-height: calc(100vh - 250px); overflow-y: auto; padding: 0 1rem; -ms-overflow-style: none; scrollbar-width: none; }
    .story-card-grid::-webkit-scrollbar { display: none; }
    .story-card { position: relative; aspect-ratio: 16 / 9; border-radius: 8px; overflow: hidden; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease; border: 2px solid transparent; }
    .story-card-thumbnail { width: 100%; height: 100%; background-size: cover; background-position: center; transition: transform 0.4s ease; }
    .story-card-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%); padding: 1.5rem; }
    .story-card-title { font-family: var(--title-font); color: var(--primary-text-color); font-size: 1.6rem; margin: 0 0 0.5rem 0; text-shadow: 0 2px 5px #000; }
    .story-card-description { font-family: var(--body-font); font-size: 1rem; line-height: 1.5; color: var(--secondary-text-color); }
    .story-card:hover { transform: scale(1.03); box-shadow: 0 10px 30px rgba(0,0,0,0.7); }
    .story-card.theme-horror:hover { border-color: var(--horror-accent); }
    .story-card.theme-scifi:hover { border-color: var(--scifi-accent); }
    .story-card.theme-fantasy:hover { border-color: var(--fantasy-accent); }
    .story-card:hover .story-card-thumbnail { transform: scale(1.05); }

    .chapter-list { display: flex; flex-direction: column; gap: 1.5rem; width: 100%; max-width: 900px; max-height: calc(100vh - 280px); overflow-y: auto; padding: 0 1rem; }
    .chapter-item { background: var(--background-ui); border-left: 4px solid var(--accent-color); padding: 1.5rem 2rem; text-align: left; transition: all 0.3s ease; cursor: pointer; }
    .chapter-item:not(.disabled):hover { background: var(--background-ui-solid); transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.5); }
    .chapter-item.disabled { filter: grayscale(0.8); opacity: 0.5; cursor: not-allowed; }
    .chapter-item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
    .chapter-item-title { font-family: var(--title-font); color: var(--primary-text-color); font-size: 1.5rem; margin: 0; }
    .chapter-item-flavor-text { font-family: var(--body-font); font-style: italic; color: var(--secondary-text-color); margin: 0 0 1rem 0; line-height: 1.6; }
    .chapter-item-cta { font-family: var(--title-font); font-weight: bold; color: var(--accent-color); transition: color 0.3s ease; }
    .chapter-item:not(.disabled):hover .chapter-item-cta { color: #fff; }

    .death-screen h2 { font-family: var(--title-font); font-size: 4rem; color: var(--horror-accent); text-shadow: 0 0 15px var(--horror-accent); }
    .autosave-indicator { position: fixed; bottom: 100px; right: 20px; background-color: var(--background-ui); padding: 0.5rem 1rem; border-radius: 4px; border: var(--border-ui); color: var(--secondary-text-color); font-family: var(--title-font); z-index: 40; animation: autosave-anim 3s ease-in-out forwards; }
    
    /* Caution Screen */
    .caution-screen { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #000; display: flex; justify-content: center; align-items: center; z-index: 100; animation: fadeIn 1s ease-in; padding: 2rem; box-sizing: border-box; }
    .caution-box { border: 2px solid var(--horror-accent); padding: 3rem; max-width: 600px; text-align: center; background: rgba(10, 10, 10, 0.5); box-shadow: 0 0 30px rgba(var(--horror-accent-rgb), 0.5); }
    .caution-title { font-family: var(--title-font); font-size: 3rem; color: var(--horror-accent); margin: 0 0 1.5rem 0; letter-spacing: 4px; text-transform: uppercase; text-shadow: 0 0 10px var(--horror-accent); }
    .caution-text { font-family: var(--body-font); font-size: 1.1rem; color: var(--primary-text-color); line-height: 1.8; margin-bottom: 1.5rem; }
    .proceed-button { background: transparent; border: 2px solid var(--primary-text-color); color: var(--primary-text-color); padding: 0.8rem 2.5rem; font-family: var(--title-font); font-size: 1.2rem; cursor: pointer; transition: all 0.3s ease; }
    .proceed-button:hover { background: var(--horror-accent); border-color: var(--horror-accent); color: #fff; }

  `}</style>
);
