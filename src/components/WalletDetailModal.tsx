"use client"

import { useWalletModal } from "@contexts/WalletModalProvider"
import { useWallet } from "@solana/wallet-adapter-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogOverlay } from "./ui/dialog"
import { useAuth } from "@contexts/AuthProvider"
import { EditProfileFormSuccessValues } from "@components/customs/custom-modals/general-modal/components/edit-profile-form"
import { useGeneralModal } from "@components/customs/custom-modals/general-modal/hooks"
import { useModalOpenSelector } from "@components/customs/custom-modals/general-modal/hooks/use-general-modal"

import { editProfile } from "@/api/profile"

export default function WalletDetailModal({ open, setOpen }: Props) {
  const openModal = useGeneralModal(useModalOpenSelector)
  const { connected, publicKey, disconnect } = useWallet()
  const { user, setUser, logout } = useAuth()
  const { setVisible } = useWalletModal()

  const updateProfile = async (data: any) => {
    const payload = new FormData()
    payload.append("username", data.username)
    if (data.photo) {
      payload.append("avatar", data.photo)
    }
    return await editProfile(payload)
  }

  const handleEditProfile = () => {
    openModal<EditProfileFormSuccessValues>("EditProfile", {
      title: "Edit profile",
      type: "modal",
      actions: [],
      defaultValues: {
        photo: user?.avatar || "/assets/avatar_2.png",
        username: user.username,
      },
      async onSubmit(submitData, make) {
        const { data, error, errors } = await updateProfile(submitData)
        if (data) {
          setUser({ ...user, ...data })
        }

        return { error, errors }
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
      <DialogContent
        className="rounded-[8px] border-[1px] border-[#ffffff] bg-[#1F1F1F] p-[24px]"
        closable={false}
      >
        <div className={"text-center text-[24px] font-semibold text-white"}>Edit profile</div>
        <div className="grid justify-center gap-4">
          <div className="flex items-start gap-4">
            <div>
              <Image
                width={34}
                height={34}
                alt="pepe"
                src={user?.avatar || "/assets/avatar_2.png"}
                className="h-[58px] w-[64px] rounded-[6px] border border-white object-contain px-[11px] py-[6px]"
              />
            </div>
            <div className="grid justify-items-start gap-1 text-white">
              <div>@{user?.username}</div>
              <div />
              <div
                className="flex flex w-[148px] cursor-pointer items-center justify-center gap-2 rounded bg-[#3A3838] px-[7px] py-[7px]"
                onClick={handleEditProfile}
              >
                <span className={"mr-[4px]"}>✏️</span>
                <span>Edit Profile</span>
              </div>
            </div>
          </div>
          <div className="w-full rounded-[6px] border border-white p-2 px-[23px] py-[18px] text-xs text-white sm:text-sm">
            {user?.wallet}
          </div>
          <button
            type="button"
            onClick={() => {
              disconnect()
              setOpen(false)
              setVisible(true)
              logout()
            }}
            className="mx-[auto] w-[270px] rounded-[12px] border border-[#464443] px-[15px] py-[10px] text-center font-semibold"
          >
            Disconnect wallet
          </button>
          <div
            role="presentation"
            className="w-fit cursor-pointer justify-self-center text-slate-50 underline hover:font-bold hover:text-slate-50"
            onClick={() => {
              setOpen(false)
            }}
          >
            Close
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
}
