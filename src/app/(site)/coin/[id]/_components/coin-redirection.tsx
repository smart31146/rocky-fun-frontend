import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { useMedia } from "react-use"
import { PAGE_ROUTES } from "@/constants/routes"

export interface CoinRedirectionProps {}

const CoinRedirection = (props: CoinRedirectionProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()
  const isDesktop = useMedia("(min-width: 768px)")
  const cache = useRef<string>(isDesktop ? "desktop" : "mobile")

  const redirectToBuySellScreenMobile = () => {
    cache.current = "mobile"
    router.push(PAGE_ROUTES.COIN_BUY_SELL.replace(":id", params.id as string))
  }

  const redirectToCoinDetailsScreenDesktop = () => {
    cache.current = "desktop"
    router.push(PAGE_ROUTES.COIN.replace(":id", params.id as string))
  }

  useEffect(() => {
    if (PAGE_ROUTES.COIN_PROFILE.replace(":id", params.id as string) === pathname) return
    if (PAGE_ROUTES.COIN.replace(":id", params.id as string) === pathname && !isDesktop) {
      redirectToBuySellScreenMobile()
    }

    if (isDesktop && cache.current !== "desktop") {
      redirectToCoinDetailsScreenDesktop()
    } else if (!isDesktop && cache.current !== "mobile") {
      redirectToBuySellScreenMobile()
    }
  }, [isDesktop])

  return null
}

export default CoinRedirection
