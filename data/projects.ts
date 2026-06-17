import type { LocalizedText } from '@/lib/i18n';

export type ProjectStatus = 'released' | 'in-development';

export interface Project {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  longDescription: LocalizedText;
  tags: string[];
  github: string;
  npm?: string;
  demo?: string;
  status: ProjectStatus;
  version?: string;
  image?: {
    src: string;
    width: number;
    height: number;
  };
  articles?: { title: LocalizedText; url: string }[];
  decisions: LocalizedText[];
}

/** Display order for project lists (home, /projects). Edit slugs here only. */
export const projectOrder = [
  'eslint-plugin-vue-arch',
  'blindspot',
  'nevernullable',
  'kanban-app',
  'grin',
  'guildmaster',
  'portfolio',
] as const;

export type ProjectSlug = (typeof projectOrder)[number];

export const projects: Project[] = [
  {
    slug: 'eslint-plugin-vue-arch',
    title: { en: 'eslint-plugin-vue-arch', ru: 'eslint-plugin-vue-arch' },
    description: {
      en: 'ESLint plugin for Vue 3 / TypeScript — architectural rules that enforce explicit dependencies and predictable reactivity.',
      ru: 'ESLint-плагин для Vue 3 / TypeScript — архитектурные правила, которые требуют явных зависимостей и предсказуемой реактивности.',
    },
    longDescription: {
      en: 'eslint-plugin-vue-arch is an ESLint plugin with architectural rules for Vue 3 and TypeScript codebases. It targets patterns that scale poorly as a project grows — implicit reactivity dependencies, accidental deep watching, and unclear data flow in Composition API code.\n\nThe first rule, no-watch-entire-props, disallows passing the entire props object to watch or watchEffect. In Vue 3, props is a reactive proxy; watching it wholesale forces deep traversal of every property on every change. The rule catches bare watch(props, ...) calls, defineProps() aliases, and getter wrappers like watch(() => props, ...) that still resolve to the whole object.',
      ru: 'eslint-plugin-vue-arch — ESLint-плагин с архитектурными правилами для проектов на Vue 3 и TypeScript. Ловит паттерны, которые плохо масштабируются по мере роста кодовой базы: неявные зависимости реактивности, случайный deep watch и неочевидный поток данных в Composition API.\n\nПервое правило, no-watch-entire-props, запрещает передавать весь объект props в watch или watchEffect. В Vue 3 props — реактивный proxy; наблюдение за ним целиком заставляет Vue делать deep traversal всех свойств при каждом изменении. Правило ловит голые watch(props, ...), алиасы из defineProps() и геттеры вроде watch(() => props, ...), которые всё равно возвращают весь объект.',
    },
    tags: ['TypeScript', 'ESLint', 'Vue', 'npm', 'AST'],
    github: 'https://github.com/White11010/eslint-plugin-vue-arch',
    npm: 'https://www.npmjs.com/package/eslint-plugin-vue-arch',
    status: 'released',
    version: 'v1.0.0',
    image: {
      src: '/projects/eslint-plugin-vue-arch.png',
      width: 1704,
      height: 588,
    },
    decisions: [
      {
        en: 'Getter wrappers that return the entire props object are caught via AST analysis of single-return getters, so watch(() => props, ...) is reported for the same reason as bare watch(props, ...).',
        ru: 'Геттеры, возвращающие весь объект props, ловятся через AST-анализ single-return геттеров — watch(() => props, ...) попадает под правило по той же причине, что и watch(props, ...).',
      },
      {
        en: 'defineProps() aliases are tracked via scope analysis, so const p = defineProps(); watch(p, ...) is caught regardless of the identifier name.',
        ru: 'Алиасы defineProps() отслеживаются через scope analysis — const p = defineProps(); watch(p, ...) ловится независимо от имени переменной.',
      },
      {
        en: 'Tests run against real .vue SFCs with a dual-parser setup (vue-eslint-parser + @typescript-eslint/parser), because plain .ts snippets miss SFC-specific parser quirks and setup(props) patterns.',
        ru: 'Тесты на реальных .vue SFC с dual-parser (vue-eslint-parser + @typescript-eslint/parser) — .ts-сниппеты пропускают SFC-специфику парсера и паттерны setup(props).',
      },
      {
        en: 'Shared AST utilities extracted upfront into separate modules so that adding future rules for composable boundaries or provide/inject patterns requires no structural refactoring.',
        ru: 'Общие AST-утилиты вынесены заранее в отдельные модули — добавление правил для границ composable или паттернов provide/inject не потребует рефакторинга структуры.',
      },
    ],
  },
  {
    slug: 'blindspot',
    title: { en: 'Blindspot', ru: 'Blindspot' },
    description: {
      en: 'Local-first desktop app for Lichess players — sync games, run Stockfish analysis, surface chess patterns, and compare head-to-head in Versus.',
      ru: 'Local-first десктопное приложение для игроков Lichess — синхронизация партий, анализ Stockfish, выявление шахматных паттернов и сравнение в Versus.',
    },
    longDescription: {
      en: 'Blindspot is a local-first desktop application for Lichess players. It syncs your game library via the HTTP API, runs Stockfish analysis entirely on your machine, and turns results into insights across openings, tactics, time controls, blunder patterns, and opponent rating bands. Games, analysis rows, and generated insights live in a local SQLite database; the Lichess token is stored in the OS credential keyring.\n\nThe UI is Vue 3 + Vuetify 4 + Pinia + TanStack Query, organized by Feature-Sliced Design. The desktop shell is Tauri 2: the frontend invokes Rust commands for sync, analysis, insight generation, Versus comparison, and engine control. Stockfish runs as a bundled native binary over UCI stdin/stdout behind a process-global mutex. Background batch analysis emits Tauri events so the UI stays responsive while the engine processes the library.',
      ru: 'Blindspot — local-first десктопное приложение для игроков Lichess. Синхронизирует библиотеку партий через HTTP API, запускает анализ Stockfish на вашей машине и превращает результаты в insights по дебютам, тактике, контролям времени, паттернам ошибок и рейтингу соперников. Партии, строки анализа и insights хранятся в локальной SQLite; токен Lichess — в OS credential keyring.\n\nUI — Vue 3 + Vuetify 4 + Pinia + TanStack Query по Feature-Sliced Design. Desktop-оболочка — Tauri 2: фронтенд вызывает Rust-команды для синхронизации, анализа, генерации insights, Versus и управления движком. Stockfish работает как нативный бинарник по UCI stdin/stdout за process-global mutex. Фоновый batch-анализ эмитит Tauri-события, чтобы UI оставался отзывчивым.',
    },
    tags: ['Tauri', 'Vue 3', 'Rust', 'TypeScript', 'Stockfish', 'Chess', 'Lichess'],
    github: 'https://github.com/White11010/Blindspot',
    status: 'in-development',
    version: 'v0.1.0',
    decisions: [
      {
        en: 'Tauri 2 over Electron, because native Stockfish subprocess, SQLite via rusqlite, and Lichess HTTP sync all map naturally to Rust commands without a separate native or WASM engine integration path.',
        ru: 'Tauri 2 вместо Electron — нативный subprocess Stockfish, SQLite через rusqlite и HTTP-синк с Lichess естественно ложатся на Rust-команды без отдельного native- или WASM-пути для движка.',
      },
      {
        en: 'Lichess token stored in the OS keyring rather than SQLite, because SQLite backups and DB inspection would become a secret-leak surface.',
        ru: 'Токен Lichess в OS keyring, а не в SQLite — бэкапы и инспекция БД стали бы поверхностью утечки секретов.',
      },
      {
        en: 'Single global Stockfish process behind a mutex over per-invoke spawns, because spawning per game dominates batch time on UCI handshake alone.',
        ru: 'Один глобальный процесс Stockfish за mutex вместо spawn на каждый invoke — новый движок на каждую партию съедает batch-анализ на одних UCI-handshake.',
      },
      {
        en: 'Insight generation runs in Rust over the full library rather than in the Vue layer, to avoid shipping large game corpora to the renderer and keep sample-size gates consistent without frontend orchestration.',
        ru: 'Генерация insights в Rust по всей библиотеке, а не во Vue-слое — не нужно гонять большие корпуса партий в renderer, а sample-size gates остаются консистентными без оркестрации на фронте.',
      },
      {
        en: 'Versus runs Stockfish analysis on opponent games without persisting results to SQLite, because storing opponent analysis rows would bloat the user database with foreign libraries.',
        ru: 'Versus запускает анализ Stockfish для партий соперника без записи в SQLite — сохранение чужих analysis rows раздуло бы БД.',
      },
      {
        en: 'Precomputed pentagons by rating bucket shipped with the app over computing population norms on each render, because this keeps first-load latency low regardless of how many games the user has synced.',
        ru: 'Предвычисленные pentagon по рейтинговым бакетам поставляются вместе с приложением вместо вычисления норм при каждом рендере — это даёт низкую latency независимо от числа синхронизированных партий.',
      },
      {
        en: 'createMemoryHistory for Tauri routing, because memory history avoids browser URL semantics in a desktop webview where the shell does not own navigation.',
        ru: 'createMemoryHistory для роутинга в Tauri — memory history избегает browser URL semantics в desktop webview, где оболочка не управляет навигацией.',
      },
    ],
  },
  {
    slug: 'nevernullable',
    title: { en: 'nevernullable', ru: 'nevernullable' },
    description: {
      en: 'Zero-dependency Option<T> for TypeScript — a typed alternative to null checks and optional chaining.',
      ru: 'Zero-dependency Option<T> для TypeScript — типизированная альтернатива null-проверкам и optional chaining.',
    },
    longDescription: {
      en: 'nevernullable is a TypeScript library that introduces Option<T> — two variants, Some<T> and None — for working with values that may be absent. The API covers map, andThen, filter, match, zip, flatten, and fromNullable. None is a shared singleton, so both isSome()/isNone() checks and strict equality against None work as expected.\n\nThe library ships dual ESM + CJS, weighs ~3 KB min+gzip, and has no runtime dependencies. Promise interop is built into the factory: Option(promise) returns Promise<Option<NonNullable<T>>>. Options implement Symbol.iterator, composing with for...of, spread, and Array.prototype.flatMap without adapters. Result<T, E> is planned for a future release.',
      ru: 'nevernullable — TypeScript-библиотека, которая вводит Option<T>: два варианта, Some<T> и None, для работы со значениями, которые могут отсутствовать. API включает map, andThen, filter, match, zip, flatten и fromNullable. None — разделяемый синглтон, поэтому работают и проверки isSome()/isNone(), и строгое сравнение с None.\n\nБиблиотека поставляется в dual ESM + CJS, весит ~3 KB min+gzip и не имеет runtime-зависимостей. Promise interop встроен в фабрику: Option(promise) возвращает Promise<Option<NonNullable<T>>>. Option реализует Symbol.iterator и работает с for...of, spread и Array.prototype.flatMap без адаптеров. Result<T, E> запланирован в следующем релизе.',
    },
    tags: ['TypeScript', 'npm', 'Functional Programming'],
    github: 'https://github.com/White11010/nevernullable',
    npm: 'https://www.npmjs.com/package/nevernullable',
    status: 'released',
    version: 'v2.0.0',
    articles: [
      {
        title: {
          en: 'Stop Returning null: A Tiny Option<T> for TypeScript That Actually Pulls Its Weight',
          ru: 'Перестаньте возвращать null: крошечный Option<T> для TypeScript, который реально работает',
        },
        url: 'https://medium.com/@beliavski26/stop-returning-null-a-tiny-option-t-for-typescript-that-actually-pulls-its-weight-3003a868a62c',
      },
    ],
    image: {
      src: '/projects/nevernullable.png',
      height: 684,
      width: 1460,
    },
    decisions: [
      {
        en: 'None is a shared frozen singleton rather than a constructor call, so every None-producing path returns the same instance and result === None works as a reliable identity check.',
        ru: 'None — разделяемый замороженный синглтон, а не вызов конструктора — каждый путь, возвращающий None, отдаёт один экземпляр, что делает result === None надёжной проверкой по идентичности.',
      },
      {
        en: 'Option(promise) returns Promise<Option<NonNullable<T>>> rather than Option<Promise<T>>, because wrapping a promise in an Option combines two independent layers of uncertainty into one value that is awkward to consume.',
        ru: 'Option(promise) возвращает Promise<Option<NonNullable<T>>>, а не Option<Promise<T>> — оборачивание промиса в Option объединяет два независимых уровня неопределённости в одно значение, которое неудобно использовать.',
      },
      {
        en: 'Some(null) and Some(undefined) throw TypeError since v2.0.0, because in v1.x they produced a "fake Some" that contradicted its own type at runtime.',
        ru: 'Some(null) и Some(undefined) бросают TypeError с v2.0.0 — в v1.x они создавали "фейковый Some", противоречащий собственному типу в runtime.',
      },
      {
        en: 'Option implements Symbol.iterator (Some yields once, None yields nothing), making Options directly usable in for...of, spread, and flatMap without explicit unwrap adapters.',
        ru: 'Option реализует Symbol.iterator (Some отдаёт значение один раз, None — ничего) — Options напрямую работают в for...of, spread и flatMap без явных unwrap-адаптеров.',
      },
    ],
  },
  {
    slug: 'grin',
    title: { en: 'GRIN', ru: 'GRIN' },
    description: {
      en: 'CLI tool for git repository analytics — timeline, contributors, and file churn in the terminal.',
      ru: 'CLI-инструмент для аналитики git-репозиториев — хронология, контрибьюторы и файловый churn в терминале.',
    },
    longDescription: {
      en: 'GRIN (Git Repo INsights) is a command-line tool that reads git log output and presents three views: commit activity over time with yearly sparklines (timeline), contributor breakdown by commit type (who), and files ranked by change frequency with optional extension filtering (churn).\n\nThe tool has no external dependencies and requires only git on PATH. It is installable via cargo install grin, a shell script, or prebuilt binaries for Linux, macOS, and Windows.\n\nThe immediate use case was onboarding to an unfamiliar codebase — specifically, getting a rough sense of which files see active development and which are effectively stable without reading the entire history manually.',
      ru: 'GRIN (Git Repo INsights) — утилита командной строки, которая читает вывод git log и предоставляет три представления: активность коммитов по времени со спарклайнами по годам (timeline), разбивка контрибьюторов по типу коммитов (who), файлы отсортированные по частоте изменений с опциональной фильтрацией по расширению (churn).\n\nИнструмент не имеет внешних зависимостей и требует только git в PATH. Устанавливается через cargo install grin, shell-скрипт или prebuilt-бинарники для Linux, macOS и Windows.\n\nНепосредственный сценарий использования — онбординг в незнакомую кодовую базу: быстро понять, какие файлы активно меняются, а какие фактически стабильны, без ручного просмотра всей истории.',
    },
    tags: ['Rust', 'CLI', 'Git'],
    github: 'https://github.com/White11010/GRIN',
    status: 'released',
    version: 'v0.1.4',
    articles: [
      {
        title: {
          en: 'I Built a Rust CLI in 3 Days That Maps Any Codebase Instantly',
          ru: 'Я написал Rust CLI за 3 дня, который мгновенно картирует любую кодовую базу',
        },
        url: 'https://medium.com/@beliavski26/i-built-a-rust-cli-in-3-days-that-maps-any-codebase-instantly-the-hardest-bug-wasnt-rust-5680a4460c76',
      },
    ],
    image: {
      src: '/projects/grin.webp',
      height: 324,
      width: 1101,
    },
    decisions: [
      {
        en: 'Parses git log output directly rather than using git2-rs, because libgit2 bindings add a native compile-time dependency for what is a read-only log traversal.',
        ru: 'Парсинг вывода git log напрямую вместо git2-rs — биндинги к libgit2 добавляют нативную зависимость на этапе компиляции для задачи, которая сводится к чтению лога.',
      },
      {
        en: 'Sparklines via Unicode block characters to stdout rather than ratatui, because ratatui takes over the terminal and manages its own event loop which breaks pipes and redirects.',
        ru: 'Спарклайны через Unicode block characters в stdout вместо ratatui — ratatui перехватывает терминал и управляет собственным event loop, что ломает пайпы и редиректы.',
      },
      {
        en: '--ascii and --no-color implemented as first-class flags (respecting NO_COLOR and GRIN_ASCII env vars) after a post-release discovery that Windows terminals on legacy code pages 437/1252 render block characters as empty boxes.',
        ru: '--ascii и --no-color реализованы как полноценные опции (с поддержкой NO_COLOR и GRIN_ASCII) после обнаружения после релиза, что Windows-терминалы со старыми кодовыми страницами 437/1252 отображают block characters как пустые квадраты.',
      },
      {
        en: 'Separate subcommands (timeline / who / churn) rather than a single combined output, so each command is independently useful in pipes and flags like --ext stay scoped to where they are meaningful.',
        ru: 'Отдельные сабкоманды (timeline / who / churn) вместо единого вывода — каждая команда самодостаточна в пайпах, а флаги вроде --ext остаются в области видимости только тех команд, где они осмысленны.',
      },
    ],
  },
  {
    slug: 'kanban-app',
    title: { en: 'Kanban App', ru: 'Kanban App' },
    description: {
      en: 'Microservices task manager — three independent services with gRPC, Kafka, and a Rust notification layer.',
      ru: 'Микросервисный таск-менеджер — три независимых сервиса с gRPC, Kafka и сервисом уведомлений на Rust.',
    },
    longDescription: {
      en: 'Kanban App is a task management system built as a polyrepo microservices project. Three services: auth-service (TypeScript, Fastify, Prisma, PostgreSQL, Redis) handles authentication and JWT issuance; task-service (TypeScript, Fastify, Prisma, PostgreSQL) manages boards, columns, and tasks; notification-service (Rust, Axum, sqlx) consumes task events from Kafka.\n\nInter-service communication uses two transports: task-service validates tokens via gRPC calls to auth-service with protobuf contracts versioned in a dedicated kanban-proto repository; task lifecycle events flow to notification-service through Kafka. The stack runs on a VPS via Docker Compose — Nginx, PostgreSQL, Redis, and Kafka in KRaft mode — with independent GitHub Actions CI pipelines per repository.',
      ru: 'Kanban App — система управления задачами как polyrepo-проект с микросервисной архитектурой. Три сервиса: auth-service (TypeScript, Fastify, Prisma, PostgreSQL, Redis) отвечает за аутентификацию и выдачу JWT; task-service (TypeScript, Fastify, Prisma, PostgreSQL) управляет досками, колонками и задачами; notification-service (Rust, Axum, sqlx) потребляет события из Kafka.\n\nМежсервисное взаимодействие использует два транспорта: task-service валидирует токены через gRPC к auth-service с protobuf-контрактами в отдельном репозитории kanban-proto; события жизненного цикла задач идут в notification-service через Kafka. Стек работает на VPS через Docker Compose — Nginx, PostgreSQL, Redis и Kafka в режиме KRaft — с независимыми CI-пайплайнами на GitHub Actions для каждого репозитория.',
    },
    tags: ['TypeScript', 'Rust', 'Fastify', 'gRPC', 'Kafka', 'Docker'],
    github: 'https://github.com/kanban-app',
    status: 'in-development',
    decisions: [
      {
        en: 'Polyrepo over monorepo, because a monorepo with Turborepo or Nx would simplify dependency sharing but obscure the service boundaries that are the main architectural point of the project.',
        ru: 'Polyrepo вместо монорепо — монорепо с Turborepo или Nx упростило бы шаринг зависимостей, но размыло бы границы сервисов, которые и являются главной архитектурной идеей проекта.',
      },
      {
        en: 'gRPC with shared protobuf contracts over REST, because gRPC enforces the contract at schema level and catches breaking changes at code generation time rather than at runtime.',
        ru: 'gRPC с общими protobuf-контрактами вместо REST — gRPC закрепляет контракт на уровне схемы и выявляет breaking changes на этапе кодогенерации, а не в runtime.',
      },
      {
        en: 'Kafka for task lifecycle events over direct HTTP or Redis pub/sub, because HTTP creates a synchronous dependency where a notification failure propagates into the task write path, and Redis pub/sub has no message durability.',
        ru: 'Kafka для событий задач вместо HTTP или Redis pub/sub — HTTP создаёт синхронную зависимость, где сбой уведомления распространяется на путь записи задачи, а Redis pub/sub не гарантирует сохранность сообщений.',
      },
      {
        en: 'Rust with Axum and sqlx for notification-service over another TypeScript/Fastify service, because sqlx provides compile-time query checking that eliminates a class of runtime errors common in ORM-based approaches.',
        ru: 'Rust с Axum и sqlx для notification-service вместо ещё одного TypeScript/Fastify-сервиса — sqlx обеспечивает проверку запросов на этапе компиляции, устраняя класс runtime-ошибок, характерных для ORM.',
      },
    ],
  },
  {
    slug: 'guildmaster',
    title: { en: 'GuildMaster', ru: 'GuildMaster' },
    description: {
      en: 'Browser game about running a mercenaries\' guild — hire fighters, take contracts, and keep cash flow and morale under control.',
      ru: 'Браузерная игра про управление гильдией наёмников — нанимайте бойцов, берите контракты и держите под контролем финансы и мораль.',
    },
    longDescription: {
      en: 'GuildMaster is a turn-based browser game where you manage a mercenaries\' guild. Each day you hire fighters, accept contracts, and track cash flow — time only advances when you end the day, at which point active contracts resolve, salaries are paid, and mercenaries age. A Forecast widget projects a 7-day cash-flow view so salary spikes are visible before they hit.\n\nThe core tension is financial and moral simultaneously: a mercenary\'s contract power scales with their morale, so payroll mistakes directly weaken the squad you send tomorrow. Unpaid salaries become per-mercenary debt that drains morale daily; a mercenary at zero morale leaves and demoralizes everyone who stays. The stack is Vue 3 + TypeScript strict + Pinia + FSD, with game state persisted in localStorage and Vitest covering the core stores and pity utilities.',
      ru: 'GuildMaster — пошаговая браузерная игра про управление гильдией наёмников. Каждый день вы нанимаете бойцов, берёте контракты и отслеживаете денежный поток — время идёт только при завершении дня, когда разрешаются контракты, выплачиваются зарплаты и наёмники «стареют». Виджет Forecast показывает прогноз денежного потока на 7 дней вперёд.\n\nГлавное напряжение — финансовое и моральное одновременно: сила наёмника в контракте зависит от морали, поэтому ошибки с зарплатой напрямую ослабляют отряд завтрашнего дня. Невыплаченные зарплаты становятся долгом, снижающим мораль ежедневно; наёмник с нулевой моралью уходит и деморализует остальных. Стек — Vue 3 + TypeScript strict + Pinia + FSD, состояние в localStorage, Vitest покрывает ключевые сторы и утилиты pity.',
    },
    tags: ['Vue 3', 'TypeScript', 'Pinia', 'FSD', 'Vite', 'Game Dev', 'Browser'],
    github: 'https://github.com/White11010/guildmaster',
    status: 'in-development',
    decisions: [
      {
        en: 'FSD over a flat components tree, because it keeps business rules in entities, user actions in features, and page composition in pages/widgets — making turn-resolution and Forecast logic testable without coupling to Vue SFCs.',
        ru: 'FSD вместо плоского дерева компонентов — держит бизнес-правила в entities, пользовательские действия в features, а композицию страниц в pages/widgets, что упрощает тестирование логики завершения дня и Forecast без привязки к Vue SFC.',
      },
      {
        en: 'Turn-based time via an explicit day-end action rather than a real-time tick, because a background timer makes the Forecast widget misleading and breaks the deterministic sequence needed for Pinia store tests.',
        ru: 'Пошаговое время через явное действие завершения дня вместо real-time тика — фоновый таймер делал бы виджет Forecast вводящим в заблуждение и ломал бы детерминированную последовательность, нужную для тестов Pinia-сторов.',
      },
      {
        en: 'Piecewise linear success curve ([0.75,1]→[50%,90%], [1,2]→[90%,100%]) over a flat threshold, because a flat threshold hides the reward for over-staffing a contract.',
        ru: 'Кусочно-линейная кривая успеха ([0.75,1]→[50%,90%], [1,2]→[90%,100%]) вместо плоского порога — плоский порог скрывает награду за перекомплектацию контракта.',
      },
      {
        en: 'Contract power = base × (morale / max) rather than level × constant, so payroll mistakes directly weaken tomorrow\'s squad without a separate loyalty mechanic.',
        ru: 'Сила контракта = base × (мораль / максимум) вместо уровень × константа — ошибки с зарплатой напрямую ослабляют завтрашний отряд без отдельной механики лояльности.',
      },
      {
        en: 'Market and contract spawns use a pity mechanic (base 33%, growing bonus per dry day, clamped at 100%) over a fixed daily roll, because pure randomness can strand the player with an empty market for many consecutive turns.',
        ru: 'Спавн рынка и контрактов через pity-механику (база 33%, растущий бонус за каждый «сухой» день, ограничен 100%) вместо фиксированного броска — чистая случайность может надолго оставить игрока с пустым рынком.',
      },
      {
        en: 'Game saves use structural validation on parse rather than raw pinia-plugin-persistedstate dumps, because blind store persistence couples save format to Pinia internals and breaks on refactors.',
        ru: 'Сохранения игры используют структурную валидацию при парсинге вместо сырого дампа pinia-plugin-persistedstate — слепая персистенция привязывает формат к внутренностям Pinia и ломается при рефакторинге.',
      },
      {
        en: 'Modals registered in a central map with defineAsyncComponent rather than inline Teleport per feature, so one host keeps one dialog mounted at a time and code-splits each into its own chunk.',
        ru: 'Модалки регистрируются в центральной карте через defineAsyncComponent вместо inline Teleport в каждой фиче — единый хост держит одну модалку за раз и выносит каждый диалог в отдельный чанк.',
      },
      {
        en: 'Debt settlement pre-selects smallest debts first when the player cannot afford all at once, because with limited liquidity clearing several small debts removes more mercenaries from the daily morale drain than paying one large debt that cannot be finished.',
        ru: 'При частичном погашении долгов предвыбираются сначала самые маленькие — при ограниченной ликвидности несколько мелких долгов снимает больше наёмников с ежедневного штрафа по морали, чем один крупный, который нельзя погасить целиком.',
      },
    ],
  },
  {
    slug: 'portfolio',
    title: { en: 'Portfolio', ru: 'Portfolio' },
    description: {
      en: 'Personal site and blog — Next.js, full EN/RU localization, SSG, and zero-CMS static content.',
      ru: 'Личный сайт и блог — Next.js, полная локализация EN/RU, SSG и статический контент без CMS.',
    },
    longDescription: {
      en: 'Portfolio is a personal site and blog rebuilt from a Vite + React SPA (Bolt template) into a Next.js 15 App Router application with full EN/RU localization and static generation for every locale and slug combination.\n\nUI chrome lives in next-intl JSON catalogs; structured content — projects, blog metadata, and markdown bodies — uses a shared { en, ru } model in data/ with a pick() helper. The stack is intentionally minimal: Next.js, React 19, TypeScript, Tailwind CSS, next-intl, and lucide-react. Blog markdown is rendered by a custom zero-dependency parser in lib/markdown.tsx that outputs React elements on the server without a compile step.',
      ru: 'Portfolio — личный сайт и блог, переписанный с Vite + React SPA (шаблон Bolt) на Next.js 15 App Router с полной локализацией EN/RU и статической генерацией для каждой комбинации локали и slug.\n\nUI-хром живёт в JSON-каталогах next-intl; структурированный контент — проекты, метаданные блога и markdown-тела — использует общую модель { en, ru } в data/ с хелпером pick(). Стек намеренно минимален: Next.js, React 19, TypeScript, Tailwind CSS, next-intl и lucide-react. Markdown блога рендерится кастомным zero-dependency парсером в lib/markdown.tsx, который отдаёт React-элементы на сервере без compile step.',
    },
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'next-intl', 'SSG'],
    github: 'https://github.com/White11010/portfolio',
    status: 'released',
    version: 'v1.0.0',
    decisions: [
      {
        en: 'Migrated to Next.js App Router rather than patching the Vite SPA, because App Router solves per-route metadata, static route enumeration, and error boundaries natively without react-helmet-async.',
        ru: 'Миграция на Next.js App Router вместо доработки Vite SPA — App Router нативно решает per-route metadata, перечисление маршрутов и error boundaries без react-helmet-async.',
      },
      {
        en: 'next-intl with localePrefix: "always" over client-only language context, because the previous toggle stored the locale in React state and rendered 100% English regardless of its value.',
        ru: 'next-intl с localePrefix: "always" вместо client-only переключателя языка — предыдущий вариант хранил локаль в React state и рендерил 100% английский независимо от значения.',
      },
      {
        en: 'Inline script in <head> to apply the theme before hydration, because applying the dark class only in useEffect produces a first-paint flash and hydration mismatch warnings on <html class>.',
        ru: 'Inline-скрипт в <head> для применения темы до гидратации — применение класса dark только в useEffect даёт flash при первом рендере и предупреждения о hydration mismatch на <html class>.',
      },
      {
        en: 'Custom markdown renderer over remark/rehype or MDX, because the blog needs six standard elements and content already lives as plain strings in the data layer — a compile step is disproportionate.',
        ru: 'Кастомный markdown-рендерер вместо remark/rehype или MDX — блогу нужны шесть стандартных элементов, а контент уже живёт plain strings в слое данных; compile step несоразмерен задаче.',
      },
      {
        en: 'Server Components by default with client islands only where browser APIs are required, because marking pages client-side for hooks would forfeit static HTML for content that has no client interactivity.',
        ru: 'Server Components по умолчанию, client islands только там, где нужны browser API — перевод страниц в client ради хуков лишал бы статического HTML контент без client-интерактивности.',
      },
      {
        en: 'Shared localized content model ({ en, ru }) for all structured data with a single access helper, because mixing content strings into next-intl catalogs would blur the boundary between translatable UI chrome and versioned editorial content.',
        ru: 'Общая модель локализованного контента ({ en, ru }) для всех структурированных данных с единым хелпером доступа — смешивание контентных строк в каталоги next-intl размывало бы границу между переводимым UI-хромом и версионируемым контентом.',
      },
    ],
  },
];

export function getOrderedProjects(): Project[] {
  const order: Map<string, number> = new Map(
    projectOrder.map((slug, index) => [slug, index]),
  );

  return [...projects].sort((a, b) => {
    const aIndex = order.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = order.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex;
  });
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}