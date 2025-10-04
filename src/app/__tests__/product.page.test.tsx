import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import type { Mock } from 'vitest';

vi.mock('../../app/providers/ColorModeProvider', () => ({
  useColorMode: () => ({ mode: 'light', toggleColorMode: vi.fn() }),
}));

vi.mock('../../components/AppLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('../../lib/api', () => ({
  fetchProductById: vi.fn(async (id: string) => ({
    id,
    title: 'Produto Detalhe',
    price: 99.9,
    location: 'São Paulo, SP',
    category: 'borracha',
    description: 'Descrição longa',
    images: ['/img.jpg'],
    seller: { name: 'Loja', rating: 4.8, verified: true },
    createdAt: '2024-01-01T00:00:00Z',
    adDetails: {
      id: 1,
      title: 'Produto Detalhe',
      category: 'borracha',
      ad_type: 'Venda',
      slug: 'produto-detalhe',
      description: 'Descrição longa',
      quantity: { value: '1', unit: 'un', frequency: 'Mensal' },
      price: { currency: 'BRL', value: '99.90' },
      classification: { origin: 'X', hazard_status: 'Não perigoso' },
      logistics: { transport_available: true, transport_details: 'Entrega disponível' },
      equipment: { quantity: '0', name: '' },
      metadata: { creation_date: '2024-01-01T00:00:00Z', last_access_date: '2024-01-02T00:00:00Z', required_documents: false },
      media: { main_image_url: '/img.jpg', gallery_images: ['/img.jpg'] },
    },
  })),
  fetchCategoryById: vi.fn(async () => ({ id: 'borracha', name: 'Borracha', count: 10 })),
}));

// Mock favorites hook to avoid localStorage side effects
vi.mock('../../hooks/useFavorites', () => ({
  useFavorites: () => ({ isFavorite: false, toggleFavorite: vi.fn() }),
}));

const ProductPageClient = (await import('../produto/[id]/ProductPageClient')).default;

describe('ProductPageClient', () => {
  it('renders product details and gallery', async () => {
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
    (api.fetchProductById as unknown as Mock).mockRejectedValueOnce(new Error('fail'));

    render(<ProductPageClient productId="x" />);

    expect(await screen.findByText('Não foi possível carregar as informações do produto.')).toBeInTheDocument();
  });
});
