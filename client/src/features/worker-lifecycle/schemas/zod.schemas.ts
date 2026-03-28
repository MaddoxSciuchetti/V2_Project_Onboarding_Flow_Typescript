import z from 'zod';

const germanDatePattern = /^\d{2}\.\d{2}\.\d{4}$/;

const workerDateSchema = z
  .string()
  .regex(germanDatePattern, 'Format: DD.MM.YYYY')
  .refine((value) => {
    const [day, month, year] = value.split('.').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() + 1 === month &&
      date.getUTCDate() === day
    );
  }, 'Ungültiges Datum')
  .transform((value) => {
    const [day, month, year] = value.split('.').map(Number);
    return new Date(Date.UTC(year, month - 1, day)).toISOString();
  })
  .pipe(z.string().datetime());

export const workerBaseSchema = z.object({
  firstName: z.string().min(1, 'erforderlich'),
  lastName: z.string().min(1, 'erforderlich'),
  email: z
    .string()
    .min(1, 'erforderlich')
    .email('Ungültige email')
    .toLowerCase(),
  birthday: workerDateSchema,
  street: z.string().min(1, 'erforderlich'),
  entryDate: workerDateSchema,
  position: z.string().min(1, 'Position erforderlich'),
});

export const workerOnboardingSchema = workerBaseSchema.extend({
  type: z.literal('Onboarding'),
});

export const workerOffboardingSchema = workerBaseSchema.extend({
  type: z.literal('Offboarding'),
  exitDate: workerDateSchema,
});

export const createWorkerSchema = z.discriminatedUnion('type', [
  workerOnboardingSchema,
  workerOffboardingSchema,
]);

export type CreateWorker = z.infer<typeof createWorkerSchema>;

export const formDescriptionSchema = z.object({
  form_field_id: z.coerce.number(),
  description: z.string(),
  owner: z.string(),
});
