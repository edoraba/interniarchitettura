import { z } from 'zod/v4';

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  message: z.string().min(10),
});

export type ContactFormData = z.infer<typeof contactSchema>;
