import { z } from 'zod';

import { EnumRole } from '@/types/user';

export const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(6),
  phone: z.string().min(6),
  role: z.nativeEnum(EnumRole),
  isActive: z.boolean(),
});

export type UserForm = z.infer<typeof formSchema>;

export const initUser: UserForm = {
  name: '',
  email: '',
  username: '',
  password: '',
  phone: '',
  role: EnumRole.User,
  isActive: false,
};
