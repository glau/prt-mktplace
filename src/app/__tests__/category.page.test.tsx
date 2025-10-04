import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

vi.mock('../../app/providers/ColorModeProvider', () => ({
  useColorMode: () => ({ mode: 'light', toggleColorMode: vi.fn() }),
}));

vi.mock('../../components/AppLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
import type { Product, Category } from '../../data/products';

// Helper to stub fetch
let fetchMock: ((url: string | Request | URL, init?: RequestInit) => Promise<Response>) & { mockImplementation: any };
function setFetchResponse({ category, products, ok = true }: { category?: Category; products?: Product[]; ok?: boolean }) {
  fetchMock.mockImplementation((url: RequestInfo | URL) => {
    const u = String(url);
    if (u.startsWith('/api/categories/')) {
      return Promise.resolve({ ok, json: () => Promise.resolve({ category }) } as unknown as Response);
    }
    if (u.startsWith('/api/products')) {
      return Promise.resolve({ ok, json: () => Promise.resolve({ products }) } as unknown as Response);
    }
    return Promise.reject(new Error('unknown url'));
  });
}

const sampleCategory: Category = { id: 'metais', name: 'Metais', count: 2 };
const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'Sucata de Alumínio',
    price: 4.2,
    location: 'Porto Alegre, RS',
    category: 'metais',
    description: 'desc',
    images: ['/a.jpg'],
    seller: { name: 'Metais do Sul', rating: 4.7, verified: false },
    createdAt: '2024-01-12T10:20:00Z',
    adDetails: {
      id: 1,
      title: 'Sucata de Alumínio',
      category: 'metais',
      ad_type: 'Compra',
      slug: 'sucata-aluminio',
      description: 'desc',
      quantity: { value: '50', unit: 'toneladas', frequency: 'Mensal' },
      price: { currency: 'BRL', value: '4.20' },
      classification: { origin: 'Pós-industrial', hazard_status: 'Não perigoso' },
      logistics: { transport_available: true, transport_details: '' },
      equipment: { quantity: '2', name: 'Caçambas' },
      metadata: { creation_date: '2024-01-12T10:20:00Z', last_access_date: '2024-02-02T16:50:00Z', required_documents: true },
      media: { main_image_url: '/a.jpg', gallery_images: ['/a.jpg'] },
    },
  },
];

const CategoryPageClient = (await import('../categoria/[slug]/CategoryPageClient')).default;

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

  it('loads category and products and renders list', async () => {
    setFetchResponse({ category: sampleCategory, products: sampleProducts, ok: true });

    render(<CategoryPageClient slug="metais" />);

    // loading
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    expect((await screen.findAllByText('Metais')).length).toBeGreaterThan(0);
    expect(await screen.findByText(/anúncios encontrados/)).toBeInTheDocument();
  });

  it('shows empty state when there are no products', async () => {
    setFetchResponse({ category: sampleCategory, products: [], ok: true });

    render(<CategoryPageClient slug="metais" />);

    expect(await screen.findByText('Nenhum produto encontrado')).toBeInTheDocument();
  });

  it('shows error UI when API fails', async () => {
    // ok=false will make both endpoints fail
    setFetchResponse({ category: undefined, products: undefined, ok: false });

    render(<CategoryPageClient slug="metais" />);

    expect(await screen.findByText('Não foi possível carregar os dados da categoria.')).toBeInTheDocument();
  });
});
