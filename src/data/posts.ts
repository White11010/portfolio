export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  external?: boolean;
  externalUrl?: string;
  body: string;
}

export const posts: Post[] = [
  {
    slug: 'optional-chaining-vs-option-type',
    title: 'Optional Chaining vs Option Type: When Safety Matters',
    excerpt:
      'Optional chaining is convenient, but it silently swallows nulls. Here is why an explicit Option type can save you from subtle bugs in larger codebases.',
    date: '2026-03-14',
    readingTime: '8 min',
    tags: ['TypeScript', 'Architecture'],
    body: `## The Problem with Silent Short-Circuiting

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

Optional chaining is fine for genuinely optional data — UI labels, optional form fields, feature flags. The Option type shines for data that carries business meaning when absent. Use both, but know the difference.`,
  },
  {
    slug: 'building-chess-analyzer',
    title: 'Building Chess Analyzer: Architecture Lessons from a Side Project',
    excerpt:
      'What I learned about Electron IPC, engine integration, and keeping a desktop app responsive while running heavy computation in the background.',
    date: '2026-01-22',
    readingTime: '12 min',
    tags: ['Architecture', 'Open Source'],
    body: `## Why Electron

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
3. **Ship incrementally.** The first version had PGN loading and basic evaluation. Variant exploration and cache came later. Each release was usable on its own.`,
  },
  {
    slug: 'functional-patterns-in-game-dev',
    title: 'Functional Patterns in Game Development',
    excerpt:
      'How I applied functional programming ideas — immutability, pure functions, and composition — to a browser-based economy game and why it made the code easier to test and extend.',
    date: '2025-11-08',
    readingTime: '10 min',
    tags: ['TypeScript', 'Game Dev', 'Open Source'],
    body: `## Games Are State Machines

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

This separation between logic and presentation is perhaps the most valuable outcome of the functional approach. The game engine does not know about the DOM, and the UI does not know about state transitions. They communicate through a thin interface.`,
  },
];

export const blogTags = ['All', 'TypeScript', 'Architecture', 'Open Source', 'Game Dev'];
