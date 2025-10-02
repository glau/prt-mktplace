import { http, HttpResponse } from 'msw';
import { categories, products } from '../data/products';

export const handlers = [
  http.get('/api/categories', () => {
    return HttpResponse.json({ categories });
  }),

  http.get('/api/categories/:id', ({ params }) => {
    const { id } = params as { id?: string };
    const category = categories.find((item) => item.id === id);

    if (!category) {
      return HttpResponse.json({ message: 'Categoria não encontrada' }, { status: 404 });
    }

    return HttpResponse.json({ category });
  }),

  http.get('/api/products', ({ request }) => {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get('category');
    const filteredProducts = categoryId
      ? products.filter((product) => product.category === categoryId)
      : products;

    return HttpResponse.json({ products: filteredProducts });
  }),

  http.get('/api/products/:id', ({ params }) => {
    const { id } = params as { id?: string };
    const product = products.find((item) => item.id === id);

    if (!product) {
      return HttpResponse.json({ message: 'Produto não encontrado' }, { status: 404 });
    }

    return HttpResponse.json({ product });
  }),
];
