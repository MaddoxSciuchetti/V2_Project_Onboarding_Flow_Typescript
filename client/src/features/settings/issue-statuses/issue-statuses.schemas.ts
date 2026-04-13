import { z } from 'zod';

export const createIssueStatusSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name ist erforderlich' })
    .max(120, { message: 'Maximal 120 Zeichen' }),
});

export type CreateIssueStatusInput = z.infer<typeof createIssueStatusSchema>;

export const updateIssueStatusNameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name ist erforderlich' })
    .max(120, { message: 'Maximal 120 Zeichen' }),
});

export type UpdateIssueStatusNameInput = z.infer<
  typeof updateIssueStatusNameSchema
>;
