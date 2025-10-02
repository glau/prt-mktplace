import React from 'react';
import { products, categories } from '../../../data/products';
import CategoryPageClient from './CategoryPageClient';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find(cat => cat.id === slug);
  const categoryProducts = products.filter(product => product.category === slug);

  if (!category) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Categoria não encontrada</h1>
      </div>
    );
  }

  return (
    <CategoryPageClient 
      category={category}
      categoryProducts={categoryProducts}
    />
  );
}
