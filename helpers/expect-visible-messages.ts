import { expect, type Locator } from '@playwright/test';

type PageWithVisibleText = {
  visibleText: (text: string) => Locator;
};

export async function expectVisibleMessages(
  page: PageWithVisibleText,
  messages: readonly string[],
) {
  for (const message of messages) {
    await expect(page.visibleText(message)).toBeVisible();
  }
}
