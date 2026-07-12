# Playwright Test Automation Framework

**Playwright • TypeScript • Node.js • GitHub Actions**

An end-to-end (E2E) test automation framework built with **Playwright** and **TypeScript** to validate critical user flows of the **Practice Software Testing** application.

This project demonstrates test automation best practices, clean code organization, and continuous integration using industry-standard tools and technologies.

---

# Project Goals

Automate key business scenarios while applying modern test automation practices, including:

* Page Object Model (POM)
* Reusable Playwright Fixtures
* Centralized test data management
* Environment variable configuration
* Automated test reporting
* Continuous Integration with GitHub Actions

---

# Technologies

* Playwright
* TypeScript
* Node.js
* GitHub Actions
* Allure Report
* Git

---

# Project Architecture

The project follows the **Page Object Model (POM)** design pattern to improve maintainability, readability, and scalability.

```text
.
├── data/                  Test data and expected messages
├── fixtures/              Custom Playwright fixtures
├── pages/                 Page Objects
├── tests/
│   ├── login/             Authentication scenarios
│   └── registration/      Registration scenarios
├── reports/               Test execution reports
├── playwright.config.ts   Global Playwright configuration
└── .github/
    └── workflows/         CI/CD pipelines
```

---

# Environment Setup

### Clone the repository

```bash
git clone https://github.com/MarcoQATst/playwright-practice-software-testing.git
```

### Navigate to the project

```bash
cd playwright-practice-software-testing
```

### Install dependencies

```bash
npm ci
```

### Install Playwright browsers

```bash
npx playwright install
```

---

# Environment Variables

Create a `.env` file based on the provided example:

```bash
cp .env.example .env
```

Available variables:

```env
TEST_BASE_URL=https://practicesoftwaretesting.com
TEST_EMAIL_DOMAIN=teste.com
TEST_USER_PASSWORD=Teste@010203
PLAYWRIGHT_WORKERS=1
```

> **Note:** The `.env` file contains local configuration and should not be committed to GitHub.

---

# Running the Tests

Run all tests:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run Playwright UI Mode:

```bash
npm run test:ui
```

---

# Test Reports

The project integrates with:

* Playwright HTML Report
* Allure Report

Generate the Playwright HTML Report:

```bash
npm run report
```

Generate the Allure Report:

```bash
npm run allure:generate
```

Open the Allure Report:

```bash
npm run allure:open
```

---

# Automated Test Coverage

## Registration

* Successful user registration
* Required field validation
* Invalid input validation
* Password validation
* Registration blocked for existing email addresses

## Authentication

* Successful login
* Invalid password validation
* Non-existent user validation
* Error message validation
* Session persistence after authentication

---

# Best Practices Implemented

* Page Object Model (POM)
* Reusable Playwright Fixtures
* Clean project architecture
* Stable Playwright locators
* Centralized test data
* Environment-based configuration
* Automatic failure evidence (screenshots/traces)
* CI/CD pipeline integration

---

# Continuous Integration

This project includes a **GitHub Actions** pipeline.

The workflow is automatically triggered on:

* Pushes to the **main** branch
* Pull Requests targeting **main**

The pipeline installs dependencies, executes the automated test suite, and publishes the execution reports as workflow artifacts.

---

# Author

**Marco Aurélio Gomes**

**QA Automation Engineer**

### Technical Skills

* Playwright
* TypeScript
* Selenium
* Cypress
* API Testing
* GitHub Actions
* Git
