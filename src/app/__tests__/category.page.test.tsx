import React from 'react';
import { describe, it, expect, beforeEach, afterEach, screen, render } from '@/test';
import { setupFetchMock, cleanupFetchMock, mockFetchRoutes } from '@/test';
import { createTestProduct, createTestCategory } from '@/test';
import type { Mock } from 'vitest';

// Mocks necessários para este teste
vi.mock('../../app/providers/ColorModeProvider', () => ({
  useColorMode: () => ({ mode: 'light', toggleColorMode: vi.fn() }),
}));

vi.mock('../../components/AppLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Test data usando factories
const sampleCategory = createTestCategory({ id: 'metais', name: 'Metais', count: 2 });
const sampleProducts = [
  createTestProduct({
    id: '1',
    title: 'Sucata de Alumínio',
    price: 4.2,
    location: 'Porto Alegre, RS',
    seller: { name: 'Metais do Sul', rating: 4.7, verified: false },
  }),
];

const CategoryPageClient = (await import('../categoria/[slug]/CategoryPageClient')).default;

describe('CategoryPageClient', () => {
  let fetchMock: Mock;

  beforeEach(() => {
    fetchMock = setupFetchMock();
  });

  afterEach(() => {
    cleanupFetchMock();
  });

  it('loads category and products and renders list', async () => {
    mockFetchRoutes(fetchMock, {
      '/api/categories/': { category: sampleCategory },
      '/api/products': { products: sampleProducts },
    });

    render(<CategoryPageClient slug="metais" />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect((await screen.findAllByText('Metais')).length).toBeGreaterThan(0);
    expect(await screen.findByText(/anúncios encontrados/)).toBeInTheDocument();
  });

  it('shows empty state when there are no products', async () => {
    mockFetchRoutes(fetchMock, {
      '/api/categories/': { category: sampleCategory },
      '/api/products': { products: [] },
    });

    render(<CategoryPageClient slug="metais" />);

    expect(await screen.findByText('Nenhum produto encontrado')).toBeInTheDocument();
  });

  it('shows error UI when API fails', async () => {
    // Mock de erro - retorna resposta com ok: false
    fetchMock.mockResolvedValue({
      ok: false,
      text: async () => 'Error',
    } as Response);

    render(<CategoryPageClient slug="metais" />);

    expect(await screen.findByText('Não foi possível carregar os dados da categoria.')).toBeInTheDocument();
  });
});
