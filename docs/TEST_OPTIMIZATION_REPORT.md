# 📊 Relatório de Otimização de Testes

## Status Atual
- ✅ **88 testes passando**
- ✅ **97.95% cobertura de linhas**
- ⚠️ **Oportunidades de melhoria identificadas**

---

## 🔍 Problemas Identificados

### 1. **Duplicação de Mocks** (Crítico)

**Problema:** Os mesmos mocks aparecem em ~10 arquivos diferentes

```typescript
// Repetido em: home.page.test, product.page.test, category.page.test, etc.
vi.mock('../../app/providers/ColorModeProvider', () => ({
  useColorMode: () => ({ mode: 'light', toggleColorMode: vi.fn() }),
}));

vi.mock('../../components/AppLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
```

**Impacto:**
- 🔴 Manutenção: Alterar um mock requer mudanças em ~10 arquivos
- 🔴 Inconsistência: Mocks podem divergir entre testes
- 🔴 Verbosidade: ~15 linhas repetidas por arquivo

---

### 2. **Factory de Test Data Duplicada** (Alto)

**Problema:** Criação manual de produtos de teste em múltiplos lugares

```typescript
// Em home.page.test.tsx
const product = {
  id: '1',
  title: 'Produto A',
  price: 10,
  // ... 40 linhas de AdDetails
}

// Em product.page.test.tsx
const product = {
  id: '123',
  title: 'Produto Detalhe',
  price: 99.9,
  // ... 40 linhas de AdDetails (DUPLICADO)
}
```

**Impacto:**
- 🟡 Manutenção: Mudanças no tipo `Product` quebram vários testes
- 🟡 Verbosidade: ~200+ linhas de código duplicado
- 🟡 Fragilidade: Dados de teste inconsistentes

---

### 3. **Fetch Mock Repetido** (Médio)

**Problema:** Lógica de stub do fetch duplicada

```typescript
// Em category.page.test.tsx
let fetchMock: ((url: string | Request | URL) => ...) & { mockImplementation: any };
function setFetchResponse({ category, products, ok = true }) {
  fetchMock.mockImplementation((url: RequestInfo | URL) => {
    // ... lógica repetida
  });
}

// Em categorias.page.test.tsx
// MESMO código duplicado
```

**Impacto:**
- 🟡 Manutenção: Duplicação de ~30 linhas
- 🟡 Inconsistência: Comportamento pode divergir

---

### 4. **Setup/Teardown Boilerplate** (Médio)

**Problema:** beforeEach/afterEach similares em vários arquivos

```typescript
// Repetido em 5+ arquivos
beforeEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
  fetchMock = vi.fn() as any;
  vi.stubGlobal('fetch', fetchMock as any);
});
afterEach(() => {
  vi.unstubAllGlobals();
});
```

---

### 5. **Helpers de Render** (Baixo)

**Problema:** `renderWithProviders` implementado apenas em AppLayout.test

```typescript
// Poderia ser reutilizado em ~10 testes
const renderWithProviders = (ui: React.ReactElement) =>
  render(<ColorModeProvider>{ui}</ColorModeProvider>);
```

---

## ✅ Soluções Recomendadas

### Solução 1: Test Setup File

**Benefício:** Centraliza mocks globais comuns

```typescript
// src/test/setup.ts (ou vitest.setup.ts)
import { vi } from 'vitest';

// Mocks globais aplicados automaticamente
vi.mock('src/app/providers/ColorModeProvider', () => ({
  useColorMode: () => ({ mode: 'light', toggleColorMode: vi.fn() }),
}));

vi.mock('src/hooks/useFavorites', () => ({
  useFavorites: () => ({ isFavorite: false, toggleFavorite: vi.fn() }),
}));
```

**Prós:**
- ✅ Remove ~150 linhas de código duplicado
- ✅ Mocks consistentes em todos os testes
- ✅ Um lugar para manter

**Contras:**
- ⚠️ Pode esconder dependências dos testes
- ⚠️ Menos explícito sobre o que está mockado

---

### Solução 2: Test Factories

**Benefício:** Cria dados de teste de forma consistente e concisa

```typescript
// src/test/factories.ts
export const createTestProduct = (overrides?: Partial<Product>): Product => ({
  id: '1',
  title: 'Test Product',
  price: 100,
  location: 'São Paulo',
  category: 'metal',
  description: 'Test description',
  images: ['/test.jpg'],
  seller: { name: 'Test Seller', rating: 4.5, verified: true },
  createdAt: '2024-01-01T00:00:00Z',
  adDetails: createTestAdDetails(),
  ...overrides,
});

export const createTestCategory = (overrides?: Partial<Category>): Category => ({
  id: 'test',
  name: 'Test Category',
  count: 10,
  ...overrides,
});
```

**Uso:**
```typescript
// Antes (40 linhas)
const product = { id: '1', title: 'X', ... 38 campos ... }

// Depois (1 linha)
const product = createTestProduct({ title: 'Custom Title' });
```

**Prós:**
- ✅ Remove ~200+ linhas de código
- ✅ Dados consistentes
- ✅ Fácil customização com overrides
- ✅ Type-safe

---

### Solução 3: Custom Render Utilities

**Benefício:** Simplifica renderização com providers

```typescript
// src/test/render-utils.tsx
export const renderWithProviders = (
  ui: React.ReactElement,
  options?: { withAppLayout?: boolean; colorMode?: 'light' | 'dark' }
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ColorModeProvider initialMode={options?.colorMode}>
      {options?.withAppLayout ? (
        <AppLayout>{children}</AppLayout>
      ) : (
        children
      )}
    </ColorModeProvider>
  );

  return render(ui, { wrapper: Wrapper });
};
```

**Uso:**
```typescript
// Antes
render(
  <ColorModeProvider>
    <AppLayout>
      <MyComponent />
    </AppLayout>
  </ColorModeProvider>
);

// Depois
renderWithProviders(<MyComponent />, { withAppLayout: true });
```

---

### Solução 4: Fetch Test Utilities

**Benefício:** Centraliza lógica de mock do fetch

```typescript
// src/test/fetch-utils.ts
export const createFetchMock = () => {
  const mock = vi.fn();
  vi.stubGlobal('fetch', mock);
  return mock;
};

export const mockApiSuccess = <T>(mock: Mock, data: T) => {
  mock.mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  } as Response);
};

export const mockApiError = (mock: Mock, message = 'Error') => {
  mock.mockResolvedValueOnce({
    ok: false,
    text: async () => message,
  } as Response);
};
```

**Uso:**
```typescript
// Antes (15 linhas)
let fetchMock: ...
function setFetchResponse({ category, products, ok }) {
  fetchMock.mockImplementation((url) => {
    // ... lógica complexa
  });
}

// Depois (3 linhas)
const fetchMock = createFetchMock();
mockApiSuccess(fetchMock, { categories: [...] });
```

---

## 📈 Impacto Estimado das Melhorias

| Melhoria | Linhas Removidas | Manutenibilidade | Implementação |
|----------|------------------|------------------|---------------|
| Setup File | ~150 | ⭐⭐⭐⭐⭐ | 🟢 Fácil |
| Factories | ~200 | ⭐⭐⭐⭐⭐ | 🟢 Fácil |
| Render Utils | ~50 | ⭐⭐⭐⭐ | 🟢 Fácil |
| Fetch Utils | ~100 | ⭐⭐⭐⭐ | 🟡 Média |
| **TOTAL** | **~500** | **Muito Alto** | **2-3h** |

---

## 🎯 Plano de Implementação Sugerido

### Fase 1: Quick Wins (1h)
1. ✅ Criar `src/test/factories.ts` com factories de Product/Category
2. ✅ Refatorar 3-4 testes para usar factories
3. ✅ Validar que testes continuam passando

### Fase 2: Consolidação (1h)
4. ✅ Criar `src/test/setup.ts` com mocks globais
5. ✅ Configurar `vitest.config.ts` para usar setup
6. ✅ Remover mocks duplicados de 5-6 arquivos

### Fase 3: Utilities (30min)
7. ✅ Criar `src/test/render-utils.tsx`
8. ✅ Criar `src/test/fetch-utils.ts`
9. ✅ Refatorar 2-3 testes como exemplo

### Fase 4: Rollout (30min)
10. ✅ Documentar novos helpers no README
11. ✅ Refatorar restante dos testes gradualmente

---

## ⚠️ Trade-offs e Considerações

### Vantagens
- ✅ **Menos código**: ~500 linhas removidas
- ✅ **Manutenção**: Um lugar para atualizar mocks/factories
- ✅ **Consistência**: Comportamento uniforme entre testes
- ✅ **Onboarding**: Novos devs encontram helpers prontos

### Desvantagens
- ⚠️ **Abstração**: Pode esconder dependências
- ⚠️ **Learning curve**: Devs precisam conhecer os helpers
- ⚠️ **Over-engineering**: Risk de criar abstrações prematuras

### Mitigação
- 📝 Documentar bem os helpers
- 🎯 Manter helpers simples e focados
- 🔍 Permitir override quando necessário
- ⚡ Implementar gradualmente, não tudo de uma vez

---

## 📝 Recomendações Finais

### Prioridade ALTA (Implementar)
1. ✅ **Test Factories** - Maior impacto, menor risco
2. ✅ **Fetch Utils** - Remove duplicação crítica

### Prioridade MÉDIA (Considerar)
3. 🟡 **Setup File** - Útil mas pode esconder dependências
4. 🟡 **Render Utils** - Bom para componentes complexos

### Prioridade BAIXA (Opcional)
5. 🟢 Custom matchers/assertions (se surgir padrão)
6. 🟢 Snapshot testing (para componentes de UI estáveis)

---

## 📚 Recursos Adicionais

- [Vitest Setup Files](https://vitest.dev/config/#setupfiles)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Test Factories Pattern](https://thoughtbot.com/blog/factories-should-be-the-last-resort)

---

## 🎬 Próximos Passos

**Se quiser implementar estas melhorias:**

1. Revisar este relatório com o time
2. Decidir quais otimizações priorizar
3. Criar tasks/issues para implementação
4. Implementar em PRs pequenos e incrementais
5. Atualizar documentação

**Precisa de ajuda para implementar?** Posso criar os arquivos de utility e refatorar alguns testes como exemplo! 🚀
