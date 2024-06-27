"use client"

import { useSuspenseCoinDetails } from "@/hooks/use-coin-details"
import { getRandomInt, randomText } from "@utils/random"
import dayjs from "dayjs"
import { ReactNode, useEffect, useMemo, useState } from "react"
import { CoinContext } from "./use-coin-context"
import useCoinStore from "@/stores/useCoinStore"

export interface CoinProviderProps {
  id: number | string
  children: ReactNode
}

const CoinProvider = ({ id, children }: CoinProviderProps) => {
  const coinDetails = useSuspenseCoinDetails({ variables: { id } })
  const [coinChainData, setCoinChainData] = useState()

  const updateEvent = useCoinStore((state) => state.updateEvent)

  const coin = coinDetails?.data?.data ?? null

  const fakePushEvent = () => {
    const types = ["buy", "sell"]

    updateEvent({
      src: "/assets/avatar_2.png",
      user: { name: `${randomText(5)}`, color: "#AF70FF" },
      type: types[getRandomInt(0, 1)],
      sol: getRandomInt(167, 176),
      boden: `${getRandomInt(1, 1000)}m`,
      date: dayjs().add(10, "minutes").toISOString(),
      timestamp: 1522108800,
      txs: randomText(5),
    })
  }

  const pushInInterval = () => {
    // Push in every 3 seconds
    setInterval(() => {
      fakePushEvent()
    }, 3000)
  }

  // TODO:  Remove this in real implement
  useEffect(() => {
    pushInInterval()
  }, [])

  const values = useMemo(() => ({ coin, coinChainData, setCoinChainData }), [coin, coinChainData])
  // @ts-ignore
  return <CoinContext.Provider value={values}>{children}</CoinContext.Provider>
}

export default CoinProvider
