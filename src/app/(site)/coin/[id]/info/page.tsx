"use client"

import CoinHolderDistribution from "../_components/coin-holder-distribution"
import CoinProfile from "../_components/coin-profile"
import CoinProgressbar from "../_components/coin-progressbar"
import { useCoinContext } from "../_components/use-coin-context"

export interface CoinInfoProps {}

const CoinInfo = (props: CoinInfoProps) => {
  const { coin } = useCoinContext()

  return (
    <div className="container flex flex-col gap-8">
      <CoinProfile data={coin} />
      <CoinProgressbar />
      <CoinHolderDistribution />
    </div>
  )
}

export default CoinInfo
