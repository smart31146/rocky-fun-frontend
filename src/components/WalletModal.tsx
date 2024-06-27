/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-syntax */

"use client"

import { WalletReadyState } from "@solana/wallet-adapter-base"
import { Wallet, useWallet } from "@solana/wallet-adapter-react"
import { useMemo } from "react"
import { Dialog, DialogContent } from "./ui/dialog"

export default function WalletModal({ open, setOpen }: Props) {
  const { wallets, select } = useWallet()

  const [listedWallets, collapsedWallets] = useMemo(() => {
    const installed: Wallet[] = []
    const notInstalled: Wallet[] = []

    for (const wallet of wallets) {
      if (wallet.readyState === WalletReadyState.Installed) {
        installed.push(wallet)
      } else {
        notInstalled.push(wallet)
      }
    }

    return installed.length ? [installed, notInstalled] : [notInstalled, []]
  }, [wallets])

  return (
    <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
      <DialogContent className="rounded-[8px] border-[1px] border-[#ffffff] bg-[#1b1d28] p-[24px]">
        {/* <button
          type="button"
          onClick={() => setOpen(false)}
          className="wallet-adapter-modal-button-close"
        >
          <svg width="14" height="14">
            <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z" />
          </svg>
        </button> */}
        <div className="grid gap-4">
          <div className="text-center text-[17px] text-white">Connect your wallet</div>
          {wallets.map((wallet, index) => (
            <div className="flex items-center justify-center" key={index}>
              <button
                type="button"
                onClick={() => {
                  // If wallet not detected, open adapter url if it exists
                  if (wallet.readyState === "NotDetected") {
                    if (wallet.adapter?.url) {
                      window.open(wallet.adapter?.url, "_blank")
                    }
                  }

                  select(wallet.adapter.name)
                }}
                className="relative flex h-10 w-[180px] items-center justify-center whitespace-nowrap rounded-md bg-[#5c5f66] px-4 py-2 text-sm font-medium text-white ring-offset-white transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:ring-offset-slate-950 dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300"
              >
                <img
                  alt="icon"
                  width="24"
                  height="24"
                  className="absolute left-2"
                  src={wallet.adapter.icon}
                />
                {wallet.adapter.name}
              </button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
}
