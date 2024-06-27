import dynamic, { DynamicOptions, Loader } from "next/dynamic"
import { forwardRef } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { GeneralForwardRef, GeneralModalComponentProps } from "./types"

const loading = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-[25px] max-w-[50%]" />
    <Skeleton className="h-[40px]" />
    <Skeleton className="h-[300px]" />
  </div>
)

const takeForm = <T,>(options: DynamicOptions<T> | Loader<T>) => {
  const Component = dynamic(options, {
    ssr: true,
    loading,
  }) as any

  return forwardRef<GeneralForwardRef, GeneralModalComponentProps>((props, ref) => (
    <Component {...props} outerRef={ref} />
  ))
}

const Template = takeForm(() => import("./components/template"))
const HowItWorksForm = takeForm(() => import("./components/how-it-works-form"))
const AddCommentForm = takeForm(() => import("./components/add-comment-form"))
const SetMaxSlippageForm = takeForm(() => import("./components/set-max-slippage-form"))
const AddReplyForm = takeForm(() => import("./components/add-reply-form"))
const BuyCoinForm = takeForm(() => import("./components/buy-coin-form"))
const EditProfileForm = takeForm(() => import("./components/edit-profile-form"))
const PleaseConnectWalletForm = takeForm(() => import("./components/please-connect-wallet"))

export const GENERAL_MODAL_LOADER = {
  Template,
  HowItWorks: HowItWorksForm,
  AddComment: AddCommentForm,
  SetMaxSlippage: SetMaxSlippageForm,
  AddReply: AddReplyForm,
  BuyCoin: BuyCoinForm,
  EditProfile: EditProfileForm,
  PleaseConnectWallet: PleaseConnectWalletForm,
} as const

export type GeneralModalLoaderKeys = typeof GENERAL_MODAL_LOADER
