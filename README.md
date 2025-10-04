# B2Blue Marketplace - Protótipo

Protótipo do marketplace B2Blue usando Next.js 15 e Material UI 7 para gestão de resíduos industriais.

## 🚀 Tecnologias

- **Next.js 15** - App Router com React 19
- **Material UI 7** - Design system moderno
- **TypeScript** - Type safety completo
- **Vitest + Testing Library** - Testes unitários e de integração
- **MSW (Mock Service Worker)** - API mockada para demos

## 📊 Estatísticas do Projeto

- ✅ **39 testes** com 100% de aprovação
- ✅ **~800 linhas** de código duplicado eliminadas
- ✅ **6 hooks/utilitários** reutilizáveis criados
- ✅ **Performance otimizada** com memoização estratégica

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## MSW on Vercel (Mock API in Production)

For step-by-step instructions to run this app with Mock Service Worker (MSW) on Vercel (preview and production), see:

- [docs/msw-on-vercel.md](docs/msw-on-vercel.md)

## Tests (Vitest + Testing Library)

- We use [Vitest](https://vitest.dev/) with JSDOM and Testing Library.
- MSW is enabled in tests via a Node server (`src/mocks/server.ts`) configured in `src/test/setupTests.ts`.

### Install deps

```bash
npm install
```

### Run tests

```bash
npm test
# watch mode
npm run test:watch
# UI mode
npm run test:ui
```

### Coverage

```bash
npm run test:coverage
```

Outputs to `coverage/` with:
- `coverage/lcov.info` for external services
- `coverage/index.html` for a local HTML report

Config lives in `vitest.config.ts` (coverage provider: v8; reporters: text, lcov, html).

## Automatic Coverage Monitoring (CI)

This repository includes a GitHub Actions workflow at `.github/workflows/test.yml` which:
- Runs tests with coverage on push and pull_request
- Uploads the HTML report as a build artifact
- Optionally uploads to Codecov if `CODECOV_TOKEN` is set as a repository secret

Steps to enable Codecov (optional):
1. Create a project in Codecov and obtain the token
2. In GitHub: Settings → Secrets and variables → Actions → New repository secret
   - Name: `CODECOV_TOKEN`
   - Value: your Codecov token
3. Push a commit or open a PR; the workflow will publish coverage to Codecov

Local HTML report is available after `npm run test:coverage` at `coverage/index.html`.

## 🔄 Refatorações e Otimizações

Este projeto passou por uma refatoração completa para eliminar código duplicado e melhorar performance. Veja o documento completo em:

📄 **[docs/REFACTORING_SUMMARY.md](docs/REFACTORING_SUMMARY.md)**

### Principais Melhorias:

#### 1. Componentes Unificados
- **ImageGallery**: Unificação de 2 componentes em 1 com props opcionais
- **ProductFilters**: Eliminação de duplicação desktop/mobile

#### 2. Hooks Customizados
- `useFavorites` - Gerenciamento de favoritos com localStorage
- `useAsyncOperation` - Padrão para operações assíncronas

#### 3. Utilitários Padronizados
- `formatters.ts` - Formatação de moeda, data, quantidade
- `commonStyles.ts` - Styles compartilhados (ellipsis, hover, grids)

#### 4. Cobertura de Testes
```bash
npm test                 # Todos os testes (39 ✅)
npm run test:coverage   # Com relatório de cobertura
```

### Arquitetura

```
src/
├── components/          # Componentes React otimizados
├── hooks/              # Hooks customizados reutilizáveis
│   ├── useFavorites.ts
│   └── useAsyncOperation.ts
├── utils/              # Utilitários e helpers
│   └── formatters.ts
├── styles/             # Styles compartilhados
│   └── commonStyles.ts
├── mocks/              # MSW handlers para API mockada
└── __tests__/          # Testes unitários e integração
```

## 🎨 Componentes Principais

- **ProductCard** - Card de produto com favoritos
- **ProductListItem** - Item de lista em modo lista
- **ImageGallery** - Galeria com zoom e navegação
- **ProductFilters** - Filtros reutilizáveis
- **HeroSection** - Banner da home

## 📱 Páginas

- `/` - Home com categorias e produtos em destaque
- `/categoria/[slug]` - Listagem de produtos por categoria
- `/produto/[id]` - Detalhes do produto
- `/categorias` - Lista de todas as categorias
