import React from 'react';
import { describe, it, expect, screen, render, fireEvent } from '@/test';
import { createTestProduct } from '@/test';
import { vi } from 'vitest';

let toggleSpy: ReturnType<typeof vi.fn>;
vi.mock('../../hooks/useFavorites', () => {
  toggleSpy = vi.fn();
  return {
    useFavorites: () => ({ isFavorite: false, toggleFavorite: toggleSpy }),
  };
});

const ProductCard = (await import('../ProductCard')).default;

const baseProduct = createTestProduct({
  id: 'p1',
  title: 'Produto Teste',
  price: 100.5,
  location: 'São Paulo - SP',
  seller: { name: 'Vendedor', rating: 4.5, verified: true },
});

describe('ProductCard', () => {
  it('renders product info', () => {
    render(<ProductCard product={baseProduct} />);

    expect(screen.getByText('Produto Teste')).toBeInTheDocument();
    expect(screen.getByText('R$ 100,50')).toBeInTheDocument();
    expect(screen.getByText('São Paulo - SP')).toBeInTheDocument();
    expect(screen.getByText('Vendedor')).toBeInTheDocument();
  });

  it('calls toggleFavorite when favorite button clicked', () => {
    render(<ProductCard product={baseProduct} />);

    const favBtn = screen.getByRole('button');
    fireEvent.click(favBtn);

    expect(toggleSpy).toHaveBeenCalled();
  });
});
