/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/anchor-is-valid */

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { EditProfileFormSuccessValues } from "@/components/customs/custom-modals/general-modal/components/edit-profile-form"
import { useGeneralModal } from "@/components/customs/custom-modals/general-modal/hooks"
import { useModalOpenSelector } from "@/components/customs/custom-modals/general-modal/hooks/use-general-modal"
import { Button } from "@/components/ui/button"
import Form, { FormField } from "@/components/ui/form"
import { Pagination } from "@/components/ui/pagination-z"
import { cn } from "@/libs/utils/tailwind"
import ProfileCoinBoughts from "./_components/profile-coin-boughts"
import CoinCreated from "./_components/profile-coin-created"
import ProfileFollowers from "./_components/profile-followers"
import ProfileFollowing from "./_components/profile-followings"
import { WalletFormState, walletFormSchema } from "./_schema"
import { useAuth } from "@contexts/AuthProvider"
import { editProfile } from "@/api/profile"

const coinGraphTabs = [
  {
    label: "Coins Bought",
    value: "coins_bought",
  },
  {
    label: "Coins Created",
    value: "coins_created",
  },
  {
    label: "Followers",
    value: "followers",
  },
  {
    label: "Following",
    value: "following",
  },
] as const

const Profile = () => {
  const { user, setUser } = useAuth()
  const openModal = useGeneralModal(useModalOpenSelector)

  const methods = useForm<WalletFormState>({
    resolver: zodResolver(walletFormSchema),
    defaultValues: {
      wallet: user?.wallet || "",
    },
  })

  const [activeTab, setActiveTab] = useState<
    "coins_bought" | "coins_created" | "followers" | "following"
  >(coinGraphTabs[0].value)

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

  const renderTabContents = useMemo(() => {
    if (!user) return null

    switch (activeTab) {
      case "coins_bought":
        return <ProfileCoinBoughts />
      case "followers":
        return <ProfileFollowers />
      case "following":
        return <ProfileFollowing />
      case "coins_created":
        return <CoinCreated data={user?.coins || []} />
      default:
        return null
    }
  }, [activeTab])

  return (
    <Form methods={methods} className="mx-auto mt-2 max-w-[430px] md:mt-8">
      <h2 className="mb-2 text-center text-base font-semibold text-white md:text-lg">
        Your Profile
      </h2>
      {user && (
        <div
          className={cn(
            "relative mb-6 flex items-center gap-4 p-3.5",
            "overflow-hidden rounded-md border border-[#3B3939] bg-[#2F2E2E]",
          )}
        >
          <Image
            width={34}
            height={34}
            className="h-[34px] w-[34px]"
            alt="Avatar"
            src={user?.avatar || "/assets/avatar_2.png"}
          />

          <div>
            <h2 className="text-[15px] font-semibold leading-5">@{user?.username}</h2>
            <p className="text-[11px] font-normal">0 Followers</p>
          </div>

          <Button
            variant="muted"
            size="sm"
            type="button"
            className="ml-auto rounded-md bg-[#3A3838] text-sm font-normal leading-4"
            onClick={handleEditProfile}
          >
            ✏️ Edit Profile
          </Button>

          <div
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 h-[76px] w-[136px]",
              "-translate-x-1/2 -translate-y-1/2 transform rounded-full",
            )}
            style={{ background: "rgba(99, 47, 10, 0.22)", filter: "blur(20px)" }}
          />
        </div>
      )}

      {user && (
        <div className="relative my-6 overflow-hidden rounded-md border border-[#3B3939] bg-[#2F2E2E] p-3.5">
          <div className="space-y-[10px]">
            <label className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Your Connected Wallet:
            </label>

            <div className="w-full rounded-[6px] border border-white p-2 px-[23px] py-[18px] text-xs text-white sm:text-sm">
              {user?.wallet}
            </div>
          </div>

          <div className="mb-3 mt-2 text-right">
            <Link href="#" className="text-right text-sm underline">
              View on Solscan 👀
            </Link>
          </div>

          <div className="flex justify-center gap-2">
            {coinGraphTabs.map(({ label, value }) => (
              <Button
                key={value}
                size="sm"
                type="button"
                variant="muted"
                className={cn(
                  "min-w-[90px] rounded-md border border-transparent bg-[#3A3838] px-2 text-sm font-medium",
                  activeTab === value ? "!bg-primary-radial-gradient" : null,
                )}
                onClick={() => setActiveTab(value)}
              >
                {label}
              </Button>
            ))}
          </div>

          <div
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 h-[159px] w-[200px]",
              "-translate-x-1/2 -translate-y-1/2 transform rounded-full",
            )}
            style={{ background: "rgba(99, 47, 10, 0.22)", filter: "blur(20px)" }}
          />
        </div>
      )}

      {renderTabContents}

      {user && (
        <div className="flex items-center justify-center pt-16">
          <Pagination
            currentPage={0}
            totalPages={3}
            activeClassName="!bg-primary-radial-gradient"
          />
        </div>
      )}
    </Form>
  )
}

export default Profile
