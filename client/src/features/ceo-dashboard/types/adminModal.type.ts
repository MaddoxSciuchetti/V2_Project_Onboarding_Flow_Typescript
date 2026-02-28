import z from 'zod';

export type TCloseModal = {
  onClose?: () => void;
  selectedUser?: string | null;
};

export const formSchema = z.object({
  email: z.email(),
  subject: z.string({ message: 'Füge ein Betreff hinzu' }).min(1),
  test: z.string(),
});

export type sendEmailSchema = z.infer<typeof formSchema>;
