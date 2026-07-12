import { test, expect } from '../../fixtures/auth.fixture';

test.describe.configure({ mode: 'serial' });

test.describe('Login - Cenários Positivos', () => {
  test('deve autenticar usuário com credenciais válidas', async ({ loginPage, registeredUser }) => {
    await loginPage.goto();
    await loginPage.login(registeredUser);

    await expect(loginPage.page).toHaveURL(/\/account/, { timeout: 15000 });
  });

  test('deve acessar tela de login a partir da home', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await homePage.openSignIn();

    await expect(loginPage.page).toHaveURL(/\/auth\/login/);
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('deve exibir link para cadastro na tela de login', async ({ loginPage, registerPage }) => {
    await loginPage.goto();
    await loginPage.openRegister();

    await expect(registerPage.page).toHaveURL(/\/auth\/register/);
  });

  test('deve manter sessão após login bem-sucedido', async ({ loginPage, registeredUser }) => {
    await loginPage.goto();
    await loginPage.login(registeredUser);

    await expect(loginPage.page).toHaveURL(/\/account/, { timeout: 15000 });

    await loginPage.page.reload();
    await expect(loginPage.page).toHaveURL(/\/account/, { timeout: 15000 });
  });
});
