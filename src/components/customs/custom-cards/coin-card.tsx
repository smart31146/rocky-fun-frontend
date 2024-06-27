"use client"

import { useRouter } from "next/navigation"
import ImageWithFallback from "@/components/ui/images/image-with-fallback"
import { cn } from "@/libs/utils/tailwind"
import { convertMarketCapNumber } from "@utils/convertion"

import { PAGE_ROUTES } from "@/constants/routes"

export const CoinCard = ({
  className = "",
  hoverable,
  data,
  highlightName = false,
  hideDescription,
}: Props) => {
  const router = useRouter()
  const { id, name, description, createdBy, marketCapSol, comments = [], ticker, image } = data

  const onNavigate = () => {
    router.push(PAGE_ROUTES.COIN.replace(":id", id), { scroll: true })
  }

  return (
    <div
      onClick={onNavigate}
      className={cn(
        "mx-auto flex cursor-pointer items-start border border-transparent",
        hoverable ? "hover:border-primary" : "",
        className,
      )}
    >
      <ImageWithFallback
        width={128}
        height={128}
        src={image || ""}
        alt="Thumbnail"
        fallback="/assets/thumbnail_2.png"
      />

      <div className={cn("flex flex-col gap-1", description ? "px-4" : "p-4")}>
        <div className="flex items-center gap-1.5 text-sm font-normal leading-4 text-foreground-secondary">
          Created by{" "}
          <span className="grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-[#B88576]">
            <ImageWithFallback
              alt="Skull"
              width={17}
              height={17}
              src={createdBy?.avatar || ""}
              fallback="/assets/avatar_2.png"
            />
          </span>
          <span className="createdBy">{createdBy?.username}</span>
        </div>
        <p className="text-sm font-normal leading-4 !text-[#86efac]">
          Market cap: {convertMarketCapNumber(marketCapSol)}
        </p>
        <p className="text-sm font-normal leading-4 text-secondary">replies: {comments?.length}</p>

        <h2
          className={cn(
            "text-sm font-medium leading-5 text-secondary",
            highlightName ? "text-white" : null,
          )}
        >
          {name} {ticker ? `(ticker: ${ticker})` : ""}
        </h2>

        {!hideDescription && description ? (
          <p className="text-sm font-normal leading-[18px] text-secondary">{description}</p>
        ) : null}
      </div>
    </div>
  )
}

interface Props {
  className?: string
  hoverable?: boolean
  data: any
  hideDescription?: boolean
  highlightName?: boolean
}
