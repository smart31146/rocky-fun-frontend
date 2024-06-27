"use client"

import TradingChartView from "@/components/TradingChartView"
import { cn } from "@/libs/utils/tailwind"

const CoinGraph = ({ className = "" }: Props) => {
  return (
    <div className={cn("h-[40%]", className)}>
      <TradingChartView />
    </div>
  )
}

interface Props {
  className?: string
}

export default CoinGraph
