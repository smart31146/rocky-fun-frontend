import { zodResolver } from "@hookform/resolvers/zod"
import { useImperativeHandle } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import Form from "@/components/ui/form"
import { GeneralModalComponentProps } from "../types"

export const schema = z.object({})
export type SchemaType = z.infer<typeof schema>

export interface HowItWorksFormDefaultValues extends SchemaType {}
export interface HowItWorksFormSuccessValues extends SchemaType {}
export interface HowItWorksFormErrorValues {}

export interface HowItWorksFormProps
  extends GeneralModalComponentProps<HowItWorksFormDefaultValues> {}

const HowItWorksForm = ({ outerRef, defaultValues, onSuccess, onError }: HowItWorksFormProps) => {
  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleSubmit = methods.handleSubmit((values) => {
    onSuccess(values)
    onError(null)
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
      <div className="space-y-2 text-lg font-normal leading-5 text-secondary md:text-sm">
        <p className="mb-10">
          <Image
            src="/assets/logo.svg"
            width={10}
            height={10}
            alt="Rocket"
            className="mr-2 inline-block"
          />
          Rocket prevents rugs by making sure that all created tokens are safe. Each coin on{" "}
          <span className="text-primary">
            Rocket is a fair-launch with no presale and no team allocation.
          </span>
        </p>
        <p>
          <span className="text-white">step 1</span>: pick a coin that you like <br />
        </p>
        <p>
          <span className="text-white">step 2</span>: buy the coin on rocket.fun <br />
        </p>
        <p>
          <span className="text-white">step 3</span>: sell at any time to lock in your profits or
          losses <br />
        </p>
        <p>
          <span className="text-white">step 4</span>: when enough people buy on the bonding curve it
          reaches a market cap of $69k <br />
        </p>
        <p>
          <span className="text-white">step 5</span>: $12k of liquidity is then deposited in raydium
          and burned
        </p>
        <br />
      </div>
    </Form>
  )
}

export default HowItWorksForm
