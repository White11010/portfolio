export type PostLang = 'en' | 'ru';

export type PostPlatform = 'medium' | 'habr' | 'devto';

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  lang: PostLang;
  platform: PostPlatform;
  date: string;
  readingTime: string;
  tags: string[];
  externalUrl: string;
  projectSlug?: string;
}

function sortPostsByDateDesc(items: Post[]): Post[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

const postsData: Post[] = [
  {
    slug: 'props-watch-two-hours-left',
    title: 'Props, watch, два часа до конца рабочего дня',
    excerpt: 'Передача всего объекта props в watch срабатывает при любом изменении свойства, что приводит к ненужным повторным вызовам или запутанным ручным сравнениям. Разберем, почему это происходит в системе реактивности Vue 3 и как разделение на точечные вотчеры сохраняет ваш код чистым.',
    lang: 'ru',
    platform: 'habr',
    date: '2026-06-10',
    readingTime: '3 min',
    tags: ['TypeScript', 'Vue', 'Architecture', 'ESLint', 'Open Source'],
    externalUrl: 'https://habr.com/ru/articles/1045941/',
    projectSlug: 'eslint-plugin-vue-arch',
  },
  {
    slug: 'stop-returning-null-option-type',
    title: 'Stop Returning null: A Tiny Option<T> for TypeScript',
    excerpt:
      'Why optional chaining is not enough when nullability leaks through your domain model — and how a lightweight Option type keeps errors explicit.',
    lang: 'en',
    platform: 'medium',
    date: '2026-05-12',
    readingTime: '5 min',
    tags: ['TypeScript', 'Open Source'],
    externalUrl: 'https://medium.com/p/3003a868a62c',
    projectSlug: 'nevernullable',
  },
  {
    slug: 'grin-rust-cli-codebase-map',
    title: 'I Built a Rust CLI in 3 Days That Maps Any Codebase Instantly — The Hardest Bug Wasn\'t Rust',
    excerpt: 'A story about a new job, unfamiliar repositories, and the one Windows bug that almost broke everything. How GRIN — a git analytics CLI — went from a weekend idea to a working tool, and what parsing git log output on legacy Windows terminals taught me about assumptions.',
    lang: 'en',
    platform: 'medium',
    date: '2026-05-26',
    readingTime: '6 min',
    tags: ['Rust', 'Open Source'],
    externalUrl: 'https://medium.com/@beliavski26/i-built-a-rust-cli-in-3-days-that-maps-any-codebase-instantly-the-hardest-bug-wasnt-rust-5680a4460c76',
    projectSlug: 'grin',
  },
  {
    slug: 'cursor-slow-large-projects-config',
    title: 'Cursor Feels Slow on Large Projects? You\'re Probably Missing This One Config',
    excerpt: 'How .cursorignore, a quick cache reset, and .cursorrules can cut AI indexing overhead and restore your sanity.',
    lang: 'en',
    platform: 'medium',
    date: '2026-05-27',
    readingTime: '3 min',
    tags: ['Tooling'],
    externalUrl: 'https://medium.com/@beliavski26/cursor-feels-slow-on-large-projects-youre-probably-missing-this-one-config-0b63943eab0e',
  },
  {
    slug: 'vue-reactivity-props-watch-cost',
    title: 'Vue Reactivity Mechanics: The Cost of Passing the Entire props Object to watch, and Automating the Control',
    excerpt: 'Passing a reactive object directly to watch triggers on every property change, not just the ones you care about. A look at why this happens inside Vue\'s Proxy-based reactivity system, and how to automate the check with an ESLint rule.',
    lang: 'en',
    platform: 'medium',
    date: '2026-06-08',
    readingTime: '3 min',
    tags: ['TypeScript', 'Vue', 'Architecture', 'ESLint', 'Open Source'],
    externalUrl: 'https://medium.com/@beliavski26/vue-reactivity-mechanics-the-cost-of-passing-the-entire-props-object-to-watch-and-automating-the-8e1afdc38073',
    projectSlug: 'eslint-plugin-vue-arch',
  },
];

export const posts = sortPostsByDateDesc(postsData);

export const blogTags = [...new Set(posts.flatMap((post) => post.tags))].sort();

export function getPostsByProject(projectSlug: string): Post[] {
  return posts.filter((post) => post.projectSlug === projectSlug);
}
