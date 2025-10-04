import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import type { Product } from '../../data/products';

let toggleSpy: ReturnType<typeof vi.fn>;
vi.mock('../../hooks/useFavorites', () => {
  toggleSpy = vi.fn();
  return {
    useFavorites: () => ({ isFavorite: false, toggleFavorite: toggleSpy }),
  };
});

const ProductListItem = (await import('../ProductListItem')).default;

const baseProduct = {
  id: 'p2',
  title: 'Produto Lista',
  description: 'Descrição detalhada do produto em lista',
  price: 250,
  location: 'Curitiba - PR',
  images: ['/img2.jpg'],
  category: 'cat',
  seller: { name: 'Fornecedor', rating: 4.2, verified: false },
  specs: {},
} as unknown as Product;

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
