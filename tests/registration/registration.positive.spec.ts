import { test, expect } from '../../fixtures/auth.fixture';
import { validRegistrationData } from '../../data/test-data';

test.describe('Cadastro - Cenários Positivos', () => {
  test('deve cadastrar usuário com dados válidos e redirecionar para login', async ({
    registerPage,
    loginPage,
  }) => {
    const data = validRegistrationData();

    await registerPage.goto();
    await registerPage.register(data);

    await expect(registerPage.page).toHaveURL(/\/auth\/login/);
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
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

  test('deve aceitar data de nascimento no formato YYYY-MM-DD', async ({
    registerPage,
    loginPage,
  }) => {
    const data = validRegistrationData();

    data.dateOfBirth = '1990-12-25';

    await registerPage.goto();
    await registerPage.register(data);

    await expect(registerPage.page).toHaveURL(/\/auth\/login/);
    await expect(loginPage.emailInput).toBeVisible();
  });
});
