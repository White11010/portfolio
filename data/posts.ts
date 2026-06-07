import type { LocalizedText } from '@/lib/i18n';
import {
  POST_CHESS_ANALYZER_EN,
  POST_CHESS_ANALYZER_RU,
  POST_FUNCTIONAL_PATTERNS_EN,
  POST_FUNCTIONAL_PATTERNS_RU,
  POST_OPTIONAL_CHAINING_EN,
  POST_OPTIONAL_CHAINING_RU,
} from '@/data/post-bodies';

export interface Post {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  date: string;
  readingTime: LocalizedText;
  tags: string[];
  external?: boolean;
  externalUrl?: string;
  body: LocalizedText;
}

export const blogTags = ['TypeScript', 'Architecture', 'Open Source', 'Game Dev'];

export const posts: Post[] = [
  {
    slug: 'optional-chaining-vs-option-type',
    title: {
      en: 'Optional Chaining vs Option Type: When Safety Matters',
      ru: 'Optional Chaining vs Option Type: когда важна безопасность',
    },
    excerpt: {
      en: 'Optional chaining is convenient, but it silently swallows nulls. Here is why an explicit Option type can save you from subtle bugs in larger codebases.',
      ru: 'Optional chaining удобен, но молча проглатывает null. Почему явный тип Option спасает от тонких багов в больших кодовых базах.',
    },
    date: '2026-03-14',
    readingTime: { en: '8 min', ru: '8 мин' },
    tags: ['TypeScript', 'Architecture'],
    body: {
      en: POST_OPTIONAL_CHAINING_EN,
      ru: POST_OPTIONAL_CHAINING_RU,
    },
  },
  {
    slug: 'building-chess-analyzer',
    title: {
      en: 'Building Chess Analyzer: Architecture Lessons from a Side Project',
      ru: 'Создание Chess Analyzer: архитектурные уроки side-проекта',
    },
    excerpt: {
      en: 'What I learned about Electron IPC, engine integration, and keeping a desktop app responsive while running heavy computation in the background.',
      ru: 'Чему научился про Electron IPC, интеграцию движка и отзывчивость десктопного приложения при тяжёлых вычислениях в фоне.',
    },
    date: '2026-01-22',
    readingTime: { en: '12 min', ru: '12 мин' },
    tags: ['Architecture', 'Open Source'],
    body: {
      en: POST_CHESS_ANALYZER_EN,
      ru: POST_CHESS_ANALYZER_RU,
    },
  },
  {
    slug: 'functional-patterns-in-game-dev',
    title: {
      en: 'Functional Patterns in Game Development',
      ru: 'Функциональные паттерны в разработке игр',
    },
    excerpt: {
      en: 'How I applied functional programming ideas — immutability, pure functions, and composition — to a browser-based economy game and why it made the code easier to test and extend.',
      ru: 'Как применил идеи функционального программирования — иммутабельность, чистые функции и композицию — в браузерной экономической игре и почему код стало проще тестировать и расширять.',
    },
    date: '2025-11-08',
    readingTime: { en: '10 min', ru: '10 мин' },
    tags: ['TypeScript', 'Game Dev', 'Open Source'],
    body: {
      en: POST_FUNCTIONAL_PATTERNS_EN,
      ru: POST_FUNCTIONAL_PATTERNS_RU,
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
