import React from 'react';
import { describe, it, expect, screen, render } from '@/test';
import HeroSection from '@/components/HeroSection';

describe('HeroSection', () => {
  it('renders the main headline', () => {
    render(<HeroSection />);
    expect(
      screen.getByRole('heading', {
        name: /Conectamos milhares de empresas/i,
      })
    ).toBeInTheDocument();
  });
});
