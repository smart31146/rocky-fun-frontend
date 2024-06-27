import { cn } from "@/libs/utils/tailwind"
import { ComponentPropsWithoutRef } from "react"

export interface CoinNameProps extends ComponentPropsWithoutRef<"div"> {
  // logo: string
  name: string
}

const CoinName = ({ name, className, ...props }: CoinNameProps) => {
  return (
    <div {...props} className={cn("flex items-center gap-4", className)}>
      {/* <ImageWithFallback
        width={34}
        height={34}
        src={logo}
        className="h-[34px] w-[34px] rounded-full object-cover"
        alt="Logo"
        fallback="/assets/thumbnail_2.png"
      /> */}
      {name ? (
        <h2 className="rounded-md bg-muted p-1.5 px-1.5 text-sm font-normal leading-4 text-foreground-secondary">
          {name}
        </h2>
      ) : null}
    </div>
  )
}

export default CoinName
