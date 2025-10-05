import React from 'react';
import { describe, it, expect, screen, render } from '@/test';
import { vi } from 'vitest';

const clientSpy = vi.fn();
vi.mock('../produto/[id]/ProductPageClient', () => ({
  default: (props: { productId: string }) => {
    clientSpy(props);
    return <div data-testid="product-client">ProductClient OK</div>;
  },
}));

const ProductPage = (await import('../produto/[id]/page')).default;

describe('Product wrapper page', () => {
  it('passes id param to ProductPageClient', async () => {
    type PageFn = (args: { params: Promise<{ id: string }> }) => Promise<React.ReactElement>;
    const page = ProductPage as unknown as PageFn;
    const element = await page({ params: Promise.resolve({ id: 'p1' }) });
    render(element);

    expect(clientSpy).toHaveBeenCalledWith({ productId: 'p1' });
    expect(screen.getByTestId('product-client')).toBeInTheDocument();
  });
});
