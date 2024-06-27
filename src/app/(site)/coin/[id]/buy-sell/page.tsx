"use client"

import { Button } from "@/components/ui/button"
import CoinGraphChats from "../_components/coin-graph-chats"
import CoinPlaceTrade from "../_components/coin-place-trade"

export interface CoinBuySellProps {}

const CoinBuySell = (props: CoinBuySellProps) => (
  <div className="container mt-4">
    <p className="mb-1 text-sm text-[#86efac]">Market Cap: $1,005.00</p>
    <CoinPlaceTrade className="mb-2" />

    <Button
      type="button"
      size="sm"
      className="mb-2 rounded-md border border-transparent text-sm font-medium"
    >
      Chat
    </Button>

    <CoinGraphChats />
  </div>
)

export default CoinBuySell
