import type { LocalizedText } from '@/lib/i18n';

export type ProjectStatus = 'released' | 'in-development';

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

export const projects: Project[] = [
  {
    slug: 'eslint-plugin-vue-arch',
    emoji: '🏗',
    title: { en: 'eslint-plugin-vue-arch', ru: 'eslint-plugin-vue-arch' },
    description: {
      en: 'ESLint plugin for Vue 3 / TypeScript — architectural rules that enforce explicit dependencies and predictable reactivity.',
      ru: 'ESLint-плагин для Vue 3 / TypeScript — архитектурные правила, которые требуют явных зависимостей и предсказуемой реактивности.',
    },
    longDescription: {
      en: 'eslint-plugin-vue-arch is an ESLint plugin that enforces architectural best practices in Vue 3 and TypeScript codebases. Unlike style-focused Vue linters, it targets patterns that scale poorly as a project grows — implicit reactivity dependencies, accidental deep watching, and unclear data flow in Composition API code.\n\nThe first rule, no-watch-entire-props, disallows passing the entire props object as the first argument to watch or watchEffect. In Vue 3, props is a reactive proxy; watching it wholesale forces deep traversal of every property on every change. The rule catches not only bare watch(props, ...) calls, but also aliases from defineProps() and getter wrappers like watch(() => props, ...) that still resolve to the whole object. It intentionally does not autofix — wrapping props in a getter would silence the linter without fixing the underlying dependency.\n\nThe plugin ships as ESM with TypeScript declarations, targets ESLint flat config (v9+), and has a single runtime dependency (@typescript-eslint/utils). Rules are tested against real .vue SFCs via vue-eslint-parser with @typescript-eslint/parser as the script parser. The directory layout — rules/, utils/, configs/, tests/, docs/ — is designed to grow with additional architectural rules without restructuring.',
      ru: 'eslint-plugin-vue-arch — ESLint-плагин, который навязывает архитектурные best practices в проектах на Vue 3 и TypeScript. В отличие от линтеров, ориентированных на стиль, он ловит паттерны, которые плохо масштабируются по мере роста кодовой базы: неявные зависимости реактивности, случайный deep watch и неочевидный поток данных в Composition API.\n\nПервое правило, no-watch-entire-props, запрещает передавать весь объект props первым аргументом в watch или watchEffect. В Vue 3 props — реактивный proxy; наблюдение за ним целиком заставляет Vue делать deep traversal всех свойств при каждом изменении. Правило ловит не только watch(props, ...), но и алиасы из defineProps() и геттеры вроде watch(() => props, ...), которые всё равно возвращают весь объект. Автофикс намеренно отсутствует — обёртка props в геттер заглушила бы линтер, не исправив реальную зависимость.\n\nПлагин поставляется как ESM с TypeScript-декларациями, ориентирован на ESLint flat config (v9+) и имеет одну runtime-зависимость (@typescript-eslint/utils). Правила тестируются на реальных .vue SFC через vue-eslint-parser с @typescript-eslint/parser в качестве script-парсера. Структура каталогов — rules/, utils/, configs/, tests/, docs/ — рассчитана на добавление новых архитектурных правил без рефакторинга.',
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
        en: 'Report-only, no autofix or suggestion. The obvious "fix" — wrapping props in () => props — would pass the linter while still watching the entire reactive proxy. The rule forces the developer to choose a specific property (watch(() => props.id, ...)), making the dependency explicit rather than cosmetic.',
        ru: 'Только report, без autofix и suggestion. Очевидный "фикс" — обернуть props в () => props — прошёл бы линтер, но продолжал бы наблюдать за всем reactive proxy. Правило заставляет выбрать конкретное свойство (watch(() => props.id, ...)), делая зависимость явной, а не косметической.',
      },
      {
        en: 'Detects getter wrappers that still return the whole props object, not just bare watch(props, ...) calls. watch(() => props, ...) and watch(() => { return props }, ...) are reported because getGetterReturnExpression resolves trivial single-return getters and checks whether the returned expression is the entire props reference.',
        ru: 'Ловит геттеры, которые всё равно возвращают весь объект props, а не только голые watch(props, ...). watch(() => props, ...) и watch(() => { return props }, ...) попадают под правило, потому что getGetterReturnExpression разбирает тривиальные геттеры с одним return и проверяет, возвращает ли выражение ссылку на весь props.',
      },
      {
        en: 'Tracks defineProps() aliases via scope analysis rather than hardcoding the identifier name props. const p = defineProps(); watch(p, ...) is caught because isEntirePropsIdentifier walks variable definitions with ASTUtils.findVariable and checks whether the initializer is a defineProps() call.',
        ru: 'Отслеживает алиасы defineProps() через scope analysis, а не только идентификатор props. const p = defineProps(); watch(p, ...) ловится, потому что isEntirePropsIdentifier обходит определения переменных через ASTUtils.findVariable и проверяет, что инициализатор — вызов defineProps().',
      },
      {
        en: 'Flat config first with ESLintUtils.RuleCreator from @typescript-eslint/utils. The alternative — legacy .eslintrc format — is deprecated in ESLint v9. RuleCreator also generates documentation URLs automatically and provides typed rule definitions, which keeps each new rule file minimal.',
        ru: 'Flat config в приоритете, ESLintUtils.RuleCreator из @typescript-eslint/utils. Альтернатива — legacy .eslintrc — deprecated в ESLint v9. RuleCreator автоматически генерирует URL документации и даёт типизированные определения правил, что делает каждый новый rule-файл минимальным.',
      },
      {
        en: 'Tests run against real .vue SFC files with a dual-parser setup: vue-eslint-parser for the SFC structure, @typescript-eslint/parser for <script lang="ts">. Testing plain .ts snippets would miss setup(props) patterns, SFC-specific parser quirks, and the interaction between Vue and TypeScript AST nodes.',
        ru: 'Тесты на реальных .vue SFC с dual-parser: vue-eslint-parser для структуры SFC, @typescript-eslint/parser для <script lang="ts">. Тестирование на .ts-сниппетах пропустило бы паттерны setup(props), SFC-специфику парсера и взаимодействие Vue- и TypeScript-узлов AST.',
      },
      {
        en: 'Scalable directory layout (rules/, utils/, configs/) from day one. The first rule needed only two utility modules (props-reference, watch-helpers), but extracting shared AST helpers upfront avoids duplication when adding rules for composable boundaries, provide/inject patterns, or store access conventions.',
        ru: 'Масштабируемая структура каталогов (rules/, utils/, configs/) с первого дня. Первому правилу хватило двух utility-модулей (props-reference, watch-helpers), но вынос общих AST-хелперов заранее избегает дублирования при добавлении правил для границ composable, паттернов provide/inject или конвенций доступа к store.',
      },
    ],
  },
  {
    slug: 'blindspot',
    emoji: '🔍',
    title: { en: 'Blindspot', ru: 'Blindspot' },
    description: {
      en: 'Local-first desktop app for Lichess players — sync games, run Stockfish analysis, surface chess patterns, and compare head-to-head in Versus.',
      ru: 'Local-first десктопное приложение для игроков Lichess — синхронизация партий, анализ Stockfish, выявление шахматных паттернов и сравнение в Versus.',
    },
    longDescription: {
      en: 'Blindspot is a local-first desktop application for Lichess players. It syncs your game library via the Lichess HTTP API, runs Stockfish analysis entirely on your machine, and turns results into actionable insights — openings, tactics, psychology, blunder patterns, time controls, opponent rating bands, and more. There is no Blindspot backend: games, analysis rows, and generated insights live in a local SQLite database; your Lichess personal API token is stored in the OS credential keyring, not in the database.\n\nThe UI is built with Vue 3, Vuetify 4, Pinia, TanStack Query, and vue-i18n (English/Russian), organized by Feature-Sliced Design (`app` → `pages` → `widgets` → `features` → `entities` → `shared`). The desktop shell is Tauri 2: the frontend invokes Rust commands for sync, analysis, insight regeneration, Versus comparison, and engine control. Stockfish speaks UCI over stdin/stdout as a bundled native binary; a process-global singleton with a mutex serializes engine access across background batch analysis and on-demand Versus runs.\n\nCore screens: Home (rating chart, player profile pentagon vs rating-bucket benchmarks, daily insight pick, recent games), Insights (regenerated card feed with category filters), My games (sync metadata, filters, board preview), Game details (eval timeline, move classification, pattern tags, key moments, similar games), Versus (pentagon and metrics comparison against another Lichess username with on-demand opponent analysis), Analyze board (standalone position evaluation), and Settings (theme, language, analysis depth/batch preferences). Background analysis runs as a cancellable batch worker that emits Tauri events (`game-analysis://analyzing`, `progress`, `done`) so the UI stays responsive while the engine processes the library.',
      ru: 'Blindspot — local-first десктопное приложение для игроков Lichess. Синхронизирует библиотеку партий через Lichess HTTP API, запускает анализ Stockfish полностью на вашей машине и превращает результаты в actionable insights — дебюты, тактика, психология, паттерны ошибок, контроли времени, рейтинг соперников и др. У Blindspot нет собственного бэкенда: партии, строки анализа и сгенерированные insights хранятся в локальной SQLite; персональный API-токен Lichess — в OS credential keyring, а не в базе.\n\nUI построен на Vue 3, Vuetify 4, Pinia, TanStack Query и vue-i18n (EN/RU) по Feature-Sliced Design (`app` → `pages` → `widgets` → `features` → `entities` → `shared`). Desktop-оболочка — Tauri 2: фронтенд вызывает Rust-команды для синхронизации, анализа, регенерации insights, Versus-сравнения и управления движком. Stockfish общается по UCI через stdin/stdout как нативный бинарник; process-global singleton с mutex сериализует доступ к движку между фоновым batch-анализом и on-demand Versus-прогонами.\n\nОсновные экраны: Home (график рейтинга, pentagon профиля vs бенчмарки рейтингового бакета, daily insight, недавние партии), Insights (лента карточек с фильтрами по категориям), My games (метаданные синка, фильтры, превью доски), Game details (timeline оценки, классификация ходов, pattern tags, key moments, похожие партии), Versus (сравнение pentagon и метрик с другим Lichess-ником с on-demand анализом соперника), Analyze board (оценка произвольной позиции), Settings (тема, язык, глубина/batch-настройки анализа). Фоновый анализ — отменяемый batch worker с Tauri-событиями (`game-analysis://analyzing`, `progress`, `done`), чтобы UI оставался отзывчивым при обработке библиотеки.',
    },
    tags: ['Tauri', 'Vue 3', 'Rust', 'TypeScript', 'Stockfish', 'Chess', 'Lichess'],
    github: 'https://github.com/White11010/Blindspot',
    status: 'in-development',
    version: 'v0.1.0',
    decisions: [
      {
        en: 'Tauri 2 over Electron for the desktop shell. The app needs a native Stockfish subprocess, SQLite with rusqlite, and HTTP sync to Lichess — all of which map naturally to a Rust backend invoked via `tauri::command`. Electron would add a heavier runtime and still require a separate native or WASM engine integration path. Tauri keeps the bundle smaller and colocates engine I/O, persistence, and insight generation in one process boundary.',
        ru: 'Tauri 2 вместо Electron для desktop-оболочки. Приложению нужен нативный subprocess Stockfish, SQLite через rusqlite и HTTP-синк с Lichess — всё это естественно ложится на Rust-бэкенд с `tauri::command`. Electron добавил бы более тяжёлый runtime и всё равно потребовал бы отдельный native- или WASM-путь для движка. Tauri уменьшает размер бандла и держит engine I/O, персистентность и генерацию insights в одной process boundary.',
      },
      {
        en: 'Local-first SQLite with no Blindspot server, and Lichess tokens in the OS keyring rather than the database. The product promise is that games and Stockfish evaluations never leave the machine except for Lichess API calls the user explicitly authorizes. Storing the token in SQLite would make backups and DB inspection a secret-leak surface; the keyring plugin isolates credentials at the OS layer while rusqlite handles only game and analysis data.',
        ru: 'Local-first SQLite без сервера Blindspot, а токены Lichess — в OS keyring, а не в базе. Продуктовое обещание: партии и оценки Stockfish не покидают машину, кроме явно авторизованных вызовов Lichess API. Хранение токена в SQLite сделало бы бэкапы и инспекцию БД поверхностью утечки секретов; keyring plugin изолирует credentials на уровне ОС, а rusqlite хранит только игровые и аналитические данные.',
      },
      {
        en: 'A single global Stockfish process behind a mutex instead of per-invoke spawns or a WASM build. Spawning a new engine per game would dominate batch analysis time on UCI handshake alone. WASM in the renderer would avoid IPC but complicates threading, binary packaging, and depth tuning on desktop. One long-lived native process reused across `analyze_game`, background batch, Versus transient runs, and the Analyze board screen keeps throughput predictable; `BATCH_RUNNING` and `ANALYSIS_CANCEL` atomics prevent overlapping workers from contending on the same mutex.',
        ru: 'Один глобальный процесс Stockfish за mutex вместо spawn на каждый invoke или WASM-сборки. Новый engine на каждую партию съел бы batch-анализ на одних только UCI-handshake. WASM в renderer избавил бы от IPC, но усложнил бы threading, упаковку бинарника и настройку глубины на desktop. Один долгоживущий native-процесс, переиспользуемый в `analyze_game`, фоновом batch, transient Versus и Analyze board, даёт предсказуемый throughput; атомики `BATCH_RUNNING` и `ANALYSIS_CANCEL` не дают параллельным воркерам конкурировать за один mutex.',
      },
      {
        en: 'Insight generation runs in Rust over the full synced library, not in the Vue layer. Generators (`openings`, `time_controls`, `psychology`, `tactics_analysis`, `blunder_patterns`, `blunder_moments`, `opponent_rating`) read up to 1000 games plus persisted analysis rows and key moments, emit structured `Insight` records, and replace the user\'s insight set atomically. Keeping this server-side in the Tauri process avoids shipping large game corpora to the renderer, keeps thresholds and sample-size gates consistent, and lets `apply_metric_prev` preserve deltas across regenerations without frontend orchestration.',
        ru: 'Генерация insights выполняется в Rust по всей синхронизированной библиотеке, а не во Vue-слое. Генераторы (`openings`, `time_controls`, `psychology`, `tactics_analysis`, `blunder_patterns`, `blunder_moments`, `opponent_rating`) читают до 1000 партий плюс сохранённые строки анализа и key moments, отдают структурированные `Insight` и атомарно заменяют набор пользователя. Держать это в Tauri-процессе не требует гонять большие корпуса партий в renderer, сохраняет единые пороги и sample-size gates и позволяет `apply_metric_prev` хранить дельты между регенерациями без оркестрации на фронте.',
      },
      {
        en: 'Versus uses `analyze_game_transient` for opponent games — same Stockfish eval pass as full analysis, but no SQLite write. Opponent games are fetched for comparison only; persisting their analysis rows would bloat the user database with foreign libraries and complicate ownership checks. Transient results feed pentagon metrics and opening cards in memory while the user\'s own games continue to use the persisted `analyze_game` path with pattern tags, key moments, and similar-games correlation.',
        ru: 'Versus использует `analyze_game_transient` для партий соперника — тот же Stockfish eval pass, что и полный анализ, но без записи в SQLite. Партии соперника подтягиваются только для сравнения; сохранение их analysis rows раздуло бы БД чужими библиотеками и усложнило проверки владения. Transient-результаты питают pentagon-метрики и opening cards в памяти, а свои партии по-прежнему идут через persisted `analyze_game` с pattern tags, key moments и similar-games correlation.',
      },
      {
        en: 'Embedded `benchmarks.json` pentagons by rating bucket instead of computing population norms from Lichess on every profile render. The Home chart and Versus comparison need stable reference shapes (accuracy, stability, conversion, openings, endgame) even when the user has few recently analyzed games. Shipping precomputed bucket data keeps first-load latency low and decouples benchmark quality from how many games the user has synced; the player pentagon is derived from analyzed games in the last 30 days and overlaid on the static benchmark for the matching speed and rating band.',
        ru: 'Встроенные pentagon из `benchmarks.json` по рейтинговым бакетам вместо вычисления популяционных норм из Lichess при каждом рендере профиля. Home chart и Versus-сравнению нужны стабильные референсные формы (accuracy, stability, conversion, openings, endgame), даже если у пользователя мало недавно проанализированных партий. Предвычисленные бакеты дают низкую latency первой загрузки и отвязывают качество бенчмарка от числа синхронизированных игр; player pentagon строится из проанализированных партий за последние 30 дней и накладывается на статический benchmark для соответствующего speed и рейтингового бандла.',
      },
      {
        en: 'Feature-Sliced Design on the frontend with `createMemoryHistory` routing for Tauri. Pages compose widgets and features; entities own Pinia stores and query keys; Tauri invokes stay behind entity/feature boundaries rather than scattered in components. Memory history avoids browser URL semantics in a desktop webview where the shell does not own navigation; route changes are explicit `router.push` calls from the nav drawer.',
        ru: 'Feature-Sliced Design на фронтенде с `createMemoryHistory` для Tauri. Pages композируют widgets и features; entities владеют Pinia stores и query keys; Tauri invoke остаются за границами entity/feature, а не размазаны по компонентам. Memory history избегает browser URL semantics в desktop webview, где оболочка не владеет навигацией; смена маршрутов — явные `router.push` из nav drawer.',
      },
    ],
  },
  {
    slug: 'nevernullable',
    emoji: '📦',
    title: { en: 'nevernullable', ru: 'nevernullable' },
    description: {
      en: 'Zero-dependency Option<T> for TypeScript — a typed alternative to null checks and optional chaining.',
      ru: 'Zero-dependency Option<T> для TypeScript — типизированная альтернатива null-проверкам и optional chaining.',
    },
    longDescription: {
      en: 'nevernullable is a TypeScript library that introduces Option<T> — a type with two variants, Some<T> and None — for working with values that may be absent. The API covers the standard functional combinators: map, andThen, filter, match, zip, flatten, and fromNullable. None is a shared singleton, so both isSome()/isNone() checks and strict equality against None work as expected.\n\nThe library ships dual ESM + CJS with type maps for both, weighs ~3 KB min+gzip, and has no runtime dependencies. Promise interop is built into the factory: Option(promise) returns Promise<Option<NonNullable<T>>>, keeping async usage consistent with the synchronous API. Options also implement Symbol.iterator, so they compose with for...of, spread, and Array.prototype.flatMap without adapters.\n\nCompared to fp-ts, which brings a full functional ecosystem, nevernullable covers only Option<T> — no Result, no pipe, no HKTs. Compared to oxide.ts, the main differences are Promise-aware factories and iterator support. Result<T, E> is planned for a future release.',
      ru: 'nevernullable — TypeScript-библиотека, которая вводит Option<T>: тип с двумя вариантами, Some<T> и None, для работы со значениями, которые могут отсутствовать. API включает стандартные функциональные комбинаторы: map, andThen, filter, match, zip, flatten и fromNullable. None — разделяемый синглтон, поэтому работают и проверки isSome()/isNone(), и строгое сравнение с None.\n\nБиблиотека поставляется в dual ESM + CJS с type maps для обоих форматов, весит ~3 KB min+gzip и не имеет runtime-зависимостей. Promise interop встроен в фабрику: Option(promise) возвращает Promise<Option<NonNullable<T>>>, что сохраняет единообразие async-использования с синхронным API. Option также реализует Symbol.iterator, поэтому работает с for...of, spread и Array.prototype.flatMap без адаптеров.\n\nПо сравнению с fp-ts, который тянет полную функциональную экосистему, nevernullable покрывает только Option<T> — без Result, pipe и HKT. По сравнению с oxide.ts основные отличия — Promise-aware фабрики и поддержка итераторов. Result<T, E> запланирован в следующем релизе.',
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
    decisions: [
      {
        en: 'None is implemented as a shared frozen singleton rather than a constructor call. Every None-producing path in the library returns the same instance, which makes result === None a reliable identity check alongside isSome()/isNone(). The alternative — a class with a None constructor — would produce distinct instances per call and make reference equality unreliable.',
        ru: 'None реализован как разделяемый замороженный синглтон, а не вызов конструктора. Каждый путь, возвращающий None, отдаёт один и тот же экземпляр — это делает result === None надёжной проверкой по идентичности наряду с isSome()/isNone(). Альтернатива — класс с конструктором None — создавала бы отдельные экземпляры при каждом вызове и делала проверку по ссылке ненадёжной.',
      },
      {
        en: 'Option(promise) returns Promise<Option<NonNullable<T>>> rather than Option<Promise<T>>. Wrapping a promise in an Option would combine two independent layers of uncertainty — pending vs. resolved, and present vs. absent — into a single value that is awkward to consume. Returning Promise<Option<T>> makes the order explicit: first the promise resolves, then you get an Option.',
        ru: 'Option(promise) возвращает Promise<Option<NonNullable<T>>>, а не Option<Promise<T>>. Оборачивание промиса в Option объединяет два независимых уровня неопределённости — pending vs. resolved и present vs. absent — в одно значение, которое неудобно использовать. Promise<Option<T>> делает порядок явным: сначала промис resolves, затем появляется Option.',
      },
      {
        en: 'Some(null) and Some(undefined) throw TypeError at runtime since v2.0.0. In v1.x, they produced a "fake Some" that contradicted its own type — Some<NonNullable<T>> at the type level, but a nullable value at runtime. Making the runtime check unconditional means the type contract is real, not just a compiler annotation. The Option() factory remains the correct entry point when the input may be nullable.',
        ru: 'Some(null) и Some(undefined) бросают TypeError в runtime начиная с v2.0.0. В v1.x они создавали "фейковый Some", противоречащий собственному типу — Some<NonNullable<T>> на уровне типов, но nullable-значение в runtime. Безусловная проверка делает контракт типа реальным, а не просто аннотацией компилятора. Option() остаётся правильной точкой входа, если входное значение может быть nullable.',
      },
      {
        en: 'Option implements Symbol.iterator: Some yields its value once, None yields nothing. This makes Options directly usable in for...of, spread, and Array.prototype.flatMap without adapters. The alternative — requiring explicit unwrap before iteration — adds friction in collection-processing pipelines where Options appear as intermediate values.',
        ru: 'Option реализует Symbol.iterator: Some отдаёт своё значение один раз, None — ничего. Это делает Option напрямую совместимым с for...of, spread и Array.prototype.flatMap без адаптеров. Альтернатива — требовать явного unwrap перед итерацией — добавляет сложность в пайплайнах обработки коллекций, где Option появляются как промежуточные значения.',
      },
    ],
  },
  {
    slug: 'grin',
    emoji: '📊',
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
    decisions: [
      {
        en: 'Parses git log output directly instead of using a git library. git2-rs (libgit2 bindings) was the obvious alternative, but it adds a native compile-time dependency and significant build complexity for what is essentially a read-only log traversal. Shelling out to git keeps the binary portable and the build trivial.',
        ru: 'Парсинг вывода git log напрямую вместо git-библиотеки. Очевидная альтернатива — git2-rs (биндинги к libgit2), но она добавляет нативную зависимость на этапе компиляции и усложняет сборку для задачи, которая сводится к чтению лога. Вызов git-процесса сохраняет переносимость бинарника и простоту сборки.',
      },
      {
        en: 'Sparklines render via Unicode block characters written directly to stdout, without a TUI library. ratatui was considered but is designed for interactive full-screen applications — it takes over the terminal, manages its own event loop, and does not compose well with pipes or redirects. For three read-only reporting commands, plain stdout is the right primitive.',
        ru: 'Спарклайны рендерятся через Unicode block characters напрямую в stdout, без TUI-библиотеки. Рассматривался ratatui, но он ориентирован на интерактивные полноэкранные приложения — перехватывает терминал, управляет собственным event loop и плохо работает с пайпами и редиректами. Для трёх read-only команд plain stdout — правильный примитив.',
      },
      {
        en: 'Added --ascii and --no-color as first-class flags rather than documentation notes. Discovered post-release: the tool produced correct output on Linux and macOS but rendered as empty boxes on Windows terminals using legacy code pages like 437 or 1252, which do not include Unicode block characters. The flags also respect the NO_COLOR and GRIN_ASCII environment variables following established CLI conventions.',
        ru: 'Флаги --ascii и --no-color реализованы как полноценные опции, а не замечания в документации. Проблема обнаружена после релиза: на Linux и macOS вывод корректный, на Windows-терминалах со старыми кодовыми страницами (437, 1252) Unicode block characters отображаются как пустые квадраты. Флаги также поддерживают переменные окружения NO_COLOR и GRIN_ASCII в соответствии с распространёнными CLI-конвенциями.',
      },
      {
        en: 'Each analytic surface — timeline, contributors, churn — is a separate subcommand rather than a single combined output. This keeps each command independently useful and makes the output predictable when piped or redirected. It also allows flags like --ext (extension filter on churn) to stay scoped to the command where they are meaningful.',
        ru: 'Каждый аналитический срез — хронология, контрибьюторы, churn — реализован как отдельный сабкоманд, а не единый комбинированный вывод. Это делает каждую команду самодостаточной и предсказуемой при пайпах и редиректах. Кроме того, флаги вроде --ext (фильтр расширений для churn) остаются в области видимости только тех команд, где они осмысленны.',
      },
    ],
  },
  {
    slug: 'kanban-app',
    emoji: '🗂',
    title: { en: 'Kanban App', ru: 'Kanban App' },
    description: {
      en: 'Microservices task manager — three independent services with gRPC, Kafka, and a Rust notification layer.',
      ru: 'Микросервисный таск-менеджер — три независимых сервиса с gRPC, Kafka и сервисом уведомлений на Rust.',
    },
    longDescription: {
      en: 'Kanban App is a task management system built as a polyrepo microservices project. The system consists of three services: auth-service (TypeScript, Fastify, Prisma, PostgreSQL, Redis) handles authentication and issues JWT tokens; task-service (TypeScript, Fastify, Prisma, PostgreSQL) manages boards, columns, and tasks; notification-service (Rust, Axum, sqlx) consumes task events from Kafka and processes notifications.\n\nInter-service communication uses two transports. task-service validates tokens via gRPC calls to auth-service, with protobuf contracts versioned in a dedicated kanban-proto repository. Task lifecycle events flow from task-service to notification-service through Kafka, keeping the services decoupled at the event boundary.\n\nThe entire stack runs on a VPS via Docker Compose — Nginx as the entry point, PostgreSQL, Redis, and Kafka in KRaft mode. Each repository has its own GitHub Actions CI pipeline.',
      ru: 'Kanban App — система управления задачами, построенная как polyrepo-проект с микросервисной архитектурой. Система состоит из трёх сервисов: auth-service (TypeScript, Fastify, Prisma, PostgreSQL, Redis) отвечает за аутентификацию и выдачу JWT-токенов; task-service (TypeScript, Fastify, Prisma, PostgreSQL) управляет досками, колонками и задачами; notification-service (Rust, Axum, sqlx) потребляет события задач из Kafka и обрабатывает уведомления.\n\nМежсервисное взаимодействие использует два транспорта. task-service валидирует токены через gRPC-вызовы к auth-service; protobuf-контракты версионируются в отдельном репозитории kanban-proto. События жизненного цикла задач передаются из task-service в notification-service через Kafka, сохраняя независимость сервисов на границе событий.\n\nВесь стек работает на VPS через Docker Compose — Nginx как точка входа, PostgreSQL, Redis и Kafka в режиме KRaft. Каждый репозиторий имеет собственный CI-пайплайн на GitHub Actions.',
    },
    tags: ['TypeScript', 'Rust', 'Fastify', 'gRPC', 'Kafka', 'Docker'],
    github: 'https://github.com/kanban-app',
    status: 'in-development',
    decisions: [
      {
        en: 'Polyrepo over monorepo: each service lives in its own repository with an independent CI pipeline and deployment lifecycle. The alternative — a monorepo with Turborepo or Nx — would simplify dependency sharing but obscure the service boundaries that are the main architectural point of the project. Polyrepo makes each service\'s independence explicit.',
        ru: 'Polyrepo вместо монорепо: каждый сервис живёт в своём репозитории с независимым CI-пайплайном и циклом деплоя. Альтернатива — монорепо с Turborepo или Nx — упростила бы шаринг зависимостей, но размыла бы границы сервисов, которые и являются главной архитектурной идеей проекта. Polyrepo делает независимость каждого сервиса явной.',
      },
      {
        en: 'gRPC with shared protobuf contracts (kanban-proto) for synchronous inter-service calls. The alternative for token validation was REST: each service re-validates the JWT locally or calls a plain HTTP endpoint. gRPC enforces the contract at the schema level and catches breaking changes at code generation time rather than at runtime.',
        ru: 'gRPC с общими protobuf-контрактами (kanban-proto) для синхронных межсервисных вызовов. Альтернативой для валидации токенов был REST: каждый сервис валидирует JWT локально или обращается к обычному HTTP-эндпоинту. gRPC закрепляет контракт на уровне схемы и выявляет breaking changes на этапе кодогенерации, а не в runtime.',
      },
      {
        en: 'Kafka for task lifecycle events to notification-service, rather than direct HTTP calls or Redis pub/sub. HTTP would create a synchronous dependency between task-service and notification-service — a notification failure would propagate into the task write path. Redis pub/sub has no message durability. Kafka provides both decoupling and durability with minimal operational overhead in KRaft mode.',
        ru: 'Kafka для передачи событий жизненного цикла задач в notification-service вместо прямых HTTP-вызовов или Redis pub/sub. HTTP создал бы синхронную зависимость между task-service и notification-service — сбой уведомления распространился бы на путь записи задачи. Redis pub/sub не гарантирует сохранность сообщений. Kafka обеспечивает и развязку, и надёжность хранения с минимальными операционными издержками в режиме KRaft.',
      },
      {
        en: 'Rust with Axum and sqlx for notification-service rather than another TypeScript/Fastify service. The service is a pure event consumer — no complex business logic, predictable load — which makes it a contained scope for applying Rust in a polyglot setup. sqlx provides compile-time query checking against the actual schema, which eliminates a class of runtime errors common in ORM-based approaches.',
        ru: 'Rust с Axum и sqlx для notification-service вместо ещё одного TypeScript/Fastify-сервиса. Сервис — чистый потребитель событий без сложной бизнес-логики и с предсказуемой нагрузкой, что делает его подходящим scope для применения Rust в полиглотной архитектуре. sqlx обеспечивает проверку запросов на этапе компиляции относительно реальной схемы, устраняя класс runtime-ошибок, характерных для ORM-подхода.',
      },
    ],
  },
  {
    slug: 'guildmaster',
    emoji: '⚔️',
    title: { en: 'GuildMaster', ru: 'GuildMaster' },
    description: {
      en: 'Browser game about running a mercenaries\' guild — hire fighters, take contracts, and keep cash flow and morale under control.',
      ru: 'Браузерная игра про управление гильдией наёмников — нанимайте бойцов, берите контракты и держите под контролем финансы и мораль.',
    },
    longDescription: {
      en: 'GuildMaster is a turn-based browser game where you run a freshly founded mercenaries\' guild. The world offers a steady trickle of fighters to hire and contracts to accept — your job is to match the right people to the right jobs, project cash flow ahead of payday spikes, and survive the consequences of every decision. Time only advances when you end the day: active contracts resolve, weekly salaries are paid, mercenaries age, and new market offers may appear.\n\nThe core tension is financial and moral at the same time. A mercenary\'s effective contract power scales with their morale, so sending a demoralized squad is a gamble even when raw levels look sufficient. Unpaid salaries become per-mercenary debt; debt drains morale every day, and a mercenary at zero morale leaves the guild — which demoralizes everyone who stays. Contract success chance scales with squad power vs. required power (~50% at 75% power, ~90% at equal power, 100% at double), and the Forecast widget projects a 7-day cash-flow view so you can see salary spikes and expected contract income before they hit.\n\nThe codebase is Vue 3 + TypeScript (strict) with Pinia setup stores, organized by Feature-Sliced Design (`app`, `pages`, `widgets`, `features`, `entities`, `shared`). Business logic lives in entity stores — Guild, Game, ContractsBoard, HiringMarket, Log — while routes and modals are code-split via lazy imports and `defineAsyncComponent`. Game state persists in `localStorage` with runtime validation on load; multiple saves are supported and the most recently updated one loads by default. Tests cover the Game and Guild stores plus the random/pity utilities via Vitest.',
      ru: 'GuildMaster — пошаговая браузерная игра, в которой вы управляете только что основанной гильдией наёмников. Мир регулярно подкидывает бойцов для найма и контракты для выполнения — ваша задача подобрать нужных людей под нужные задачи, спрогнозировать денежный поток до всплесков зарплат и пережить последствия каждого решения. Время идёт только когда вы завершаете день: разрешаются активные контракты, выплачиваются еженедельные зарплаты, наёмники «стареют», а на рынке могут появиться новые предложения.\n\nГлавное напряжение — одновременно финансовое и моральное. Эффективная сила наёмника в контракте зависит от морали, поэтому отправить деморализованный отряд — риск, даже если уровни на бумаге выглядят достаточными. Невыплаченные зарплаты превращаются в долг перед конкретным наёмником; долг каждый день снижает мораль, а наёмник с нулевой моралью покидает гильдию — что бьёт по морали всех оставшихся. Шанс успеха контракта масштабируется по соотношению силы отряда к требуемой (~50% при 75% силы, ~90% при равной, 100% при двойном превосходстве), а виджет Forecast показывает прогноз денежного потока на 7 дней вперёд.\n\nКодовая база — Vue 3 + TypeScript (strict) с Pinia setup-сторами, организованная по Feature-Sliced Design (`app`, `pages`, `widgets`, `features`, `entities`, `shared`). Бизнес-логика живёт в entity-сторах — Guild, Game, ContractsBoard, HiringMarket, Log — а маршруты и модалки разбиты на чанки через lazy imports и `defineAsyncComponent`. Состояние сохраняется в `localStorage` с runtime-валидацией при загрузке; поддерживается несколько сохранений, по умолчанию подгружается самое свежее по `updatedAt`. Тесты покрывают сторы Game и Guild и утилиты random/pity через Vitest.',
    },
    tags: ['Vue 3', 'TypeScript', 'Pinia', 'FSD', 'Vite', 'Game Dev', 'Browser'],
    github: 'https://github.com/White11010/guildmaster',
    status: 'in-development',
    decisions: [
      {
        en: 'Feature-Sliced Design over a flat components tree. The alternative — grouping by UI area (`components/Guild`, `components/Market`) — works for small apps but blurs the boundary between reusable UI and domain logic as the game grows. FSD keeps business rules in `entities`, user actions in `features`, and page composition in `pages`/`widgets`, which makes the turn-resolution and forecast logic easier to locate and test without coupling it to Vue SFCs.',
        ru: 'Feature-Sliced Design вместо плоского дерева компонентов. Альтернатива — группировка по UI-зонам (`components/Guild`, `components/Market`) — подходит для маленьких приложений, но размывает границу между переиспользуемым UI и доменной логикой по мере роста игры. FSD держит бизнес-правила в `entities`, пользовательские действия в `features`, а композицию страниц — в `pages`/`widgets`, что упрощает поиск и тестирование логики завершения дня и прогноза без привязки к Vue SFC.',
      },
      {
        en: 'Turn-based time via `finishDay()` rather than a real-time tick or interval. A background timer would force the player to react continuously and make the Forecast widget misleading — projected salary spikes assume the player controls when days pass. Explicit day advancement also keeps contract resolution, salary payment, debt morale drain, and market spawns in one deterministic sequence that is straightforward to test in Pinia store specs.',
        ru: 'Пошаговое время через `finishDay()` вместо real-time тика или интервала. Фоновый таймер заставлял бы игрока реагировать непрерывно и делал бы виджет Forecast вводящим в заблуждение — прогноз зарплатных всплесков предполагает, что игрок сам решает, когда наступает новый день. Явное завершение дня также собирает разрешение контрактов, выплату зарплат, снижение морали за долг и спавн предложений в одну детерминированную последовательность, удобную для тестов в Pinia-сторах.',
      },
      {
        en: 'Contract success chance uses a piecewise linear curve over squad-power ratio R, with two segments: [0.75, 1] → [50%, 90%] and [1, 2] → [90%, 100%]. A flat threshold ("start at 75%, always 50% until equal power") would hide the reward for over-staffing. A logistic curve was considered but harder to explain in UI copy. Keeping anchor points as named constants in `GuildContract.config.ts` makes the formula tunable without touching resolution logic.',
        ru: 'Шанс успеха контракта — кусочно-линейная кривая по отношению силы отряда R: два участка [0.75, 1] → [50%, 90%] и [1, 2] → [90%, 100%]. Плоский порог («старт с 75%, всегда 50% до равной силы») скрывал бы награду за перевкомплектацию. Логистическая кривая рассматривалась, но её сложнее объяснить в UI. Якорные точки вынесены в именованные константы `GuildContract.config.ts`, чтобы настраивать формулу без правок логики разрешения контрактов.',
      },
      {
        en: 'Mercenary contract power = base power × (morale / max morale), not a flat level × constant. Level-only power would decouple contract outcomes from the debt/morale loop and make morale a cosmetic stat. Scaling power by morale means payroll mistakes directly weaken the squad you send tomorrow — the two systems reinforce each other without a separate "loyalty" mechanic.',
        ru: 'Сила наёмника в контракте = базовая сила × (мораль / максимум морали), а не плоское «уровень × константа». Сила только от уровня отвязала бы исходы контрактов от петли долг/мораль и сделала бы мораль декоративной. Масштабирование силы по морали означает, что ошибки с зарплатой напрямую ослабляют отряд, который вы отправите завтра — две системы усиливают друг друга без отдельной механики «лояльности».',
      },
      {
        en: 'Market and contract board spawns use `getChanceWithPity` (base 33%, growing bonus per dry day) rather than a fixed daily roll. Pure randomness can strand the player with an empty market for many turns; a guaranteed spawn every N days would feel mechanical. Pity raises the effective chance linearly with the fail streak and clamps at 100%, keeping variety while reducing streaks of bad luck.',
        ru: 'Появление наёмников и контрактов через `getChanceWithPity` (база 33%, растущий бонус за каждый «сухой» день) вместо фиксированного ежедневного броска. Чистая случайность может надолго оставить игрока с пустым рынком; гарантированный спавн каждые N дней выглядел бы механически. Pity линейно повышает эффективный шанс со счётчиком неудач и ограничивает его 100%, сохраняя вариативность и сокращая полосы невезения.',
      },
      {
        en: 'Saves are stored as a `Record<gameId, SavedGame>` in a single `localStorage` key with structural validation on parse — not a raw `pinia-plugin-persistedstate` dump. Persisting entire store trees blindly would couple save format to Pinia internals and break on refactors. Explicit `saveGame()` snapshots guild, board, market, log, and game meta into a typed `SavedGame`, and `isSavedGame()` rejects malformed entries per slot instead of crashing the whole load.',
        ru: 'Сохранения — `Record<gameId, SavedGame>` в одном ключе `localStorage` со структурной валидацией при парсинге, а не сырой дамп через `pinia-plugin-persistedstate`. Слепая персистенция всего дерева сторов привязала бы формат сохранения к внутренностям Pinia и ломалась бы при рефакторингах. Явный `saveGame()` снимает снимок guild, board, market, log и метаданных игры в типизированный `SavedGame`, а `isSavedGame()` отбрасывает битые записи по слотам, не роняя всю загрузку.',
      },
      {
        en: 'Modals are registered in a central `AppModalRoot` map with `defineAsyncComponent`, not opened via inline `<Teleport>` per feature. Inline modals in every feature would duplicate lazy-loading setup and make it harder to swap modals from nested flows (e.g. Game Menu → Load Game → Settings). A single modal host keyed by `AppModals` enum keeps one modal mounted at a time and code-splits each dialog into its own chunk.',
        ru: 'Модалки регистрируются в центральной карте `AppModalRoot` через `defineAsyncComponent`, а не открываются inline-`<Teleport>` в каждой фиче. Inline-модалки дублировали бы настройку lazy-loading и усложняли бы переходы между вложенными сценариями (например, Game Menu → Load Game → Settings). Единый modal host по enum `AppModals` держит одну модалку за раз и выносит каждый диалог в отдельный чанк.',
      },
      {
        en: 'Debt settlement uses a greedy smallest-debt-first pre-selection (`buildGreedyDebtSelection`) when the player cannot afford all debts at once. Paying the largest debt first maximizes morale saved per coin only when you can finish it entirely; with partial liquidity, clearing several small debts removes more mercenaries from the daily morale drain. The modal pre-selects the greedy set so the player starts from a sensible partial payoff rather than an empty checkbox list.',
        ru: 'Погашение долгов использует жадный предвыбор «сначала самые маленькие» (`buildGreedyDebtSelection`), когда игрок не может закрыть все долги сразу. Платить крупнейший долг первым выгодно только если его можно погасить целиком; при ограниченной ликвидности несколько мелких долгов снимает больше наёмников с ежедневного штрафа по морали. Модалка предвыбирает жадный набор, чтобы игрок начинал с разумного частичного погашения, а не с пустого списка чекбоксов.',
      },
    ],
  },
  {
    slug: 'portfolio',
    emoji: '✦',
    title: { en: 'Portfolio', ru: 'Portfolio' },
    description: {
      en: 'Personal site and blog — Next.js, full EN/RU localization, SSG, and zero-CMS static content.',
      ru: 'Личный сайт и блог — Next.js, полная локализация EN/RU, SSG и статический контент без CMS.',
    },
    longDescription: {
      en: 'Portfolio is a personal site and blog for Vladislav Belyavsky, rebuilt from a Vite + React SPA (Bolt template) into a Next.js 15 App Router application. It showcases projects, hosts localized blog posts, and provides an About page — all pre-rendered at build time via `generateStaticParams` for every locale and slug combination.\n\nLocalization is first-class: UI chrome lives in `messages/en.json` and `messages/ru.json` (next-intl), while structured content — projects, blog metadata, and markdown bodies — uses a shared `{ en, ru }` model in `data/` with a `pick()` helper. Routes are locale-prefixed (`/en`, `/ru`); middleware redirects `/` to the default locale. Theme (light/dark) is applied by an inline script before React hydration to avoid FOUC, with a client `ThemeProvider` for toggling.\n\nThe stack is intentionally minimal: Next.js, React 19, TypeScript, Tailwind CSS, next-intl, and lucide-react. Blog markdown is rendered by a custom zero-dependency parser in `lib/markdown.tsx` that outputs React elements on the server — no remark, no MDX build step. Mobile and accessibility fixes from the original SPA audit — 44px touch targets, `100dvh`, safe-area insets, `prefers-reduced-motion`, copy buttons visible without hover — are baked into `globals.css` and shared component classes.',
      ru: 'Portfolio — личный сайт и блог Vladislav Belyavsky, переписанный с Vite + React SPA (шаблон Bolt) на Next.js 15 App Router. Показывает проекты, хостит локализованные посты блога и страницу About — всё пререндерится на этапе сборки через `generateStaticParams` для каждой комбинации локали и slug.\n\nЛокализация — first-class: UI-хром живёт в `messages/en.json` и `messages/ru.json` (next-intl), а структурированный контент — проекты, метаданные блога и markdown-тела — использует общую модель `{ en, ru }` в `data/` с хелпером `pick()`. Маршруты с префиксом локали (`/en`, `/ru`); middleware редиректит `/` на локаль по умолчанию. Тема (светлая/тёмная) выставляется inline-скриптом до гидратации React, чтобы избежать FOUC; client `ThemeProvider` отвечает за переключение.\n\nСтек намеренно минимален: Next.js, React 19, TypeScript, Tailwind CSS, next-intl и lucide-react. Markdown блога рендерится кастомным zero-dependency парсером в `lib/markdown.tsx`, который на сервере отдаёт React-элементы — без remark и MDX-сборки. Мобайл- и a11y-фиксы из аудита исходного SPA — тач-таргеты 44px, `100dvh`, safe-area insets, `prefers-reduced-motion`, кнопки копирования без hover — зашиты в `globals.css` и общие CSS-классы компонентов.',
    },
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'next-intl', 'SSG'],
    github: 'https://github.com/White11010/portfolio',
    status: 'released',
    version: 'v1.0.0',
    decisions: [
      {
        en: 'Migrated from Vite SPA to Next.js App Router with full static generation rather than adding SSR as a bolt-on. The original stack used react-router-dom, a single static `<title>`, and no per-route metadata — problems that App Router solves natively via `generateMetadata`, `generateStaticParams`, `not-found.tsx`, and `error.tsx`. Staying on Vite would have meant reaching for react-helmet-async or similar without gaining file-based routing or build-time route enumeration.',
        ru: 'Миграция с Vite SPA на Next.js App Router с полной статической генерацией, а не «прикручивание» SSR поверх SPA. Исходный стек использовал react-router-dom, один статический `<title>` и отсутствие per-route metadata — проблемы, которые App Router решает нативно через `generateMetadata`, `generateStaticParams`, `not-found.tsx` и `error.tsx`. Оставаться на Vite означало бы тянуть react-helmet-async или аналог без file-based routing и перечисления маршрутов на этапе сборки.',
      },
      {
        en: 'next-intl with `localePrefix: "always"` and URL-based locale switching instead of a client-only LanguageContext toggle. The previous implementation stored `lang` in React state and rendered 100% English regardless of the toggle — no shareable localized URLs, no `<html lang>` sync, no SEO alternates. Putting the locale in the path (`/en/projects`, `/ru/blog`) makes links bookmarkable, enables `alternates.languages` in metadata, and keeps UI strings (`messages/`) cleanly separated from content data (`data/`).',
        ru: 'next-intl с `localePrefix: "always"` и переключением локали через URL вместо client-only LanguageContext. Предыдущая реализация хранила `lang` в React state и рендерила 100% английский независимо от переключателя — без шарируемых локализованных URL, синхронизации `<html lang>` и SEO-alternates. Локаль в path (`/en/projects`, `/ru/blog`) делает ссылки закладко-пригодными, включает `alternates.languages` в metadata и чисто разделяет UI-строки (`messages/`) от контентных данных (`data/`).',
      },
      {
        en: 'Inline ThemeScript before hydration plus a client ThemeProvider, not ThemeProvider alone. Applying the `dark` class only in `useEffect` means the first paint always renders light mode, then flashes dark — and React 19 hydration can warn when server HTML and client state disagree on `<html class>`. A synchronous IIFE in `<head>` reads `localStorage` and `prefers-color-scheme` before any React code runs; the provider then handles toggling and persistence without fighting the initial class.',
        ru: 'Inline ThemeScript до гидратации плюс client ThemeProvider, а не ThemeProvider в одиночку. Применение класса `dark` только в `useEffect` означает, что первый paint всегда светлый, затем flash в тёмный — и hydration React 19 может предупреждать о расхождении server HTML и client state на `<html class>`. Синхронный IIFE в `<head>` читает `localStorage` и `prefers-color-scheme` до запуска React; provider затем переключает тему и сохраняет выбор, не споря с начальным классом.',
      },
      {
        en: 'Custom markdown renderer in `lib/markdown.tsx` instead of remark/rehype or MDX. The blog needs headings, lists, blockquotes, fenced code blocks, and inline bold/italic/code — nothing more. Adding remark + rehype-react or an MDX pipeline would introduce multiple dependencies and a compile step for content that already lives as plain strings in `data/post-bodies.ts`. A line-by-line parser returning React nodes renders identically on the server, keeps bundle size down, and makes the supported syntax explicit and testable.',
        ru: 'Кастомный markdown-рендерер в `lib/markdown.tsx` вместо remark/rehype или MDX. Блогу нужны заголовки, списки, blockquote, fenced code blocks и inline bold/italic/code — не больше. remark + rehype-react или MDX-пайплайн добавили бы несколько зависимостей и compile step для контента, который уже живёт plain strings в `data/post-bodies.ts`. Построчный парсер, возвращающий React-узлы, рендерится одинаково на сервере, держит bundle маленьким и делает поддерживаемый синтаксис явным и тестируемым.',
      },
      {
        en: 'Server Components by default with client islands only where browser APIs are required. Project list, project detail, blog index, and blog post pages are async RSCs — they call `getTranslations`, `pick()`, and `renderMarkdown()` without shipping that logic to the client. `\'use client\'` is limited to Header (scroll lock, Escape, locale router), ThemeProvider, CodeBlock (clipboard API), BlogTagFilter, and LocaleHtml (`document.documentElement.lang`). The alternative — marking pages client-side to use hooks — would forfeit static HTML for content that has no client interactivity.',
        ru: 'Server Components по умолчанию, client islands только там, где нужны browser API. Списки проектов, детальные страницы, индекс блога и посты — async RSC: вызывают `getTranslations`, `pick()` и `renderMarkdown()` без отправки этой логики на клиент. `\'use client\'` ограничен Header (scroll lock, Escape, locale router), ThemeProvider, CodeBlock (clipboard API), BlogTagFilter и LocaleHtml (`document.documentElement.lang`). Альтернатива — client pages ради хуков — лишила бы статический HTML контент, которому не нужна client-интерактивность.',
      },
      {
        en: 'Shared `LocalizedText` model (`{ en, ru }`) for all content data with identical key sets enforced by TypeScript, rather than parallel arrays or locale-suffixed fields. Projects, posts, excerpts, reading times, and markdown bodies all use the same shape; `pick(text, locale)` is the single access point. UI labels stay in next-intl JSON catalogs where ICU pluralization and namespace grouping belong. Mixing content strings into `messages/` would blur the boundary between translatable chrome and versioned editorial content.',
        ru: 'Общая модель `LocalizedText` (`{ en, ru }`) для всего контентного слоя с идентичными наборами ключей на уровне TypeScript, а не параллельные массивы или поля с суффиксом локали. Проекты, посты, excerpt, reading time и markdown-тела используют одну форму; `pick(text, locale)` — единая точка доступа. UI-лейблы остаются в JSON-каталогах next-intl, где уместны ICU-плюрализация и группировка по namespace. Смешивание контентных строк в `messages/` размывало бы границу между переводимым хромом и версионируемым editorial-контентом.',
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
