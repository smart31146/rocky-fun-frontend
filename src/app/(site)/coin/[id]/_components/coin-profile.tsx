"use client"

import { TelegramIcon } from "@/components/customs/icons/telegram-icon"
import { WebsiteIcon } from "@/components/customs/icons/website-icon"
import { XIcon } from "@/components/customs/icons/x-icon"
import ImageWithFallback from "@/components/ui/images/image-with-fallback"
import { PAGE_ROUTES } from "@/constants/routes"
import { cn } from "@/libs/utils/tailwind"
import { Coin } from "@/types/entities"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ComponentPropsWithoutRef } from "react"

export interface CoinProfileProps extends ComponentPropsWithoutRef<"div"> {
  hideContact?: boolean
  data: Coin
}

const CoinProfile = ({ className, hideContact = false, data }: CoinProfileProps) => {
  const params = useParams()
  return (
    <div className={cn(className, "flex flex-col gap-8")}>
      {data && (
        <Link
          href={PAGE_ROUTES.COIN_PROFILE.replace(":id", params.id as string)}
          className={cn("mx-auto flex items-start")}
        >
          <ImageWithFallback
            width={128}
            height={128}
            alt="Cat NFT"
            src={data?.image}
            fallback="/assets/thumbnail_2.png"
            className="rounded-full md:rounded-none"
          />

          <div className="p-4">
            <h2 className="mb-1 text-lg font-bold leading-5 text-foreground-secondary">
              {data?.name} | ${data?.ticker}
            </h2>

            <p className="mt-1 text-sm font-normal leading-[18px] text-foreground">
              {data?.description}
            </p>
          </div>
        </Link>
      )}

      {!hideContact ? (
        <div className="flex items-center gap-8">
          {data?.telegram && data?.telegram !== "undefined" ? (
            <Link href={`https://t.me/${data.telegram}`} target="_blank">
              <TelegramIcon className="cursor-pointer" />
            </Link>
          ) : null}
          {data?.twitter && data?.twitter !== "undefined" ? (
            <Link href={`https://twitter.com/${data.twitter}`} target="_blank">
              <XIcon className="cursor-pointer" />
            </Link>
          ) : null}
          {data?.website && data?.website !== "undefined" ? (
            <Link href={data.website} target="_blank">
              <WebsiteIcon className="cursor-pointer" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default CoinProfile
