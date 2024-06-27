"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ReactNode } from "react"
import { useForm } from "react-hook-form"
import Form from "@/components/ui/form"
import { CoinFormState, coinFormSchema } from "../(detailed)"

export interface CoinFormProps {
  children: ReactNode
}

const CoinForm = ({ children }: CoinFormProps) => {
  const methods = useForm<CoinFormState>({
    resolver: zodResolver(coinFormSchema),
    defaultValues: {
      kingOfTheMoonProgress: [0],
      rocketToRaydiumExchange: [0],
    },
  })

  return <Form methods={methods}>{children}</Form>
}

export default CoinForm
