# Practice Software Testing - Playwright

Projeto de automação E2E com Playwright e TypeScript para validar fluxos de cadastro e login no site [Practice Software Testing](https://practicesoftwaretesting.com).

## Objetivo

Demonstrar boas práticas de automação para portfólio QA, usando Page Object Model, fixtures reutilizáveis, massa de dados centralizada e configuração por variáveis de ambiente.

## Tecnologias

- Playwright
- TypeScript
- Node.js
- GitHub Actions

## Estrutura

```text
data/                  Massa de dados e mensagens esperadas
fixtures/              Fixtures customizadas do Playwright
pages/                 Page Objects das telas testadas
tests/login/           Cenários de login
tests/registration/    Cenários de cadastro
playwright.config.ts   Configuração global do Playwright
```

## Configuração

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Variáveis disponíveis:

```env
TEST_BASE_URL=https://practicesoftwaretesting.com
TEST_EMAIL_DOMAIN=teste.com
TEST_USER_PASSWORD=Teste@010203
PLAYWRIGHT_WORKERS=1
```

O arquivo `.env` não deve ser enviado para o GitHub. Use `.env.example` como referência pública.

## Como executar

Instale as dependências:

```bash
npm ci
```

Instale os navegadores do Playwright:

```bash
npx playwright install
```

Execute a suíte:

```bash
npm test
```

Execute com navegador visível:

```bash
npm run test:headed
```

Abra o relatório HTML:

```bash
npm run report
```

## Cenários cobertos

- Cadastro com dados válidos
- Validações obrigatórias do formulário de cadastro
- Validação de formatos inválidos de data, e-mail e senha
- Bloqueio de cadastro com e-mail já existente
- Login com credenciais válidas
- Validações negativas de autenticação
- Persistência de sessão após login

## Integração contínua

O workflow em `.github/workflows/playwright.yml` executa os testes em pushes e pull requests para `main` e `master`, salvando o relatório HTML como artefato.
