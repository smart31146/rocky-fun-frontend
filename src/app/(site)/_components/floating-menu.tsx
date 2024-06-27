"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { ChartIcon } from "@/components/customs/icons/chart-icon"
import { HomeIcon } from "@/components/customs/icons/home-icon"
import { InfoIcon } from "@/components/customs/icons/info-icon"
import { MoneyIcon } from "@/components/customs/icons/money-icon"
import { TxsIcon } from "@/components/customs/icons/txs-icon"
import { PAGE_ROUTES } from "@/constants/routes"
import { cn } from "@/libs/utils/tailwind"
import { useMemo } from "react"

export interface FloatingMenuProps {}

const FloatingMenu = (props: FloatingMenuProps) => {
  const params = useParams()
  const pathname = usePathname()

  const items = useMemo(() => {
    return [
      {
        label: "Home",
        href: PAGE_ROUTES.HOME,
        icon: HomeIcon,
      },
      {
        label: "Info",
        href: PAGE_ROUTES.COIN_INFO.replace(":id", String(params.id)),
        icon: InfoIcon,
      },
      {
        label: "Buy/Sell",
        href: PAGE_ROUTES.COIN_BUY_SELL.replace(":id", String(params.id)),
        icon: MoneyIcon,
      },
      {
        label: "Chart",
        href: PAGE_ROUTES.COIN_CHART.replace(":id", String(params.id)),
        icon: ChartIcon,
      },
      {
        label: "Txs",
        href: PAGE_ROUTES.COIN_TXS.replace(":id", String(params.id)),
        icon: TxsIcon,
      },
    ]
  }, [params, pathname])

  const shouldDisabledWhen = [PAGE_ROUTES.HOME, PAGE_ROUTES.CREATE_COIN].includes(pathname as any)

  if (shouldDisabledWhen) return null

  return (
    <div
      className={cn(
        "sticky bottom-0 left-0 min-h-16 rounded-t-2xl bg-card py-2",
        "flex items-center justify-evenly gap-6 px-3 md:hidden",
      )}
    >
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-1.5 text-sm",
              isActive ? "text-primary" : null,
            )}
          >
            <item.icon className="h-5 w-5 shrink-0 text-current" />
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}

export default FloatingMenu
