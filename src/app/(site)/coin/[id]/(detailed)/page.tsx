"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/libs/utils/tailwind"
import { ArrowLeft, Loader2 } from "lucide-react"
import dynamic from "next/dynamic"
import CoinGraphAnalysis from "../_components/coin-graph-analysis"
import CoinGraphGroup from "../_components/coin-graph-group"
import CoinHeader from "../_components/coin-header"
import CoinHolderDistribution from "../_components/coin-holder-distribution"
import CoinPlaceTrade from "../_components/coin-place-trade"
import CoinProfile from "../_components/coin-profile"

import { Button } from "@/components/ui/button"
import { PAGE_ROUTES } from "@/constants/routes"
import Link from "next/link"
import CoinProgressbar from "../_components/coin-progressbar"
import { useCoinContext } from "../_components/use-coin-context"

const CoinGraph = dynamic(() => import("../_components/coin-graph"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[300px] flex-col gap-2">
      <Skeleton className="h-[36px] w-[150px]" />
      <Skeleton className="h-[36px] w-[300px]" />
      <Skeleton className="h-[36px]" />
      <Skeleton className="h-[36px]" />
      <Skeleton className="h-[36px]" />
      <Skeleton className="h-[36px]" />
      <Skeleton className="h-[36px]" />
      <Skeleton className="h-[36px]" />
    </div>
  ),
})

export interface CoinProps {}

const Coin = (props: CoinProps) => {
  const { coin: detail } = useCoinContext()

  return (
    <>
      <div className={cn("container ml-6 mt-6 hidden md:block md:max-w-[90%] md:pt-5")}>
        <Button
          asChild
          variant="link"
          className="text-p mb-7 p-0 text-[15px] text-primary hover:no-underline"
        >
          <Link href={PAGE_ROUTES.HOME}>
            <ArrowLeft className="mr-2 h-[18px] w-[18px]" />
            Back
          </Link>
        </Button>

        <div className="grid grid-cols-12 gap-11">
          <CoinGraphGroup className="col-span-8 flex flex-col gap-0">
            <CoinHeader className="mb-2" data={detail} />
            <CoinGraph />
            <CoinGraphAnalysis data={detail} />
          </CoinGraphGroup>
          <div className="col-span-4 flex flex-col gap-4">
            <CoinPlaceTrade data={detail} />
            <CoinProfile data={detail} />
            <CoinProgressbar />
            <CoinHolderDistribution className="mt-2" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center md:hidden">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    </>
  )
}

export default Coin
