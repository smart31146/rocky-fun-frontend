"use client"

import { useLocalStorage } from "@solana/wallet-adapter-react"
import { createContext, FC, ReactNode, useContext, useMemo } from "react"

export interface NetworkConfigurationState {
  networkConfiguration: string
  setNetworkConfiguration(networkConfiguration: string): void
}

export const NetworkConfigurationContext = createContext<NetworkConfigurationState>(
  {} as NetworkConfigurationState,
)

export function useNetworkConfiguration(): NetworkConfigurationState {
  return useContext(NetworkConfigurationContext)
}

export const NetworkConfigurationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [networkConfiguration, setNetworkConfiguration] = useLocalStorage("network", "devnet")

  return (
    <NetworkConfigurationContext.Provider
      value={useMemo(
        () => ({
          networkConfiguration,
          setNetworkConfiguration,
        }),
        [networkConfiguration, setNetworkConfiguration],
      )}
    >
      {children}
    </NetworkConfigurationContext.Provider>
  )
}
