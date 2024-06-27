"use client"

/* eslint-disable jsx-a11y/anchor-is-valid */
import WalletButton from "@/components/WalletButton"
import { useGeneralModal } from "@/components/customs/custom-modals/general-modal/hooks"
import { useModalOpenSelector } from "@/components/customs/custom-modals/general-modal/hooks/use-general-modal"
import InvisibleAt from "@/components/customs/invisibleAt"
import LogoNav from "@/components/customs/logo-nav"
import { Button } from "@/components/ui/button"
import { PAGE_ROUTES } from "@/constants/routes"
import { useCoinShaking } from "@/hooks/use-coin-shaking"
import { cn } from "@/libs/utils/tailwind"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LaunchCoinButton from "./launch-coin-button"
import MobileMenu from "./mobile-menu"

export interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const [isSecondCoinShaking, setIsSecondCoinShaking] = useState(false)
  const isShaking = useCoinShaking()
  const router = useRouter()
  const openModal = useGeneralModal(useModalOpenSelector)

  const shakingSlightly = () => {
    setIsSecondCoinShaking(true)

    setTimeout(() => {
      setIsSecondCoinShaking(false)
    }, 1400)
  }

  useEffect(() => {
    shakingSlightly()

    setInterval(() => {
      shakingSlightly()
    }, 15 * 1000)
  }, [])

  return (
    <header className="grid grid-cols-12 p-4">
      <div className="col-span-4 flex shrink-0 items-center gap-4">
        <MobileMenu className="md:hidden" />

        <Button
          variant="outline"
          className={cn(
            "line-clamp-1 hidden gap-2 px-2 text-white md:flex",
            isShaking ? "animate-shake" : "",
          )}
        >
          <Image src="/assets/avatar_2.png" width={24} height={24} alt="coin" />
          username created PEPE
          <Image src="/assets/halloween-coin.svg" width={24} height={24} alt="coin" />
          on 4/14/24
        </Button>
      </div>

      <div className="col-span-4 flex justify-center">
        <InvisibleAt path={PAGE_ROUTES.CREATE_COIN}>
          <LaunchCoinButton variant="default" size="lg" className="hidden md:flex" />
        </InvisibleAt>
        <LogoNav className="block md:hidden" />
      </div>

      <div className="col-span-4 flex items-center justify-end gap-3 lg:gap-8">
        {/* <Image
          width={125}
          height={37}
          alt="Logo"
          src="/assets/solana-logo.svg"
          className="hidden shrink-0 cursor-pointer lg:flex"
        /> */}
        {/* <Link href="https://t.me/rocketdotfun" target="_blank">
          <TelegramIcon className="shrink-0 cursor-pointer" />
        </Link> */}
        {/* <Link href="https://twitter.com/rocketdotfun" target="_blank">
          <XIcon className="shrink-0 cursor-pointer" />
        </Link> */}
        {/* <Link
          href="https://t.me/rocketfunsupport"
          className="hidden text-sm font-bold lg:inline-flex"
        >
          Support
        </Link> */}
        {/* <Link href="https://docs.rocket.fun" className="text-sm font-bold">
          <DocumentIcon className="h-6 w-6" />
        </Link> */}

        <WalletButton />
      </div>
    </header>
  )
}

export default Header
