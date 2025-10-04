import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

const clientSpy = vi.fn();
vi.mock('../produto/[id]/ProductPageClient', () => ({
  default: (props: any) => {
    clientSpy(props);
    return <div data-testid="product-client">ProductClient OK</div>;
  },
}));

const ProductPage = (await import('../produto/[id]/page')).default;

describe('Product wrapper page', () => {
  it('passes id param to ProductPageClient', async () => {
    const element = await ProductPage({ params: Promise.resolve({ id: 'p1' }) } as any);
    render(element);

    expect(clientSpy).toHaveBeenCalledWith({ productId: 'p1' });
    expect(screen.getByTestId('product-client')).toBeInTheDocument();
  });
});
