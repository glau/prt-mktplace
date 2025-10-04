import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

const clientSpy = vi.fn();
vi.mock('../categoria/[slug]/CategoryPageClient', () => ({
  default: (props: any) => {
    clientSpy(props);
    return <div data-testid="category-client">CategoryClient OK</div>;
  },
}));

const CategoryPage = (await import('../categoria/[slug]/page')).default;

describe('Category wrapper page', () => {
  it('passes slug param to CategoryPageClient', async () => {
    const element = await CategoryPage({ params: Promise.resolve({ slug: 'metais' }) } as any);
    render(element);

    expect(clientSpy).toHaveBeenCalledWith({ slug: 'metais' });
    expect(screen.getByTestId('category-client')).toBeInTheDocument();
  });
});
