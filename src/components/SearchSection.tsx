'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  InputBase,
  Button,
  Paper,
} from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';

export default function SearchSection() {
  return (
    <Box
      component="section"
      sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        {/* Title Section - Blue gradient text */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg, #0066CC 0%, #00AAFF 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1.5,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
            }}
          >
            Encontre sua conexão B2
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            O ecossistema que transforma o resíduo em oportunidade de negócio.
          </Typography>
        </Box>

        {/* Search Card */}
        <Paper
          elevation={0}
          sx={{
            maxWidth: 720,
            mx: 'auto',
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            bgcolor: 'grey.50',
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          {/* Search input area with label */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200',
              p: 2,
              mb: 0,
              minHeight: 48,
            }}
          >
            <InputBase
              fullWidth
              multiline
              minRows={1}
              placeholder="Descreva a necessidade da sua empresa com a destinação de resíduos."
              sx={{
                fontSize: '0.95rem',
                '& .MuiInputBase-input': {
                  p: 0,
                  '&::placeholder': {
                    color: 'text.secondary',
                    opacity: 1,
                  },
                },
              }}
            />
          </Box>

          {/* Button below input */}
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              endIcon={<AutoAwesome sx={{ fontSize: 16 }} />}
              sx={{
                borderRadius: 6,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                px: 2.5,
                py: 1,
                borderColor: 'grey.300',
                color: 'text.primary',
                bgcolor: 'background.paper',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'primary.50',
                },
              }}
            >
              Encontrar oportunidades
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
