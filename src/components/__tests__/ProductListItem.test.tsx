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

const ProductListItem = (await import('../ProductListItem')).default;

const baseProduct = createTestProduct({
  id: 'p2',
  title: 'Produto Lista',
  description: 'Descrição detalhada do produto em lista',
  price: 250,
  location: 'Curitiba - PR',
  seller: { name: 'Fornecedor', rating: 4.2, verified: false },
});

describe('ProductListItem', () => {
  it('renders list item details', () => {
    render(<ProductListItem product={baseProduct} />);

    expect(screen.getByText('Produto Lista')).toBeInTheDocument();
    expect(screen.getByText('R$ 250,00')).toBeInTheDocument();
    expect(screen.getByText('Curitiba - PR')).toBeInTheDocument();
    expect(screen.getByText('Fornecedor')).toBeInTheDocument();
  });

  it('triggers toggleFavorite on click', () => {
    render(<ProductListItem product={baseProduct} />);

    const favBtn = screen.getByRole('button', { name: /favoritos/i });
    fireEvent.click(favBtn);

    expect(toggleSpy).toHaveBeenCalled();
  });
});
