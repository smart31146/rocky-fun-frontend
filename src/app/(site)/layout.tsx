"use client"

import { COIN_SHAKING_EVENT } from "@/constants/global-event"
import { useEvent } from "@/hooks/use-event"
import { LayoutProps } from "@/types/utilities"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect } from "react"
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore"
import WelcomeDialog from "./_components/welcome-dialog"

export interface SiteLayoutProps
  extends LayoutProps<"header" | "subheader" | "footer" | "floatingmenu" | "sidebar"> {}

const SiteLayout = ({
  header,
  sidebar,
  subheader,
  footer,
  floatingmenu,
  children,
}: SiteLayoutProps) => {
  const wallet = useWallet()
  const { connection } = useConnection()

  const { dispatch } = useEvent(COIN_SHAKING_EVENT)

  const balance = useUserSOLBalanceStore((s) => s?.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  useEffect(() => {
    dispatch({})

    setInterval(() => {
      dispatch({})
    }, 10 * 1000)
  }, [])

  return (
    <>
      {sidebar}

      <section className="min-h-[70vh] md:ml-[244px]">
        {header}
        {subheader}
        {children}
      </section>

      {footer}
      {floatingmenu}

      <WelcomeDialog />
    </>
  )
}

export default SiteLayout
