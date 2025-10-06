/**
 * Custom Render Utilities
 * 
 * Helpers para renderizar componentes com providers necessários.
 * Simplifica testes que precisam de ColorModeProvider, AppLayout, etc.
 * 
 * @example
 * // Renderizar com ColorModeProvider
 * renderWithProviders(<MyComponent />);
 * 
 * // Renderizar com AppLayout
 * renderWithProviders(<MyComponent />, { withAppLayout: true });
 * 
 * // Renderizar com modo escuro
 * renderWithProviders(<MyComponent />, { colorMode: 'dark' });
 */

import React from 'react';
import { render as rtlRender, type RenderOptions, type RenderResult } from '@testing-library/react';
import ColorModeProvider from '../app/providers/ColorModeProvider';
import AppLayout from '../components/AppLayout';
import { UserProvider } from '../app/providers/UserProvider';

/**
 * Opções customizadas para renderização com providers
 */
export interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /** Incluir AppLayout no wrapper */
  withAppLayout?: boolean;
  
  /** Modo de cor inicial (padrão: 'light') */
  colorMode?: 'light' | 'dark';
  
  /** Props customizadas para AppLayout */
  appLayoutProps?: {
    showAppBar?: boolean;
  };
}

/**
 * Renderiza um componente com ColorModeProvider
 * Opcionalmente pode incluir AppLayout
 */
export const renderWithProviders = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
): RenderResult => {
  const {
    withAppLayout = false,
    // colorMode mantido na interface por compatibilidade mas não usado
    // ColorModeProvider usa localStorage/system preference
    appLayoutProps = {},
    ...renderOptions
  } = options;

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    let content = children;

    // Wrap com AppLayout se solicitado
    if (withAppLayout) {
      content = <AppLayout {...appLayoutProps}>{content}</AppLayout>;
    }

    // Sempre wrap com ColorModeProvider
    // Note: ColorModeProvider não aceita initialMode, usa localStorage/system preference
    return (
      <ColorModeProvider>
        <UserProvider>
          {content}
        </UserProvider>
      </ColorModeProvider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

/**
 * Renderiza apenas com ColorModeProvider (sem AppLayout)
 * Útil para testes de componentes isolados
 */
export const renderWithColorMode = (
  ui: React.ReactElement,
  options?: Omit<CustomRenderOptions, 'withAppLayout'>
): RenderResult => {
  return renderWithProviders(ui, { ...options, withAppLayout: false });
};

/**
 * Renderiza com AppLayout completo
 * Útil para testes de páginas
 */
export const renderWithLayout = (
  ui: React.ReactElement,
  options?: Omit<CustomRenderOptions, 'withAppLayout'>
): RenderResult => {
  return renderWithProviders(ui, { ...options, withAppLayout: true });
};

/**
 * Re-exporta tudo de @testing-library/react para conveniência
 * Permite importar tudo de um lugar: import { render, screen } from 'test/render-utils'
 */
export * from '@testing-library/react';
// Override named export to use our provider-wrapped render by default in tests importing from '@/test'
export const render = renderWithProviders;

/**
 * Exporta renderWithProviders como default para facilitar uso
 */
export default renderWithProviders;
