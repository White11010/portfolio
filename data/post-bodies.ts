export const POST_OPTIONAL_CHAINING_EN = `## The Problem with Silent Short-Circuiting

Optional chaining (\`?.\`) is one of the most loved features in modern TypeScript. It lets you traverse deeply nested objects without writing defensive checks at every level:

\`\`\`typescript
const city = user?.address?.city;
\`\`\`

Clean, readable, and — seemingly — safe. But there is a subtle trap here. When \`user\` or \`address\` is null, the expression evaluates to \`undefined\` and your program continues as if nothing happened. No error, no warning, no indication that something is off.

## When Silence Becomes a Bug

Consider a function that computes a discount based on a user's membership tier:

\`\`\`typescript
const discount = user?.membership?.discount ?? 0;
\`\`\`

This looks correct. If the user has no membership, the discount defaults to zero. But what if a user *should* have a membership and the data is simply missing due to a bug upstream? You will never know. The discount silently becomes zero, and the user gets no discount — a revenue leak that is hard to trace.

## The Option Type Alternative

With an Option type, the absence of a value is explicit:

\`\`\`typescript
const discount = Option.fromNullable(user?.membership?.discount)
  .match({
    some: (d) => d,
    none: () => {
      logger.warn('Missing membership for user', { userId: user.id });
      return 0;
    }
  });
\`\`\`

Now you can log, throw, or handle the missing case in whatever way makes sense for your domain. The key insight is that Option forces you to acknowledge the possibility of absence.

> Optional chaining asks "what if it is null?" The Option type asks "what should we do if it is null?"

## When to Use Which

Optional chaining is fine for genuinely optional data — UI labels, optional form fields, feature flags. The Option type shines for data that carries business meaning when absent. Use both, but know the difference.`;

export const POST_OPTIONAL_CHAINING_RU = `## Проблема тихого short-circuit

Optional chaining (\`?.\`) — одна из самых любимых возможностей современного TypeScript. Позволяет обходить глубоко вложенные объекты без защитных проверок на каждом уровне:

\`\`\`typescript
const city = user?.address?.city;
\`\`\`

Чисто, читаемо и, кажется, безопасно. Но есть тонкая ловушка: когда \`user\` или \`address\` равны null, выражение даёт \`undefined\`, и программа продолжает работу, будто ничего не произошло. Ни ошибки, ни предупреждения.

## Когда молчание становится багом

Функция вычисляет скидку по уровню членства пользователя:

\`\`\`typescript
const discount = user?.membership?.discount ?? 0;
\`\`\`

Выглядит корректно: нет членства — скидка ноль. Но что если членство *должно* быть, а данные просто потерялись из-за бага выше по стеку? Вы не узнаете. Скидка молча становится нулём — утечка выручки, которую сложно отследить.

## Альтернатива — тип Option

С типом Option отсутствие значения явное:

\`\`\`typescript
const discount = Option.fromNullable(user?.membership?.discount)
  .match({
    some: (d) => d,
    none: () => {
      logger.warn('Missing membership for user', { userId: user.id });
      return 0;
    }
  });
\`\`\`

Теперь можно логировать, бросать исключение или обрабатывать пропуск так, как требует домен. Option заставляет признать возможность отсутствия значения.

> Optional chaining спрашивает «а что если null?». Option спрашивает «что делать, если null?».

## Когда что использовать

Optional chaining подходит для действительно опциональных данных — подписи UI, необязательные поля, feature flags. Option сияет там, где отсутствие данных несёт бизнес-смысл. Используйте оба, но понимайте разницу.`;

export const POST_CHESS_ANALYZER_EN = `## Why Electron

Chess Analyzer needs a file system, native menus, and deep integration with the Stockfish engine. A browser tab cannot do all of that comfortably. Electron gets a bad reputation for memory usage, but for a local-first tool it is the right trade-off.

## Engine Communication

Stockfish runs as a separate process. Communication happens over standard input/output using the UCI protocol. The key challenge is that Stockfish outputs evaluation lines continuously as it thinks, and you need to parse and display them incrementally.

\`\`\`typescript
engine.on('line', (line: string) => {
  const info = parseUciInfo(line);
  if (info.score) updateEvaluation(info);
});
\`\`\`

I use a dedicated Worker thread to avoid blocking the renderer. The worker owns the Stockfish subprocess and emits parsed evaluation updates through a message port.

## Position Caching

Analyzing the same position twice is wasteful. I implemented a cache keyed on Zobrist hashes — a standard technique from chess programming. When the user navigates back to a previously analyzed position, the evaluation is served from cache instantly.

\`\`\`typescript
const cache = new Map<string, Evaluation>();
const hash = zobrist(board);
if (cache.has(hash)) return cache.get(hash)!;
\`\`\`

The cache is bounded to 10,000 entries. In practice this covers most games without exceeding 50MB of memory.

## Lessons Learned

1. **Separate processes early.** Do not try to run computation in the renderer. The moment you add Stockfish, you need a process boundary.
2. **Cache aggressively.** Position evaluations are deterministic — there is no reason to compute them twice.
3. **Ship incrementally.** The first version had PGN loading and basic evaluation. Variant exploration and cache came later. Each release was usable on its own.`;

export const POST_CHESS_ANALYZER_RU = `## Почему Electron

Chess Analyzer нужны файловая система, нативные меню и глубокая интеграция с движком Stockfish. Вкладка браузера с этим не справится. Electron критикуют за память, но для local-first инструмента это разумный компромисс.

## Связь с движком

Stockfish работает отдельным процессом. Обмен — через stdin/stdout по протоколу UCI. Главная сложность: движок непрерывно выводит строки оценки, их нужно парсить и показывать по мере поступления.

\`\`\`typescript
engine.on('line', (line: string) => {
  const info = parseUciInfo(line);
  if (info.score) updateEvaluation(info);
});
\`\`\`

Отдельный Worker не блокирует renderer. Worker владеет subprocess Stockfish и шлёт распарсенные обновления через message port.

## Кеш позиций

Анализировать одну позицию дважды — расточительство. Кеш по Zobrist-хешам — стандартный приём в шахматном программировании. При возврате к уже проанализированной позиции оценка берётся из кеша мгновенно.

\`\`\`typescript
const cache = new Map<string, Evaluation>();
const hash = zobrist(board);
if (cache.has(hash)) return cache.get(hash)!;
\`\`\`

Кеш ограничен 10 000 записей. На практике этого хватает для большинства партий без превышения 50MB памяти.

## Уроки

1. **Разделяйте процессы рано.** Не запускайте вычисления в renderer — с Stockfish нужна граница процессов.
2. **Кешируйте агрессивно.** Оценки позиций детерминированы — пересчитывать их незачем.
3. **Выпускайте по частям.** Первая версия умела загружать PGN и базовую оценку. Варианты и кеш пришли позже. Каждый релиз был пригоден к использованию.`;

export const POST_FUNCTIONAL_PATTERNS_EN = `## Games Are State Machines

At their core, turn-based games are state machines. You have a current state, the player makes a decision, and you produce a new state. This maps perfectly to a pure function:

\`\`\`typescript
function applyTurn(state: GameState, decision: Decision): GameState {
  const afterTax = applyTaxPolicy(state, decision.taxRate);
  const afterInvestment = invest(afterTax, decision.investments);
  const afterEvents = applyRandomEvents(afterInvestment, state.rng);
  return afterEvents;
}
\`\`\`

Every function takes a state and returns a new state. No mutation, no side effects. This makes it trivial to implement undo, replay, and save/load — you just store the sequence of decisions and replay them.

## Immutability and Undo

Because each turn produces a fresh state object, implementing undo is simply a matter of keeping a history stack:

\`\`\`typescript
const history: GameState[] = [initialState];

function undo(): GameState {
  if (history.length > 1) {
    history.pop();
    return history[history.length - 1];
  }
  return history[0];
}
\`\`\`

No complex snapshot logic. No deep cloning. The history is the source of truth.

## Composition Over Inheritance

A typical game architecture uses inheritance — a \`GameObject\` base class with \`Building\`, \`Industry\`, and \`Policy\` subclasses. I found that composition works better for a game where the same entity can gain new behaviors over time.

> Think of game entities as bags of components, not members of a class hierarchy.

An industry starts with just production. After a tech upgrade, it gains an efficiency modifier. After a policy change, it gains a tax incentive. Each behavior is a function that wraps the previous one:

\`\`\`typescript
let produce = baseProduction;
produce = withEfficiencyUpgrade(produce, upgrade);
produce = withTaxIncentive(produce, policy);
\`\`\`

## Testing

Pure functions are easy to test. Given a state and a decision, the output is deterministic (once you control the RNG seed). I can test the entire game logic without rendering a single pixel.

This separation between logic and presentation is perhaps the most valuable outcome of the functional approach. The game engine does not know about the DOM, and the UI does not know about state transitions. They communicate through a thin interface.`;

export const POST_FUNCTIONAL_PATTERNS_RU = `## Игры — это конечные автоматы

Пошаговые игры по сути — state machines. Есть текущее состояние, игрок принимает решение, получается новое состояние. Это идеально ложится на чистую функцию:

\`\`\`typescript
function applyTurn(state: GameState, decision: Decision): GameState {
  const afterTax = applyTaxPolicy(state, decision.taxRate);
  const afterInvestment = invest(afterTax, decision.investments);
  const afterEvents = applyRandomEvents(afterInvestment, state.rng);
  return afterEvents;
}
\`\`\`

Каждая функция принимает состояние и возвращает новое. Без мутаций и побочных эффектов. Undo, replay и save/load тривиальны — достаточно хранить последовательность решений и проигрывать её.

## Иммутабельность и Undo

Каждый ход создаёт новый объект состояния, поэтому undo — это стек истории:

\`\`\`typescript
const history: GameState[] = [initialState];

function undo(): GameState {
  if (history.length > 1) {
    history.pop();
    return history[history.length - 1];
  }
  return history[0];
}
\`\`\`

Никаких сложных снимков и глубокого клонирования. История — единственный источник правды.

## Композиция вместо наследования

Классическая архитектура игр — наследование: базовый \`GameObject\` и подклассы \`Building\`, \`Industry\`, \`Policy\`. Композиция лучше, когда сущность со временем обретает новое поведение.

> Думайте о сущностях как о мешках компонентов, а не об иерархии классов.

Отрасль начинает с производства. После апгрейда — модификатор эффективности. После смены политики — налоговый стимул. Каждое поведение — функция, оборачивающая предыдущую:

\`\`\`typescript
let produce = baseProduction;
produce = withEfficiencyUpgrade(produce, upgrade);
produce = withTaxIncentive(produce, policy);
\`\`\`

## Тестирование

Чистые функции легко тестировать. При фиксированном seed RNG результат детерминирован. Можно проверить всю игровую логику без единого пикселя UI.

Разделение логики и представления — главный выигрыш функционального подхода. Движок не знает про DOM, UI не знает про переходы состояний. Они общаются через тонкий интерфейс.`;
