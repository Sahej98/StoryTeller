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
      --accent-color: #4dd0e1; /* A magical teal */
      --accent-color-glow: rgba(77, 208, 225, 0.7);
      --accent-color-dark: rgba(77, 208, 225, 0.2);
      --disabled-color: #555;
      
      --title-font: 'Cinzel', serif;
      --body-font: 'EB Garamond', serif;

      /* Story-specific overrides */
      --horror-accent: #b71c1c;
      --scifi-accent: #0277bd;
      --fantasy-accent: #6a1b9a;
    }
    
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

    /* Base Styles */
    .game-viewport { position: relative; width: 100vw; height: 100vh; background-size: cover; background-position: center; display: flex; justify-content: center; align-items: center; padding: 1rem; box-sizing: border-box; overflow: hidden; background-color: var(--background-body); }
    .game-viewport.screen-shake { animation: screenShake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
    .game-viewport.low-sanity { filter: saturate(0.7) contrast(1.2); animation: shake-subtle 3s ease-in-out both infinite; }
    .game-viewport.effect-rumble { animation: rumble-anim 0.4s ease-in-out both; }
    
    /* Background */
    .background-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; opacity: 0; transition: opacity 1.5s ease-in-out; z-index: 0; }
    .background-layer.active { opacity: 1; }

    /* Overlays */
    .jumpscare-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #000; display: flex; justify-content: center; align-items: center; z-index: 999; animation: fadeIn 0.1s, fadeOut 0.2s 0.6s forwards; }
    .jumpscare-sprite { transform: scale(2.5); animation: fadeIn 0.1s; filter: drop-shadow(0 0 30px rgba(255,0,0,0.8)); }
    .vignette { position: absolute; top: 0; left: 0; right: 0; bottom: 0; box-shadow: inset 0 0 150px rgba(0,0,0,0.8); pointer-events: none; transition: box-shadow 1.5s ease-in-out; z-index: 1; }
    .vignette.low-sanity { box-shadow: inset 0 0 200px rgba(0,0,0,1), inset 0 0 80px var(--horror-accent); }
    .film-grain-overlay, .scan-lines-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 2; overflow: hidden; }
    .film-grain-overlay::after { content: ""; position: absolute; width: 200%; height: 200%; top: -50%; left: -50%; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAD///8/Pz8/Pz9DQ0N0I/yPAAAABHRSTlMAAAAAAIh0kDMAAAAdSURBVDjLY2CgDmBggkQwUggQBREbmdEJAK4QAlCrIu2sAAAAAElFTkSuQmCC'); animation: grain 1.5s steps(4) infinite; opacity: 0.1; }
    .scan-lines-overlay::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.2) 50%), linear-gradient(90deg, rgba(255,255,255,0.05), rgba(0,0,0,0.02), rgba(255,255,255,0.05)); background-size: 100% 4px, 3px 100%; animation: scanlines 20s linear infinite; opacity: 0.2; }
    
    /* Start Screen */
    .start-screen-container { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--primary-text-color); z-index: 10; animation: fadeIn 2s ease-out; }
    .start-screen-content { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; }
    .storyteller-logo .sparkle-1 { animation: sparkle-anim 2s ease-in-out infinite; animation-delay: 0.5s; }
    .storyteller-logo .sparkle-2 { animation: sparkle-anim 2s ease-in-out infinite; }
    .start-screen-title { font-family: var(--title-font); font-size: clamp(3rem, 6vw, 4rem); margin: 0; text-shadow: 0 0 15px var(--accent-color-glow); letter-spacing: 2px; }
    .start-screen-tagline { font-family: var(--body-font); font-style: italic; font-size: 1.2rem; color: var(--secondary-text-color); margin-top: -0.5rem; margin-bottom: 2rem; }
    .start-screen-buttons { display: flex; gap: 1rem; }
    .menu-button { background: transparent; color: var(--primary-text-color); border: 2px solid var(--accent-color); padding: 0.8rem 2rem; font-size: 1.1rem; font-family: var(--title-font); cursor: pointer; transition: all 0.3s ease; }
    .menu-button.primary { background: var(--accent-color-dark); }
    .menu-button:hover { background: var(--accent-color); color: var(--background-body); transform: scale(1.05); }
    .start-screen-vignette { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(ellipse at center, transparent 40%, #121212 90%); pointer-events: none; }
    
    /* In-Game UI */
    .dialogue-wrapper { position: absolute; bottom: 0; left: 0; right: 0; height: 100%; display: grid; grid-template-columns: 1fr clamp(450px, 50vw, 800px) 1fr; align-items: end; gap: 2rem; padding: 0 2rem 3rem 2rem; box-sizing: border-box; z-index: 10; transition: opacity 0.5s, transform 0.5s; pointer-events: none; }
    .dialogue-wrapper.hidden { opacity: 0; transform: translateY(20px); }
    .character-sprite { max-height: 80vh; max-width: 100%; object-fit: contain; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.8)) brightness(0.7); transition: all 0.5s ease; pointer-events: auto; }
    .character-sprite.player { justify-self: end; grid-column: 1; }
    .character-sprite.npc { justify-self: start; grid-column: 3; }
    .character-sprite.active { filter: drop-shadow(0 10px 20px rgba(0,0,0,1)) brightness(1); transform: scale(1.05); }
    .story-container { position: relative; background: linear-gradient(to top, rgba(30, 30, 30, 0.95) 60%, rgba(30, 30, 30, 0.7)); border-radius: 4px; box-shadow: 0 8px 32px rgba(0,0,0,0.6); padding: 1.5rem 2rem; width: 100%; backdrop-filter: blur(5px); border: var(--border-ui); grid-column: 2; border-bottom: 3px solid var(--accent-color); pointer-events: auto; }
    .story-container.theme-horror { border-bottom-color: var(--horror-accent); }
    .story-container.theme-scifi { border-bottom-color: var(--scifi-accent); }
    .story-container.theme-fantasy { border-bottom-color: var(--fantasy-accent); }
    
    .speaker-name { font-family: var(--title-font); font-size: 1.3rem; margin: 0 0 0.5rem 0; color: var(--accent-color); font-weight: 700; }
    .story-container.theme-horror .speaker-name { color: var(--horror-accent); }
    .story-container.theme-scifi .speaker-name { color: var(--scifi-accent); }
    .story-container.theme-fantasy .speaker-name { color: var(--fantasy-accent); }

    .story-text { font-family: var(--body-font); font-size: clamp(1.2rem, 2vw, 1.3rem); line-height: 1.6; margin: 0; color: var(--primary-text-color); min-height: 80px; text-shadow: 0 1px 3px rgba(0,0,0,0.7); }
    .text-effect-red { color: #ff5252; font-weight: bold; text-shadow: 0 0 8px #ff5252; }
    .text-effect-shake { display: inline-block; animation: text-shake-anim 0.3s linear infinite; }
    .text-effect-whisper { opacity: 0.8; font-style: italic; color: #b0c4de; }
    .text-effect-shock { display: inline-block; animation: shock-anim 0.3s ease-out; font-weight: bold; color: #fff; }
    .text-effect-anger { color: var(--horror-accent); font-weight: bold; text-shadow: 0 0 8px var(--horror-accent); display: inline-block; animation: shake-subtle 0.4s linear infinite; }
    .text-effect-fear { display: inline-block; animation: text-shake-anim 0.4s linear infinite; color: var(--scifi-accent); font-style: italic; }
    .text-effect-tremble { display: inline-block; animation: text-shake-anim 0.8s linear infinite; opacity: 0.8; }

    .cursor { display: inline-block; width: 2px; height: 1.3rem; background-color: var(--primary-text-color); animation: blink 1s step-end infinite; vertical-align: bottom; }
    
    /* Choices Modal */
    .choices-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.7); backdrop-filter: blur(8px); display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 20; padding: 1rem; box-sizing: border-box; transition: opacity 0.4s ease; animation: fadeIn 0.4s ease; }
    .choices-modal.fade-out { opacity: 0; }
    .choices-container { display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 600px; }
    .choice-button, .restart-button { background: var(--background-ui); color: var(--primary-text-color); border: var(--border-ui); border-left: 3px solid var(--accent-color); padding: 1.2rem; font-size: 1.1rem; font-family: var(--body-font); cursor: pointer; transition: all 0.2s ease-in-out; width: 100%; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4); opacity: 0; animation: fadeIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; position: relative; overflow: hidden; text-align: left; }
    .choice-button:nth-child(2) { animation-delay: 0.07s; }
    .choice-button:nth-child(3) { animation-delay: 0.14s; }
    .choice-button:nth-child(4) { animation-delay: 0.21s; }
    .choice-button:hover, .restart-button:hover { background: var(--background-ui-solid); border-color: var(--accent-color); }
    .choice-timer-bar { position: absolute; bottom: 0; left: 0; height: 3px; background: var(--accent-color); box-shadow: 0 0 8px var(--accent-color-glow); animation-name: timer-bar-deplete; animation-timing-function: linear; animation-fill-mode: forwards; }
    
    /* Choice Themes */
    .choices-modal.theme-horror .choice-button { border-left-color: var(--horror-accent); }
    .choices-modal.theme-horror .choice-button:hover { border-color: var(--horror-accent); }
    .choices-modal.theme-horror .choice-timer-bar { background-color: var(--horror-accent); box-shadow: 0 0 8px var(--horror-accent); }
    .choices-modal.theme-scifi .choice-button { border-left-color: var(--scifi-accent); }
    .choices-modal.theme-scifi .choice-button:hover { border-color: var(--scifi-accent); }
    .choices-modal.theme-scifi .choice-timer-bar { background-color: var(--scifi-accent); box-shadow: 0 0 8px var(--scifi-accent); }
    .choices-modal.theme-fantasy .choice-button { border-left-color: var(--fantasy-accent); }
    .choices-modal.theme-fantasy .choice-button:hover { border-color: var(--fantasy-accent); }
    .choices-modal.theme-fantasy .choice-timer-bar { background-color: var(--fantasy-accent); box-shadow: 0 0 8px var(--fantasy-accent); }
    
    /* Control Bar & HUD */
    .control-bar { position: absolute; top: 0; left: 0; right: 0; height: 70px; background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent); display: flex; justify-content: space-between; align-items: center; padding: 0 2rem; z-index: 15; }
    .control-bar-section { display: flex; align-items: center; gap: 1rem; }
    .hud-stats { display: flex; gap: 1.5rem; background: var(--background-ui); padding: 0.5rem 1rem; border-radius: 4px; border: var(--border-ui); }
    .stat-display { display: flex; align-items: center; gap: 0.5rem; font-family: var(--title-font); font-size: 1.1rem; color: var(--secondary-text-color); }
    .stat-display .icon { color: var(--accent-color); }
    .stat-display .icon.low-sanity-pulse { color: var(--horror-accent); animation: heartbeat 1.5s ease-in-out infinite; }
    .game-action-button { background: transparent; border: none; color: #a0a0a0; padding: 0.5rem; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; gap: 0.5rem; font-family: var(--title-font); font-size: 1rem; }
    .game-action-button:hover { color: #fff; transform: scale(1.1); }
    .game-action-button.save-btn:hover { color: var(--accent-color); }
    .game-action-button svg { width: 24px; height: 24px; }

    /* Universal Modals */
    .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.7); backdrop-filter: blur(8px); display: flex; justify-content: center; align-items: center; z-index: 30; animation: fadeIn 0.3s ease; }
    .modal-panel { background: var(--background-ui-solid); border: var(--border-ui); border-radius: 8px; padding: 2rem; width: 100%; max-width: 500px; box-shadow: 0 10px 40px rgba(0,0,0,0.8); color: var(--primary-text-color); }
    .modal-panel h2 { font-family: var(--title-font); text-align: center; margin-top: 0; margin-bottom: 2rem; color: var(--accent-color); text-shadow: 0 0 5px var(--accent-color-glow); }
    .modal-actions { display: flex; gap: 1rem; margin-top: 2rem; }
    .modal-button { flex: 1; background: #333; color: white; border: 1px solid #555; padding: 0.8rem; border-radius: 4px; font-size: 1rem; font-family: var(--title-font); cursor: pointer; transition: all 0.2s ease-in-out; }
    .modal-button.primary { background-color: var(--accent-color-dark); border-color: var(--accent-color); }
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
    .menu-screen-container { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; animation: fadeIn 1s; padding: 3rem 2rem; box-sizing: border-box; }
    .menu-title { font-family: var(--title-font); font-size: clamp(2rem, 5vw, 2.5rem); color: #eee; text-shadow: 0 0 10px var(--accent-color-glow); margin-bottom: 2rem; }
    .card-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
      gap: 1.5rem; 
      width: 100%; 
      max-width: 1200px;
      max-height: calc(100vh - 250px);
      overflow-y: auto;
      padding-right: 1rem;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .card-grid::-webkit-scrollbar {
      display: none;
    }
    .menu-card { display: flex; flex-direction: column; background: var(--background-ui); border: var(--border-ui); border-left: 4px solid var(--accent-color); color: var(--secondary-text-color); padding: 1.5rem; text-align: left; transition: all 0.3s ease; cursor: pointer; }
    .menu-card:not(.disabled):hover { background: var(--background-ui-solid); border-left-color: var(--accent-color); transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
    .menu-card.disabled { filter: grayscale(1); opacity: 0.6; cursor: not-allowed; }
    .card-title { font-family: var(--title-font); color: var(--primary-text-color); font-size: 1.4rem; margin: 0; }
    .card-description { flex-grow: 1; font-size: 1rem; line-height: 1.6; margin: 0.5rem 0 1rem 0; color: var(--secondary-text-color); }
    .card-cta { font-family: var(--title-font); color: var(--accent-color); font-weight: bold; margin-top: auto; align-self: flex-end; }
    .back-button { margin-top: 2rem; }
    .death-screen h2 { font-family: var(--title-font); font-size: 4rem; color: var(--horror-accent); text-shadow: 0 0 15px var(--horror-accent); }
    
    .autosave-indicator { position: fixed; bottom: 100px; right: 20px; background-color: var(--background-ui); padding: 0.5rem 1rem; border-radius: 4px; border: var(--border-ui); color: var(--secondary-text-color); font-family: var(--title-font); z-index: 40; animation: autosave-anim 3s ease-in-out forwards; }
  `}</style>
);
