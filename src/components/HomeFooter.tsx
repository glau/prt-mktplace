'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Divider,
  Stack,
} from '@mui/material';
import {
  LinkedIn,
  Instagram,
  Facebook,
} from '@mui/icons-material';

interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Categorias',
    links: [
      { label: 'Plásticos', href: '/categoria/plastico' },
      { label: 'Metais', href: '/categoria/metais' },
      { label: 'Papéis', href: '/categoria/papel' },
      { label: 'Eletrônicos', href: '/categoria/reee' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre Nós', href: '#' },
      { label: 'Como funciona', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Carreiras', href: '#' },
    ],
  },
  {
    title: 'Ajuda',
    links: [
      { label: 'Central de ajuda', href: '#' },
      { label: 'Contato', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Termos de uso', href: '#' },
      { label: 'Política de privacidade', href: '#' },
      { label: 'Políticas de cookies', href: '#' },
    ],
  },
];

export default function HomeFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#F9FCFF',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: { xs: 6, md: 8 },
        mt: 0,
      }}
    >
      <Container maxWidth="lg">
        {/* Links Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 4,
            mb: 4,
          }}
        >
          {footerSections.map((section) => (
            <Box key={section.title}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: 'text.primary',
                }}
              >
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link) => (
                  <MuiLink
                    key={link.label}
                    href={link.href}
                    underline="hover"
                    color="text.secondary"
                    sx={{
                      fontSize: '0.875rem',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Bottom section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 B2Blue. Todos os direitos reservados.
          </Typography>

          {/* Social links */}
          <Stack direction="row" spacing={2}>
            <MuiLink
              href="#"
              color="text.secondary"
              sx={{ '&:hover': { color: 'primary.main' } }}
            >
              <LinkedIn />
            </MuiLink>
            <MuiLink
              href="#"
              color="text.secondary"
              sx={{ '&:hover': { color: 'primary.main' } }}
            >
              <Instagram />
            </MuiLink>
            <MuiLink
              href="#"
              color="text.secondary"
              sx={{ '&:hover': { color: 'primary.main' } }}
            >
              <Facebook />
            </MuiLink>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
