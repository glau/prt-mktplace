import React from 'react';
import { describe, it, expect, screen, render, type Mock } from '@/test';
import { createTestProduct, createTestCategory } from '@/test';
import { vi } from 'vitest';

vi.mock('../../app/providers/ColorModeProvider', () => ({
  useColorMode: () => ({ mode: 'light', toggleColorMode: vi.fn() }),
}));

vi.mock('../../components/AppLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock da API - configurado nos testes
vi.mock('../../lib/api', () => ({
  fetchProductById: vi.fn(),
  fetchCategoryById: vi.fn(),
}));

// Mock favorites hook to avoid localStorage side effects
vi.mock('../../hooks/useFavorites', () => ({
  useFavorites: () => ({ isFavorite: false, toggleFavorite: vi.fn() }),
}));

const ProductPageClient = (await import('../produto/[id]/ProductPageClient')).default;

describe('ProductPageClient', () => {
  it('renders product details and gallery', async () => {
    // Configura mocks com factories
    const api = await import('../../lib/api');
    const product = createTestProduct({
      id: '123',
      title: 'Produto Detalhe',
      price: 99.9,
      category: 'borracha',
    });
    const category = createTestCategory({ id: 'borracha', name: 'Borracha', count: 10 });
    
    (api.fetchProductById as Mock).mockResolvedValueOnce(product);
    (api.fetchCategoryById as Mock).mockResolvedValueOnce(category);

    render(<ProductPageClient productId="123" />);

    // Loading indicator appears first
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Then detailed UI (may appear multiple times: breadcrumb + title)
    expect((await screen.findAllByText('Borracha')).length).toBeGreaterThan(0);
    expect((await screen.findAllByText('Produto Detalhe')).length).toBeGreaterThan(0);

    // Gallery main image alt text
    expect(screen.getByAltText('Produto Detalhe - Imagem 1')).toBeInTheDocument();
  });

  it('shows error UI when API fails', async () => {
    const api = await import('../../lib/api');
    (api.fetchProductById as Mock).mockRejectedValueOnce(new Error('fail'));

    render(<ProductPageClient productId="x" />);

    expect(await screen.findByText('Não foi possível carregar as informações do produto.')).toBeInTheDocument();
  });
});
