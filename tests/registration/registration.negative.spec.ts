import { type Locator } from '@playwright/test';
import { test, expect } from '../../fixtures/auth.fixture';
import {
  registrationValidationMessages,
  validRegistrationData,
  generateUniqueEmail,
} from '../../data/test-data';

test.describe.configure({ mode: 'serial' });

type PageWithVisibleText = {
  visibleText: (text: string) => Locator;
};

async function expectVisibleMessages(page: PageWithVisibleText, messages: string[]) {
  for (const message of messages) {
    await expect(page.visibleText(message)).toBeVisible();
  }
}

test.describe('Cadastro - Cenários Negativos', () => {
  test('deve exibir erros ao submeter formulário vazio', async ({ registerPage }) => {
    await registerPage.goto();
    await registerPage.submit();

    await expectVisibleMessages(registerPage, [
      registrationValidationMessages.firstNameRequired,
      registrationValidationMessages.lastNameRequired,
      registrationValidationMessages.dobInvalidFormat,
      registrationValidationMessages.dobRequired,
      registrationValidationMessages.countryRequired,
      registrationValidationMessages.postalCodeRequired,
      registrationValidationMessages.houseNumberRequired,
      registrationValidationMessages.streetRequired,
      registrationValidationMessages.cityRequired,
      registrationValidationMessages.stateRequired,
      registrationValidationMessages.phoneRequired,
      registrationValidationMessages.emailRequired,
      registrationValidationMessages.passwordRequired,
    ]);
  });

  test('deve rejeitar data de nascimento no formato YYYYMMDD', async ({ registerPage }) => {
    const data = validRegistrationData();
    data.dateOfBirth = '19940531';

    await registerPage.goto();
    await registerPage.register(data);

    await expectVisibleMessages(registerPage, [registrationValidationMessages.dobInvalidFormat]);
    await expect(registerPage.page).toHaveURL(/\/auth\/register/);
  });

  test('deve rejeitar data de nascimento no formato YYYY/MM/DD', async ({ registerPage }) => {
    const data = validRegistrationData();
    data.dateOfBirth = '1994/05/31';

    await registerPage.goto();
    await registerPage.register(data);

    await expectVisibleMessages(registerPage, [registrationValidationMessages.dobInvalidFormat]);
    await expect(registerPage.page).toHaveURL(/\/auth\/register/);
  });

  test('deve exigir preenchimento do primeiro nome', async ({ registerPage }) => {
    const data = validRegistrationData();
    data.firstName = '';

    await registerPage.goto();
    await registerPage.register(data);

    await expectVisibleMessages(registerPage, [registrationValidationMessages.firstNameRequired]);
  });

  test('deve exigir preenchimento do sobrenome', async ({ registerPage }) => {
    const data = validRegistrationData();
    data.lastName = '';

    await registerPage.goto();
    await registerPage.register(data);

    await expectVisibleMessages(registerPage, [registrationValidationMessages.lastNameRequired]);
  });

  test('deve exigir seleção do país', async ({ registerPage }) => {
    const { country, ...dataWithoutCountry } = validRegistrationData();

    await registerPage.goto();
    await registerPage.fillForm(dataWithoutCountry);
    await registerPage.submit();

    await expectVisibleMessages(registerPage, [registrationValidationMessages.countryRequired]);
  });

  test('deve rejeitar e-mail com formato inválido', async ({ registerPage }) => {
    const data = validRegistrationData();
    data.email = 'email-invalido';

    await registerPage.goto();
    await registerPage.register(data);

    await expectVisibleMessages(registerPage, [registrationValidationMessages.emailInvalidFormat]);
    await expect(registerPage.page).toHaveURL(/\/auth\/register/);
  });

  test('deve rejeitar senha com menos de 6 caracteres', async ({ registerPage }) => {
    const data = validRegistrationData();
    data.password = 'Test';

    await registerPage.goto();
    await registerPage.register(data);

    await expectVisibleMessages(registerPage, [registrationValidationMessages.passwordMinLength]);
  });

  test('deve rejeitar senha sem caracteres especiais válidos', async ({ registerPage }) => {
    const data = validRegistrationData();
    data.password = 'Teste010203';

    await registerPage.goto();
    await registerPage.register(data);

    await expectVisibleMessages(registerPage, [registrationValidationMessages.passwordInvalidChars]);
  });

  test('deve rejeitar senha comprometida em vazamento de dados', async ({ registerPage }) => {
    const data = validRegistrationData();
    data.password = 'Test@123';

    await registerPage.goto();
    await registerPage.register(data);

    await expectVisibleMessages(registerPage, [registrationValidationMessages.passwordDataLeak]);
  });

  test('deve rejeitar cadastro com e-mail já existente', async ({ registerPage, registeredUser }) => {
    const data = validRegistrationData(registeredUser.email);

    await registerPage.goto();
    await registerPage.register(data);

    await expectVisibleMessages(registerPage, [registrationValidationMessages.emailAlreadyExists]);
  });

  test('deve manter usuário na tela de cadastro após falha de validação', async ({
    registerPage,
  }) => {
    const data = validRegistrationData(generateUniqueEmail());
    data.firstName = '';

    await registerPage.goto();
    await registerPage.register(data);

    await expect(registerPage.page).toHaveURL(/\/auth\/register/);
    await expect(registerPage.firstNameInput).toBeVisible();
  });
});
