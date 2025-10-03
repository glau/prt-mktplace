# Guia: MSW no Vercel (Next.js 15 / App Router)

Este guia descreve tudo o que é necessário para rodar a aplicação com dados mockados usando Mock Service Worker (MSW) em produção no Vercel.

## Objetivo
- Habilitar MSW em ambientes de Preview e Produção do Vercel para demonstrações com stakeholders.
- Garantir que o Service Worker controle a página no primeiro acesso.
- Tornar simples ligar/desligar o MSW via variável de ambiente.

## Pré‑requisitos
- Projeto Next.js 15 com App Router.
- Dependência `msw` instalada (já presente neste projeto).
- Vercel CLI instalado e projeto linkado (`vercel link`).

## Arquivos envolvidos no projeto
- `public/mockServiceWorker.js` (obrigatório no runtime)
- `src/app/providers/MswProvider.tsx` (inicializa MSW no cliente e controla readiness)
- `src/mocks/initMocks.ts` (faz `worker.start()` com URL explícita do SW)
- `src/mocks/browser.ts` (exporta `worker` com `setupWorker(...handlers)`)
- `src/mocks/handlers.ts` (rotas e respostas mock)
- `src/lib/api.ts` (fetches do cliente com `cache: 'no-store'`)
- `src/app/layout.tsx` (envolve a árvore com `MswProvider`)

## Passo a passo

### 1) Gerar o Service Worker do MSW
Gere o arquivo do worker dentro de `public/` (somente uma vez, commit no repositório):

```bash
npx msw init public --save
```

Confirme que `public/mockServiceWorker.js` existe e está versionado (necessário para produção).

### 2) Inicialização do MSW no cliente
- O provider `src/app/providers/MswProvider.tsx` habilita o MSW quando:
  - `NODE_ENV === 'development'`, ou
  - `NEXT_PUBLIC_ENABLE_MSW` for `true`/`1`, ou
  - `NODE_ENV === 'production'` (ativado por padrão neste projeto para facilitar demos).
- Ele aguarda o worker iniciar antes de renderizar a UI e faz um reload único caso a página ainda não esteja controlada pelo SW.
- Define `window.__MSW_READY = true` quando pronto (útil para diagnósticos).

Se você quiser controlar o MSW em produção SOMENTE por variável de ambiente, altere a condição de habilitação para:

```ts
// Em MswProvider.tsx
const shouldEnable = isDev || enableMsw; // Remover o isProd
```

### 3) Configurar Handlers
- Em `src/mocks/handlers.ts`, os handlers usam RegExp para combinar rotas em qualquer origem (produção, preview, localhost). Exemplos:
  - `/api/categories`, `/api/categories/:id`
  - `/api/products`, `/api/products/:id`
- Há logs de diagnóstico por rota para confirmar interceptação.

### 4) Ajustar fetches para evitar cache
- Em `src/lib/api.ts`, as chamadas `fetch` usam `{ cache: 'no-store' }` para evitar cache de navegador e privilegiar a resposta do MSW.

### 5) Habilitar via variável de ambiente (opcional)
- Variável pública (exposta no cliente): `NEXT_PUBLIC_ENABLE_MSW`
- Para ativar em todos os ambientes no Vercel (opcional neste projeto, pois já ativamos em prod):

```bash
echo "true" | vercel env add NEXT_PUBLIC_ENABLE_MSW development
echo "true" | vercel env add NEXT_PUBLIC_ENABLE_MSW preview
echo "true" | vercel env add NEXT_PUBLIC_ENABLE_MSW production
```

Ou configure via Dashboard: Project → Settings → Environment Variables.

### 6) Deploy no Vercel

```bash
vercel --prod
```

Se for o primeiro deploy: `vercel link --yes` (ou `--project <nome>`), e depois `vercel --prod`.

## Validação em produção
1. Acesse sua URL de produção (ex.: `https://<seu-projeto>.vercel.app`).
2. Abra o DevTools (Console) e verifique logs do MSW:
   - `[MSW] Starting worker...`
   - `[MSW] Mocking enabled.`
   - `[MSW] Worker started and ready.`
3. Verifique se as chamadas `/api/...` retornam 200 com payload mock e aparecem logs dos handlers (ex.: `[MSW] GET /api/products`).
4. No primeiro acesso, pode ocorrer um reload automático para o SW assumir controle (comportamento esperado).

## Solução de problemas
- 404 em `/api/...` mesmo com SW ativo:
  - Confirme que a página é controlada: `navigator.serviceWorker.controller` deve ser `true`.
  - Garanta que as requisições são feitas no cliente (este projeto usa `'use client'` + `useEffect`). MSW não intercepta requisições feitas no server.
  - Verifique se `public/mockServiceWorker.js` está disponível (200).
  - Confira os padrões dos handlers (RegExp) e se as rotas batem.
- Nada aparece no console:
  - Verifique se `MswProvider` está envolto em `src/app/layout.tsx`.
  - Verifique se `NEXT_PUBLIC_ENABLE_MSW` está setada quando a condição exigir.
- Cache do navegador:
  - Faça hard refresh (Shift+Reload) ou use janela anônima.

## Como desligar o MSW em produção
- Se mantiver a condição padrão (MSW sempre ativo em prod), altere o código para depender apenas de `NEXT_PUBLIC_ENABLE_MSW` (ver passo 2) e faça deploy.
- Em seguida, defina `NEXT_PUBLIC_ENABLE_MSW=false` (ou remova a variável) e redeploy.

## Segurança
- Nunca coloque segredos em variáveis `NEXT_PUBLIC_*` (são expostas no cliente).
- MSW deve ser usado apenas para dados de demonstração.

## Referências
- Documentação MSW: https://mswjs.io/docs
- Quick Start: https://mswjs.io/docs/quick-start
- Next.js (Deploy): https://nextjs.org/docs/app/building-your-application/deploying
