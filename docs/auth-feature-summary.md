# Feature: User Authentication (MSW Prototype)

## ✅ Implementação Completa

### Componentes Criados

#### 1. **MSW Auth Handlers** (`src/mocks/authHandlers.ts`)
- `POST /api/auth/register` - Cadastro de novo usuário
- `POST /api/auth/login` - Login com credenciais
- `GET /api/auth/session` - Validação de sessão via token Bearer

#### 2. **Auth Storage** (`src/mocks/authStore.ts`)
- Abstração de armazenamento usando `sessionStorage` (browser) ou in-memory (Node/tests)
- Seed automático do usuário padrão: `teste@teste.com` / `1234`
- Funções: `findUserByEmail`, `addUser`, `putSession`, `getSession`

#### 3. **UserProvider & Hook** (`src/app/providers/UserProvider.tsx`)
- Context provider para gerenciar estado de autenticação
- Hook `useUser()` com:
  - `user: { email: string } | null`
  - `token: string | null`
  - `isLoading: boolean`
  - `login(credentials)` - Autentica e armazena token
  - `register(credentials)` - Cadastra e autentica
  - `logout()` - Limpa sessão
- Hidratação automática via `GET /api/auth/session` no mount

#### 4. **AuthDialog** (`src/components/AuthDialog.tsx`)
- Modal com toggle entre Login/Cadastro
- Campos: E-mail e Senha
- Integração com `useUser()` para chamadas de API
- Tratamento de erros inline

#### 5. **Integrações UI**
- **MarketplaceAppBar**: 
  - Botão "Entrar" → abre AuthDialog
  - Quando logado: mostra "Minha Conta" + botão "Sair"
  - Botão "Sair" → executa logout (desktop/tablet)
- **AppLayout (Mobile Drawer)**:
  - "Entrar na conta" → abre AuthDialog
  - Quando logado: mostra "Minha Conta" + botão "Sair"
  - Botão "Sair" → executa logout e fecha drawer

### Testes Implementados

#### ✅ MSW Handlers (`src/mocks/__tests__/auth.handlers.test.ts`)
- Login com usuário seed
- Registro de novo usuário + validação de sessão
- Rejeição de email duplicado (409)
- Rejeição de credenciais inválidas (401)
- Rejeição de token inválido/ausente

#### ✅ UserProvider (`src/app/providers/__tests__/UserProvider.test.tsx`)
- Login com usuário seed
- Registro + hidratação em remount
- Logout limpa estado

#### ✅ Auth Flow E2E (`src/components/__tests__/AppAuthFlow.test.tsx`)
- Abertura do dialog via AppBar
- Preenchimento de formulário
- Login bem-sucedido
- Verificação de mudança de estado (botão "Entrar" desaparece)
- **Logout via AppBar** (desktop)
- **Logout via mobile drawer**

### Configuração de Testes

**Atualizado `src/test/render-utils.tsx`**:
- Wrapper padrão agora inclui `UserProvider` além de `ColorModeProvider`
- Todos os componentes em testes têm acesso ao contexto de autenticação

**Corrigidos mocks em testes existentes**:
- Adicionado `default` export nos mocks de `ColorModeProvider`
- Garantido compatibilidade com novo wrapper

### Usuário Seed (Para Testes)

```
Email: teste@teste.com
Senha: 1234
```

### Status MSW em Produção

✅ **MSW permanece habilitado em produção** conforme solicitado
- Configuração atual em `MswProvider`: `isDev || enableMsw || isProd`
- Permite demos com dados mockados em Vercel
- Variável `NEXT_PUBLIC_ENABLE_MSW` disponível para controle adicional

### Cobertura de Testes

```bash
npm test              # Todos os testes (97 ✅)
npm run test:coverage # Com relatório de cobertura
```

**Resultado**: ✅ 97/97 testes passando

### Arquivos Modificados

**Novos arquivos**:
- `src/mocks/authHandlers.ts`
- `src/mocks/authStore.ts`
- `src/mocks/__tests__/auth.handlers.test.ts`
- `src/app/providers/UserProvider.tsx`
- `src/app/providers/__tests__/UserProvider.test.tsx`
- `src/components/AuthDialog.tsx`
- `src/components/__tests__/AppAuthFlow.test.tsx`

**Modificados**:
- `src/mocks/handlers.ts` - Incluído `authHandlers`
- `src/app/layout.tsx` - Adicionado `UserProvider`
- `src/components/MarketplaceAppBar.tsx` - Integração com auth
- `src/components/AppLayout.tsx` - Integração com auth
- `src/test/render-utils.tsx` - Wrapper com `UserProvider`
- Vários arquivos de teste - Corrigidos mocks

### Como Usar

#### 1. Desenvolvimento Local
```bash
npm run dev
# MSW já está habilitado, usuário seed disponível
```

#### 2. Testar Login
1. Clique em "Entrar" no AppBar
2. Use credenciais: `teste@teste.com` / `1234`
3. Após login, botão muda para "Minha Conta"

#### 3. Testar Registro
1. Clique em "Entrar" no AppBar
2. Clique em "Não possui conta? Cadastre-se"
3. Preencha email/senha
4. Usuário é criado e logado automaticamente

#### 4. Verificar Sessão
- Token armazenado em `sessionStorage` com chave `auth:token`
- Persiste durante a sessão do navegador
- Limpo ao fechar aba ou fazer logout

### Próximos Passos (Opcional)

- [ ] Adicionar campo "Nome" no cadastro
- [ ] Implementar "Esqueci minha senha"
- [ ] Adicionar menu dropdown em "Minha Conta"
- [ ] Implementar página de perfil do usuário
- [ ] Adicionar proteção de rotas (ex: criar anúncio requer login)

### Checklist de Validação ✅

- [x] Plano de milestones criado e seguido
- [x] Branch `feat/user-auth-msw` criada
- [x] TDD aplicado consistentemente
- [x] MSW handlers implementados e testados
- [x] UserProvider e useUser funcionando
- [x] AuthDialog integrado com UI
- [x] Todos os testes passando (97/97)
- [x] MSW habilitado em produção (conforme solicitado)
- [x] Commit realizado
- [ ] Documentação final
- [ ] Merge para main (aguardando aprovação)
