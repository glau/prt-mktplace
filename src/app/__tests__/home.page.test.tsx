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
        metadata: { creation_date: '2024-01-01T00:00:00Z', last_access_date: '2024-01-02T00:00:00Z', required_documents: false },
        media: { main_image_url: '/a.jpg', gallery_images: ['/a.jpg'] },
      },
    },
  ]),
}));

const Home = (await import('../page')).default;

describe('Home page', () => {
  it('renders categories and featured products after loading', async () => {
    render(<Home />);

    // loading indicator
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
