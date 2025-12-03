'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function HeroBanner() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0066CC 0%, #0088FF 50%, #00AAFF 100%)',
        minHeight: { xs: 400, md: 480 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.1)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '15%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.08)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-5%',
          left: '25%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.06)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 5 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 4, md: 6 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left content */}
        <Box sx={{ flex: 1, color: 'white', maxWidth: { md: 600 } }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              lineHeight: 1.2,
              mb: 2.5,
            }}
          >
            Ecossistema completo de valorização, destinação e gerenciamento de resíduos.
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.6,
              mb: 4,
              opacity: 0.95,
              maxWidth: 520,
            }}
          >
            Conectamos mais que 20 mil empresas que transformam seus resíduos em oportunidades de negócio.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: '#0066CC',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: '0.9rem', md: '1rem' },
              borderRadius: 3,
              px: { xs: 3, md: 4 },
              py: 1.5,
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.95)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
              },
            }}
          >
            Negocie no maior mercado online de resíduos para empresas
          </Button>
        </Box>

        {/* Right content - Person image */}
        <Box
          sx={{
            flex: { md: '0 0 auto' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: { xs: 240, sm: 280, md: 320 },
              height: { xs: 240, sm: 280, md: 320 },
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF8C42 0%, #FF6B2C 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            {/* Inner circle with image */}
            <Box
              sx={{
                width: '92%',
                height: '92%',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid rgba(255,255,255,0.2)',
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                alt="Profissional de negócios"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            
            {/* Decorative ring */}
            <Box
              sx={{
                position: 'absolute',
                width: '110%',
                height: '110%',
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.15)',
                pointerEvents: 'none',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
