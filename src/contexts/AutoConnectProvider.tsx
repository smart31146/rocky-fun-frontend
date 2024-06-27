"use client"

import { useLocalStorage } from "@solana/wallet-adapter-react"
import { createContext, FC, ReactNode, useContext, useMemo } from "react"

export interface AutoConnectContextState {
  autoConnect: boolean
  setAutoConnect(autoConnect: boolean): void
}

export const AutoConnectContext = createContext<AutoConnectContextState>(
  {} as AutoConnectContextState,
)

export function useAutoConnect(): AutoConnectContextState {
  return useContext(AutoConnectContext)
}

export const AutoConnectProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // const [autoConnect, setAutoConnect] = useLocalStorage('autoConnect', false);
  const [autoConnect, setAutoConnect] = useLocalStorage("autoConnect", true)

  return (
    <AutoConnectContext.Provider
      value={useMemo(() => ({ autoConnect, setAutoConnect }), [autoConnect, setAutoConnect])}
    >
      {children}
    </AutoConnectContext.Provider>
  )
}
