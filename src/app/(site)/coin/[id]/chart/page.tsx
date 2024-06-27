"use client"

// import CoinDetails from "../_components/coin-details"
// import CoinDetailsBy from "../_components/coin-details-by"
import CoinGraph from "../_components/coin-graph"
import { useCoinContext } from "../_components/use-coin-context"

export interface CoinChartProps {}

const CoinChart = (props: CoinChartProps) => {
  const { coin } = useCoinContext()
  return (
    <div className="container">
      {/* <CoinDetails
        marketCap={coin?.marketCapSol}
        virtualLiquidity={5079}
        className="flex-nowrap [&>p>span]:w-full [&>p]:flex [&>p]:h-[50px] [&>p]:w-full [&>p]:flex-wrap [&>p]:items-center [&>p]:justify-start"
      /> */}

      {/* <CoinDetailsBy className="my-2 ml-auto" by={coin?.createdBy?.username} src={coin?.image} /> */}
      <CoinGraph className="mt-5 h-[500px]" />
    </div>
  )
}

export default CoinChart
