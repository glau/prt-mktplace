import React from 'react';
import { describe, it, expect, screen, render, fireEvent } from '@/test';
import ImageGallery from '../ImageGallery';

// In case next/image needs mocking in tests, many setups alias it to a plain img automatically.

describe('ImageGallery', () => {
  const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];
  const title = 'Produto X';

  it('renders main image and navigation when multiple images', () => {
    render(<ImageGallery images={images} title={title} showZoom={false} />);

    expect(screen.getByAltText(`${title} - Imagem 1`)).toBeInTheDocument();

    const next = screen.getByLabelText('Próxima imagem');
    fireEvent.click(next);
    expect(screen.getByAltText(`${title} - Imagem 2`)).toBeInTheDocument();

    const prev = screen.getByLabelText('Imagem anterior');
    fireEvent.click(prev);
    expect(screen.getByAltText(`${title} - Imagem 1`)).toBeInTheDocument();
  });

  it('changes image when clicking thumbnail', () => {
    render(<ImageGallery images={images} title={title} showZoom={false} />);

    const thumb = screen.getByAltText(`${title} - Miniatura 2`);
    fireEvent.click(thumb);

    expect(screen.getByAltText(`${title} - Imagem 2`)).toBeInTheDocument();
  });

  it('opens and closes zoom dialog when showZoom=true', () => {
    render(<ImageGallery images={images} title={title} showZoom />);

    const zoomBtn = screen.getByLabelText('Ampliar imagem');
    fireEvent.click(zoomBtn);

    // Inside dialog exists a close button labelled 'Fechar'
    const closeBtn = screen.getByLabelText('Fechar');
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);
  });

  it('shows counter when enabled', () => {
    render(<ImageGallery images={images} title={title} showZoom={false} showCounter />);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });
});
