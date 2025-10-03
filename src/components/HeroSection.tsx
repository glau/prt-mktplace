'use client';

import React from 'react';
import {
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

type HeroTab = 'comprar' | 'vender';

const TAB_CONFIG: Record<HeroTab, { placeholder: string; buttonLabel: string }> = {
  comprar: {
    placeholder: 'O que você quer encontrar?',
    buttonLabel: 'Encontrar oportunidades',
  },
  vender: {
    placeholder: 'Qual resíduo você vai ofertar?',
    buttonLabel: 'Criar meu anúncio',
  },
};

export default function HeroSection() {
  const [currentTab, setCurrentTab] = React.useState<HeroTab>('comprar');
  const { placeholder, buttonLabel } = TAB_CONFIG[currentTab];

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        color: 'common.white',
        backgroundImage: 'linear-gradient(135deg, #0A4F9E 0%, #0F6BD7 100%)',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 5, md: 7 },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 1, md: 3 },
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 5 }}
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{
              maxWidth: 700,
              textAlign: { xs: 'left', md: 'center' },
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={(theme) => ({
                fontWeight: 700,
                lineHeight: { xs: 1.25, md: 1.1 },
                mb: 2,
                fontSize: {
                  xs: theme.typography.pxToRem(30),
                  sm: theme.typography.pxToRem(32),
                  md: theme.typography.pxToRem(32),
                },
              })}
            >
              Conectamos milhares de empresas para negociar seus resíduos de forma eficiente
            </Typography>
            <Typography
              variant="h6"
              sx={(theme) => ({
                fontWeight: 400,
                maxWidth: 520,
                mb: 3,
                mx: { xs: 0, md: 'auto' },
                fontSize: {
                  xs: theme.typography.pxToRem(16),
                  sm: theme.typography.pxToRem(18),
                  md: theme.typography.pxToRem(18),
                },
              })}
            >
              Mais de 20 mil empresas já fazem parte do maior ecossistema de valorização de resíduos do Brasil.
            </Typography>
          </Box>
        </Stack>

        <Paper
          elevation={6}
          sx={{
            bgcolor: 'rgba(255,255,255,0.96)',
            borderRadius: 4,
            px: { xs: 2, sm: 4 },
            py: { xs: 2.5, sm: 3 },
          }}
        >
          <Tabs
            value={currentTab}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{ mb: 2, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 } }}
            onChange={(_, value: HeroTab) => setCurrentTab(value)}
          >
            <Tab value="comprar" label="Quero comprar" />
            <Tab value="vender" label="Quero vender" />
          </Tabs>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              size="medium"
              placeholder={placeholder}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: { xs: 3, md: 5 },
                borderRadius: 999,
                fontWeight: 600,
                textTransform: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {buttonLabel}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
