# Portfolio — Alex Ivanov

Personal portfolio and blog built with Next.js, TypeScript, and Tailwind CSS.

## Stack

- **Next.js 15** (App Router, SSR/SSG)
- **TypeScript**
- **Tailwind CSS**
- **next-intl** (EN / RU localization)

## Commands

```bash
npm install
npm run dev      # development server at http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
npm run typecheck
npm run format   # Prettier
```

## Structure

```
app/           # Next.js routes (locale-aware)
components/    # UI components
data/          # Localized static content (projects, posts)
lib/           # Utilities (markdown, formatting)
messages/      # i18n UI dictionaries (en.json, ru.json)
i18n/          # next-intl routing and navigation
```

## Localization

Supported locales: **English** (`/en`) and **Russian** (`/ru`). Default locale redirects from `/` to `/en`.
