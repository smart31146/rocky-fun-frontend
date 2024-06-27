import { PAGE_ROUTES } from "@/constants/routes"
import { cn } from "@/libs/utils/tailwind"
import Link from "next/link"
import CoinDetails from "./coin-details"
import CoinDetailsBy from "./coin-details-by"
import CoinName from "./coin-name"

const CoinHeader = ({ className, data }: Props) => {
  return (
    <div className={cn("flex justify-between", className)}>
      {data && (
        <Link
          href={PAGE_ROUTES.COIN_PROFILE.replace(":id", data?.createdBy.id.toString())}
          className="flex w-full items-center gap-1"
        >
          <CoinName name={data?.name || ""} />
          <CoinDetails
            ticker={data?.ticker}
            marketCap={data?.marketCapSol}
            // volume={data.volume ?? 120.3}
            virtualLiquidity={5079}
          />

          <CoinDetailsBy className="ml-auto" by={data?.createdBy?.username} src={data?.image} />
        </Link>
      )}
    </div>
  )
}

interface Props {
  className: string
  data: any
}

export default CoinHeader
