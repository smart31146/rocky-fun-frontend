import Form, { FormField } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useImperativeHandle } from "react"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { GeneralModalComponentProps } from "../types"

export const schema = z.object({
  size: z
    .number()
    .min(0.1)
    .max(25)
    .or(z.string())
    .transform((v) => Number(v)),
  enableFrontRunningProtection: z.boolean().default(false),
})
export type SchemaType = z.infer<typeof schema>

export interface SetMaxSlippageFormDefaultValues extends SchemaType {}
export interface SetMaxSlippageFormSuccessValues extends SchemaType {}
export interface SetMaxSlippageFormErrorValues {}

export interface SetMaxSlippageFormProps
  extends GeneralModalComponentProps<SetMaxSlippageFormDefaultValues> {}

const SetMaxSlippageForm = ({
  outerRef,
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  closeCurrentModal,
}: SetMaxSlippageFormProps) => {
  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      enableFrontRunningProtection: false,
      size: 1,
      ...defaultValues,
    },
  })

  const enableFrontRunningProtection = useWatch({
    control: methods.control,
    name: "enableFrontRunningProtection",
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
    <Form methods={methods} onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <FormField
        variant="TEXT"
        type="number"
        name="size"
        placeholder="1"
        step={1}
        min={0}
        max={25}
        wrapperClassName="max-w-[210px] w-full"
        className="with-default"
      />
      <p className="text-center text-sm font-normal leading-4.5 text-[#D9D5D2]">
        This is the maximum amount of slippage you are willing to accept when placing trades
      </p>

      <div className="flex flex-col items-center">
        <FormField
          variant="SWITCH"
          label="Enable front-running protection"
          name="enableFrontRunningProtection"
          direction="horizontal"
        />
        {enableFrontRunningProtection ? (
          <p className="mt-2 text-center text-sm text-primary">
            Front-running protection stops bots from front-running your buys. 0.01 SOL is added to
            each buy transaction as a fee to solana validators. You can use high slippage with
            front-running protection turned on.
          </p>
        ) : null}
      </div>
    </Form>
  )
}

export default SetMaxSlippageForm
