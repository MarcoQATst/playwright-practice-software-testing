import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly signInLink: Locator;

  constructor(page: Page) {
    super(page);
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
  }

  async goto() {
    await this.visit('/');
  }

  async openSignIn() {
    await this.signInLink.click();
  }
}
