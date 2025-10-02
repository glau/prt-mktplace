import React from 'react';
import { products, categories } from '../../../data/products';
import ProductPageClient from './ProductPageClient';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find(p => p.id === id);
  const category = product ? categories.find(cat => cat.id === product.category) : null;

  if (!product || !category) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Produto não encontrado</h1>
      </div>
    );
  }

  return (
    <ProductPageClient 
      product={product}
      category={category}
    />
  );
}
