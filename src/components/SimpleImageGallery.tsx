'use client';
import React from 'react';
import { Box, Paper, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Image from 'next/image';

interface SimpleImageGalleryProps {
  images: string[];
  title: string;
}

export default function SimpleImageGallery({ images, title }: SimpleImageGalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState(0);

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box>
      {/* Main Image */}
      <Paper
        sx={{
          position: 'relative',
          mb: 2,
          overflow: 'hidden',
          borderRadius: 2,
          aspectRatio: '4/3',
        }}
      >
        <Image
          src={images[selectedImage]}
          alt={`${title} - Imagem ${selectedImage + 1}`}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <IconButton
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                },
              }}
              onClick={handlePrevious}
            >
              <ChevronLeft />
            </IconButton>
            
            <IconButton
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                },
              }}
              onClick={handleNext}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.875rem',
            }}
          >
            {selectedImage + 1} / {images.length}
          </Box>
        )}
      </Paper>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            overflowX: 'auto',
            pb: 1,
          }}
        >
          {images.map((image, index) => (
            <Paper
              key={index}
              sx={{
                position: 'relative',
                minWidth: 80,
                height: 60,
                cursor: 'pointer',
                overflow: 'hidden',
                border: selectedImage === index ? 2 : 0,
                borderColor: 'primary.main',
                borderRadius: 1,
                opacity: selectedImage === index ? 1 : 0.7,
                transition: 'all 0.2s',
                '&:hover': {
                  opacity: 1,
                },
              }}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image}
                alt={`${title} - Miniatura ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
