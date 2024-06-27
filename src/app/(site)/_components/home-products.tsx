"use client"

import { useWatch } from "react-hook-form"
import { CoinCard } from "@/components/customs/custom-cards/coin-card"
import { useCoinShaking } from "@/hooks/use-coin-shaking"
import { cn } from "@/libs/utils/tailwind"
import { useHomeProductsFormContext } from "./use-home-products-form-context"

const HomeProducts = ({ data = [] }: Props) => {
  const isShaking = useCoinShaking()
  const methods = useHomeProductsFormContext()

  const isEnableAnimations = useWatch({ control: methods.control, name: "enableAnimations" })

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {data.map((coin: any, index: number) => {
        return (
          <div key={index}>
            <CoinCard
              className={cn(
                "bg-card p-4",
                index === 0 && isShaking && isEnableAnimations ? "animate-shake" : "",
              )}
              hoverable
              data={coin}
            />
          </div>
        )
      })}
    </div>
  )
}

interface Props {
  data: any[]
}

export default HomeProducts
