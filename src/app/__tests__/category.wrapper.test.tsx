import React from 'react';
import { describe, it, expect, screen, render } from '@/test';
import { vi } from 'vitest';

const clientSpy = vi.fn();
vi.mock('../categoria/[slug]/CategoryPageClient', () => ({
  default: (props: { slug: string }) => {
    clientSpy(props);
    return <div data-testid="category-client">CategoryClient OK</div>;
  },
}));

const CategoryPage = (await import('../categoria/[slug]/page')).default;

describe('Category wrapper page', () => {
  it('passes slug param to CategoryPageClient', async () => {
    type PageFn = (args: { params: Promise<{ slug: string }> }) => Promise<React.ReactElement>;
    const page = CategoryPage as unknown as PageFn;
    const element = await page({ params: Promise.resolve({ slug: 'metais' }) });
    render(element);

    expect(clientSpy).toHaveBeenCalledWith({ slug: 'metais' });
    expect(screen.getByTestId('category-client')).toBeInTheDocument();
  });
});
