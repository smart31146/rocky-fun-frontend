"use client"

/* eslint-disable no-promise-executor-return */
import { getCookie, setCookie } from "cookies-next"
import dayjs from "dayjs"

import { useGeneralModal } from "@/components/customs/custom-modals/general-modal/hooks"
import { useModalOpenSelector } from "@/components/customs/custom-modals/general-modal/hooks/use-general-modal"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffectOnce } from "react-use"

const WELCOME_DIALOG_COOKIE_KEY = "rocketfun_welcome"

export interface WelcomeDialogProps {}

const WelcomeDialog = (props: WelcomeDialogProps) => {
  const router = useRouter()
  const openModal = useGeneralModal(useModalOpenSelector)

  useEffectOnce(() => {
    if (!getCookie(WELCOME_DIALOG_COOKIE_KEY)) {
      setCookie(WELCOME_DIALOG_COOKIE_KEY, "true", { expires: dayjs().add(365, "days").toDate() })

      openModal("HowItWorks", {
        title: "How it Works",
        centerTitle: true,
        type: "modal",
        generalProps: {
          className: "max-w-full",
        },
        actions: [
          {
            type: "submit",
            text: (
              <>
                <Image
                  src="/assets/logo.svg"
                  width={15}
                  height={15}
                  alt="Rocket"
                  className="mr-2 inline-block"
                />
                Launch Rocket
              </>
            ),
            props: {
              variant: "outline",
              className: "text-white md:w-[280px] w-full",
            },
          },
        ],
        actionProps: {
          align: "center",
        },
        onSubmit(data, make) {
          return make(new Promise((resolve) => resolve(true)), () => ({}))
        },
        onSuccess(data, { closeCurrentModal }) {
          closeCurrentModal()
        },
      })
    }
  })

  return null
}

export default WelcomeDialog
