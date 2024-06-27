import ImageWithFallback from "@/components/ui/images/image-with-fallback"
import { cn } from "@/libs/utils/tailwind"
import React, { ComponentPropsWithoutRef } from "react"

export interface CoinDetailsByProps extends ComponentPropsWithoutRef<"div"> {
  src: string
  by: string
}

const CoinDetailsBy = ({ by, src, className, ...props }: CoinDetailsByProps) => {
  return (
    <div
      {...props}
      className={cn(
        "flex items-center gap-1.5 text-sm font-normal leading-4 text-foreground-secondary",
        className,
      )}
    >
      Created by{" "}
      <ImageWithFallback
        alt="Skull"
        width={18}
        height={18}
        src={src}
        fallback="/assets/avatar_2.png"
      />
      <span className="rounded border border-white px-[3px] py-[2px]">{by}</span>
    </div>
  )
}

export default CoinDetailsBy
