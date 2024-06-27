"use client"

import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Form from "@/components/ui/form"

export interface HomeProductContainerProps {
  children: React.ReactNode
  onChange: (data: any) => void

  defaultFilter?: Partial<HomeProductsFormSchemaState>
}

export const homeProductsFormSchema = z.object({
  orderByField: z.string().min(1),
  orderBy: z.string().min(1),
  search: z.string().nullish(),
  enableAnimations: z.boolean(),
  nsfw: z.boolean(),
})

export type HomeProductsFormSchemaState = z.infer<typeof homeProductsFormSchema>

const HomeProductContainer = ({ defaultFilter, children, onChange }: HomeProductContainerProps) => {
  const methods = useForm<HomeProductsFormSchemaState>({
    resolver: zodResolver(homeProductsFormSchema),
    defaultValues: defaultFilter,
  })

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      onChange(value)
    })
    return () => subscription.unsubscribe()
  }, [methods.watch])

  return (
    <Form methods={methods}>
      <main className="container flex flex-col gap-11">{children}</main>
    </Form>
  )
}

export default HomeProductContainer
