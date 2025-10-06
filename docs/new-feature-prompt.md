# Feature: Cadastro de Anúncio de Venda de Resíduo

## 1. Resumo

Permitir que usuários (cadastrados ou não) possam iniciar o processo de criação de um anúncio para a venda de resíduos. O fluxo começa com uma captura de informações essenciais para gerar um lead e um "rascunho" do anúncio, seguido por um formulário mais detalhado para que o anúncio possa ser publicado na plataforma.

## 2. Pontos de Entrada (CTAs)

1.  **Hero Section (Página Inicial):**
    *   Utilizar o CTA existente: Input com placeholder "Qual tipo de resíduo você quer cadastrar?" e o botão "Criar meu anúncio".
2.  **AppBar (Navegação Principal):**
    *   Adicionar um novo botão "Anuncie grátis".

## 3. Fluxo de Autenticação

*   Se um usuário não autenticado clicar em um dos CTAs, ele deve ser direcionado para uma tela de **Login/Cadastro**.
*   Opções de autenticação:
    *   Single Sign-On (Google, etc.).
    *   Cadastro/Login com E-mail e Senha.
*   Após o login/cadastro, o usuário é redirecionado para o início do fluxo de criação do anúncio.

## 4. Fluxo de Criação do Anúncio

### 4.1. Passo 1: Cadastro Básico (Captura de Lead)

Após a autenticação, o usuário preenche um formulário simples com os seguintes campos:

*   **Categoria do Resíduo:** Lista de seleção (Ex: Borracha, Plástico, Metal).
*   **Tipo de Resíduo:** Lista de seleção dependente da categoria (Ex: Se a categoria for "Borracha", as opções podem ser "PU Rígido", "Pneu", etc.).
*   **Descrição do Anúncio:** Campo de texto livre.
*   **Foto Principal:** Upload de uma imagem do resíduo.

### 4.2. Estado Pós-Cadastro Básico

*   Ao submeter o formulário básico, o sistema salva o anúncio com o status **"Em Análise"**.
*   O usuário é direcionado para uma página que informa: "Seu anúncio está em análise. Complete as informações abaixo para publicá-lo."
*   Nesta página, são apresentados os próximos passos para completar o cadastro.

### 4.3. Passo 2: Completar Informações do Anúncio

O usuário deve preencher os seguintes blocos de informação:

#### a. Complete os dados do Anunciante

*   **Tipo de Anunciante:** Pessoa Física ou Pessoa Jurídica.
*   **CPF/CNPJ:** Campo condicional baseado no tipo de anunciante.
*   **Nome da Empresa** (se Pessoa Jurídida).
*   **Informações de Contato:**
    *   **WhatsApp:** Número de telefone.
    *   **E-mail Comercial:** Pré-preenchido com o e-mail de cadastro do usuário, mas editável.

#### b. Complete os Detalhes do Resíduo

*   **Quantidade Disponível e Unidade de Medida:** (Ex: 1000 kg, 500 m³, 100 unidades).
*   **Preço:** Valor por unidade de medida (Ex: R$ 1,50 por kg).
*   **Frequência de Disponibilidade:** Lista de seleção (Ex: Semanal, Mensal, Lote Único, Contínuo).
*   **Localização do Resíduo:** Cidade/Estado.
*   **Origem do Resíduo:** Lista de seleção (Ex: Pós-indústria, Pós-consumo, Outros).

#### c. Complete as Informações de Logística

*   **Endereço do Resíduo:** Endereço completo para retirada.
*   **Disponibiliza Transporte?** Sim/Não.
*   **Equipamentos:** Campo de texto para descrever tipo e quantidade de equipamentos disponíveis para o manejo do resíduo.
*   **Destinação Sugerida:** Campo de texto ou lista de seleção (Ex: Aterro Sanitário, Reciclagem, Coprocessamento).

---

Ao preencher todas as informações, o anúncio sai do status "Em Análise" e fica pronto para ser revisado e publicado pela equipe de moderação.
