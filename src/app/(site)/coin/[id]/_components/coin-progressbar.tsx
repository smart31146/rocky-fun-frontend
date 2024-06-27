"use client"

import { FormField } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/libs/utils/tailwind"
import { ComponentPropsWithoutRef, useEffect } from "react"
import { useWatch } from "react-hook-form"
import { useCoinFormContext } from "./use-coin-form-context"
import { useCoinContext } from "@/app/(site)/coin/[id]/_components/use-coin-context"

export interface CoinProgressbarProps extends ComponentPropsWithoutRef<"div"> {}

const CoinProgressbar = ({ className, ...props }: CoinProgressbarProps) => {
  const { coinChainData } = useCoinContext()
  const methods = useCoinFormContext()

  const [[kingOfTheMoonProgress], [rocketToRaydiumExchange]] = useWatch({
    control: methods.control,
    name: ["kingOfTheMoonProgress", "rocketToRaydiumExchange"],
  })

  useEffect(() => {
    methods.setValue(
      "rocketToRaydiumExchange",
      [Math.round(coinChainData?.bondingCurveProcess) || 0],
      { shouldValidate: true },
    )
  }, [coinChainData])
  return (
    <TooltipProvider>
      <div {...props} className={cn(className)}>
        <Label className="mb-4 flex items-center">
          Bonding Curve Progress:{" "}
          <span className="ml-1 text-success">{Math.round(rocketToRaydiumExchange)}%</span>{" "}
          {/* <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <InfoOutlineIcon className="ml-2 h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent align="start" alignOffset={-20}>
              When the curve reaches 100%, the token <br /> has reached a market cap of $35k <br />{" "}
              and will replace the current King of The Moon!
            </TooltipContent>
          </Tooltip> */}
        </Label>
        <FormField
          name="rocketToRaydiumExchange"
          variant="SLIDER"
          rangeProps={{ className: "bg-success-light rounded-r-full" }}
          trackProps={{ className: "h-3" }}
          disabled
          thumbProps={{ className: "w-6 h-6 border-0 hidden" }}
          defaultValue={[0]}
          max={100}
          step={1}
        />
        <p className="mt-3 text-sm">
          when the market cap reaches $69,000 all the liquidty from the bonding curve will be
          deposited into Raydium and burned. Progress % increase as the price goes up.
        </p>

        <hr className="py-3" />

        <Label className="mb-4 flex items-center">
          King of the Moon progress: {kingOfTheMoonProgress}%{" "}
          {/* <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <InfoOutlineIcon className="ml-2 h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent align="start" alignOffset={-20}>
              When the bonding curve hits 100%, the <br /> token has reached a market cap of $70K{" "}
              <br /> and will be listed on Raydium.
            </TooltipContent>
          </Tooltip> */}
        </Label>
        <FormField
          name="kingOfTheMoonProgress"
          variant="SLIDER"
          rangeProps={{ className: "bg-[#FFE4D6] rounded-r-full" }}
          trackProps={{ className: "h-3" }}
          disabled
          // thumb={
          //   <Image
          //     alt="Cat NFT logo"
          //     src="/assets/logo-bordered.svg"
          //     width={24}
          //     height={24}
          //     className="h-4 w-4 object-contain"
          //   />
          // }
          thumbProps={{
            className: "w-6 h-6 border-0 flex items-center justify-center bg-[#FFE4D6] hidden",
          }}
          defaultValue={[0]}
          max={100}
          step={1}
        />
        <p className="mt-3 text-sm">Become the top monkey at a $30,000 market cap</p>
      </div>
    </TooltipProvider>
  )
}

export default CoinProgressbar
