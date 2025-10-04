import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { Category, Product } from '../../data/products';

vi.mock('../../components/AppLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('../../app/providers/ColorModeProvider', () => ({
  useColorMode: () => ({ mode: 'light', toggleColorMode: vi.fn() }),
}));

let fetchMock: ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) & { mockImplementation: any };

function okJson(body: any): Response {
  return { ok: true, json: async () => body } as unknown as Response;
}
function failText(message: string): Response {
  return { ok: false, text: async () => message } as unknown as Response;
}

const CategoriesPage = (await import('../categorias/page')).default;

describe('Categorias page', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    fetchMock = vi.fn() as any;
    vi.stubGlobal('fetch', fetchMock as any);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders loading then content with stats and grid', async () => {
    const categories: Category[] = [
      { id: 'metal', name: 'Metais', count: 5 },
      { id: 'plastico', name: 'Plástico', count: 3 },
    ];
    const products: Product[] = [];

    fetchMock.mockImplementation((url: RequestInfo | URL) => {
      const u = String(url);
      if (u === '/api/categories') return Promise.resolve(okJson({ categories }));
      if (u === '/api/products') return Promise.resolve(okJson({ products }));
      throw new Error('unexpected url');
    });

    render(<CategoriesPage />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    expect(await screen.findByText('Todas as Categorias')).toBeInTheDocument();
    expect(await screen.findByText('Total de categorias')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Anúncios ativos')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('Categoria em destaque')).toBeInTheDocument();
    expect((await screen.findAllByText('Metais')).length).toBeGreaterThan(0);
  });

  it('shows error UI on failure', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(failText('bad')));

    render(<CategoriesPage />);

    expect(await screen.findByText('Não foi possível carregar as categorias.')).toBeInTheDocument();
  });
});
