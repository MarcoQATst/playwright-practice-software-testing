import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export interface LoginCredentials {
  email: string;
  password: string;
}

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.getByLabel(/^Email address(?: \*)?$/);
    this.passwordInput = page.getByLabel(/^Password(?: \*)?$/);
    this.submitButton = page.getByRole('button', { name: 'Login' });
    this.registerLink = page.getByRole('link', { name: 'Register your account' });
  }

  async goto() {
    await this.visit('/auth/login');

    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async fillCredentials(credentials: Partial<LoginCredentials>) {
    if (credentials.email !== undefined) {
      await this.emailInput.fill(credentials.email);
    }

    if (credentials.password !== undefined) {
      await this.passwordInput.fill(credentials.password);
    }
  }

  async submit() {
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click();
  }

  async login(credentials: LoginCredentials) {
    await this.fillCredentials(credentials);
    await this.submit();
  }

  async openRegister() {
    await expect(this.registerLink).toBeVisible();
    await this.registerLink.click();
  }
}