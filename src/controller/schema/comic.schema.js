import { z } from 'zod';

export const createComicSchema = z.object({
  title:       z.string().min(1),
  publisher:   z.string().min(1),
  country:     z.string().min(1),
  year:        z.number().int(),
  description: z.string().min(1),
  genre:       z.string().min(1),
  total_pages: z.number().int().positive(),
  format:      z.string().min(1), 
  value_payed: z.number().nonnegative(),
  writer:      z.string().min(1),
  comic_type:  z.string().min(1),
  image:       z.string().min(1),
  read:        z.boolean()
}).strict();

export const updateComicSchema = createComicSchema.partial();
