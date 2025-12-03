<!-- Copilot instructions for the prt-mktplace repository -->
# Repo overview for AI coding agents

This repository is a Next.js 15 TypeScript app (App Router) implementing a marketplace prototype. Key technologies: Next.js 15, React 19, Material UI 7, MSW (Mock Service Worker), Vitest + Testing Library.

Quick pointers (what an agent needs to know to be productive):

- App entry & composition: `src/app/layout.tsx` composes providers in this order: `AppRouterCacheProvider` → `ColorModeProvider` → `MswProvider` → `UserProvider`. Changes to global behavior (theme, msw, user) should be made there or in the corresponding `src/app/providers/*` files.

- API surface: network calls are centralized in `src/lib/api.ts`. Use these helpers (`fetchProducts`, `fetchProductById`, `fetchCategories`, ...) when adding features or tests that rely on the app API.

- MSW + mocks: the app boots MSW in the browser via `src/mocks/initMocks.ts` and a Node server for tests in `src/mocks/server.ts`. Test setup is configured in `src/test/setupTests.tsx`. For new mocked endpoints, add handlers in `src/mocks/handlers.ts` and update tests to use the provided factories in `src/test/factories.ts`.

- Tests & utilities: test helpers live under `src/test/`. Use `renderWithProviders`, `renderWithLayout`, `createTestProduct(s)`, and `mockFetchRoutes` instead of ad-hoc providers or fetch mocks — those helpers ensure consistent providers, color-mode, and MSW/test environment behavior.

- Scripts & running:
  - Dev: `npm run dev` (Next dev with turbopack)
  - Build: `npm run build`
  - Tests: `npm test`, watch: `npm run test:watch`, coverage: `npm run test:coverage`

- Conventions & patterns to follow:
  - Prefer the centralized API in `src/lib/api.ts` for server requests; components rarely call `fetch` directly.
  - Use `useAsyncOperation` (in `src/hooks/useAsyncOperation.ts`) for standardized async loading/error state; it returns `{ data, loading, error, retry }`.
  - UI composition uses MUI: theme is created in `src/theme.ts` (use `createAppTheme`) and components follow the `sx` prop pattern for styling.
  - Favorites and small client-side state use hooks under `src/hooks/` (e.g., `useFavorites.ts`); persist via `localStorage`/`sessionStorage` as existing hooks do.

- Files that frequently change and are good reference points:
  - `src/app/layout.tsx` (global provider composition)
  - `src/lib/api.ts` (fetch helpers and error handling pattern)
  - `src/mocks/*` (MSW setup & handlers)
  - `src/test/*` (factories and render utilities)
  - `src/components/*` and `src/hooks/*` for UI & behavior patterns

- Integration notes:
  - `next.config.ts` contains allowed remote image patterns (images.unsplash.com) — update when adding external image hosts.
  - MSW worker file is expected at `public/mockServiceWorker.js` (config in package.json `msw.workerDirectory`).

- When editing code, follow these safe edits:
  - Preserve provider order in `layout.tsx` unless changing global semantics intentionally.
  - Add API routes by extending `src/mocks/handlers.ts` and `src/lib/api.ts` in parallel so tests and runtime remain consistent.
  - Use `src/test/factories.ts` for test data and `mockFetchRoutes` or MSW handlers for network expectations.

Examples (pattern excerpts):
- Async hook usage: `const { data, loading, error } = useAsyncOperation(() => fetchProducts({ category }), [category]);`
- Fetch helper usage: `const products = await fetchProducts({ category: 'metal' });` (from `src/lib/api.ts`)

If you need to run tests or update coverage HTML, use: `npm run test:coverage` and open `coverage/index.html`.

If anything above is unclear or you'd like more detail (CI, release, Storybook on this branch), tell me which area to expand and I'll update the file.
