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

    --title-font: 'Cinzel Decorative', serif;
    --body-font: 'Source Serif Pro', serif;

    /* Game & Story Theme Colors */
    --horror-accent: #b71c1c;
    --horror-accent-rgb: 183, 28, 28;

    --error-color: #ff5252;
    --success-color: #4caf50;

    /* Default Themed Accent Color */
    --accent-color: #FFFFFF;
    --accent-color-rgb: 255, 255, 255;
}

/* Scrollbar Hiding */
textarea, .inventory-modal-list, .journal-entry-list, .sidebar-content, .node-list, .editor-main, .settings-modal-content, .book-page, .story-carousel-container, .user-management-content {
    /* For Firefox */
    scrollbar-width: none;
    /* For IE, Edge */
    -ms-overflow-style: none;
}

textarea::-webkit-scrollbar, .inventory-modal-list::-webkit-scrollbar, .journal-entry-list::-webkit-scrollbar, .sidebar-content::-webkit-scrollbar, .node-list::-webkit-scrollbar, .editor-main::-webkit-scrollbar, .settings-modal-content::-webkit-scrollbar, .book-page::-webkit-scrollbar, .story-carousel-container::-webkit-scrollbar, .user-management-content::-webkit-scrollbar {
    display: none;
    /* For Chrome, Safari, and Opera */
}

/* Keyframes */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@keyframes slideUpIn {
    from {
        transform: translateY(50px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideDownOut {
    from {
        transform: translateY(0);
        opacity: 1;
    }

    to {
        transform: translateY(50px);
        opacity: 0;
    }
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}

@keyframes grain-anim {
    0%, 100% {
        transform: translate(0, 0);
    }

    10% {
        transform: translate(-5%, -10%);
    }

    20% {
        transform: translate(-15%, 5%);
    }

    30% {
        transform: translate(7%, -25%);
    }

    40% {
        transform: translate(-5%, 25%);
    }

    50% {
        transform: translate(-15%, 10%);
    }

    60% {
        transform: translate(15%, 0%);
    }

    70% {
        transform: translate(0%, 15%);
    }

    80% {
        transform: translate(3%, 35%);
    }

    90% {
        transform: translate(-10%, 10%);
    }
}

/* Text Effects Keyframes */
@keyframes rainbow-text {
    0% {
        color: #ff0000;
    }

    20% {
        color: #ffff00;
    }

    40% {
        color: #00ff00;
    }

    60% {
        color: #00ffff;
    }

    80% {
        color: #0000ff;
    }

    100% {
        color: #ff00ff;
    }
}

@keyframes fire-glow {
    0%, 100% {
        text-shadow: 0 0 5px #ff4500, 0 0 10px #ff4500;
        color: #ff8c00;
    }

    50% {
        text-shadow: 0 0 20px #ff0000, 0 0 30px #ff4500;
        color: #ff0000;
    }
}

@keyframes glitch-shake {
    0% {
        transform: translate(0);
    }

    20% {
        transform: translate(-2px, 1px);
    }

    40% {
        transform: translate(-2px, -1px);
    }

    60% {
        transform: translate(2px, 1px);
    }

    80% {
        transform: translate(2px, -1px);
    }

    100% {
        transform: translate(0);
    }
}

@keyframes ghostly-fade {
    0%, 100% {
        opacity: 0.4;
        transform: translateY(0);
    }

    50% {
        opacity: 0.8;
        transform: translateY(-2px);
    }
}

@keyframes gold-shine {
    0% {
        color: #ffd700;
        text-shadow: 0 0 2px #fff;
    }

    50% {
        color: #fff;
        text-shadow: 0 0 15px #ffd700;
    }

    100% {
        color: #ffd700;
        text-shadow: 0 0 2px #fff;
    }
}

@keyframes screenShake {
    0%, 100% {
        transform: translate(0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
        transform: translate(-8px, 4px) rotate(-1deg);
    }

    20%, 40%, 60%, 80% {
        transform: translate(4px, -6px) rotate(1deg);
    }
}

@keyframes shake-subtle {
    0%, 100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-1px) translateY(1px);
    }

    50% {
        transform: translateX(1px) translateY(-1px);
    }

    75% {
        transform: translateX(-1px) translateY(-1px);
    }
}

@keyframes timer-bar-deplete {
    from {
        width: 100%;
    }

    to {
        width: 0%;
    }
}

@keyframes heartbeat {
    0% {
        transform: scale(1);
        filter: drop-shadow(0 0 5px var(--horror-accent));
    }

    50% {
        transform: scale(1.1);
        filter: drop-shadow(0 0 15px var(--horror-accent));
    }

    100% {
        transform: scale(1);
        filter: drop-shadow(0 0 5px var(--horror-accent));
    }
}

@keyframes text-shake-anim {
    0%, 100% {
        transform: translate(0, 0) rotate(0);
    }

    25% {
        transform: translate(1px, -1px) rotate(-0.2deg);
    }

    50% {
        transform: translate(-1px, 1px) rotate(0.2deg);
    }

    75% {
        transform: translate(1px, 1px) rotate(-0.2deg);
    }
}

@keyframes sparkle-anim {
    0%, 100% {
        opacity: 0.8;
        transform: scale(1);
    }

    50% {
        opacity: 1;
        transform: scale(1.3);
    }
}

@keyframes autosave-anim {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    20% {
        opacity: 1;
        transform: translateY(0);
    }

    80% {
        opacity: 1;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(-10px);
    }
}

@keyframes shock-anim {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.4) rotate(4deg);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes rumble-anim {
    0%, 100% {
        transform: translate(0, 0);
    }

    25% {
        transform: translate(-3px, 2px);
    }

    50% {
        transform: translate(3px, -2px);
    }

    75% {
        transform: translate(-2px, -3px);
    }
}

@keyframes continue-pulse {
    0%, 100% {
        transform: translateY(0);
        opacity: 0.7;
    }

    50% {
        transform: translateY(3px);
        opacity: 1;
    }
}

@keyframes stat-update-glow {
    50% {
        filter: drop-shadow(0 0 12px var(--accent-color));
    }
}

@keyframes stat-update-scale {
    50% {
        transform: scale(1.15);
    }
}

@keyframes jumpscare-zoom-shake {
    0% {
        transform: scale(1.5) translate(0, 0) rotate(0);
        opacity: 0;
    }

    5% {
        transform: scale(3) translate(-10px, 8px) rotate(-3deg);
        opacity: 1;
    }

    10% {
        transform: scale(3.1) translate(8px, -10px) rotate(2deg);
    }

    15% {
        transform: scale(3.2) translate(-5px, 5px) rotate(-1deg);
    }

    20% {
        transform: scale(3.3) translate(5px, -5px) rotate(1deg);
    }

    80% {
        transform: scale(4.5);
        opacity: 1;
    }

    100% {
        transform: scale(5);
        opacity: 0;
    }
}

@keyframes jumpscare-text-flash {
    0% {
        opacity: 0;
        transform: scale(1.2);
    }

    5% {
        opacity: 1;
        transform: scale(2) rotate(-4deg);
    }

    10% {
        opacity: 0.8;
        transform: scale(1.9) rotate(3deg);
    }

    15% {
        opacity: 1;
        transform: scale(2.1) rotate(-2deg);
    }

    80% {
        opacity: 1;
        transform: scale(2.5);
    }

    100% {
        opacity: 0;
        transform: scale(3);
    }
}

@keyframes jumpscare-glitch-anim {
    0% {
        opacity: 1;
    }

    10% {
        transform: translate(-5px, 3px);
    }

    20% {
        transform: translate(5px, -3px);
    }

    30% {
        opacity: 0.4;
    }

    40% {
        transform: translate(-8px, 6px);
        opacity: 1;
    }

    50% {
        transform: translate(8px, -6px);
    }

    60% {
        clip-path: inset(40% 0 40% 0);
    }

    70% {
        clip-path: inset(0 0 0 0);
    }

    80% {
        opacity: 0.2;
    }

    90% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes ken-burns {
    0% {
        transform: scale(1.05) translate(2%, -1%);
    }

    100% {
        transform: scale(1.15) translate(-2%, 1%);
    }
}

@keyframes title-glow {
    0%, 100% {
        text-shadow: 0 0 15px #ffab40, 0 0 30px #ffab40, 0 4px 5px #000;
    }

    50% {
        text-shadow: 0 0 20px #ffc57a, 0 0 40px #ffc57a, 0 4px 5px #000;
    }
}

@keyframes pulse-glow {
    0%, 100% {
        filter: drop-shadow(0 0 8px rgba(255, 171, 64, 0.4));
        opacity: 0.8;
    }

    50% {
        filter: drop-shadow(0 0 16px rgba(255, 171, 64, 0.8));
        opacity: 1;
    }
}

@keyframes pulse-text {
    0%, 100% {
        opacity: 0.7;
    }

    50% {
        opacity: 1;
    }
}

@keyframes death-pulse {
    0%, 100% {
        transform: scale(1);
        text-shadow: 0 0 20px #b71c1c, 0 0 40px #b71c1c;
    }

    50% {
        transform: scale(1.05);
        text-shadow: 0 0 30px #ff5252, 0 0 60px #ff5252;
    }
}

@keyframes book-open {
    from {
        transform: scale(0.8) rotateY(20deg);
        opacity: 0;
    }

    to {
        transform: scale(1) rotateY(0deg);
        opacity: 1;
    }
}

@keyframes film-grain-anim {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  20% { transform: translate(-15%, 5%); }
  30% { transform: translate(7%, -25%); }
  40% { transform: translate(-5%, 25%); }
  50% { transform: translate(-15%, 10%); }
  60% { transform: translate(15%, 0%); }
  70% { transform: translate(0%, 15%); }
  80% { transform: translate(3%, 35%); }
  90% { transform: translate(-10%, 10%); }
}

@keyframes scan-lines-anim {
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}

/* Base Styles */
.game-viewport {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    background-color: var(--background-body);
}

.game-viewport.screen-shake {
    animation: screenShake 0.4s cubic-bezier(.36, .07, .19, .97) both;
}

.game-viewport.low-sanity {
    filter: saturate(0.7) contrast(1.2);
    animation: shake-subtle 3s ease-in-out both infinite;
}

.game-viewport.effect-rumble {
    animation: rumble-anim 0.4s ease-in-out both;
}

/* Background */
.background-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.5s ease-in-out;
    z-index: 0;
}

.background-layer.active {
    opacity: 1;
}

/* Overlays */
.film-grain-overlay {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image: url('https://www.transparenttextures.com/patterns/clean-gray-paper.png');
  animation: film-grain-anim 0.4s steps(4) infinite;
  opacity: 0.15;
  pointer-events: none;
  z-index: 1000;
  will-change: transform;
}

.scan-lines-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.scan-lines-overlay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(20, 20, 20, 0) 50%,
    rgba(20, 20, 20, 0.4) 50%
  );
  background-size: 100% 4px;
  animation: scan-lines-anim 0.1s linear infinite;
  opacity: 0.4;
  will-change: transform;
}

.jumpscare-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    animation: fadeIn 0.05s;
    overflow: hidden;
}

.jumpscare-sprite {
    animation: jumpscare-zoom-shake 0.9s cubic-bezier(.36, .07, .19, .97) forwards;
    filter: drop-shadow(0 0 40px rgba(255, 0, 0, 0.9)) brightness(1.2);
    will-change: transform, opacity;
}

.jumpscare-text {
    font-family: var(--title-font);
    font-size: clamp(8rem, 20vw, 15rem);
    color: var(--horror-accent);
    text-shadow: 0 0 20px #fff, 0 0 40px var(--horror-accent);
    animation: jumpscare-text-flash 0.9s ease-out forwards;
    text-align: center;
    will-change: transform, opacity;
}

.jumpscare-glitch-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--background-body);
    animation: jumpscare-glitch-anim 0.4s steps(2, start) forwards;
}

.vignette {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.8);
    pointer-events: none;
    transition: box-shadow 1.5s ease-in-out;
    z-index: 1;
}

.vignette.low-sanity {
    box-shadow: inset 0 0 200px rgba(0, 0, 0, 1), inset 0 0 80px var(--horror-accent);
}

/* Loading Screen */
.loading-screen-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: var(--background-body);
    color: #c99e66;
    text-align: center;
}

.loading-logo {
    width: 120px;
    height: 120px;
    margin-bottom: 2rem;
    animation: pulse-glow 2.5s ease-in-out infinite;
}

.loading-title {
    font-family: var(--title-font);
    font-size: 2.5rem;
    text-shadow: 0 0 15px #ffab40;
    margin: 0 0 1.5rem 0;
}

.loading-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, transparent 20%, rgba(0, 0, 0, 0.9) 100%);
    pointer-events: none;
    z-index: 5;
}

.loading-grain {
    position: absolute;
    inset: -100%;
    background-image: url('https://www.transparenttextures.com/patterns/60-lines.png');
    opacity: 0.05;
    animation: grain-anim 1s steps(5) infinite;
    pointer-events: none;
    z-index: 6;
}

.loading-progress-outer {
    width: 340px;
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.loading-progress-label {
    display: flex;
    justify-content: space-between;
    font-family: var(--title-font);
    font-size: 0.7rem;
    letter-spacing: 2px;
    color: #b18347;
    opacity: 0.8;
}

.loading-progress-container {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid rgba(255, 171, 64, 0.1);
}

.loading-progress-bar {
    height: 100%;
    background: linear-gradient(to right, #b18347, #ffab40);
    box-shadow: 0 0 10px #ffab40;
}

.loading-text-wrapper {
    min-height: 100px;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    cursor: pointer;
    user-select: none;
}

.loading-flavor-text {
    font-family: var(--body-font);
    font-style: italic;
    color: #a38c6d;
    font-size: 1.2rem;
    margin: 0;
    transition: color 0.2s;
}

.loading-flavor-text.clickable:hover {
    color: #ffab40;
}

.loading-sys-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
}

.loading-status-text {
    font-family: monospace;
    color: #5a4a3a;
    font-size: 0.7rem;
    letter-spacing: 1px;
}

.loading-status-text.highlight {
    color: #b18347;
    opacity: 0.6;
}

/* Fullscreen Gate */
.fullscreen-gate-container {
    position: fixed;
    inset: 0;
    z-index: 2000;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(8px);
    color: var(--primary-text-color);
    padding: 2rem;
    box-sizing: border-box;
}

.fullscreen-gate-title {
    font-family: var(--title-font);
    font-size: 2.5rem;
    margin: 2rem 0 1rem;
    color: #c99e66;
    text-shadow: 0 0 10px #ffab40;
}

.fullscreen-gate-text {
    font-family: var(--body-font);
    font-size: 1.2rem;
    color: var(--secondary-text-color);
    max-width: 600px;
    line-height: 1.6;
    margin-bottom: 2rem;
}

.fullscreen-gate-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1.5rem;
}

.fullscreen-gate-instructions {
    font-family: var(--body-font);
    font-size: 0.9rem;
    color: #555;
    max-width: 400px;
    margin-top: 0;
    line-height: 1.5;
}

.fullscreen-gate-button {
    background: linear-gradient(145deg, #b18347, #8e6a39);
    border: 2px solid #c99e66;
    color: #fff;
    padding: 1rem 2rem;
    font-family: var(--title-font);
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-shadow: 1px 1px 2px #000;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.fullscreen-gate-button:hover {
    background: linear-gradient(145deg, #c99e66, #b18347);
    box-shadow: 0 0 20px #ffab40;
}

.fullscreen-gate-button.secondary {
    background: transparent;
    border-color: #5a4a3a;
    color: #a38c6d;
}

.fullscreen-gate-button.secondary:hover {
    background: rgba(199, 158, 102, 0.1);
    color: #d4c0a1;
    border-color: #8e6a39;
    box-shadow: none;
}

/* AUTH SCREEN - BOOK DESIGN */
.auth-screen-container {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    background: #0a0a0a;
    animation: fadeIn 1.5s ease-out;
    position: relative;
    /* Added to enable z-index */
    z-index: 1001;
    /* Added to ensure it's above the fullscreen gate (z-index: 1000) */
}

.auth-art-panel {
    background-image: url('/images/story_teller.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    position: relative;
}

.auth-art-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 80%, transparent 100%);
}

.auth-main-title {
    font-family: var(--title-font);
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 700;
    letter-spacing: 5px;
    color: #e0d1b9;
    text-align: center;
    position: relative;
    z-index: 1;
    animation: title-glow 4s ease-in-out infinite;
}

.auth-form-panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem;
    background: #1a1612 url('https://www.transparenttextures.com/patterns/old-wall.png');
    border-left: 4px solid #4a3a2a;
    box-shadow: inset 10px 0 20px rgba(0, 0, 0, 0.5);
}

.auth-form-title {
    font-family: var(--title-font);
    font-size: 2rem;
    font-weight: 700;
    color: #d4c0a1;
    margin-bottom: 2rem;
    text-align: center;
}

.auth-panel .input-group, .modal-panel .input-group {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid #4a3a2a;
    border-radius: 4px;
    margin-bottom: 1.2rem;
    padding: 0 1rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.auth-panel .input-group:focus-within, .modal-panel .input-group:focus-within {
    border-color: #ffab40;
    box-shadow: 0 0 15px rgba(255, 171, 64, 0.3);
}

.auth-panel .input-group input, .modal-panel .input-group input {
    background: transparent;
    border: none;
    color: #e0d1b9;
    padding: 1rem 0;
    width: 100%;
    outline: none;
    font-family: var(--body-font);
}

.auth-panel .auth-submit, .auth-panel .auth-guest {
    width: 100%;
    padding: 1rem;
    border-radius: 4px;
    border: 2px solid transparent;
    cursor: pointer;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
    margin-top: 1rem;
    transition: all 0.3s;
    font-family: var(--title-font);
    letter-spacing: 1px;
}

.auth-panel .auth-submit {
    background: linear-gradient(145deg, #b18347, #8e6a39);
    color: #fff;
    text-shadow: 1px 1px 2px #000;
    border-color: #c99e66;
}

.auth-panel .auth-submit:hover:not(:disabled) {
    background: linear-gradient(145deg, #c99e66, #b18347);
    box-shadow: 0 0 15px #ffab40;
}

.auth-panel .auth-guest {
    background: transparent;
    color: #a38c6d;
    border: 2px solid #5a4a3a;
}

.auth-panel .auth-guest:hover:not(:disabled) {
    background: rgba(199, 158, 102, 0.1);
    color: #d4c0a1;
    border-color: #8e6a39;
}

.auth-panel .auth-toggle:hover {
    color: #ffab40;
}

@media (max-width: 900px) {
    .auth-screen-container {
        grid-template-columns: 1fr;
    }

    .auth-art-panel {
        display: none;
    }

    .auth-form-panel {
        border-left: none;
        box-shadow: none;
    }
}

/* START SCREEN - FULLSCREEN THEME */
.start-screen-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 2rem 4rem;
    box-sizing: border-box;
    background: #000;
    animation: fadeIn 1.5s ease-out;
    position: relative;
    overflow: hidden;
    z-index: 0;
}

.start-screen-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    animation: ken-burns 40s ease-out infinite alternate;
    opacity: 0.3;
    z-index: -2;
}

.start-screen-container::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.8) 100%);
    z-index: -1;
}

.start-screen-branding, .start-screen-menu-panel {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.start-screen-branding {
    flex: 1 1 50%;
    align-items: center;
    padding-right: 2.5rem;
}

.start-screen-menu-panel {
    flex: 1 1 50%;
    align-items: flex-start;
    padding-left: 2.5rem;
    border-left: 1px solid rgba(163, 140, 109, 0.2);
}

.start-screen-logo {
    margin-bottom: 0;
    text-align: center;
    max-width: 450px;
}

.start-screen-main-logo {
    width: 100%;
    max-width: 180px;
    margin-bottom: 1.5rem;
    filter: drop-shadow(0 0 15px rgba(255, 171, 64, 0.7));
}

.start-screen-logo-title {
    font-family: var(--title-font);
    font-size: clamp(3.5rem, 10vw, 3rem);
    color: #e0d1b9;
    text-shadow: 0 0 15px #ffab40, 0 0 30px #ffab40, 0 4px 5px #000;
    margin: 0;
}

.start-screen-logo-subtitle {
    font-family: var(--body-font);
    font-style: italic;
    color: #a38c6d;
    margin: 0.5rem 0 0 0;
    font-size: 1.1rem;
}

.start-screen-menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
    margin-top: 0;
}

.start-screen-divider {
    height: 1px;
    background: #4a3a2a;
    margin: 1rem 0;
}

.start-screen-secondary-actions {
    display: flex;
    gap: 1rem;
}

.start-menu-button {
    width: 100%;
    padding: 1rem;
    border-radius: 4px;
    border: 2px solid transparent;
    cursor: pointer;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
    transition: all 0.3s;
    font-family: var(--title-font);
    letter-spacing: 1px;
    font-size: 1.1rem;
}

.start-menu-button.primary {
    background: linear-gradient(145deg, #b18347, #8e6a39);
    color: #fff;
    text-shadow: 1px 1px 2px #000;
    border-color: #c99e66;
}

.start-menu-button.primary:hover:not(:disabled) {
    background: linear-gradient(145deg, #c99e66, #b18347);
    box-shadow: 0 0 15px #ffab40;
}

.start-menu-button:not(.primary) {
    background: transparent;
    color: #a38c6d;
    border-color: #5a4a3a;
}

.start-menu-button:not(.primary):hover:not(:disabled) {
    background: rgba(199, 158, 102, 0.1);
    color: #d4c0a1;
    border-color: #8e6a39;
}

.start-menu-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: rgba(0, 0, 0, 0.2);
    border-color: #4a3a2a;
    color: #6a5a4a;
    box-shadow: none;
}

.start-menu-button.secondary {
    font-size: 0.9rem;
    padding: 0.8rem;
    flex: 1;
}

@media (max-width: 900px) {
    .start-screen-container {
        flex-direction: column;
        padding: 2rem;
    }

    .start-screen-branding, .start-screen-menu-panel {
        flex-basis: auto;
        width: 100%;
        align-items: center;
        padding: 0;
        height: auto;
        border-left: none;
    }

    .start-screen-branding {
        margin-bottom: 2rem;
    }

    .start-screen-logo {
        text-align: center;
    }

    .start-screen-menu {
        margin-top: 1rem;
    }
}

/* UNIVERSAL THEMED BUTTONS */
.themed-button {
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    border: 2px solid transparent;
    cursor: pointer;
    font-weight: 700;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
    transition: all 0.3s;
    font-family: var(--title-font);
    letter-spacing: 1px;
}

.themed-button.primary {
    background: linear-gradient(145deg, #b18347, #8e6a39);
    color: #fff;
    text-shadow: 1px 1px 2px #000;
    border-color: #c99e66;
}

.themed-button.primary:hover:not(:disabled) {
    background: linear-gradient(145deg, #c99e66, #b18347);
    box-shadow: 0 0 15px #ffab40;
}

.themed-button.secondary {
    background: rgba(26, 22, 18, 0.5);
    backdrop-filter: blur(4px);
    color: #a38c6d;
    border-color: #5a4a3a;
}

.themed-button.secondary:hover:not(:disabled) {
    background: rgba(199, 158, 102, 0.1);
    color: #d4c0a1;
    border-color: #8e6a39;
}

.themed-button.danger {
    background: rgba(183, 28, 28, 0.2);
    color: #ff8a80;
    border-color: #b71c1c;
}

.themed-button.danger:hover:not(:disabled) {
    background: rgba(183, 28, 28, 0.4);
    color: #fff;
}

.themed-button.warning {
    background: rgba(255, 171, 64, 0.2);
    color: #ffab40;
    border-color: #ffab40;
}

.themed-button.warning:hover:not(:disabled) {
    background: rgba(255, 171, 64, 0.4);
    color: #fff;
}

.themed-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: rgba(0, 0, 0, 0.2);
    border-color: #4a3a2a;
    color: #6a5a4a;
    box-shadow: none;
}

.themed-button:disabled:hover {
    background: rgba(0, 0, 0, 0.2);
    box-shadow: none;
}

.themed-button.small {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    gap: 0.4rem;
}

.themed-button:active, .start-menu-button:active, .auth-submit:active, .auth-guest:active, .fullscreen-gate-button:active, .choice-button:active, .restart-button:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
}

/* In-Game UI */
.dialogue-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr clamp(450px, 60vw, 900px) 1fr;
    align-items: end;
    gap: 2rem;
    padding: 0 2rem 1rem 2rem;
    box-sizing: border-box;
    z-index: 10;
    transition: opacity 0.5s, transform 0.5s;
    pointer-events: none;
}

.dialogue-wrapper.hidden {
    opacity: 0;
    transform: translateY(20px);
}

.character-sprite {
    max-height: 80vh;
    max-width: 100%;
    object-fit: contain;
    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.8)) brightness(0.7);
    transition: all 0.5s ease;
    pointer-events: auto;
}

.character-sprite.player {
    justify-self: end;
    grid-column: 1;
}

.character-sprite.npc {
    justify-self: start;
    grid-column: 3;
}

.character-sprite.active {
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 1)) brightness(1);
    transform: scale(1.05);
}

.story-container {
    background: linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.85) 60%, transparent 100%);
    padding: 1.5rem 2rem;
    width: 100%;
    grid-column: 2;
    pointer-events: auto;
    text-align: left;
    border: none;
    border-top: 2px solid var(--accent-color);
    box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.3), 0 -2px 15px rgba(var(--accent-color-rgb), 0.3);
}

.speaker-name {
    font-family: var(--title-font);
    font-size: 1.3rem;
    margin: 0 0 0.75rem 0;
    color: var(--accent-color);
    font-weight: 700;
    text-shadow: 0 0 10px var(--accent-color);
    text-align: left;
}

.story-text {
    font-family: var(--body-font);
    font-size: 1.2rem;
    line-height: 1.7;
    margin: 0;
    color: var(--primary-text-color);
    min-height: 90px;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
    max-width: 70ch;
    text-align: left;
}

/* Text Effects */
.text-effect-red {
    color: #ff5252;
    font-weight: bold;
    text-shadow: 0 0 8px #ff5252;
}

.text-effect-shake {
    display: inline-block;
    animation: text-shake-anim 0.3s linear infinite;
}

.text-effect-whisper {
    opacity: 0.8;
    font-style: italic;
    color: #b0c4de;
}

.text-effect-shock {
    display: inline-block;
    animation: shock-anim 0.3s ease-out;
    font-weight: bold;
    color: #fff;
}

.text-effect-anger {
    color: var(--horror-accent);
    font-weight: bold;
    text-shadow: 0 0 8px var(--horror-accent);
    display: inline-block;
    animation: shake-subtle 0.4s linear infinite;
}

.text-effect-fear {
    display: inline-block;
    animation: text-shake-anim 0.4s linear infinite;
    color: var(--horror-accent);
    font-style: italic;
}

.text-effect-tremble {
    display: inline-block;
    animation: text-shake-anim 0.8s linear infinite;
    opacity: 0.8;
}

/* New Advanced Text Effects */
.text-effect-rainbow {
    display: inline-block;
    animation: rainbow-text 3s linear infinite;
    font-weight: bold;
}

.text-effect-fire {
    display: inline-block;
    animation: fire-glow 2s ease-in-out infinite;
    font-weight: bold;
}

.text-effect-glitch {
    display: inline-block;
    animation: glitch-shake 0.2s steps(2) infinite;
    color: #00ffff;
    text-shadow: 2px 0 #ff00ff, -2px 0 #fff;
}

.text-effect-ghostly {
    display: inline-block;
    animation: ghostly-fade 4s ease-in-out infinite;
    color: #b0c4de;
    font-style: italic;
}

.text-effect-gold {
    display: inline-block;
    animation: gold-shine 3s ease-in-out infinite;
    font-weight: bold;
    font-family: var(--title-font);
}

.cursor {
    display: inline-block;
    width: 2px;
    height: 1.2rem;
    background-color: var(--primary-text-color);
    animation: blink 1s step-end infinite;
    vertical-align: bottom;
}

.continue-indicator {
    position: absolute;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    color: var(--primary-text-color);
    animation: continue-pulse 1.5s ease-in-out infinite;
}

.continue-click-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 19;
    cursor: pointer;
}

/* Choices Modal */
.choices-modal {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 20;
    padding: 1rem;
    box-sizing: border-box;
    transition: opacity 0.4s ease;
    animation: fadeIn 0.4s ease;
}

.choices-modal.fade-out {
    opacity: 0;
}

.choices-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 700px;
    align-items: center;
}

.choice-button {
    background: rgba(10, 10, 10, 0.7);
    backdrop-filter: blur(12px);
    color: var(--secondary-text-color);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    padding: 1.2rem 1.5rem;
    font-size: 1.1rem;
    font-family: var(--body-font);
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    opacity: 0;
    animation: slideUpIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    position: relative;
    overflow: hidden;
    text-align: left;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.choice-button:nth-child(2) {
    animation-delay: 0.1s;
}

.choice-button:nth-child(3) {
    animation-delay: 0.2s;
}

.choice-button:nth-child(4) {
    animation-delay: 0.3s;
}

.choice-button:hover:not(:disabled) {
    background: rgba(var(--accent-color-rgb), 0.1);
    border-color: rgba(var(--accent-color-rgb), 0.5);
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(var(--accent-color-rgb), 0.3);
}

.choice-index {
    font-family: var(--title-font);
    font-weight: 700;
    color: var(--accent-color);
}

.choice-text {
    line-height: 1.5;
}

.restart-button:hover {
    background: rgba(var(--accent-color-rgb), 0.1);
    border-color: var(--accent-color);
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(var(--accent-color-rgb), 0.4);
}

.choice-button:disabled {
    background: rgba(30, 30, 30, 0.7);
    color: #666;
    cursor: not-allowed;
    border-color: #444;
}

.choice-button:disabled:hover {
    background: rgba(30, 30, 30, 0.7);
    border-color: #444;
    transform: none;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.choice-timer-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background: var(--accent-color);
    box-shadow: 0 0 8px var(--accent-color);
    animation-name: timer-bar-deplete;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
}

/* Control Bar & HUD */
.control-bar {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    right: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    z-index: 20;
    pointer-events: none;
}

.control-bar-section {
    display: flex;
    pointer-events: auto;
}

.control-bar-section:first-child {
    align-items: center;
    gap: 1rem;
}

.control-bar-section:last-child {
    flex-direction: column;
    align-items: flex-end;
    gap: 0.75rem;
}

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
    filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.7));
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
    top: -14px;
    left: -14px;
    transform: rotate(-90deg);
    /* Start from the top */
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

.stat-circle-display.updated {
    animation: stat-update-scale 0.6s ease-out;
}

.stat-circle-display.updated .stat-circle-progress,
.stat-circle-display.updated .stat-circle-icon {
    animation: stat-update-glow 0.6s ease-out;
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
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
}

.stat-circle-display.low-sanity-pulse .stat-circle-progress,
.stat-circle-display.low-sanity-pulse .stat-circle-icon {
    color: var(--horror-accent);
    stroke: var(--horror-accent);
    animation: heartbeat 1.5s ease-in-out infinite;
}

.game-action-button {
    background: rgba(18, 18, 18, 0.7);
    backdrop-filter: blur(5px);
    border: var(--border-ui);
    color: var(--secondary-text-color);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}

.game-action-button:hover {
    color: var(--background-body);
    transform: scale(1.1);
    background: var(--accent-color);
    border-color: var(--accent-color);
}

.game-action-button:hover svg {
    color: var(--background-body);
}

.game-action-button span {
    position: absolute;
    bottom: -2px;
    right: -2px;
    background-color: var(--accent-color);
    color: var(--background-body);
    border-radius: 50%;
    font-size: 0.7rem;
    font-weight: bold;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--background-ui-solid);
}

.game-action-button svg {
    width: 22px;
    height: 22px;
    transition: color 0.3s ease;
}

/* Stat Change Indicator */
.stat-change-container {
    position: absolute;
    top: 130px;
    left: 1.5rem;
    z-index: 50;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.stat-change-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: rgba(20, 20, 20, 0.9);
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-family: var(--title-font);
    font-size: 1rem;
    text-shadow: none;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
}

.stat-change-indicator.increase {
    color: var(--accent-color);
}

.stat-change-indicator.decrease {
    color: #e57373;
}

.stat-change-indicator span {
    font-weight: bold;
}

/* Notification Indicator */
.notification-container {
    position: absolute;
    bottom: 25%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 50;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
}

.notification-indicator {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    background-color: rgba(26, 22, 18, 0.9);
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    border: 1px solid #4a3a2a;
    font-family: var(--title-font);
    font-size: 1rem;
    text-shadow: none;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
}

.voice-pack-prompt {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #1e1a16;
    color: #d4c0a1;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    border: 2px solid #4a3a2a;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 100;
    max-width: 90%;
}

.voice-pack-prompt p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
}

.voice-pack-prompt button {
    background: none;
    border: none;
    color: #6a5a4a;
    cursor: pointer;
}

.voice-pack-prompt button:hover {
    color: #d4c0a1;
}

/* Universal Modals */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1010;
}

.modal-panel {
    background: var(--background-ui-solid);
    border: 2px solid var(--accent-color);
    border-radius: 8px;
    padding: 2rem;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
    color: var(--primary-text-color);
}

.modal-panel h2 {
    font-family: var(--title-font);
    text-align: center;
    margin-top: 0;
    margin-bottom: 2rem;
    color: var(--accent-color);
    text-shadow: 0 0 8px var(--accent-color);
}

.inventory-modal-list, .journal-entry-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 60vh;
    overflow-y: auto;
}

.inventory-item, .journal-entry {
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(var(--accent-color-rgb), 0.1);
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    transition: all 0.2s ease;
    position: relative;
}

.inventory-item.has-lore {
    cursor: pointer;
}

.inventory-item.has-lore:hover {
    background: rgba(var(--accent-color-rgb), 0.1);
    border-color: rgba(var(--accent-color-rgb), 0.3);
}

.lore-indicator-icon {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: var(--accent-color);
    opacity: 0.5;
    transition: opacity 0.2s;
}

.inventory-item.has-lore:hover .lore-indicator-icon {
    opacity: 1;
}

.inventory-item:last-child, .journal-entry:last-child {
    margin-bottom: 0;
}

.item-image-wrapper {
    width: 64px;
    height: 64px;
    background: #000;
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
    border: 1px solid rgba(var(--accent-color-rgb), 0.3);
}

.item-image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.item-content-wrapper {
    flex: 1;
}

.item-name, .journal-title {
    font-family: var(--title-font);
    font-size: 1.1rem;
    color: var(--accent-color);
    margin: 0 0 0.25rem 0;
}

.item-desc, .journal-content {
    font-family: var(--body-font);
    font-size: 0.95rem;
    color: var(--secondary-text-color);
    margin: 0;
    white-space: pre-wrap;
    line-height: 1.5;
}

.journal-tabs {
    display: flex;
    border-bottom: 1px solid rgba(var(--accent-color-rgb), 0.2);
    margin-bottom: 1.5rem;
}

.journal-tab {
    background: none;
    border: none;
    color: var(--secondary-text-color);
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    font-family: var(--title-font);
    font-size: 1rem;
    border-bottom: 2px solid transparent;
}

.journal-tab.active {
    color: var(--accent-color);
    border-bottom-color: var(--accent-color);
}

.journal-character-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.journal-relationship-status {
    font-size: 0.7rem;
    font-family: var(--title-font);
    color: var(--secondary-text-color);
    text-transform: uppercase;
    padding: 0.2rem 0.6rem;
    border-radius: 10px;
    border: 1px solid transparent;
    letter-spacing: 1px;
}

.journal-relationship-status[data-status="devoted"],
.journal-relationship-status[data-status="positive"] {
    color: #81c784;
    border-color: rgba(129, 199, 132, 0.3);
    background-color: rgba(129, 199, 132, 0.1);
}

.journal-relationship-status[data-status="hostile"],
.journal-relationship-status[data-status="negative"] {
    color: #e57373;
    border-color: rgba(229, 115, 115, 0.3);
    background-color: rgba(229, 115, 115, 0.1);
}

/* ALERT MODAL - PARCHMENT THEME */
.alert-modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    animation: fadeIn 0.3s ease;
}

.alert-modal-document {
    width: 100%;
    max-width: 550px;
    background: #e0d1b9 url('https://www.transparenttextures.com/patterns/paper-fibers.png');
    color: #3d2c1d;
    border-radius: 4px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 5px rgba(0, 0, 0, 0.2);
    font-family: var(--body-font);
    border: 1px solid #c8b89f;
    padding: 0;
}

.alert-document-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem 1.5rem;
    border-bottom: 2px solid #c8b89f;
    background: rgba(0, 0, 0, 0.03);
}

.alert-document-header h3 {
    margin: 0;
    font-family: var(--title-font);
    font-size: 1.2rem;
    color: #3d2c1d;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.alert-document-body {
    padding: 1.5rem;
    line-height: 1.7;
}

.alert-document-body p {
    margin: 0;
    font-size: 1rem;
}

.alert-document-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 1.5rem;
    background: rgba(0, 0, 0, 0.03);
    border-top: 1px solid #c8b89f;
}

.alert-document-actions {
    display: flex;
    gap: 0.8rem;
}

.alert-stamp {
    font-family: var(--title-font);
    font-weight: 700;
    text-transform: uppercase;
    border: 3px solid #6d5b4a;
    color: #6d5b4a;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    transform: rotate(-10deg);
    opacity: 0.8;
    font-size: 1rem;
}

.alert-modal-document.type-error .alert-document-header, .stamp-error {
    color: #b71c1c;
}

.alert-modal-document.type-error .alert-stamp {
    color: #b71c1c;
    border-color: #b71c1c;
}

.alert-modal-document.type-success .alert-document-header, .stamp-success {
    color: #2e7d32;
}

.alert-modal-document.type-success .alert-stamp {
    color: #2e7d32;
    border-color: #2e7d32;
}

.alert-modal-document.type-info .alert-document-header, .stamp-info {
    color: #0277bd;
}

.alert-modal-document.type-info .alert-stamp {
    color: #0277bd;
    border-color: #0277bd;
}

/* Custom button styles for Alert Modal to match the image */
.alert-document-actions .themed-button {
    font-family: var(--title-font);
    border-radius: 3px;
    padding: 0.8rem 1.2rem;
    border: 2px solid;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 1px;
    font-size: 0.9rem;
}

.alert-document-actions .themed-button.secondary {
    background-color: #6a5a4a;
    border-color: #5a4a3a;
    color: #d4c0a1;
}

.alert-document-actions .themed-button.secondary:hover {
    background-color: #7a6a5a;
}

.alert-document-actions .themed-button.danger {
    background-color: #e5737330;
    border-color: #b71c1c;
    color: #b71c1c;
}

.alert-document-actions .themed-button.danger:hover {
    background-color: #e5737350;
}

.alert-document-actions .themed-button.primary {
    background-color: #b18347;
    border-color: #8e6a39;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.alert-document-actions .themed-button.primary:hover {
    background-color: #c99e66;
}

.alert-prompt-input-wrapper {
    padding: 0 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.alert-prompt-input-wrapper label {
    font-weight: bold;
    font-size: 0.9rem;
    color: #5d4c3d;
}

.alert-prompt-input-wrapper input {
    background: #f0e6d8;
    border: 2px solid #c8b89f;
    border-radius: 4px;
    padding: 0.8rem;
    font-family: var(--body-font);
    font-size: 1rem;
    color: #3d2c1d;
}

.alert-prompt-input-wrapper input:focus {
    outline: none;
    border-color: #b18347;
    box-shadow: 0 0 10px rgba(177, 131, 71, 0.4);
}

/* Other Screens */
.menu-button {
    background: transparent;
    color: var(--primary-text-color);
    border: 2px solid var(--accent-color);
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
    font-family: var(--title-font);
    cursor: pointer;
    transition: all 0.3s ease;
}

.menu-button.primary {
    background: rgba(var(--accent-color-rgb), 0.2);
}

.menu-button:hover {
    background: var(--accent-color);
    color: var(--background-body);
    transform: scale(1.05);
}

.menu-button:disabled {
    background: transparent;
    border-color: #555;
    color: #555;
    cursor: not-allowed;
}

.menu-button:disabled:hover {
    transform: none;
}

.selection-screen-title {
    font-family: var(--title-font);
    font-size: clamp(2rem, 5vw, 2.5rem);
    color: #d4c0a1;
    text-shadow: 0 0 10px #ffab40;
    margin: 0;
}

/* STORY SELECT SCREEN - Library Carousel Theme */
.story-select-container-themed {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    color: #e0d1b9;
    background: #1a1612 url('https://www.transparenttextures.com/patterns/old-wall.png');
}

.story-select-vignette {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.9) 100%);
    pointer-events: none;
}

.story-select-header {
    width: 100%;
    padding: 1.5rem 2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 10;
}

.story-select-header .selection-screen-title {
    margin: 0;
}

.story-select-main-themed {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 5;
    perspective: 1500px;
    padding-bottom: 5vh;
}

.story-carousel-container {
    width: 420px;
    height: 280px;
    position: relative;
    margin-bottom: 2rem;
    transform-style: preserve-3d;
}

.story-book {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.3);
    border: 2px solid #4a3a2a;
    transform-style: preserve-3d;
    will-change: transform, opacity;
}

.story-book:before, .story-book:after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 8px;
    z-index: -1;
}

.story-book:before {
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.2), transparent);
}

.story-book:after {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.story-book-spine {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 100%;
    background: #3d2c1d;
    transform-origin: left;
    transform: rotateY(-90deg) translateX(-2px);
    border: 2px solid #2a2018;
}

.story-book-pages-side {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 100%;
    background: #f5eeda;
    background-image: repeating-linear-gradient(to bottom, #e0d1b9, #e0d1b9 1px, #f5eeda 1px, #f5eeda 2px);
    transform-origin: right;
    transform: rotateY(90deg) translateX(2px);
    box-shadow: inset 5px 0 15px rgba(0, 0, 0, 0.2);
}

.story-book-pages-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: #f5eeda;
    transform-origin: top;
    transform: rotateX(90deg) translateY(-2px);
    background-image: repeating-linear-gradient(to right, #e0d1b9, #e0d1b9 1px, #f5eeda 1px, #f5eeda 2px);
}

.story-select-nav {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: rgba(224, 209, 185, 0.4);
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 20;
    padding: 1rem;
}

.story-select-nav:hover {
    color: #e0d1b9;
    transform: translateY(-50%) scale(1.1);
}

.story-select-nav.left {
    left: 5vw;
}

.story-select-nav.right {
    right: 5vw;
}

.story-details-panel {
    text-align: center;
    max-width: 600px;
    padding: 0 1rem;
    z-index: 10;
}

.story-details-panel h2 {
    font-family: var(--title-font);
    font-size: 2.2rem;
    color: #d4c0a1;
    text-shadow: 0 0 10px #ffab40;
    margin: 0 0 1rem 0;
}

.story-details-panel p {
    font-family: var(--body-font);
    color: #a38c6d;
    line-height: 1.6;
    margin: 0 0 2rem 0;
    min-height: 50px;
}

.story-details-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.story-card-admin-actions-themed {
    display: flex;
    gap: 0.5rem;
}

.story-card-admin-actions-themed .themed-button {
    padding: 0.8rem;
    min-width: auto;
}

/* CHAPTER SELECT SCREEN - Carousel Redesign */
.chapter-card {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.3);
    border: 2px solid #4a3a2a;
    will-change: transform, opacity;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    color: #e0d1b9;
    font-family: var(--title-font);
    overflow: hidden;
}

.chapter-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 30%, transparent 60%);
}

.chapter-card-content {
    position: relative;
    z-index: 1;
    padding: 1.5rem;
}

.chapter-card-number {
    font-size: 0.9rem;
    font-family: var(--body-font);
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #a38c6d;
}

.chapter-card-title {
    font-size: 1.5rem;
    margin: 0.25rem 0 0 0;
    text-shadow: 0 0 8px #ffab40;
}

.chapter-card.locked {
    filter: saturate(0) brightness(0.7);
}

.chapter-card.locked .chapter-card-overlay {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.6) 100%);
}

.chapter-card-lock {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgba(224, 209, 185, 0.5);
    filter: drop-shadow(0 0 10px #000);
    z-index: 2;
}

/* Death Screen */
.death-screen-container {
    position: fixed;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(30, 0, 0, 0.8) 0%, #000 70%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.death-screen-title {
    font-family: var(--title-font);
    font-size: clamp(4rem, 15vw, 8rem);
    color: var(--horror-accent);
    text-shadow: 0 0 20px #b71c1c, 0 0 40px #b71c1c;
    animation: death-pulse 2.5s ease-in-out infinite;
    margin: 0;
}

.death-screen-subtitle {
    font-family: var(--body-font);
    color: var(--secondary-text-color);
    margin: 1rem 0 3rem 0;
    font-style: italic;
}

.death-screen-button {
    background: transparent;
    border: 2px solid var(--accent-color);
    color: var(--accent-color);
    padding: 0.8rem 2.5rem;
    font-family: var(--title-font);
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
}

.death-screen-button:hover {
    background: var(--accent-color);
    color: var(--background-body);
    box-shadow: 0 0 20px var(--accent-color);
}

/* To Be Continued Screen */
.tbc-screen-container {
    position: fixed;
    inset: 0;
    background-color: rgba(18, 18, 18, 0.9);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
    text-align: center;
}

.tbc-screen-title {
    font-family: var(--title-font);
    font-size: clamp(3rem, 10vw, 5rem);
    color: var(--accent-color);
    text-shadow: 0 0 20px var(--accent-color);
    margin: 0 0 3rem 0;
}

.tbc-screen-button {
    background: rgba(var(--accent-color-rgb), 0.15);
    border: 2px solid var(--accent-color);
    color: var(--accent-color);
    padding: 0.8rem 2.5rem;
    font-family: var(--title-font);
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
}

.tbc-screen-button:hover {
    background: var(--accent-color);
    color: var(--background-body);
    box-shadow: 0 0 20px var(--accent-color);
}

/* Story End Screen */
.story-end-container {
    position: fixed;
    inset: 0;
    background: #0a0a0a;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    perspective: 2000px;
    font-family: var(--body-font);
}

.story-end-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    opacity: 0.15;
    animation: ken-burns 40s ease-out infinite alternate;
}

.story-end-book {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 80vw;
    max-width: 1200px;
    height: 70vh;
    max-height: 700px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
    animation: book-open 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    transform-style: preserve-3d;
}

.story-end-page {
    padding: 3rem 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.left-page {
    background: #1a1612 url('https://www.transparenttextures.com/patterns/old-wall.png');
    color: #e0d1b9;
    align-items: center;
    text-align: center;
    border-right: 2px solid #4a3a2a;
}

.right-page {
    background: #e0d1b9 url('https://www.transparenttextures.com/patterns/paper-fibers.png');
    color: #3d2c1d;
}

.story-end-story-title {
    font-family: var(--title-font);
    font-size: clamp(2rem, 5vw, 3.5rem);
    text-shadow: 0 0 10px var(--accent-color, #ffab40);
    color: var(--accent-color, #d4c0a1);
    margin: 2rem 0 0 0;
}

.story-end-title {
    font-family: var(--title-font);
    font-size: clamp(3rem, 8vw, 6rem);
    margin: 0;
    text-align: center;
}

.story-end-text {
    font-family: var(--body-font);
    font-style: italic;
    text-align: center;
    margin: 1rem 0 3rem 0;
}

.story-end-button {
    align-self: center;
    background: transparent;
    border: 2px solid var(--accent-color, #8e6a39);
    color: var(--accent-color, #3d2c1d);
    padding: 0.8rem 2.5rem;
    font-family: var(--title-font);
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
}

.story-end-button:hover {
    background: var(--accent-color, #8e6a39);
    color: #fff;
    text-shadow: 1px 1px 2px #000;
    box-shadow: 0 0 20px var(--accent-color, #8e6a39);
}

.autosave-indicator {
    position: fixed;
    bottom: 100px;
    right: 20px;
    background-color: var(--background-ui);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: var(--border-ui);
    color: var(--secondary-text-color);
    font-family: var(--title-font);
    z-index: 40;
    animation: autosave-anim 3s ease-in-out forwards;
}

/* Caution Screen */
.caution-screen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    animation: fadeIn 1s ease-in;
    padding: 2rem;
    box-sizing: border-box;
}

.caution-box {
    border: 2px solid var(--accent-color);
    padding: 3rem;
    max-width: 600px;
    text-align: center;
    background: rgba(10, 10, 10, 0.5);
    box-shadow: 0 0 30px rgba(var(--accent-color-rgb), 0.5);
}

.caution-title {
    font-family: var(--title-font);
    font-size: 3rem;
    color: var(--accent-color);
    margin: 0 0 1.5rem 0;
    letter-spacing: 4px;
    text-transform: uppercase;
    text-shadow: 0 0 10px var(--accent-color);
}

.caution-text {
    font-family: var(--body-font);
    font-size: 1.1rem;
    color: var(--primary-text-color);
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

.proceed-button {
    background: transparent;
    border: 2px solid var(--primary-text-color);
    color: var(--primary-text-color);
    padding: 0.8rem 2.5rem;
    font-family: var(--title-font);
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.proceed-button:hover {
    background: var(--accent-color);
    border-color: var(--accent-color);
    color: var(--background-body);
}

/* Editor - Reverted Book Theme */
.editor-container {
    position: fixed;
    inset: 0;
    background: #1a1612;
    z-index: 200;
    display: flex;
    flex-direction: column;
    color: #e0d1b9;
    font-family: var(--body-font);
}

.editor-header {
    padding: 0.8rem 1.5rem;
    background: #2a2018;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #4a3a2a;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.editor-header .themed-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
}

.editor-title-input {
    background: transparent;
    border: none;
    color: #e0d1b9;
    font-size: 1.5rem;
    font-family: var(--title-font);
    padding: 0.5rem 0;
    width: 400px;
    font-weight: 700;
    text-shadow: 0 0 10px #ffab40;
}

.editor-title-input:focus {
    outline: none;
}

.editor-layout {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.editor-sidebar {
    width: 320px;
    background: #2a2018;
    border-right: 2px solid #4a3a2a;
    display: flex;
    flex-direction: column;
    box-shadow: inset -10px 0 15px rgba(0, 0, 0, 0.3);
}

.sidebar-content {
    padding: 1rem;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.sidebar-section {
    margin-bottom: 1.5rem;
}

.sidebar-section-title {
    font-family: var(--title-font);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #d4c0a1;
    margin-bottom: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #4a3a2a;
}

.list-item {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid #4a3a2a;
    color: #a38c6d;
    padding: 0.7rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: all 0.2s;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;
    font-family: var(--title-font);
    letter-spacing: 0.5px;
    gap: 0.5rem;
}

.list-item span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    min-width: 0;
}

.list-item-actions {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 0.2rem;
}

.list-item:hover {
    background: rgba(199, 158, 102, 0.1);
    color: #d4c0a1;
    border-color: #8e6a39;
}

.list-item.active {
    border-color: #ffab40;
    color: #e0d1b9;
    background: rgba(177, 131, 71, 0.15);
    box-shadow: 0 0 10px rgba(255, 171, 64, 0.2);
}

.list-item-actions button {
    background: none;
    border: none;
    color: #6a5a4a;
    cursor: pointer;
    padding: 0.2rem;
}

.list-item-actions button:hover {
    color: #d4c0a1;
}

.list-item-actions button.danger:hover {
    color: var(--error-color);
}

.editor-main {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.editor-canvas {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.editor-card {
    background: #1e1a16;
    border-radius: 8px;
    border: 2px solid #4a3a2a;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 0, 0, 0.3);
}

.card-title {
    font-size: 1rem;
    font-family: var(--title-font);
    font-weight: 700;
    color: #d4c0a1;
    border-bottom: 1px solid #4a3a2a;
    padding-bottom: 0.8rem;
    margin: 0;
}

.field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.field-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.field-group label {
    font-size: 0.75rem;
    color: #a38c6d;
    opacity: 0.8;
    font-weight: 600;
    text-transform: uppercase;
    font-family: var(--body-font);
}

.field-group input, .field-group textarea, .field-group select {
    background: #110e0c;
    border: 1px solid #4a3a2a;
    color: #e0d1b9;
    padding: 0.8rem;
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.9rem;
    transition: all 0.2s;
}

.field-group textarea {
    min-height: 80px;
    resize: vertical;
}

.field-group input:focus, .field-group textarea:focus, .field-group select:focus {
    border-color: #ffab40;
    background: #16120e;
    outline: none;
    box-shadow: 0 0 10px rgba(255, 171, 64, 0.2);
}

.field-group textarea[placeholder*=\"JSON\"] {
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.85rem;
    background-color: #0c0a08;
    border-color: #3a2a1a;
    color: #f2c97d;
    line-height: 1.5;
    white-space: pre;
    tab-size: 2;
}

.choice-builder {
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #4a3a2a;
}

.choice-builder-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.choice-builder-header h6 {
    margin: 0;
    font-family: var(--title-font);
    color: #a38c6d;
}

.btn-danger {
    color: #ff8a80;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background 0.2s;
}

.btn-danger:hover {
    background: rgba(229, 115, 115, 0.1);
}

.tab-group {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #4a3a2a;
}

.editor-tab {
    background: none;
    border: none;
    color: #a38c6d;
    padding: 0.8rem 1rem;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.9rem;
    border-bottom: 2px solid transparent;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--title-font);
}

.editor-tab.active {
    color: #d4c0a1;
    border-bottom-color: #ffab40;
    text-shadow: 0 0 5px #ffab40;
}

.jumpscare-config-panel {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}

.color-picker-container {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    background: #110e0c;
    border: 1px solid #4a3a2a;
    padding: 0;
    padding-right: 0.8rem;
    border-radius: 4px;
}

.color-picker-container input[type=\"text\"] {
    flex-grow: 1;
    padding: 0.8rem 0;
    background: transparent;
    border: none;
}

.color-picker-container:focus-within {
    border-color: #ffab40;
    box-shadow: 0 0 10px rgba(255, 171, 64, 0.2);
}

.color-swatch-wrapper {
    position: relative;
    width: 40px;
    height: 38px;
    border-right: 1px solid #4a3a2a;
    flex-shrink: 0;
}

.color-swatch {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

.color-picker-input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

/* SETTINGS MODAL - CONTEXTUAL THEME */
.settings-modal-overlay {
    z-index: 50;
}

.settings-modal-panel {
    width: 90vw;
    height: 85vh;
    max-width: 1400px;
    padding: 0;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
}

.settings-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    flex-shrink: 0;
}

.settings-modal-header h2 {
    margin: 0;
    font-family: var(--title-font);
    font-size: 1.8rem;
}

.settings-modal-close {
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
}

.settings-modal-content {
    padding: 1.5rem 2rem;
    overflow-y: auto;
    flex-grow: 1;
}

.settings-section {
    margin-bottom: 2rem;
}

.settings-section:last-child {
    margin-bottom: 0;
}

.settings-section h3 {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-family: var(--title-font);
    margin: 0 0 1.5rem 0;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding-bottom: 0.8rem;
}

.settings-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.settings-row label {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-family: var(--body-font);
    font-size: 1rem;
}

.slider-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 50%;
}

.slider-container span {
    font-family: monospace;
    font-size: 0.9rem;
    min-width: 40px;
    text-align: right;
}

.slider-container input[type=\"range\"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    outline: none;
}

.slider-container input[type=\"range\"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    cursor: pointer;
    border-radius: 50%;
    transition: transform 0.2s;
}

.switch {
    position: relative;
    display: inline-block;
    width: 52px;
    height: 28px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.switch .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: .4s;
    border-radius: 28px;
}

.switch .slider:before {
    position: absolute;
    content: \"\";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    transition: .4s;
    border-radius: 50%;
    box-shadow: 0 0 2px #000;
}

.switch input:checked+.slider:before {
    transform: translateX(24px);
}

.keybind-button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 120px;
    text-align: center;
}

.settings-modal-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1.5rem 2rem;
    flex-shrink: 0;
}

/* Game Context Theme */
.settings-modal-panel.context-game {
    background: var(--background-ui-solid);
    border: 4px solid var(--accent-color);
    box-shadow: 0 10px 50px #000, inset 0 0 20px rgba(0, 0, 0, 0.4);
    color: var(--primary-text-color);
}

.settings-modal-panel.context-game .settings-modal-header {
    border-bottom: 2px solid rgba(var(--accent-color-rgb), 0.3);
}

.settings-modal-panel.context-game .settings-modal-header h2 {
    color: var(--accent-color);
    text-shadow: 0 0 10px var(--accent-color);
}

.settings-modal-panel.context-game .settings-modal-close {
    color: var(--secondary-text-color);
}

.settings-modal-panel.context-game .settings-modal-close:hover {
    color: var(--accent-color);
}

.settings-modal-panel.context-game .settings-section h3 {
    color: var(--secondary-text-color);
    border-bottom: 1px solid rgba(var(--accent-color-rgb), 0.2);
}

.settings-modal-panel.context-game .settings-row label {
    color: var(--primary-text-color);
}

.settings-modal-panel.context-game .slider-container span {
    color: var(--secondary-text-color);
}

.settings-modal-panel.context-game .slider-container input[type=\"range\"] {
    background: linear-gradient(to right, var(--accent-color) var(--value, 50%), #333 var(--value, 50%));
    border: 1px solid #555;
}

.settings-modal-panel.context-game .slider-container input[type=\"range\"]::-webkit-slider-thumb {
    background: var(--primary-text-color);
    border: 2px solid var(--accent-color);
}

.settings-modal-panel.context-game .slider-container input[type=\"range\"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 10px var(--accent-color);
}

.settings-modal-panel.context-game .switch .slider {
    background-color: #333;
    border: 1px solid #555;
}

.settings-modal-panel.context-game .switch .slider:before {
    background-color: var(--primary-text-color);
}

.settings-modal-panel.context-game .switch input:checked+.slider {
    background-color: var(--accent-color);
}

.settings-modal-panel.context-game .keybind-button {
    background-color: #333;
    border: 1px solid #555;
    color: var(--primary-text-color);
}

.settings-modal-panel.context-game .keybind-button:hover {
    background-color: rgba(var(--accent-color-rgb), 0.2);
    border-color: var(--accent-color);
}

.settings-modal-panel.context-game .settings-modal-actions {
    border-top: 2px solid rgba(var(--accent-color-rgb), 0.3);
    background: rgba(0, 0, 0, 0.2);
}

/* Menu Context (Book) Theme */
.settings-modal-panel.context-menu {
    background: #1a1612);
    color: #e0d1b9;
    border: 4px solid #4a3a2a;
    box-shadow: 0 10px 50px #000, 0 0 0 8px rgba(0, 0, 0, 0.3);
}

.settings-modal-panel.context-menu .settings-modal-header {
    border-bottom: 2px solid #4a3a2a;
}

.settings-modal-panel.context-menu .settings-modal-header h2 {
    color: #d4c0a1;
    text-shadow: 0 0 10px #ffab40;
}

.settings-modal-panel.context-menu .settings-modal-close {
    color: #a38c6d;
}

.settings-modal-panel.context-menu .settings-modal-close:hover {
    color: #d4c0a1;
}

.settings-modal-panel.context-menu .settings-section h3 {
    color: #d4c0a1;
    border-bottom-color: #4a3a2a;
}

.settings-modal-panel.context-menu .settings-row label {
    color: #e0d1b9;
}

.settings-modal-panel.context-menu .slider-container span {
    color: #a38c6d;
}

.settings-modal-panel.context-menu .slider-container input[type=\"range\"] {
    background: linear-gradient(to right, #b18347 var(--value, 50%), #4a3a2a var(--value, 50%));
    border: 1px solid #5a4a3a;
}

.settings-modal-panel.context-menu .slider-container input[type=\"range\"]::-webkit-slider-thumb {
    background: #e0d1b9;
    border: 2px solid #b18347;
}

.settings-modal-panel.context-menu .slider-container input[type=\"range\"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 10px #ffab40;
}

.settings-modal-panel.context-menu .switch .slider {
    background-color: #4a3a2a;
    border: 1px solid #5a4a3a;
}

.settings-modal-panel.context-menu .switch .slider:before {
    background-color: #a38c6d;
}

.settings-modal-panel.context-menu .switch input:checked+.slider {
    background-color: #b18347;
}

.settings-modal-panel.context-menu .switch input:checked+.slider:before {
    background-color: #fff;
}

.settings-modal-panel.context-menu .keybind-button {
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid #4a3a2a;
    color: #e0d1b9;
}

.settings-modal-panel.context-menu .keybind-button:hover {
    background-color: rgba(199, 158, 102, 0.1);
    border-color: #8e6a39;
}

.settings-modal-panel.context-menu .settings-modal-actions {
    background: rgba(0, 0, 0, 0.2);
    border-top: 2px solid #4a3a2a;
}

.settings-modal-panel.context-menu#template-modal {
    max-width: 1000px;
}

#template-modal .settings-modal-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

@media (min-width: 900px) {
    .settings-modal-content.grid-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 2.5rem;
    }

    .settings-section.full-width {
        grid-column: 1 / -1;
    }
}

/* User Management Screen */
.management-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--body-font);
    font-size: 0.9rem;
}

.management-table thead {
    background: rgba(0, 0, 0, 0.3);
    border-bottom: 2px solid #5a4a3a;
}

.management-table th {
    padding: 1rem;
    text-align: left;
    font-family: var(--title-font);
    color: #d4c0a1;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.8rem;
}

.management-table tbody tr {
    border-bottom: 1px solid #4a3a2a;
    transition: background-color: 0.2s;
}

.management-table tbody tr:hover {
    background-color: rgba(199, 158, 102, 0.05);
}

.management-table td {
    padding: 0.8rem 1rem;
    color: #a38c6d;
    vertical-align: middle;
}

.management-table tbody tr.disabled td {
    color: #6a5a4a;
    text-decoration: line-through;
}

.management-table select {
    background: #110e0c;
    border: 1px solid #4a3a2a;
    color: #e0d1b9;
    padding: 0.4rem;
    border-radius: 4px;
    font-family: inherit;
}

.management-table .actions-cell {
    display: flex;
    gap: 0.5rem;
}

.status-badges {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
}

.user-file-status, .user-file-verified {
    font-size: 0.75rem;
    padding: 0.1rem 0.5rem;
    border-radius: 10px;
    font-weight: bold;
}

.user-file-status.active {
    background-color: rgba(76, 175, 80, 0.2);
    color: #a5d6a7;
}

.user-file-status.disabled {
    background-color: rgba(229, 115, 115, 0.2);
    color: #ef9a9a;
}

.user-file-verified.verified {
    background-color: rgba(66, 165, 245, 0.2);
    color: #90caf9;
}

.user-file-verified.unverified {
    background-color: rgba(255, 171, 64, 0.2);
    color: #ffcc80;
}
    `}</style>
);
