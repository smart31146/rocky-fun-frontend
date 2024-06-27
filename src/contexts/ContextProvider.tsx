/* eslint-disable no-console */

"use client"

import { FC, ReactNode, useCallback, useMemo } from "react"

import { WalletError, WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import {
  WalletConnectWalletAdapter,
  UnsafeBurnerWalletAdapter,
  LedgerWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets"

import { WalletModalProvider } from "@contexts/WalletModalProvider"
import { notify } from "@utils/notifications"
import { AutoConnectProvider, useAutoConnect } from "./AutoConnectProvider"
import {
  NetworkConfigurationProvider,
  useNetworkConfiguration,
} from "./NetworkConfigurationProvider"

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { autoConnect } = useAutoConnect()
  const { networkConfiguration } = useNetworkConfiguration()
  const network: WalletAdapterNetwork.Mainnet | WalletAdapterNetwork.Devnet = process.env
    .NEXT_PUBLIC_APP_NETWORK as WalletAdapterNetwork.Mainnet | WalletAdapterNetwork.Devnet
  const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST

  // Initialize wallet with specific wallets
  const wallets = useMemo(
    () => [
      // new UnsafeBurnerWalletAdapter(),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new WalletConnectWalletAdapter({
        network,
        options: {
          relayUrl: "wss://relay.walletconnect.com",
          // example WC app project ID
          projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_WALLET_PROJECT_ID,
          metadata: {
            name: "Wallet App",
            description: "Wallet App",
            url: "https://github.com/solana-labs/wallet-adapter",
            icons: ["https://avatars.githubusercontent.com/u/35608259?s=200"],
          },
        },
      }),
    ],
    [network],
  )

  const onError = useCallback((error: WalletError) => {
    notify({
      type: "error",
      message: error.message ? `${error.name}: ${error.message}` : error.name,
    })
    console.error(error)
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint as string}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <NetworkConfigurationProvider>
    <AutoConnectProvider>
      <WalletContextProvider>{children}</WalletContextProvider>
    </AutoConnectProvider>
  </NetworkConfigurationProvider>
)
