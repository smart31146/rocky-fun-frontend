import React from "react"
import CoinGraphTrades from "../_components/coin-graph-trades"

export interface CoinTxsProps {}

const CoinTxs = (props: CoinTxsProps) => (
  <div className="container">
    <CoinGraphTrades />
  </div>
)

export default CoinTxs
