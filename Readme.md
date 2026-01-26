# Storyteller: An Immersive Interactive Fiction Platform

![Storyteller Gameplay](https://i.imgur.com/vHq05C8.gif)

**Storyteller** is a complete, full-stack platform for playing and creating deeply immersive, choice-driven narratives. It combines a rich, atmospheric player experience with a powerful, integrated, no-code Story Editor, allowing creators to bring their worlds to life without writing a single line of code.

This is not just a single game; it's a self-contained ecosystem for interactive fiction, complete with user authentication, persistent save data, PWA installability, and administrative tools.

---

## ✨ Core Features

### For Players:

*   **Deeply Immersive Atmosphere:**
    *   **Dynamic Environments:** Visuals change with the story, featuring animated backgrounds and cinematic overlays.
    *   **Full Soundscape:** A complete audio experience with background music (BGM) that shifts to match the mood and a library of impactful sound effects (SFX).
    *   **Contextual Audio:** Unique **Ambient SFX** can be triggered by specific words in the dialogue, pulling you deeper into the scene (e.g., hearing a *scratching* sound when you read the word "scratching").
    *   **Cinematic Effects:** Experience screen shake during tense moments, jumpscares, and dynamic **Text Effects** (like `shake`, `whisper`, `anger`) that make dialogue feel alive.
*   **A World That Remembers You:**
    *   **Meaningful Choices:** Your decisions have tangible consequences. The game tracks four core **Player Stats** (Health, Sanity, Stamina, Morality) that influence your journey and survival.
    *   **Complex NPC Relationships:** Your choices and actions affect your relationships with other characters. Build trust or create enemies, unlocking unique dialogue and story branches based on your reputation.
    *   **Narrative Flags & Inventory:** The game uses a system of hidden flags and a full inventory to track your progress. A choice might only be available if you're carrying a specific item or have previously made a key decision.
*   **Seamless Player Experience:**
    *   **Installable & Offline-Ready:** Install Storyteller as a Progressive Web App (PWA) for a native-like experience, quick access from your home screen, and enhanced offline capabilities.
    *   **Persistent Progress:** A full user authentication system allows players to save progress. The game also features automatic checkpoints and a manual quick-save function.
    *   **Intuitive UI & Feedback:** An elegant heads-up display (HUD) shows player stats in real-time. In-game notifications provide clear feedback on stat changes, new items, and updated journal entries.
    *   **In-Game Journal & Inventory:** A comprehensive journal automatically records important lore, character profiles, and relationship statuses. The inventory keeps track of key items and clues.

### For Creators & Admins:

*   **Powerful In-App Story Editor:** The crown jewel of the platform. Admins can create and edit entire stories directly within the application.
    *   **No-Code Storytelling:** Visually build complex narrative trees. Create, link, and edit every story node (a single screen of dialogue and choices) in an intuitive interface.
    *   **Beginner-Friendly Start:** New stories begin with a built-in tutorial chapter. An expanded library of **over 20 Node Templates** allows you to add pre-configured examples for common and advanced game mechanics with a single click.
    *   **Advanced Narrative Tools:** Easily create high-stakes drama with simple UI controls for **Timed Choices** and game-ending **Death Nodes**.
    *   **Robust JSON Editor:** For advanced effects and requirements, never lose your work with a real-time validating JSON editor that highlights errors without erasing your input.
    *   **Complete Atmosphere Control:** For every node, you can define:
        *   Background Image & Music (BGM)
        *   One-shot Sound Effects (SFX)
        *   Ambient, word-triggered SFX
        *   Jumpscares (image, text, or sprite-based)
        *   Visual Effects (screen shake, glitches)
        *   Dynamic Text Effects
    *   **Complex Stateful Logic:**
        *   **Requirements:** Lock choices behind stat thresholds (`sanity > 50`), inventory items (`has 'key'`), or story flags (`met_character_x`).
        *   **Effects:** Make choices or entering a node have consequences: change stats (`morality -10`), add/remove inventory items, set/remove flags, and adjust NPC relationships.
*   **Full User Management:** An admin-only panel allows for complete management of the user base, including viewing, editing, disabling, and deleting user accounts.

---

## 🚀 How It's Unique

1.  **The Integrated Editor:** Most game engines separate the playing experience from the creation tools. Storyteller integrates them seamlessly, allowing for rapid iteration and creation within the same environment you play in. It democratizes interactive storytelling.
2.  **Server-Driven Game Engine:** Unlike many web-based games that handle logic on the client, Storyteller uses a robust Node.js backend. This ensures the integrity of the game state, prevents cheating, and allows for more complex, secure logic processing.
3.  **A Complete, Self-Contained Platform:** From user accounts and save data to the content creation system, Storyteller is a full-fledged platform, not just a one-off game. It's built to host a library of diverse stories.
4.  **Deep Focus on Immersion:** The engine is built with atmosphere in mind. Features like the `useSoundManager` hook for audio fades, the `BackgroundImageFader` component, and per-node visual effects give creators the tools to craft a truly cinematic experience.

---

## 🛠️ Technical Stack

*   **Frontend:**
    *   **Framework:** React 19
    *   **Bundler:** Vite
    *   **Animation:** Framer Motion
    *   **Icons:** Lucide React
    *   **Styling:** Global CSS-in-JS and scoped component styles.
*   **Backend:**
    *   **Framework:** Express.js 5
    *   **Database:** MongoDB with Mongoose ODM
    *   **Authentication:** JSON Web Tokens (JWT)
    *   **Password Hashing:** bcryptjs
*   **Development:**
    *   **Concurrency:** `concurrently` to run client and server simultaneously.
    *   **Environment:** Node.js

---

## 📁 Project Structure

```
storyteller/
├── client/              # React Frontend Application
│   ├── public/
│   └── src/
│       ├── components/  # Reusable React components (UI, Modals, etc.)
│       ├── hooks/       # Custom React hooks (useGameState, useTypewriter)
│       ├── App.jsx      # Main application component
│       └── index.jsx    # React entry point
├── server/              # Node.js/Express Backend
│   ├── data/          # Seed data for stories and audio
│   ├── engine/        # Core game logic (gameEngine.js)
│   ├── models/        # Mongoose schemas (User, Story)
│   ├── routes/        # API endpoints (users, stories, game)
│   ├── utils/         # Utility functions (e.g., mailer)
│   └── server.js      # Express server entry point
└── package.json         # Root project scripts
```

---

## ⚙️ Getting Started

Follow these steps to get a local instance of Storyteller running.

### 1. Prerequisites

*   **Node.js:** v20.x or higher
*   **MongoDB:** A running instance of MongoDB (local or cloud-based).

### 2. Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Storyteller.git
    cd Storyteller
    ```

2.  **Install all dependencies:**
    This command will install dependencies for the root, `client`, and `server` projects.
    ```bash
    npm run build
    ```

### 3. Environment Setup

1.  **Create a `.env` file** inside the `server/` directory.
2.  **Add your MongoDB connection string** and a JWT secret. Your file should look like this:

    ```env
    # server/.env
    MONGO_URI=mongodb://localhost:27017/storyteller
    JWT_SECRET=your_super_secret_and_long_jwt_key
    ```
    *Replace the `MONGO_URI` if your database is hosted elsewhere.*

### 4. Seed the Database

To populate the database with the initial story (`The Asylum`), run the seed script from the root directory:

```bash
npm run seed
```

### 5. Run the Application

Start both the client and server concurrently from the root directory:

```bash
npm run start
```

Your application should now be running!
*   **Client:** `http://localhost:5173` (or another port specified by Vite)
*   **Server:** `http://localhost:3001`

**Note on Admin Account:** The very first user account you register will automatically be granted `admin` privileges. Use this account to access the Story Editor and User Management panels.

---

## 🎮 The Story Engine Explained

The game's narrative progression is handled through a robust client-server architecture.

1.  **Client-Side State:** The `useGameState` hook on the client maintains the current `gameContext`, which includes the player's state (`gameState`) and the server-rendered view (`view`).
2.  **Player Action:** When a player makes a choice, the client sends an API request to `/api/game/action`. This request includes the `storyId`, the `currentState`, and the `choiceText`.
3.  **Server-Side Processing:** The Express server receives the request. The core `gameEngine.js` then:
    *   Fetches the relevant story data from MongoDB.
    *   Validates the choice against the current node.
    *   **Applies Effects:** It processes any `effects` associated with the choice (e.g., changing stats, adding inventory items).
    *   **Determines Next Node:** It finds the next node in the story graph.
    *   **Applies Node Effects:** It processes any `effects` associated with *entering* the new node.
    *   **Checks for Death:** If the new node is a death state, it returns a `DEATH` status.
4.  **ViewModel Generation:** The engine generates a new `ViewModel` containing the updated `gameState` and the data needed to render the new scene (dialogue, choices, speaker, etc.).
5.  **Client-Side Update:** The client receives the new `gameContext`, updates its state, and the React UI re-renders to show the next part of the story.

This server-driven approach ensures that all game logic is validated and processed securely, creating a consistent and cheat-resistant experience.
