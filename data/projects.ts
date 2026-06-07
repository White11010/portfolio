import type { LocalizedText } from '@/lib/i18n';

export interface Project {
  slug: string;
  emoji: string;
  title: LocalizedText;
  description: LocalizedText;
  longDescription: LocalizedText;
  tags: string[];
  github: string;
  npm?: string;
  demo?: string;
  decisions: LocalizedText[];
}

export const projects: Project[] = [
  {
    slug: 'chess-analyzer',
    emoji: '♟',
    title: { en: 'Chess Analyzer', ru: 'Chess Analyzer' },
    description: {
      en: 'Desktop app for chess game analysis and move suggestions.',
      ru: 'Десктопное приложение для анализа шахматных партий и подсказок ходов.',
    },
    longDescription: {
      en: 'Chess Analyzer is a cross-platform desktop application built with Electron that provides deep analysis of chess games. It integrates the Stockfish engine to evaluate positions and suggest optimal moves. The application supports PGN file import and export, replay with variant exploration, and a clean distraction-free interface for focused study.\n\nThe project was born from a personal need to review my own games more efficiently. Existing tools were either too complex or lacked a modern interface. Chess Analyzer focuses on simplicity — load a game, analyze it, and understand where things went wrong.\n\nPerformance was a key consideration. The Stockfish engine runs in a separate process to keep the UI responsive, and position evaluations are cached to avoid redundant computation when navigating back and forth through a game.',
      ru: 'Chess Analyzer — кроссплатформенное десктопное приложение на Electron для глубокого анализа шахматных партий. Интегрирует движок Stockfish для оценки позиций и подсказки оптимальных ходов. Поддерживает импорт и экспорт PGN, просмотр с разбором вариантов и чистый интерфейс без отвлечений.\n\nПроект родился из личной потребности эффективнее разбирать свои партии. Существующие инструменты были либо слишком сложными, либо без современного интерфейса. Chess Analyzer делает ставку на простоту — загрузил партию, проанализировал, понял, где ошибся.\n\nПроизводительность была ключевым приоритетом. Stockfish работает в отдельном процессе, чтобы UI оставался отзывчивым, а оценки позиций кешируются, чтобы не пересчитывать их при навигации по партии.',
    },
    tags: ['Electron', 'TypeScript', 'Chess.js'],
    github: 'https://github.com/alexivanov/chess-analyzer',
    demo: 'https://chess-analyzer.dev',
    decisions: [
      {
        en: 'Chose Electron over Tauri for broader OS support and easier IPC with the Stockfish WASM build',
        ru: 'Выбрал Electron вместо Tauri для лучшей поддержки ОС и более простого IPC с WASM-сборкой Stockfish',
      },
      {
        en: 'Implemented a position cache with Zobrist hashing to skip re-evaluation of previously analyzed board states',
        ru: 'Реализовал кеш позиций с Zobrist-хешированием, чтобы не переоценивать уже проанализированные состояния доски',
      },
    ],
  },
  {
    slug: 'option-type',
    emoji: '📦',
    title: { en: 'Option Type Library', ru: 'Option Type Library' },
    description: {
      en: 'npm library bringing Option/Maybe type to TypeScript.',
      ru: 'npm-библиотека, добавляющая тип Option/Maybe в TypeScript.',
    },
    longDescription: {
      en: 'Option Type Library is a lightweight npm package that introduces the Option (also known as Maybe) monad to TypeScript. It provides a type-safe way to handle nullable values without resorting to null checks or optional chaining throughout your codebase.\n\nThe library offers two variants — Some and None — with a full set of functional combinators like map, flatMap, filter, and fold. It also includes utility functions for converting to and from nullable types, making adoption in existing projects straightforward.\n\nThe implementation is zero-dependency and tree-shakeable, resulting in a minimal footprint when only a subset of functions is used. Full API documentation with interactive examples is available on the project site.',
      ru: 'Option Type Library — лёгкий npm-пакет, который вводит монаду Option (Maybe) в TypeScript. Даёт типобезопасный способ работать с nullable-значениями без постоянных null-проверок и optional chaining по всему коду.\n\nБиблиотека предлагает два варианта — Some и None — с полным набором функциональных комбинаторов: map, flatMap, filter, fold. Есть утилиты для конвертации в nullable-типы и обратно, что упрощает внедрение в существующие проекты.\n\nРеализация без зависимостей и с tree-shaking — минимальный footprint, если используется только часть API. Полная документация с интерактивными примерами доступна на сайте проекта.',
    },
    tags: ['TypeScript', 'npm', 'FP'],
    github: 'https://github.com/alexivanov/option-type',
    npm: 'https://www.npmjs.com/package/@aivanov/option-type',
    decisions: [
      {
        en: 'Used a discriminated union with a readonly tag field instead of class instances for better serialization and pattern matching',
        ru: 'Использовал discriminated union с readonly tag вместо классов — лучше сериализация и pattern matching',
      },
      {
        en: 'Designed the API surface to mirror Rust Option rather than Haskell Maybe — developers find it more intuitive',
        ru: 'API повторяет Rust Option, а не Haskell Maybe — разработчикам так привычнее',
      },
    ],
  },
  {
    slug: 'browser-economy',
    emoji: '🌐',
    title: { en: 'Browser Economy Game', ru: 'Browser Economy Game' },
    description: {
      en: 'Text-based economic strategy game playable in the browser.',
      ru: 'Текстовая экономическая стратегия, работающая в браузере.',
    },
    longDescription: {
      en: 'Browser Economy Game is a text-based economic simulation that runs entirely in the browser. Players manage a virtual economy — setting tax rates, investing in industries, and responding to random events like market crashes or tech booms.\n\nThe game is turn-based, with each turn representing one fiscal quarter. Decisions compound over time, so early investments in education and infrastructure pay off decades later. A simple but effective event system keeps each playthrough unpredictable.\n\nAll game state is persisted in localStorage, so progress survives page reloads. The UI is minimal by design — text and numbers — because the focus is on strategic depth rather than visual spectacle. The entire codebase is vanilla JavaScript with no build step.',
      ru: 'Browser Economy Game — текстовая экономическая симуляция, полностью работающая в браузере. Игрок управляет виртуальной экономикой: ставит налоги, инвестирует в отрасли и реагирует на случайные события — кризисы, технологические бумы.\n\nИгра пошаговая: один ход — один финансовый квартал. Решения накапливаются со временем, поэтому ранние вложения в образование и инфраструктуру окупаются через десятилетия. Простая, но эффективная система событий делает каждое прохождение непредсказуемым.\n\nСостояние сохраняется в localStorage — прогресс переживает перезагрузку страницы. UI минималистичен — текст и цифры — потому что фокус на стратегической глубине, а не на визуале. Весь код — vanilla JavaScript без сборки.',
    },
    tags: ['JavaScript', 'Game Dev', 'Browser'],
    github: 'https://github.com/alexivanov/browser-economy',
    demo: 'https://economy-game.ivanov.dev',
    decisions: [
      {
        en: 'Went with vanilla JS and no framework to keep the deployment simple — just open index.html and play',
        ru: 'Vanilla JS без фреймворка — простой деплой: открыл index.html и играешь',
      },
      {
        en: 'Chose localStorage over IndexedDB for state persistence since the serialized game state stays under 100KB',
        ru: 'localStorage вместо IndexedDB — сериализованное состояние игры меньше 100KB',
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
