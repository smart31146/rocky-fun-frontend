"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { ReactNode, useEffect } from "react"

import { useWalletModal } from "@contexts/WalletModalProvider"

import ConfirmWalletModal from "@components/ConfirmWalletModal"
import WalletDetailModal from "@components/WalletDetailModal"
import { Button } from "./ui/button"

import ImageWithFallback from "@components/ui/images/image-with-fallback"
import { useAuth } from "@contexts/AuthProvider"

export interface WalletButtonProps {
  children?: (props: any) => ReactNode
}

export default function WalletButton({ children }: WalletButtonProps) {
  const {
    user,
    status,
    showWalletDetailModal,
    showConfirmWalletModal,
    cancelSendMessage,
    onSignMessage,
    setShowWalletDetailModal,
    setShowConfirmWalletModal,
  } = useAuth()
  const { connected, publicKey, connecting, connect, signMessage, signIn } = useWallet()
  const { setVisible } = useWalletModal()

  useEffect(() => {
    // When connecting wallet, hide wallet list modal
    if (connecting) {
      setVisible(false)
    }
  }, [connecting])

  return (
    <>
      {connected && status === "authenticated" && (
        <div
          role="presentation"
          className="grid justify-items-end text-sm text-white"
          onClick={() => {
            setShowWalletDetailModal(true)
          }}
        >
          <div className="flex cursor-pointer items-center gap-1 rounded border border-slate-500 px-1 hover:bg-slate-600">
            <span className="hidden sm:block"> </span>
            <div>
              <ImageWithFallback
                alt="Skull"
                width={18}
                height={18}
                src={user?.avatar || "/assets/avatar_2.png"}
                fallback="/assets/avatar_2.png"
              />
            </div>
            <div>{user?.username}</div>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      )}

      {!connected || status !== "authenticated" ? (
        <Button
          size="lg"
          variant="default"
          className="max-w-[122px]"
          onClick={() => {
            setVisible(true)
            // openModal("PleaseConnectWallet", { title: "Your Profile", type: "modal" })
          }}
        >
          connect
        </Button>
      ) : null}

      <WalletDetailModal open={showWalletDetailModal} setOpen={setShowWalletDetailModal} />
      <ConfirmWalletModal
        open={showConfirmWalletModal}
        setOpen={setShowConfirmWalletModal}
        cancelSendMessage={cancelSendMessage}
        onSendMessage={onSignMessage}
      />

      {children ? children({ connected }) : null}
    </>
  )
}
