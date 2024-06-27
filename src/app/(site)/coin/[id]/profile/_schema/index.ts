import { z } from "zod";

export const walletFormSchema = z.object({
  wallet: z.string().min(1),
})

export interface WalletFormState extends z.infer<typeof walletFormSchema> {}