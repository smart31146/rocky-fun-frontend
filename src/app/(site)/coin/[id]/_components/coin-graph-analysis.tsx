import { Button } from "@/components/ui/button"
import { cn } from "@/libs/utils/tailwind"
import { Coin } from "@/types/entities"
import { useState } from "react"
import CoinGraphChats from "./coin-graph-chats"
import CoinGraphTrades from "./coin-graph-trades"

const coinGraphTabs = [
  {
    label: "Chat",
    value: "chat",
  },
  {
    label: "Trades",
    value: "trade",
  },
] as const

const CoinGraphAnalysis = ({ className, data }: Props) => {
  const [activeTab, setActiveTab] = useState<"chat" | "trade">(coinGraphTabs[0].value)

  return (
    <div className={cn(className)}>
      <div className="mb-6 flex items-center gap-1.5">
        {coinGraphTabs.map(({ label, value }) => (
          <Button
            key={value}
            size="sm"
            type="button"
            variant={activeTab === value ? "default" : "muted"}
            className={cn(
              "min-w-[90px] rounded-md border border-transparent text-sm font-medium",
              // activeTab === value ? "border-white !bg-[#86817F]" : null,
            )}
            onClick={() => setActiveTab(value)}
          >
            {label}
          </Button>
        ))}
      </div>

      {activeTab === "chat" ? (
        <CoinGraphChats coinId={data?.id} />
      ) : activeTab === "trade" ? (
        <CoinGraphTrades />
      ) : null}
    </div>
  )
}

interface Props {
  data: Coin
  className?: string
}

export default CoinGraphAnalysis
