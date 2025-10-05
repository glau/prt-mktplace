'use client';
import React from 'react';
import {
  Box,
  Paper,
  IconButton,
  Dialog,
  DialogContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Close,
  ZoomIn,
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  title: string;
  showZoom?: boolean;
  showThumbnails?: boolean;
  showCounter?: boolean;
}

const navigationButtonStyles = (theme: Theme) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.paper, 1),
  },
});

const scrollbarStyles = {
  '&::-webkit-scrollbar': { height: 6 },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 3,
  },
};

export default function ImageGallery({ 
  images, 
  title, 
  showZoom = true,
  showThumbnails = true,
  showCounter = true
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handlePrevious = React.useCallback(() => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = React.useCallback(() => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleImageClick = React.useCallback((index: number) => {
    setSelectedImage(index);
  }, []);

  const handleZoomClick = React.useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = React.useCallback(() => {
    setDialogOpen(false);
  }, []);

  return (
    <>
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
                sx={{ ...navigationButtonStyles(theme), left: 8 }}
                onClick={handlePrevious}
                aria-label="Imagem anterior"
              >
                <ChevronLeft />
              </IconButton>
              
              <IconButton
                sx={{ ...navigationButtonStyles(theme), right: 8 }}
                onClick={handleNext}
                aria-label="Próxima imagem"
              >
                <ChevronRight />
              </IconButton>
            </>
          )}

          {/* Zoom Button */}
          {showZoom && (
            <IconButton
              sx={(theme) => ({
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: alpha(theme.palette.background.paper, 0.9),
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.background.paper, 1),
                },
              })}
              onClick={handleZoomClick}
              aria-label="Ampliar imagem"
            >
              <ZoomIn />
            </IconButton>
          )}

          {/* Image Counter */}
          {showCounter && images.length > 1 && (
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
        {showThumbnails && images.length > 1 && (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              overflowX: 'auto',
              pb: 1,
              ...scrollbarStyles,
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
                  '&:hover': { opacity: 1 },
                }}
                onClick={() => handleImageClick(index)}
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

      {/* Full Screen Dialog */}
      {showZoom && (
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth={false}
          fullScreen={isMobile}
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              maxWidth: '90vw',
              maxHeight: '90vh',
            },
          }}
        >
          <DialogContent
            sx={{
              p: 0,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'white',
                zIndex: 1,
              }}
              onClick={handleCloseDialog}
              aria-label="Fechar"
            >
              <Close />
            </IconButton>

            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '80vh',
                maxWidth: '80vw',
              }}
            >
              <Image
                src={images[selectedImage]}
                alt={`${title} - Imagem ampliada ${selectedImage + 1}`}
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>

            {/* Dialog Navigation */}
            {images.length > 1 && (
              <>
                <IconButton
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                  onClick={handlePrevious}
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft />
                </IconButton>
                
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                  onClick={handleNext}
                  aria-label="Próxima imagem"
                >
                  <ChevronRight />
                </IconButton>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
