import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  postalCode: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  password: string;
}

export class RegisterPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly countrySelect: Locator;
  readonly postalCodeInput: Locator;
  readonly houseNumberInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.firstNameInput = page.getByLabel('First name');
    this.lastNameInput = page.getByLabel('Last name');
    this.dateOfBirthInput = page.getByLabel(/^Date of Birth(?: \*)?$/);
    this.countrySelect = page.getByLabel('Country');
    this.postalCodeInput = page.getByLabel('Postal code');
    this.houseNumberInput = page.getByLabel('House number');
    this.streetInput = page.getByLabel('Street');
    this.cityInput = page.getByLabel('City');
    this.stateInput = page.getByLabel('State');
    this.phoneInput = page.getByLabel('Phone');
    this.emailInput = page.getByLabel(/^Email address(?: \*)?$/);
    this.passwordInput = page.getByLabel(/^Password(?: \*)?$/);
    this.submitButton = page.getByRole('button', { name: 'Register' });
  }

  async goto() {
    await this.visit('/auth/register');
    await this.submitButton.waitFor({ state: 'visible' });
  }

  async fillForm(data: Partial<RegistrationData>) {
    if (data.firstName !== undefined) await this.firstNameInput.fill(data.firstName);
    if (data.lastName !== undefined) await this.lastNameInput.fill(data.lastName);
    if (data.dateOfBirth !== undefined) await this.dateOfBirthInput.fill(data.dateOfBirth);
    if (data.country) await this.countrySelect.selectOption(data.country);
    if (data.postalCode !== undefined) await this.postalCodeInput.fill(data.postalCode);
    if (data.houseNumber !== undefined) await this.houseNumberInput.fill(data.houseNumber);
    if (data.street !== undefined) await this.streetInput.fill(data.street);
    if (data.city !== undefined) await this.cityInput.fill(data.city);
    if (data.state !== undefined) await this.stateInput.fill(data.state);
    if (data.phone !== undefined) await this.phoneInput.fill(data.phone);
    if (data.email !== undefined) await this.emailInput.fill(data.email);
    if (data.password !== undefined) await this.passwordInput.fill(data.password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async register(data: RegistrationData) {
    await this.fillForm(data);
    await this.submit();
  }
}
