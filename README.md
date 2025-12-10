# The Rustspire - Interactive Storytelling Game

A web-based interactive storytelling game set in a sci-fi world inspired by Romeo & Juliet, featuring Kael (Brinefolk Diver) and Lyra (Skyborn heir) in a vertical tower society.

## Features

- **Multi-ending narrative** with 5 distinct endings
- **Stateful branching** - choices affect trust, relationships, and story outcomes
- **Dynamic scenes** - story text and choices adapt based on your decisions
- **Beautiful dark oceanic sci-fi theme**
- **Keyboard shortcuts** - press 1-9 to select choices
- **Visual progression** - track your journey through the Rustspire levels

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (typically `http://localhost:5173`)

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment to GitHub Pages

The project is configured to deploy to GitHub Pages automatically via GitHub Actions.

1. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`

2. **The workflow will automatically**:
   - Build the project when you push to `main`
   - Deploy to GitHub Pages

3. **If deploying manually**:
   ```bash
   npm run build
   ```
   Then push the `dist` folder contents to the `gh-pages` branch.

**Note**: If your repository name is different from `Final-prototype`, update the `base` path in `vite.config.ts` to match your repository name.

## Story Structure

The game features:
- **Act I**: Ascent from the Sea (setup and world-building)
- **Act II**: Crossed Paths (Kael and Lyra's meetings)
- **Act III**: Forking Futures (multiple endings based on your choices)

### Endings

1. **Tragic** - "Fall of Kael" - Kael is killed, system remains unchanged
2. **Bittersweet** - "Whispered Reforms" - Quiet changes from within
3. **Revolt** - "Rustspire Burns" - Brinefolk uprising
4. **Reform** - "Shared Horizon" - New council, hope for the future
5. **Secret** - "Return to the Tides" - Escape to search for other possibilities

## Controls

- **Mouse**: Click on choice buttons
- **Keyboard**: Press number keys (1-9) to select corresponding choices
- **Restart**: After reaching an ending, click "Restart from Sea"

## Project Structure

```
src/
├── main.tsx              # Entry point
├── App.tsx               # Main app component with layout
├── story/
│   ├── types.ts          # TypeScript types and interfaces
│   ├── storyData.ts      # All scenes and story content
│   └── StoryEngine.tsx   # Core story engine hook
├── components/
│   ├── ChoiceButton.tsx  # Choice button component
│   ├── TowerSidebar.tsx  # Tower level progression
│   └── RelationshipMeter.tsx # Trust/relationship visualization
└── styles.css            # Dark oceanic sci-fi theme
```

## Technologies

- React 18
- TypeScript
- Vite
- CSS3 (with animations and gradients)
