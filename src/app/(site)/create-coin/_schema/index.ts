import { z } from "zod"

export const createCoinFormSchema = z.object({
  name: z
    .string()
    .min(1, "name must be at least 1 character")
    .max(32, "name must be less than 32 characters"),
  ticker: z
    .string()
    .min(1, "ticket must be at least 1 character")
    .max(11, "ticket must be less than 11 characters"),
  description: z.string().max(1500, "description 1500 characters or less").nullish(),
  image: z.any({ message: "must upload image" }),

  website: z.string().nullish(),
  twitter: z.string().nullish(),
  telegram: z.string().nullish(),

  sol: z.any(),
})

export interface CreateCoinFormState extends z.infer<typeof createCoinFormSchema> {}
