import { z } from "zod"

export const coinFormSchema = z.object({
  kingOfTheMoonProgress: z.array(z.number()),
  rocketToRaydiumExchange: z.array(z.number()),
  coin: z.number().default(0).nullish(),
})

export interface CoinFormState extends z.infer<typeof coinFormSchema> {}
