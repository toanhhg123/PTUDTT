import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1),
  note: z.string().nullable(),
});

export type CategoryForm = z.infer<typeof formSchema>;

export const initCategory: CategoryForm = {
  name: '',
  note: '',
};
