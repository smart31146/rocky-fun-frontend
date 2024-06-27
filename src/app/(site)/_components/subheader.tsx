"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCoinShaking } from "@/hooks/use-coin-shaking"
import { cn } from "@/libs/utils/tailwind"

export interface SubHeaderProps {}

const SubHeader = (props: SubHeaderProps) => {
  const isShaking = useCoinShaking()

  return (
    <header className="flex flex-wrap items-center justify-center gap-4 p-4 pt-1 md:hidden">
      <div className="flex items-center gap-4 xl:hidden">
        <Button
          variant="outline"
          className={cn("gap-2 px-2 text-white", isShaking ? "animate-shake" : "")}
        >
          <Image src="/assets/avatar_2.png" width={24} height={24} alt="coin" />
          username created PEPE
          <Image src="/assets/halloween-coin.svg" width={24} height={24} alt="coin" />
          on 4/14/24
        </Button>
      </div>

      {/* <Image
        width={125}
        height={37}
        alt="Logo"
        src="/assets/solana-logo.svg"
        className="shrink-0 cursor-pointer"
      /> */}
    </header>
  )
}

export default SubHeader
