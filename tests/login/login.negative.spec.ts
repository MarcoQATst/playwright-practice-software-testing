import { type Locator } from '@playwright/test';
import { test, expect } from '../../fixtures/auth.fixture';
import { loginValidationMessages } from '../../data/test-data';

type PageWithVisibleText = {
  visibleText: (text: string) => Locator;
};

async function expectVisibleMessages(page: PageWithVisibleText, messages: string[]) {
  for (const message of messages) {
    await expect(page.visibleText(message)).toBeVisible();
  }
}

test.describe('Login - Cenários Negativos', () => {
  test('deve exibir erros ao submeter formulário vazio', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.submit();

    await expectVisibleMessages(loginPage, [
      loginValidationMessages.emailRequired,
      loginValidationMessages.passwordRequired,
    ]);
  });

  test('deve rejeitar e-mail com formato inválido', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login({ email: 'invalid@', password: 'Teste@010203' });

    await expectVisibleMessages(loginPage, [loginValidationMessages.emailInvalidFormat]);
    await expect(loginPage.page).toHaveURL(/\/auth\/login/);
  });

  test('deve rejeitar login com senha incorreta', async ({ loginPage, registeredUser }) => {
    await loginPage.goto();
    await loginPage.login({
      email: registeredUser.email,
      password: 'SenhaErrada@99',
    });

    await expectVisibleMessages(loginPage, [loginValidationMessages.invalidCredentials]);
    await expect(loginPage.page).toHaveURL(/\/auth\/login/);
  });

  test('deve rejeitar login com usuário inexistente', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login({
      email: 'naoexiste@teste.com',
      password: 'Teste@010203',
    });

    await expectVisibleMessages(loginPage, [loginValidationMessages.invalidCredentials]);
  });

  test('deve exigir preenchimento do e-mail', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login({ email: '', password: 'Teste@010203' });

    await expectVisibleMessages(loginPage, [loginValidationMessages.emailRequired]);
  });

  test('deve exigir preenchimento da senha', async ({ loginPage, registeredUser }) => {
    await loginPage.goto();
    await loginPage.login({ email: registeredUser.email, password: '' });

    await expectVisibleMessages(loginPage, [loginValidationMessages.passwordRequired]);
  });

  test('deve manter usuário na tela de login após falha de autenticação', async ({
    loginPage,
    registeredUser,
  }) => {
    await loginPage.goto();
    await loginPage.login({
      email: registeredUser.email,
      password: 'SenhaErrada@99',
    });

    await expect(loginPage.page).toHaveURL(/\/auth\/login/);
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });
});
