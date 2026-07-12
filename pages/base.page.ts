import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit(path: string) {
    await this.page.goto(path, {
      waitUntil: 'domcontentloaded'
    });
  }

  visibleText(text: string): Locator {
    return this.page.getByText(text, { exact: true });
  }
}