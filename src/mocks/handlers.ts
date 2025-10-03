import { http, HttpResponse } from 'msw';
import { categories, products } from '../data/products';

function pathnameOf(request: Request): string {
  try {
    return new URL(request.url).pathname;
  } catch {
    return '';
  }
}

export const handlers = [
  http.get(/\/api\/categories$/i, () => {
    try { console.info('[MSW] GET /api/categories'); } catch {}
    return HttpResponse.json({ categories });
  }),

  http.get(/\/api\/categories\/([^/]+)$/i, ({ request }) => {
    const pathname = pathnameOf(request);
    const match = pathname.match(/\/api\/categories\/([^/]+)$/i);
    const id = match?.[1];
    const category = categories.find((item) => item.id === id);

    if (!category) {
      return HttpResponse.json({ message: 'Categoria não encontrada' }, { status: 404 });
    }

    return HttpResponse.json({ category });
  }),

  http.get(/\/api\/products(?:\?.*)?$/i, ({ request }) => {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get('category');
    const filteredProducts = categoryId
      ? products.filter((product) => product.category === categoryId)
      : products;

    try { console.info(`[MSW] GET /api/products (category=${categoryId ?? 'all'})`); } catch {}
    return HttpResponse.json({ products: filteredProducts });
  }),

  http.get(/\/api\/products\/([^/]+)$/i, ({ request }) => {
    const pathname = pathnameOf(request);
    const match = pathname.match(/\/api\/products\/([^/]+)$/i);
    const id = match?.[1];
    const product = products.find((item) => item.id === id);

    if (!product) {
      return HttpResponse.json({ message: 'Produto não encontrado' }, { status: 404 });
    }

    return HttpResponse.json({ product });
  }),
];

