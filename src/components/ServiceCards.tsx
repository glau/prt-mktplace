'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  IconButton,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface ServiceCardData {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
}

// Custom SVG icons matching Figma design
const ShoppingCartIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="10"
      y="25"
      width="60"
      height="45"
      rx="4"
      stroke="#0066CC"
      strokeWidth="2.5"
      fill="none"
    />
    <path
      d="M10 35 L70 35"
      stroke="#0066CC"
      strokeWidth="2.5"
    />
    <rect x="25" y="45" width="30" height="18" rx="2" fill="#0066CC" />
    <text
      x="40"
      y="58"
      textAnchor="middle"
      fill="white"
      fontSize="12"
      fontWeight="700"
      fontFamily="system-ui"
    >
      B2
    </text>
    <circle cx="25" cy="75" r="4" stroke="#0066CC" strokeWidth="2" fill="none" />
    <circle cx="55" cy="75" r="4" stroke="#0066CC" strokeWidth="2" fill="none" />
  </svg>
);

const TruckIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Truck body */}
    <rect
      x="5"
      y="30"
      width="45"
      height="30"
      rx="3"
      stroke="#0066CC"
      strokeWidth="2.5"
      fill="none"
    />
    {/* Cabin */}
    <path
      d="M50 40 L65 40 Q70 40 70 45 L70 60 L50 60 L50 40"
      stroke="#0066CC"
      strokeWidth="2.5"
      fill="none"
    />
    {/* Window */}
    <rect x="54" y="44" width="12" height="8" rx="1" fill="#E3F2FD" stroke="#0066CC" strokeWidth="1.5" />
    {/* B2 Logo on truck */}
    <rect x="15" y="38" width="25" height="16" rx="2" fill="#0066CC" />
    <text
      x="27.5"
      y="50"
      textAnchor="middle"
      fill="white"
      fontSize="10"
      fontWeight="700"
      fontFamily="system-ui"
    >
      B2
    </text>
    {/* Wheels */}
    <circle cx="20" cy="65" r="6" stroke="#0066CC" strokeWidth="2.5" fill="none" />
    <circle cx="60" cy="65" r="6" stroke="#0066CC" strokeWidth="2.5" fill="none" />
  </svg>
);

const ContainerIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Container body */}
    <path
      d="M15 30 L15 65 L65 65 L65 30"
      stroke="#0066CC"
      strokeWidth="2.5"
      fill="none"
    />
    {/* Lid */}
    <path
      d="M10 30 L70 30 L65 20 L15 20 Z"
      stroke="#0066CC"
      strokeWidth="2.5"
      fill="none"
    />
    {/* Handle */}
    <path d="M35 20 L35 12 L45 12 L45 20" stroke="#0066CC" strokeWidth="2.5" fill="none" />
    {/* B2 Logo */}
    <rect x="25" y="38" width="30" height="20" rx="2" fill="#0066CC" />
    <text
      x="40"
      y="52"
      textAnchor="middle"
      fill="white"
      fontSize="12"
      fontWeight="700"
      fontFamily="system-ui"
    >
      B2
    </text>
  </svg>
);

const DocumentIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Document */}
    <rect
      x="15"
      y="10"
      width="45"
      height="60"
      rx="3"
      stroke="#0066CC"
      strokeWidth="2.5"
      fill="none"
    />
    {/* Lines */}
    <line x1="25" y1="25" x2="50" y2="25" stroke="#0066CC" strokeWidth="2" />
    <line x1="25" y1="35" x2="50" y2="35" stroke="#0066CC" strokeWidth="2" />
    <line x1="25" y1="45" x2="50" y2="45" stroke="#0066CC" strokeWidth="2" />
    <line x1="25" y1="55" x2="40" y2="55" stroke="#0066CC" strokeWidth="2" />
    {/* Checkmark circle */}
    <circle cx="58" cy="58" r="12" fill="#0066CC" />
    <path
      d="M52 58 L56 62 L65 53"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const services: ServiceCardData[] = [
  {
    icon: <ShoppingCartIcon />,
    title: 'Comprar ou vender resíduos',
    description: 'Compre ou venda resíduos com segurança.',
    buttonText: 'Anuncie gratuitamente',
  },
  {
    icon: <TruckIcon />,
    title: 'Destinar resíduos',
    description: 'Transporte e destinação seguro com parceiros homologados.',
    buttonText: 'Solicitar frete',
  },
  {
    icon: <ContainerIcon />,
    title: 'Alugar equipamentos',
    description: 'Tenha acesso a caçambas e outros equipamentos sem complicação.',
    buttonText: 'Alugar agora',
  },
  {
    icon: <DocumentIcon />,
    title: 'Regularização ambiental',
    description: 'Suporte total para certificações e licenciamento ambiental.',
    buttonText: 'Comece agora',
  },
];

export default function ServiceCards() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 4, md: 6 },
        mt: -6,
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ position: 'relative' }}>
          {/* Left Arrow */}
          <IconButton
            sx={{
              position: 'absolute',
              left: { xs: -16, md: -40 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'grey.200',
              display: { xs: 'none', sm: 'flex' },
              '&:hover': { bgcolor: 'grey.50', borderColor: 'grey.300' },
            }}
          >
            <ChevronLeft />
          </IconButton>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 2,
            }}
          >
            {services.map((service, index) => (
              <Card
                key={index}
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  boxShadow: 'none',
                  transition: 'transform 0.2s, border-color 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: 'grey.300',
                  },
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                    '&:last-child': { pb: 3 },
                  }}
                >
                  {/* Icon */}
                  <Box sx={{ mb: 2, height: 80 }}>{service.icon}</Box>

                  {/* Title */}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      fontSize: '1rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {service.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      flex: 1,
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {service.description}
                  </Typography>

                  {/* Button - all contained now */}
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      py: 1.25,
                    }}
                  >
                    {service.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Right Arrow */}
          <IconButton
            sx={{
              position: 'absolute',
              right: { xs: -16, md: -40 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'grey.200',
              display: { xs: 'none', sm: 'flex' },
              '&:hover': { bgcolor: 'grey.50', borderColor: 'grey.300' },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
