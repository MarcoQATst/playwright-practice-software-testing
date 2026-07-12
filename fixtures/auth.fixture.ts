import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';
import { defaultPassword, generateUniqueEmail, validRegistrationData } from '../data/test-data';

type AuthFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  registeredUser: { email: string; password: string };
};

export const test = base.extend<AuthFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  registeredUser: async ({ registerPage }, use) => {
    const email = generateUniqueEmail('registered');
    const password = defaultPassword;
    const data = validRegistrationData(email);

    await registerPage.goto();
    await registerPage.register(data);
    await registerPage.page.waitForURL('**/auth/login', { timeout: 25000 });

    await use({ email, password });
  },
});

export { expect } from '@playwright/test';
