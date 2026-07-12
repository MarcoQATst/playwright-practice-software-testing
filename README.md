# Practice Software Testing - Playwright

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

Projeto de automação de testes End-to-End utilizando **Playwright + TypeScript** para validar fluxos críticos da aplicação **Practice Software Testing**.

O objetivo deste projeto é demonstrar boas práticas de automação de testes, organização de código e integração contínua utilizando ferramentas utilizadas no mercado.

---

# Objetivo

Automatizar cenários de negócio da aplicação, aplicando:

- Page Object Model (POM)
- Fixtures reutilizáveis
- Massa de dados centralizada
- Configuração por variáveis de ambiente
- Relatórios de execução
- Integração contínua via GitHub Actions

---

# Tecnologias utilizadas

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- Allure Report
- Git

---

# Arquitetura do projeto

O projeto utiliza o padrão **Page Object Model (POM)** para separar responsabilidades e facilitar a manutenção dos testes.

```text
.
├── data/                  Massa de dados e mensagens esperadas
├── fixtures/              Fixtures customizadas do Playwright
├── pages/                 Page Objects das telas
├── tests/
│   ├── login/             Cenários de autenticação
│   └── registration/      Cenários de cadastro
├── reports/               Relatórios de execução
├── playwright.config.ts   Configuração global do Playwright
└── .github/
    └── workflows/         Pipelines CI/CD
```

---

# Configuração do ambiente

Clone o projeto:

```bash
git clone https://github.com/MarcoQATst/playwright-practice-software-testing.git
```

Acesse a pasta:

```bash
cd playwright-practice-software-testing
```

Instale as dependências:

```bash
npm ci
```

Instale os navegadores do Playwright:

```bash
npx playwright install
```

---

# Variáveis de ambiente

Crie o arquivo `.env` baseado no exemplo:

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

O arquivo `.env` contém informações locais e não deve ser enviado ao GitHub.

---

# Execução dos testes

Executar testes:

```bash
npm test
```

Executar testes com navegador visível:

```bash
npm run test:headed
```

Executar em modo UI:

```bash
npm run test:ui
```

---

# Relatórios

O projeto possui integração com:

- Playwright HTML Report
- Allure Report

Gerar relatório HTML:

```bash
npm run report
```

Gerar relatório Allure:

```bash
npm run allure:generate
```

Abrir relatório Allure:

```bash
npm run allure:open
```

---

# Cenários automatizados

## Registration

- Cadastro realizado com sucesso
- Validação de campos obrigatórios
- Validação de formatos inválidos
- Validação de senha inválida
- Bloqueio de cadastro utilizando e-mail existente

## Authentication

- Login realizado com sucesso
- Login utilizando senha inválida
- Login utilizando usuário inexistente
- Validação das mensagens de erro
- Persistência da sessão após autenticação

---

# Boas práticas aplicadas

- Page Object Model
- Fixtures reutilizáveis
- Código organizado por responsabilidade
- Locators estáveis do Playwright
- Massa de dados separada dos testes
- Configuração utilizando variáveis de ambiente
- Evidências automáticas em falhas
- Execução automatizada via CI/CD

---

# Integração contínua

O projeto possui pipeline utilizando **GitHub Actions**.

A execução automática ocorre em:

- Push na branch main
- Pull Requests para main/master

O pipeline executa os testes e disponibiliza os relatórios como artefatos da execução.

---

# Autor

**Marco Aurélio Gomes**

QA Engineer | Test Automation

Tecnologias:
Playwright | TypeScript | Selenium | Cypress | API Testing
