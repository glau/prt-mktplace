import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchCategories, fetchCategoryById, fetchProducts, fetchProductById } from '../api';
import type { Category, Product } from '../../data/products';

let fetchMock: ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) & { mockImplementation: any };

function okJson(body: any): Response {
  return {
    ok: true,
    json: async () => body,
  } as unknown as Response;
}

function failText(message: string): Response {
  return {
    ok: false,
    text: async () => message,
  } as unknown as Response;
}

describe('lib/api', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    fetchMock = vi.fn() as any;
    vi.stubGlobal('fetch', fetchMock as any);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetchCategories returns categories', async () => {
    const categories: Category[] = [
      { id: 'metal', name: 'Metais', count: 5 },
    ];
    fetchMock.mockImplementation((url: RequestInfo | URL) => {
      if (String(url) === '/api/categories') return Promise.resolve(okJson({ categories }));
      throw new Error('unexpected url');
    });

    const result = await fetchCategories();
    expect(result).toEqual(categories);
  });

  it('fetchCategories throws on error', async () => {
    fetchMock.mockImplementation((url: RequestInfo | URL) => Promise.resolve(failText('Erro X')));
    await expect(fetchCategories()).rejects.toThrow('Erro X');
  });

  it('fetchCategoryById returns a category', async () => {
    const category: Category = { id: 'metal', name: 'Metais', count: 5 };
    fetchMock.mockImplementation((url: RequestInfo | URL) => {
      if (String(url) === '/api/categories/metal') return Promise.resolve(okJson({ category }));
      throw new Error('unexpected url');
    });

    const result = await fetchCategoryById('metal');
    expect(result).toEqual(category);
  });

  it('fetchCategoryById throws on error', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(failText('not found')));
    await expect(fetchCategoryById('x')).rejects.toThrow('not found');
  });

  it('fetchProducts returns products (no filter)', async () => {
    const products: Product[] = [
      {
        id: 'p1',
        title: 'Produto 1',
        description: 'desc',
        price: 100,
        location: 'SP',
        images: ['/p1.jpg'],
        category: 'metal',
        seller: { name: 'Loja', rating: 4.5, verified: true },
        createdAt: '2024-01-01T00:00:00Z',
        adDetails: {
          id: 1,
          title: 'Produto 1',
          category: 'metal',
          ad_type: 'Venda',
          slug: 'produto-1',
          description: 'desc',
          quantity: { value: '1', unit: 'un', frequency: 'Mensal' },
          price: { currency: 'BRL', value: '100.00' },
          classification: { origin: 'X', hazard_status: 'Não perigoso' },
          logistics: { transport_available: false, transport_details: '' },
          equipment: { quantity: '0', name: '' },
          metadata: { creation_date: '2024-01-01T00:00:00Z', last_access_date: '2024-01-02T00:00:00Z', required_documents: false },
          media: { main_image_url: '/p1.jpg', gallery_images: ['/p1.jpg'] },
        },
      },
    ];
    fetchMock.mockImplementation((url: RequestInfo | URL) => {
      if (String(url) === '/api/products') return Promise.resolve(okJson({ products }));
      throw new Error('unexpected url');
    });

    const result = await fetchProducts();
    expect(result).toEqual(products);
  });

  it('fetchProducts returns products (with category filter)', async () => {
    const products: Product[] = [];
    fetchMock.mockImplementation((url: RequestInfo | URL) => {
      if (String(url) === '/api/products?category=metal') return Promise.resolve(okJson({ products }));
      throw new Error('unexpected url');
    });

    const result = await fetchProducts({ category: 'metal' });
    expect(result).toEqual(products);
  });

  it('fetchProducts throws on error', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(failText('boom')));
    await expect(fetchProducts()).rejects.toThrow('boom');
  });

  it('fetchProductById returns a product', async () => {
    const product: Product = {
      id: 'p1',
      title: 'Produto 1',
      description: 'desc',
      price: 100,
      location: 'SP',
      images: ['/p1.jpg'],
      category: 'metal',
      seller: { name: 'Loja', rating: 4.5, verified: true },
      createdAt: '2024-01-01T00:00:00Z',
      adDetails: {
        id: 1,
        title: 'Produto 1',
        category: 'metal',
        ad_type: 'Venda',
        slug: 'produto-1',
        description: 'desc',
        quantity: { value: '1', unit: 'un', frequency: 'Mensal' },
        price: { currency: 'BRL', value: '100.00' },
        classification: { origin: 'X', hazard_status: 'Não perigoso' },
        logistics: { transport_available: false, transport_details: '' },
        equipment: { quantity: '0', name: '' },
        metadata: { creation_date: '2024-01-01T00:00:00Z', last_access_date: '2024-01-02T00:00:00Z', required_documents: false },
        media: { main_image_url: '/p1.jpg', gallery_images: ['/p1.jpg'] },
      },
    };
    fetchMock.mockImplementation((url: RequestInfo | URL) => {
      if (String(url) === '/api/products/p1') return Promise.resolve(okJson({ product }));
      throw new Error('unexpected url');
    });

    const result = await fetchProductById('p1');
    expect(result).toEqual(product);
  });

  it('fetchProductById throws on error', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(failText('nope')));
    await expect(fetchProductById('x')).rejects.toThrow('nope');
  });
});
