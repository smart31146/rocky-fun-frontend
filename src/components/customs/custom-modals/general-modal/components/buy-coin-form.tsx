"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useImperativeHandle } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Form, { FormField } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { GeneralModalComponentProps } from "../types"

export const schema = z.object({
  amount: z.number().or(z.string()).default(0),
})
export type BuyCoinFormSchemaType = z.infer<typeof schema>

export interface BuyCoinFormDefaultValues extends BuyCoinFormSchemaType {}
export interface BuyCoinFormSuccessValues extends BuyCoinFormSchemaType {}
export interface BuyCoinFormErrorValues {}

export interface BuyCoinFormProps extends GeneralModalComponentProps<BuyCoinFormDefaultValues> {}

const BuyCoinForm = ({
  outerRef,
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  closeCurrentModal,
}: BuyCoinFormProps) => {
  const methods = useForm<BuyCoinFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleSubmit = methods.handleSubmit((values) => {
    const promiseOrValue = onSubmit(values)

    if (typeof promiseOrValue === "boolean") {
      if (promiseOrValue) {
        onSuccess(values)
      } else {
        onError(values)
      }
    } else {
      promiseOrValue.then(onSuccess).catch(onError)
    }
  })

  // The actions will trigger me
  useImperativeHandle(outerRef, () => ({
    reset() {},
    submit() {
      handleSubmit()
    },
  }))

  return (
    <Form methods={methods} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-sm text-[#D9D5D2]">
        tip: optional but buying a small amount of coins helps protect your coin from snipers
      </p>

      <div className="relative">
        <FormField
          size="lg"
          name="amount"
          type="number"
          variant="TEXT"
          inputMode="numeric"
          placeholder="0.0"
          className="pr-24"
          min={0}
          max={85}
          noNativeNumber
        />

        <Image
          src="/assets/sol.svg"
          alt="Sol"
          width={62}
          height={62}
          className="absolute right-2 top-1/2 h-auto w-[62px] -translate-y-1/2 transform object-cover"
        />
      </div>

      <Button className="bg-[#FFC600] hover:bg-[#FFC600]" type="submit" size="lg">
        Create coin
      </Button>

      <p className="text-xs font-normal leading-4 text-[#D9D5D2]">Cost to deploy: ¬0.02 SOL</p>
    </Form>
  )
}

export default BuyCoinForm
