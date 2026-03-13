export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupProfile = {
  vorname: string;
  nachname: string;
  confirmpassword: string;
};

export type SignupTestUser = LoginCredentials & SignupProfile;

export type OutboxEmail = {
  to: string;
  subject: string;
  text: string;
  html: string;
  providerId?: string;
  createdAt: string;
};