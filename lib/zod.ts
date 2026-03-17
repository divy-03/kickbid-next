import { z } from "zod";

export const addPlayerProfileSchema = z.object({
  position: z.string().min(2), // TODO: change it to enum
  rating: z.number().min(1).max(5)
})

export type AddPlayerProfileSchema = z.infer<typeof addPlayerProfileSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  image: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  position: z.string().optional() // TODO: change it to enum
})

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
