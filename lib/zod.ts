import { z } from "zod";

export const addPlayerProfileSchema = z.object({
  position: z.string().min(2), // TODO: change it to enum
  rating: z.number().int().positive()
})

export type AddPlayerProfileSchema = z.infer<typeof addPlayerProfileSchema>;
