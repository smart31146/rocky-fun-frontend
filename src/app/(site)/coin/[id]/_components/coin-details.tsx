import { formatNumber } from "@/libs/utils/number"
import { cn } from "@/libs/utils/tailwind"

export interface CoinDetailssProps {
  marketCap: number
  virtualLiquidity: number
  // volume?: number
  className?: string
  ticker?: string
}

const CoinDetails = ({
  marketCap,
  virtualLiquidity,
  // volume,
  className,
  ticker,
}: CoinDetailssProps) => (
  <div className={cn("flex flex-row flex-wrap gap-1", className)}>
    {ticker ? (
      <p className="rounded-md bg-muted p-1.5 px-1.5 text-sm font-normal leading-4 text-foreground-secondary">
        Ticker: <span className="font-medium">{ticker}</span>
      </p>
    ) : null}

    <p className="rounded-md bg-muted p-1.5 px-1.5 text-sm font-normal leading-4 text-[#85EFAC]">
      Market cap: <span className="font-semibold">${formatNumber(marketCap)}</span>
    </p>

    <p className="rounded-md bg-muted p-1.5 px-1.5 text-sm font-normal leading-4 text-[#85EFAC]">
      Virtual liquidity: <span className="font-semibold">${formatNumber(virtualLiquidity)}</span>
    </p>

    {/* {volume ? (
      <p className="rounded-md bg-muted p-1.5 px-1.5 text-sm font-normal leading-4 text-foreground-secondary">
        Volume: <span className="font-medium">{formatNumber(volume)} SOL</span>
      </p>
    ) : null} */}
  </div>
)

export default CoinDetails
