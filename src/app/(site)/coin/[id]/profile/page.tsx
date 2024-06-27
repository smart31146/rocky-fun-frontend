/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/anchor-is-valid */

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
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
import { useParams } from "next/navigation"

import { getUserProfile } from "@/api/profile"

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

export interface ConnectWalletProps {}

const ConnectWallet = (props: ConnectWalletProps) => {
  const params = useParams()
  const [profile, setProfile] = useState<any>()

  const [activeTab, setActiveTab] = useState<
    "coins_bought" | "coins_created" | "followers" | "following"
  >(coinGraphTabs[0].value)

  const fetchCoinInfo = async () => {
    const { data } = await getUserProfile(parseInt(params.id as string))
    setProfile(data)
  }

  const renderTabContents = useMemo(() => {
    switch (activeTab) {
      case "coins_bought":
        return <ProfileCoinBoughts />
      case "followers":
        return <ProfileFollowers />
      case "following":
        return <ProfileFollowing />
      case "coins_created":
        return <CoinCreated data={profile.coins} />
      default:
        return null
    }
  }, [activeTab])

  useEffect(() => {
    if (params.id) {
      fetchCoinInfo()
    }
  }, [])

  return (
    <div className="mx-auto mt-2 max-w-[430px] md:mt-8">
      <h2 className="mb-2 text-center text-base font-semibold text-white md:text-lg">
        User Profile
      </h2>
      <div
        className={cn(
          "relative mb-6 flex items-center gap-4 p-3.5",
          "overflow-hidden rounded-md border border-[#3B3939] bg-[#2F2E2E]",
        )}
      >
        {profile && (
          <>
            <Image
              width={34}
              height={34}
              className="h-[34px] w-[34px]"
              alt="Avatar"
              src={profile?.avatar}
            />

            <div>
              <h2 className="text-[15px] font-semibold leading-5">@{profile?.username}</h2>
              <p className="text-[11px] font-normal">0 Followers</p>
            </div>

            <div
              className={cn(
                "pointer-events-none absolute left-1/2 top-1/2 h-[76px] w-[136px]",
                "-translate-x-1/2 -translate-y-1/2 transform rounded-full",
              )}
              style={{ background: "rgba(99, 47, 10, 0.22)", filter: "blur(20px)" }}
            />
          </>
        )}
      </div>

      <div className="relative my-6 overflow-hidden rounded-md border border-[#3B3939] bg-[#2F2E2E] p-3.5">
        {/*<FormField value={"1234343434"} disabled variant="TEXT" label="Connected Wallet:" name="wallet" size="lg" />*/}
        <div className="flex h-10 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors">
          {profile?.wallet}
        </div>

        <div className="mb-3 mt-2 text-right">
          <div
            className="text-right text-sm underline"
            onClick={() => {
              window.open(`https://solscan.io/tx/${profile?.wallet}`, "_blank")
            }}
          >
            View on Solscan 👀
          </div>
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

      {renderTabContents}

      <div className="flex items-center justify-center pt-16">
        <Pagination currentPage={0} totalPages={3} activeClassName="!bg-primary-radial-gradient" />
      </div>
    </div>
  )
}

export default ConnectWallet
