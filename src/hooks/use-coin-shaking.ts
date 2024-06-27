import { useState } from "react"
import { useEventListener } from "./use-event"
import { COIN_SHAKING_EVENT } from "@/constants/global-event"

export interface UseCoinShakingVariables {}

export const useCoinShaking = (variables: UseCoinShakingVariables = {}) => {
  const [isCoinShaking, setIsCoinShaking] = useState(false)

  useEventListener(COIN_SHAKING_EVENT, () => {
    setIsCoinShaking(true)

    setTimeout(() => {
      setIsCoinShaking(false)
    }, 800)
  })

  return isCoinShaking
}
