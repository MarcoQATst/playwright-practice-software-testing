import { type RegistrationData } from '../pages/register.page';

export function generateUniqueEmail(prefix = 'qa') {
  const domain = process.env.TEST_EMAIL_DOMAIN ?? 'teste.com';

  return `${prefix}${Date.now()}@${domain}`;
}

export const defaultPassword = process.env.TEST_USER_PASSWORD ?? 'Teste@010203';

export const validRegistrationData = (email?: string): RegistrationData => ({
  firstName: 'Teste',
  lastName: 'QA',
  dateOfBirth: '1994-05-31',
  country: 'BR',
  postalCode: '01310100',
  houseNumber: '120',
  street: 'Rua Teste Automacao',
  city: 'Sao Paulo',
  state: 'SP',
  phone: '11999999999',
  email: email ?? generateUniqueEmail(),
  password: defaultPassword,
});

export const registrationValidationMessages = {
  firstNameRequired: 'First name is required',
  lastNameRequired: 'Last name is required',
  dobRequired: 'Date of Birth is required',
  dobInvalidFormat: 'Please enter a valid date in YYYY-MM-DD format.',
  countryRequired: 'Country is required',
  postalCodeRequired: 'Postcode is required',
  houseNumberRequired: 'House number is required',
  streetRequired: 'Street is required',
  cityRequired: 'City is required',
  stateRequired: 'State is required',
  phoneRequired: 'Phone is required.',
  emailRequired: 'Email is required',
  emailInvalidFormat: 'Email format is invalid',
  passwordRequired: 'Password is required',
  passwordMinLength: 'Password must be minimal 6 characters long.',
  passwordInvalidChars: 'Password can not include invalid characters.',
  emailAlreadyExists: 'A customer with this email address already exists.',
  passwordDataLeak: 'The given password has appeared in a data leak. Please choose a different password.',
} as const;

export const loginValidationMessages = {
  emailRequired: 'Email is required',
  passwordRequired: 'Password is required',
  emailInvalidFormat: 'Email format is invalid',
  invalidCredentials: 'Invalid email or password',
} as const;
