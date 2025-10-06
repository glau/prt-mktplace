# Feature: Cadastro e Login de Usuário (Prototipagem com MSW)

## 1. Resumo

Criar um fluxo completo e minimalista de cadastro e login de usuários para permitir a identificação e o acesso a funcionalidades restritas, como a criação de anúncios. A implementação será focada em prototipagem e validação interna, utilizando **Mock Service Worker (MSW)** para simular o comportamento de uma API real sem a necessidade de um backend.

## 2. Justificativa e Abordagem Técnica (MSW)

Dado que o objetivo é um protótipo para validação, não implementaremos um backend real. Em vez disso, vamos simular os endpoints da API de autenticação usando MSW.

Para que a experiência de teste seja funcional e os usuários "cadastrados" persistam, a abordagem será:

*   **Armazenamento:** Os handlers do MSW irão ler e escrever uma lista de usuários no `sessionStorage` do navegador. O `sessionStorage` persiste os dados na aba atual, simulando uma sessão de login de forma contida.
*   **Seed de Usuário:** Para facilitar os testes do fluxo de login, o sistema será inicializado com um usuário padrão:
    *   **E-mail:** `teste@teste.com`
    *   **Senha:** `1234`
*   **Endpoints Simulados:**
    *   `POST /api/auth/register`: Adiciona um novo usuário à lista no `sessionStorage` se o e-mail não existir.
    *   `POST /api/auth/login`: Verifica as credenciais contra a lista no `sessionStorage` e retorna um token de sessão falso (mock).
    *   `GET /api/auth/session`: Valida o token falso e retorna os dados do usuário logado.

Essa abordagem torna o protótipo **funcional localmente** de forma independente.

## 3. Fluxo de Cadastro Minimalista

O cadastro deve ser o mais rápido e simples possível.

*   **Ponto de Entrada:** O fluxo é iniciado quando uma ação requer autenticação (ex: clicar em "Anuncie grátis") e o usuário não está logado.
*   **Interface:** Apresentar um modal ou uma página de formulário simples.
*   **Campos Essenciais:**
    *   E-mail
    *   Senha
*   **Comportamento:** Ao submeter, a aplicação envia a requisição para `POST /api/auth/register`. O MSW intercepta, valida se o e-mail já existe na lista do `sessionStorage`, adiciona o novo usuário e retorna uma resposta de sucesso, já autenticando o usuário na sequência.

## 4. Fluxo de Login

*   **Interface:** O mesmo modal/página de cadastro, com uma opção para alternar para o modo "Login".
*   **Campos:**
    *   E-mail
    *   Senha
*   **Comportamento:** A aplicação envia a requisição para `POST /api/auth/login`. O MSW intercepta, busca o usuário no `sessionStorage` e valida a senha. Em caso de sucesso, retorna um token de sessão mock para o cliente.

## 5. Gerenciamento de Sessão no Frontend

*   O token mock retornado pela API simulada será armazenado no estado da aplicação (ex: via React Context).
*   A interface do usuário será atualizada para refletir o estado de "logado" (ex: mostrar o nome do usuário, trocar "Anuncie grátis" por "Minha Conta").
*   Um hook `useUser` (ou similar) buscará os dados da sessão em `GET /api/auth/session` para persistir o estado de login entre as navegações de página.
