# Navigation System – Developer Notes (Local)

This document explains how the unified navigation works and how to maintain/expand it. It is intended for local reference and is ignored by Git.

## Overview

- Shared source of truth: `src/utils/navigation.ts`
  - Exports `coreNavItems: { key, label, href }[]`
  - Keys in use: `comprar`, `vender`, `servicos`, `noticias`
- Desktop AppBar: `src/components/MarketplaceAppBar.tsx`
  - Renders nav with `coreNavItems` via MUI `Button` + Next `Link`
  - `comprar` gets an `ExpandMore` (optional dropdown point)
  - Theme toggle via `useColorMode()`
- Mobile Drawer: `src/components/AppLayout.tsx`
  - Builds item list from `coreNavItems`
  - Maps icons/descriptions by `key`

Removed per refactor:
- Menu items: `Assinar`, `Ajuda`
- AppBar search button

## Maintenance Tasks

### Add a new item (desktop + mobile)
1) Edit `src/utils/navigation.ts` and append an entry to `coreNavItems`:
   - `{ key: 'novo', label: 'Novo', href: '/#novo' }`
2) In `src/components/AppLayout.tsx`, update the `useMemo` that builds the mobile items:
   - Map an icon for `key === 'novo'`
   - Add a short description string for the drawer
3) Ensure the target `href` exists (Next route or in-page anchor)

### Remove an item
- Delete it from `coreNavItems`
- Remove its icon/description branch in the mobile mapping

### Rename or change a link
- Update `label`/`href` in `coreNavItems`
- If changing `key`, update the mobile icon/description mapping

## Optional Enhancements

### Add a dropdown under “Comprar” (desktop only)
- In `MarketplaceAppBar.tsx`:
  - Add `anchorEl` state and open/close handlers
  - Render a MUI `Menu` anchored to the Comprar `Button`
  - `MenuItem`s navigate with `component={Link} href="..."`
- Keep mobile as a flat list in the drawer (recommended), or add nesting if needed

### Active item styling
- Use `usePathname()` from `next/navigation` to compare `pathname` to `item.href`
- Desktop: style the `Button` (e.g., bold or color change)
- Mobile: pass `selected` to `ListItemButton`

### Accessibility
- Drawer close button has `aria-label="Fechar menu"`
- Menu toggle button has `aria-label="Abrir menu"`
- For dropdowns, add `aria-controls`, `aria-expanded`, `aria-haspopup`

## File Map
- `src/utils/navigation.ts` – core nav items
- `src/components/MarketplaceAppBar.tsx` – desktop AppBar + menu
- `src/components/AppLayout.tsx` – mobile Drawer + item mapping

## Testing Notes
- Existing tests cover AppBar menu toggle and layout behavior
- If you change labels/ARIA text, update related assertions accordingly

