import dynamic from "next/dynamic"
import { useState } from "react"

import { ResolutionString } from "@public/static/charting_library/charting_library"
import { useCoinContext } from "@/app/(site)/coin/[id]/_components/use-coin-context"

const TVChartContainer = dynamic(
  () => import("@components/TradingChart").then((mod) => mod.TVChartContainer),
  {
    ssr: false,
  },
)

export default function TradingChartView() {
  const { coin: detail } = useCoinContext()
  const [settings, setSettings] = useState<any>({
    symbol: detail?.ticker,
    interval: "5" as ResolutionString,
    library_path: "/static/charting_library/",
    locale: "en",
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    fullscreen: false,
    autosize: true,
  })

  return (
    <>
      <div className="mt-1 h-[calc(100%-10px)]">
        <TVChartContainer {...settings} />
      </div>
    </>
  )
}

interface User {
  avatar: string
  publicKey: string
}

interface Props {
  symbol: string
  datafeed: string
  name: string
  ticker: string
  marketCap: number
  virtualLiquidity: number
  createdBy: User
}
