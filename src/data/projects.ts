export interface Project {
  slug: string;
  emoji: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  github: string;
  npm?: string;
  demo?: string;
  decisions: string[];
}

export const projects: Project[] = [
  {
    slug: 'chess-analyzer',
    emoji: '♟',
    title: 'Chess Analyzer',
    description: 'Desktop app for chess game analysis and move suggestions.',
    longDescription:
      'Chess Analyzer is a cross-platform desktop application built with Electron that provides deep analysis of chess games. It integrates the Stockfish engine to evaluate positions and suggest optimal moves. The application supports PGN file import and export, replay with variant exploration, and a clean distraction-free interface for focused study.\n\nThe project was born from a personal need to review my own games more efficiently. Existing tools were either too complex or lacked a modern interface. Chess Analyzer focuses on simplicity — load a game, analyze it, and understand where things went wrong.\n\nPerformance was a key consideration. The Stockfish engine runs in a separate process to keep the UI responsive, and position evaluations are cached to avoid redundant computation when navigating back and forth through a game.',
    tags: ['Electron', 'TypeScript', 'Chess.js'],
    github: 'https://github.com/alexivanov/chess-analyzer',
    demo: 'https://chess-analyzer.dev',
    decisions: [
      'Chose Electron over Tauri for broader OS support and easier IPC with the Stockfish WASM build',
      'Implemented a position cache with Zobrist hashing to skip re-evaluation of previously analyzed board states',
    ],
  },
  {
    slug: 'option-type',
    emoji: '📦',
    title: 'Option Type Library',
    description: 'npm library bringing Option/Maybe type to TypeScript.',
    longDescription:
      'Option Type Library is a lightweight npm package that introduces the Option (also known as Maybe) monad to TypeScript. It provides a type-safe way to handle nullable values without resorting to null checks or optional chaining throughout your codebase.\n\nThe library offers two variants — Some and None — with a full set of functional combinators like map, flatMap, filter, and fold. It also includes utility functions for converting to and from nullable types, making adoption in existing projects straightforward.\n\nThe implementation is zero-dependency and tree-shakeable, resulting in a minimal footprint when only a subset of functions is used. Full API documentation with interactive examples is available on the project site.',
    tags: ['TypeScript', 'npm', 'FP'],
    github: 'https://github.com/alexivanov/option-type',
    npm: 'https://www.npmjs.com/package/@aivanov/option-type',
    decisions: [
      'Used a discriminated union with a readonly tag field instead of class instances for better serialization and pattern matching',
      'Designed the API surface to mirror Rust Option rather than Haskell Maybe — developers find it more intuitive',
    ],
  },
  {
    slug: 'browser-economy',
    emoji: '🌐',
    title: 'Browser Economy Game',
    description: 'Text-based economic strategy game playable in the browser.',
    longDescription:
      'Browser Economy Game is a text-based economic simulation that runs entirely in the browser. Players manage a virtual economy — setting tax rates, investing in industries, and responding to random events like market crashes or tech booms.\n\nThe game is turn-based, with each turn representing one fiscal quarter. Decisions compound over time, so early investments in education and infrastructure pay off decades later. A simple but effective event system keeps each playthrough unpredictable.\n\nAll game state is persisted in localStorage, so progress survives page reloads. The UI is minimal by design — text and numbers — because the focus is on strategic depth rather than visual spectacle. The entire codebase is vanilla JavaScript with no build step.',
    tags: ['JavaScript', 'Game Dev', 'Browser'],
    github: 'https://github.com/alexivanov/browser-economy',
    demo: 'https://economy-game.ivanov.dev',
    decisions: [
      'Went with vanilla JS and no framework to keep the deployment simple — just open index.html and play',
      'Chose localStorage over IndexedDB for state persistence since the serialized game state stays under 100KB',
    ],
  },
];
