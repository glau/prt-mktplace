# 🔄 Exemplo de Refatoração de Testes

Este documento mostra um exemplo real de como os testes podem ser refatorados usando os novos helpers.

---

## Antes da Refatoração

```typescript
// src/app/__tests__/home.page.test.tsx (ANTES)
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import type { Mock } from 'vitest';

// 🔴 Mock repetido em ~10 arquivos
vi.mock('../../app/providers/ColorModeProvider', () => ({
  useColorMode: () => ({ mode: 'light', toggleColorMode: vi.fn() }),
}));

vi.mock('../../components/AppLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// 🔴 Test data inline - 43 linhas de produto!
vi.mock('../../lib/api', () => ({
  fetchCategories: vi.fn(async () => [{ id: 'metal', name: 'Metais', count: 10 }]),
  fetchProducts: vi.fn(async () => [
    {
      id: '1',
      title: 'Produto A',
      price: 10,
      location: 'São Paulo, SP',
      category: 'metal',
      description: 'desc',
      images: ['/a.jpg'],
      seller: { name: 'Loja', rating: 4.5, verified: true },
      createdAt: '2024-01-01T00:00:00Z',
      adDetails: {
        id: 1,
        title: 'Produto A',
        category: 'metal',
        ad_type: 'Venda',
        slug: 'produto-a',
        description: 'desc',
        quantity: { value: '1', unit: 'un', frequency: 'Mensal' },
        price: { currency: 'BRL', value: '10.00' },
        classification: { origin: 'X', hazard_status: 'Não perigoso' },
        logistics: { transport_available: false, transport_details: '' },
        equipment: { quantity: '0', name: '' },
        metadata: { 
          creation_date: '2024-01-01T00:00:00Z', 
          last_access_date: '2024-01-02T00:00:00Z', 
          required_documents: false 
        },
        media: { main_image_url: '/a.jpg', gallery_images: ['/a.jpg'] },
      },
    },
  ]),
}));

const Home = (await import('../page')).default;

describe('Home page', () => {
  it('renders categories and featured products after loading', async () => {
    render(<Home />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(await screen.findByText('Categorias')).toBeInTheDocument();
    expect(await screen.findByText('Produtos em Destaque')).toBeInTheDocument();
  });

  it('shows error UI when API fails', async () => {
    const api = await import('../../lib/api');
    (api.fetchCategories as unknown as Mock).mockRejectedValueOnce(new Error('fail'));

    render(<Home />);

    expect(await screen.findByText('Não foi possível carregar os dados.')).toBeInTheDocument();
  });
});
```

**Estatísticas:**
- 📏 67 linhas totais
- 🔴 43 linhas de test data inline
- 🔴 15 linhas de mocks duplicados
- 🔴 Mock complexo e difícil de manter

---

## Depois da Refatoração

```typescript
// src/app/__tests__/home.page.test.tsx (DEPOIS)
import { 
  describe, 
  it, 
  expect, 
  vi,
  screen,
  createTestProduct,
  createTestCategory,
} from '@/test';

// ✅ Mocks movidos para setup global (vitest.setup.ts)
// ✅ Não precisa repetir em cada arquivo!

// ✅ Factory limpa e concisa
vi.mock('../../lib/api', () => ({
  fetchCategories: vi.fn(async () => [
    createTestCategory({ id: 'metal', name: 'Metais', count: 10 })
  ]),
  fetchProducts: vi.fn(async () => [
    createTestProduct({ 
      id: '1', 
      title: 'Produto A', 
      price: 10 
    })
  ]),
}));

const Home = (await import('../page')).default;

describe('Home page', () => {
  it('renders categories and featured products after loading', async () => {
    render(<Home />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(await screen.findByText('Categorias')).toBeInTheDocument();
    expect(await screen.findByText('Produtos em Destaque')).toBeInTheDocument();
  });

  it('shows error UI when API fails', async () => {
    const api = await import('../../lib/api');
    (api.fetchCategories as Mock).mockRejectedValueOnce(new Error('fail'));

    render(<Home />);

    expect(await screen.findByText('Não foi possível carregar os dados.')).toBeInTheDocument();
  });
});
```

**Estatísticas:**
- 📏 **40 linhas totais** (⬇️ 40% redução)
- ✅ **3 linhas** de test data (factory)
- ✅ **0 linhas** de mocks duplicados
- ✅ Fácil de ler e manter

---

## Exemplo 2: Teste com Fetch Mock

### Antes

```typescript
// src/app/__tests__/category.page.test.tsx (ANTES)
let fetchMock: ((url: string | Request | URL, init?: RequestInit) => Promise<Response>) & { 
  mockImplementation: any 
};

function setFetchResponse({ category, products, ok = true }: { 
  category?: Category; 
  products?: Product[]; 
  ok?: boolean 
}) {
  fetchMock.mockImplementation((url: RequestInfo | URL) => {
    const u = String(url);
    if (u.startsWith('/api/categories/')) {
      return Promise.resolve({ 
        ok, 
        json: () => Promise.resolve({ category }) 
      } as unknown as Response);
    }
    if (u.startsWith('/api/products')) {
      return Promise.resolve({ 
        ok, 
        json: () => Promise.resolve({ products }) 
      } as unknown as Response);
    }
    return Promise.reject(new Error('unknown url'));
  });
}

const sampleCategory: Category = { id: 'metais', name: 'Metais', count: 2 };
const sampleProducts: Product[] = [/* 40+ linhas de dados */];

describe('CategoryPageClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
    fetchMock = vi.fn() as any;
    vi.stubGlobal('fetch', fetchMock as any);
  });
  
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loads category and products', async () => {
    setFetchResponse({ category: sampleCategory, products: sampleProducts });
    // ... resto do teste
  });
});
```

**Problemas:**
- 🔴 30+ linhas de boilerplate de fetch mock
- 🔴 Função helper complexa `setFetchResponse`
- 🔴 Setup/teardown repetitivo
- 🔴 Dados de teste inline

---

### Depois

```typescript
// src/app/__tests__/category.page.test.tsx (DEPOIS)
import { 
  describe, 
  it, 
  expect,
  screen,
  mockFetchRoutes,
  setupFetchMock,
  cleanupFetchMock,
  createTestCategory,
  createTestProducts,
} from '@/test';

const sampleCategory = createTestCategory({ id: 'metais', name: 'Metais', count: 2 });
const sampleProducts = createTestProducts(3);

describe('CategoryPageClient', () => {
  let fetchMock: Mock;

  beforeEach(() => {
    fetchMock = setupFetchMock();
  });
  
  afterEach(() => {
    cleanupFetchMock();
  });

  it('loads category and products', async () => {
    mockFetchRoutes(fetchMock, {
      '/api/categories/': { category: sampleCategory },
      '/api/products': { products: sampleProducts },
    });
    
    render(<CategoryPageClient slug="metais" />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect((await screen.findAllByText('Metais')).length).toBeGreaterThan(0);
  });

  it('shows error when API fails', async () => {
    mockFetchRoutes(fetchMock, {
      '/api/categories/': { category: undefined },
    });
    
    render(<CategoryPageClient slug="metais" />);
    
    expect(await screen.findByText(/não foi possível/i)).toBeInTheDocument();
  });
});
```

**Melhorias:**
- ✅ **~15 linhas** vs 60+ linhas (⬇️ 75% redução)
- ✅ Fetch mock declarativo e simples
- ✅ Setup/teardown mínimo
- ✅ Test data via factories

---

## Exemplo 3: Teste de Componente com Providers

### Antes

```typescript
// src/components/__tests__/MyComponent.test.tsx (ANTES)
import React from 'react';
import { render, screen } from '@testing-library/react';
import ColorModeProvider from '../../app/providers/ColorModeProvider';
import AppLayout from '../AppLayout';
import MyComponent from '../MyComponent';

// 🔴 Repetido em vários testes
const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <ColorModeProvider>
      <AppLayout>
        {ui}
      </AppLayout>
    </ColorModeProvider>
  );

describe('MyComponent', () => {
  it('renders correctly', () => {
    renderWithProviders(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

---

### Depois

```typescript
// src/components/__tests__/MyComponent.test.tsx (DEPOIS)
import { describe, it, expect, screen, renderWithLayout } from '@/test';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    renderWithLayout(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
  
  it('works in dark mode', () => {
    renderWithLayout(<MyComponent />, { colorMode: 'dark' });
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

**Melhorias:**
- ✅ Reutilização de helper
- ✅ Suporte a dark mode built-in
- ✅ Menos imports

---

## Comparação de Métricas

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **Linhas totais** | 67 | 40 | ⬇️ 40% |
| **Linhas de boilerplate** | 43 | 3 | ⬇️ 93% |
| **Mocks duplicados** | 15 | 0 | ⬇️ 100% |
| **Imports** | 3 | 1 | ⬇️ 67% |
| **Legibilidade** | 😐 | 😊 | ⬆️ |
| **Manutenibilidade** | 😟 | 😊 | ⬆️ |

---

## Como Migrar Seus Testes

### Passo 1: Instalar os helpers

```bash
# Os arquivos já foram criados em src/test/
# Apenas certifique-se de que existem:
ls -la src/test/
```

### Passo 2: Configurar path alias (opcional mas recomendado)

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/test": ["./src/test"]
    }
  }
}

// vitest.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@/test': path.resolve(__dirname, './src/test'),
    },
  },
});
```

### Passo 3: Refatorar um teste por vez

```typescript
// Substitua imports antigos
- import { render, screen } from '@testing-library/react';
+ import { screen, renderWithLayout } from '@/test';

// Substitua criação de dados inline
- const product = { id: '1', title: 'X', /* 40 linhas */ };
+ const product = createTestProduct({ id: '1', title: 'X' });

// Use fetch helpers
- fetchMock.mockImplementation((url) => { /* complexo */ });
+ mockFetchRoutes(fetchMock, { '/api/products': { products: [...] } });
```

### Passo 4: Rode os testes para confirmar

```bash
npm test
```

---

## Dicas e Best Practices

### ✅ DO

- Use factories para criar dados de teste
- Use `mockFetchRoutes` para múltiplos endpoints
- Use `renderWithProviders` com opções quando precisar customizar
- Importe tudo de `@/test` quando possível
- Use presets de factory para casos comuns: `testProductPresets.expensive()`

### ❌ DON'T

- Não crie dados inline quando pode usar factory
- Não repita mocks entre arquivos
- Não crie helpers customizados de render sem necessidade
- Não ignore os helpers - eles economizam tempo!

---

## Benefícios Observados

### Para Desenvolvedores

- ⚡ **Testes mais rápidos de escrever** - menos boilerplate
- 🧹 **Código mais limpo** - foco no que importa
- 🎯 **Menos erros** - dados consistentes via factories
- 😊 **Experiência melhor** - menos frustração

### Para o Time

- 📉 **Menos código para revisar** - PRs menores
- 🔧 **Mais fácil de manter** - um lugar para atualizar
- 📚 **Onboarding melhor** - novos devs acham helpers prontos
- ✅ **Mais confiável** - comportamento consistente

---

## Próximos Passos

1. ✅ Revisar este exemplo
2. 🎯 Escolher 2-3 testes para refatorar como piloto
3. 🔄 Aplicar os helpers
4. ✅ Validar que tudo ainda passa
5. 📣 Compartilhar com o time
6. 🚀 Refatorar o resto gradualmente

**Dúvidas?** Os helpers estão bem documentados em `src/test/` 🎉
