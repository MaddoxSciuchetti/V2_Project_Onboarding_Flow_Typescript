export const CreateMitarbeiterInputs = [
  {
    name: 'firstName' as const,
    placeholder: 'Vorname',
    type: 'text',
    required: true,
  },
  {
    name: 'lastName' as const,
    placeholder: 'Nachname',
    type: 'text',
    required: true,
  },
  {
    name: 'email' as const,
    placeholder: 'email',
    type: 'email',
    required: true,
  },
  {
    name: 'password' as const,
    placeholder: 'password',
    type: 'password',
    required: true,
  },
  {
    name: 'confirmPassword' as const,
    placeholder: 'Confirm Password',
    type: 'password',
    required: true,
  },
] as const;

export type TCreateMitarbeiter = (typeof CreateMitarbeiterInputs)[number];
