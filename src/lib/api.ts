import type { Category, Product } from '../data/products';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Erro ao carregar dados');
  }
  return response.json() as Promise<T>;
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await handleResponse<{ categories: Category[] }>(
    await fetch('/api/categories', { cache: 'no-store' })
  );
  return data.categories;
}

export async function fetchCategoryById(id: string): Promise<Category> {
  const data = await handleResponse<{ category: Category }>(
    await fetch(`/api/categories/${id}`, { cache: 'no-store' })
  );
  return data.category;
}

export async function fetchProducts(params?: { category?: string }): Promise<Product[]> {
  const query = params?.category ? `?category=${params.category}` : '';
  const data = await handleResponse<{ products: Product[] }>(
    await fetch(`/api/products${query}`, { cache: 'no-store' })
  );
  return data.products;
}

export async function fetchProductById(id: string): Promise<Product> {
  const data = await handleResponse<{ product: Product }>(
    await fetch(`/api/products/${id}`, { cache: 'no-store' })
  );
  return data.product;
}

