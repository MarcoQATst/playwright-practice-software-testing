import { type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  constructor(readonly page: Page) {}

  protected async visit(path: string) {
    await this.page.goto(path);
  }

  async reload() {
    await this.page.reload();
  }

  visibleText(text: string): Locator {
    return this.page.getByText(text, { exact: true });
  }
}
