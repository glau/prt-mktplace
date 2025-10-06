import { http, HttpResponse } from 'msw';
import { categories, products } from '../data/products';
import { authHandlers } from './authHandlers';

export const handlers = [
  // Handles GET /api/categories
  http.get('*/api/categories', () => {
    console.info('[MSW] GET /api/categories');
    return HttpResponse.json({ categories });
  }),

  // Handles GET /api/categories/:id
  http.get('*/api/categories/:id', ({ params }) => {
    const { id } = params;
    const category = categories.find((item) => item.id === id);

    console.info(`[MSW] GET /api/categories/${id}`);

    if (!category) {
      return new HttpResponse(null, { status: 404, statusText: 'Categoria não encontrada' });
    }

    return HttpResponse.json({ category });
  }),

  // Handles GET /api/products (optional ?category=...)
  http.get('*/api/products', ({ request }) => {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get('category');

    console.info(`[MSW] GET /api/products (category=${categoryId ?? 'all'})`);

    const filteredProducts = categoryId
      ? products.filter((product) => product.category === categoryId)
      : products;

    return HttpResponse.json({ products: filteredProducts });
  }),

  // Handles GET /api/products/:id
  http.get('*/api/products/:id', ({ params }) => {
    const { id } = params;
    const product = products.find((item) => item.id === id);

    console.info(`[MSW] GET /api/products/${id}`);

    if (!product) {
      return new HttpResponse(null, { status: 404, statusText: 'Produto não encontrado' });
    }

    return HttpResponse.json({ product });
  }),
  
  // Auth endpoints (register, login, session)
  ...authHandlers,
];