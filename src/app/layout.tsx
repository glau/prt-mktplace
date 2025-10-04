import React from 'react';
import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ColorModeProvider from './providers/ColorModeProvider';
import MswProvider from './providers/MswProvider';
import "./globals.css";

export const metadata: Metadata = {
  title: "B2Blue Marketplace",
  description: "Marketplace para gestão de resíduos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AppRouterCacheProvider>
          <ColorModeProvider>
            <MswProvider>{children}</MswProvider>
          </ColorModeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
