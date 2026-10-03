import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';

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

  registeredUser: async ({}, use) => {
    const email =
      process.env.TEST_EXISTING_USER_EMAIL ?? 'customer@practicesoftwaretesting.com';
    const password = process.env.TEST_EXISTING_USER_PASSWORD ?? 'welcome01';
    await use({ email, password });
  },
});

export { expect } from '@playwright/test';
