import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/HeroSection';
import React from 'react';

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
