import { z } from 'zod';

export const formSchema = z.object({
  productName: z.string().min(1),
  desc: z.string().nullable(),
  stock: z.number(),
  purchasePrice: z.number(),
  sellPrice: z.number(),
  image: z.string(),
  categoryId: z.number(),
  brandId: z.number(),
  imageFile: z.instanceof(File).nullable().optional(),
});

export type ProductForm = z.infer<typeof formSchema>;

export const initProduct: ProductForm = {
  productName: '',
  desc: '',
  stock: 0,
  purchasePrice: 0,
  sellPrice: 0,
  image: '',
  categoryId: 0,
  brandId: 0,
};
