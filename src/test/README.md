# 🧪 Test Utilities

Helpers centralizados para facilitar a escrita e manutenção de testes.

## 📦 O que está incluído

### 1. **Test Data Factories** (`factories.ts`)

Crie dados de teste consistentes sem boilerplate:

```typescript
import { createTestProduct, createTestCategory } from '@/test';

// Produto com defaults sensatos
const product = createTestProduct();

// Customizar campos específicos
const expensive = createTestProduct({ price: 9999, title: 'Luxury Item' });

// Múltiplos produtos
const products = createTestProducts(5);

// Presets comuns
const cheap = testProductPresets.cheap();
const recent = testProductPresets.recent();
```

### 2. **Fetch Mock Utilities** (`fetch-utils.ts`)

Simplifique mocking de requisições fetch:

```typescript
import { setupFetchMock, mockFetchRoutes, cleanupFetchMock } from '@/test';

describe('MyTest', () => {
  let fetchMock: Mock;

  beforeEach(() => {
    fetchMock = setupFetchMock();
  });

  afterEach(() => {
    cleanupFetchMock();
  });

  it('fetches data', () => {
    // Mock múltiplas rotas de uma vez
    mockFetchRoutes(fetchMock, {
      '/api/products': { products: [...] },
      '/api/categories': { categories: [...] },
    });

    // ... seu teste
  });
});
```

### 3. **Render Utilities** (`render-utils.tsx`)

Renderize componentes com providers automaticamente:

```typescript
import { renderWithProviders, renderWithLayout } from '@/test';

// Com ColorModeProvider
renderWithProviders(<MyComponent />);

// Com ColorModeProvider + AppLayout
renderWithLayout(<MyComponent />);

// Modo escuro
renderWithProviders(<MyComponent />, { colorMode: 'dark' });

// AppLayout sem app bar
renderWithLayout(<MyComponent />, { 
  appLayoutProps: { showAppBar: false } 
});
```

## 🚀 Quick Start

### Instalação

Os utilities já estão em `src/test/`. Configure o path alias (opcional):

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
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@/test': path.resolve(__dirname, './src/test'),
    },
  },
});
```

### Uso Básico

```typescript
// Import tudo de um lugar
import { 
  describe,
  it,
  expect,
  screen,
  createTestProduct,
  mockFetchRoutes,
  renderWithLayout,
} from '@/test';

describe('ProductPage', () => {
  it('renders product details', async () => {
    const product = createTestProduct({ title: 'Test Product' });
    
    renderWithLayout(<ProductPage product={product} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
});
```

## 📚 API Reference

### Factories

#### `createTestProduct(overrides?)`
Cria um Product completo com defaults sensatos.

```typescript
const product = createTestProduct({
  title: 'Custom Title',
  price: 999,
  // outros campos são preenchidos automaticamente
});
```

#### `createTestProducts(count, baseOverrides?)`
Cria múltiplos produtos com IDs únicos.

```typescript
const products = createTestProducts(5, { category: 'metal' });
// [
//   { id: 'test-product-1', title: 'Test Product 1', category: 'metal', ... },
//   { id: 'test-product-2', title: 'Test Product 2', category: 'metal', ... },
//   ...
// ]
```

#### `createTestCategory(overrides?)`
Cria uma Category de teste.

```typescript
const category = createTestCategory({ name: 'Electronics', count: 25 });
```

#### `testProductPresets`
Produtos pré-configurados para casos comuns:

```typescript
testProductPresets.expensive()  // Produto caro
testProductPresets.cheap()      // Produto barato
testProductPresets.recent()     // Produto recente
testProductPresets.old()        // Produto antigo
testProductPresets.noImages()   // Sem imagens
```

### Fetch Utilities

#### `setupFetchMock()`
Configura mock do fetch global. Use no `beforeEach`.

```typescript
const fetchMock = setupFetchMock();
```

#### `cleanupFetchMock()`
Remove mock do fetch. Use no `afterEach`.

#### `mockFetchSuccess(mock, data)`
Mocka uma resposta de sucesso.

```typescript
mockFetchSuccess(fetchMock, { products: [...] });
```

#### `mockFetchError(mock, message?, status?)`
Mocka uma resposta de erro.

```typescript
mockFetchError(fetchMock, 'Not found', 404);
```

#### `mockFetchRoutes(mock, routes, options?)`
Mocka múltiplas rotas API de uma vez (router de mocks).

```typescript
mockFetchRoutes(fetchMock, {
  '/api/products': { products: [...] },
  '/api/categories': { categories: [...] },
});
```

#### `mockFetchSequence(mock, responses)`
Mocka uma sequência de respostas (para múltiplos fetches).

```typescript
mockFetchSequence(fetchMock, [
  { success: true, data: { products: [...] } },
  { success: false, error: 'Failed' },
]);
```

### Render Utilities

#### `renderWithProviders(ui, options?)`
Renderiza com ColorModeProvider e opcionalmente AppLayout.

**Opções:**
- `withAppLayout?: boolean` - Incluir AppLayout (default: false)
- `colorMode?: 'light' | 'dark'` - Modo de cor (default: 'light')
- `appLayoutProps?: { showAppBar?: boolean }` - Props do AppLayout

```typescript
renderWithProviders(<MyComponent />);
renderWithProviders(<MyComponent />, { withAppLayout: true });
renderWithProviders(<MyComponent />, { colorMode: 'dark' });
```

#### `renderWithLayout(ui, options?)`
Atalho para renderizar com AppLayout incluído.

```typescript
renderWithLayout(<MyComponent />);
// Equivalente a:
renderWithProviders(<MyComponent />, { withAppLayout: true });
```

#### `renderWithColorMode(ui, options?)`
Atalho para renderizar apenas com ColorModeProvider.

```typescript
renderWithColorMode(<MyComponent />);
// Equivalente a:
renderWithProviders(<MyComponent />);
```

## 💡 Patterns e Best Practices

### ✅ DO

```typescript
// ✅ Use factories para dados de teste
const product = createTestProduct({ price: 100 });

// ✅ Use presets quando aplicável
const cheapProduct = testProductPresets.cheap();

// ✅ Mock routes de forma declarativa
mockFetchRoutes(fetchMock, {
  '/api/products': { products: [...] },
});

// ✅ Customize apenas o necessário
const product = createTestProduct({ title: 'Custom' });
// Outros campos são preenchidos automaticamente
```

### ❌ DON'T

```typescript
// ❌ Não crie dados inline
const product = {
  id: '1',
  title: 'Test',
  price: 100,
  // ... 40 linhas de campos ...
};

// ❌ Não repita setup de fetch
let fetchMock;
beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);
  // ... mais boilerplate ...
});

// ❌ Não crie wrappers customizados
const CustomWrapper = ({ children }) => (
  <ColorModeProvider>
    <AppLayout>{children}</AppLayout>
  </ColorModeProvider>
);
// Use renderWithLayout() ao invés
```

## 📖 Exemplos Completos

### Teste de Página

```typescript
import {
  describe,
  it,
  expect,
  screen,
  setupFetchMock,
  cleanupFetchMock,
  mockFetchRoutes,
  createTestProducts,
  createTestCategory,
} from '@/test';

describe('CategoryPage', () => {
  let fetchMock: Mock;

  beforeEach(() => {
    fetchMock = setupFetchMock();
  });

  afterEach(() => {
    cleanupFetchMock();
  });

  it('loads and displays products', async () => {
    const category = createTestCategory({ name: 'Electronics' });
    const products = createTestProducts(3);

    mockFetchRoutes(fetchMock, {
      '/api/categories/': { category },
      '/api/products': { products },
    });

    render(<CategoryPage slug="electronics" />);

    expect(await screen.findByText('Electronics')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(3);
  });
});
```

### Teste de Componente

```typescript
import {
  describe,
  it,
  expect,
  screen,
  fireEvent,
  renderWithLayout,
  createTestProduct,
} from '@/test';

describe('ProductCard', () => {
  it('displays product information', () => {
    const product = createTestProduct({
      title: 'Gaming Laptop',
      price: 4999,
    });

    renderWithLayout(<ProductCard product={product} />);

    expect(screen.getByText('Gaming Laptop')).toBeInTheDocument();
    expect(screen.getByText('R$ 4.999,00')).toBeInTheDocument();
  });

  it('handles favorite toggle', () => {
    const product = createTestProduct();

    renderWithLayout(<ProductCard product={product} />);

    const favButton = screen.getByRole('button', { name: /favorite/i });
    fireEvent.click(favButton);

    // ... assertions
  });
});
```

## 🔗 Links Úteis

- [Relatório de Otimização](../../docs/TEST_OPTIMIZATION_REPORT.md) - Análise detalhada
- [Exemplo de Refatoração](../../docs/TEST_REFACTORING_EXAMPLE.md) - Antes/depois
- [Vitest Docs](https://vitest.dev)
- [Testing Library Docs](https://testing-library.com)

## 🤝 Contribuindo

Ao adicionar novos helpers:

1. Documente com JSDoc
2. Adicione exemplos de uso
3. Export no `index.ts`
4. Atualize este README
5. Considere adicionar testes para os helpers

## 📝 Changelog

### v1.0.0 (2024-10-04)
- ✨ Factories de test data
- ✨ Fetch mock utilities
- ✨ Render utilities com providers
- 📚 Documentação completa
