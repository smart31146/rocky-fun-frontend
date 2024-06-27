"use client"

import { PAGE_ROUTES } from "@/constants/routes"
import { useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/navigation"
import { ComponentPropsWithoutRef } from "react"
import { useGeneralModal } from "./customs/custom-modals/general-modal/hooks"
import { useModalOpenSelector } from "./customs/custom-modals/general-modal/hooks/use-general-modal"

export interface UserProfileButtonProps extends ComponentPropsWithoutRef<"button"> {}

const UserProfileButton = ({ children, ...props }: UserProfileButtonProps) => {
  const { connected } = useWallet()
  const router = useRouter()
  const openModal = useGeneralModal(useModalOpenSelector)

  return (
    <button
      {...props}
      type="button"
      onClick={(event) => {
        if (!connected) {
          openModal("PleaseConnectWallet", {
            type: "modal",
            title: "",
            actions: [],
            generalProps: {
              className: "border-dashed border-[#FD7310]",
            },
          })

          return
        }
        router.push(PAGE_ROUTES.PROFILE)
      }}
    >
      {children}
    </button>
  )
}

export default UserProfileButton
