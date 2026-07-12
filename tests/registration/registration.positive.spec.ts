import { test, expect } from '../../fixtures/auth.fixture';
import { validRegistrationData } from '../../data/test-data';

test.describe.configure({ mode: 'serial' });

test.describe('Cadastro - Cenários Positivos', () => {
  test('deve cadastrar usuário com dados válidos e redirecionar para login', async ({
    registerPage,
  }) => {
    const data = validRegistrationData();

    await registerPage.goto();
    await registerPage.register(data);

    await expect(registerPage.page).toHaveURL(/\/auth\/login/, { timeout: 15000 });
  });

  test('deve acessar tela de cadastro a partir da tela de login', async ({
    homePage,
    loginPage,
    registerPage,
  }) => {
    await homePage.goto();
    await homePage.openSignIn();
    await loginPage.openRegister();

    await expect(registerPage.page).toHaveURL(/\/auth\/register/);
    await expect(registerPage.firstNameInput).toBeVisible();
    await expect(registerPage.submitButton).toBeVisible();
  });

  test('deve aceitar data de nascimento no formato YYYY-MM-DD', async ({ registerPage }) => {
    const data = validRegistrationData();
    data.dateOfBirth = '1990-12-25';

    await registerPage.goto();
    await registerPage.register(data);

    await expect(registerPage.page).toHaveURL(/\/auth\/login/, { timeout: 15000 });
  });

  test('deve permitir login após cadastro bem-sucedido', async ({ registerPage, loginPage }) => {
    const data = validRegistrationData();

    await registerPage.goto();
    await registerPage.register(data);
    await expect(registerPage.page).toHaveURL(/\/auth\/login/, { timeout: 15000 });

    await loginPage.goto();
    await loginPage.login({ email: data.email, password: data.password });

    await expect(loginPage.page).toHaveURL(/\/account/, { timeout: 15000 });
  });
});
