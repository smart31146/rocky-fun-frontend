/* eslint-disable no-promise-executor-return */

"use client"

import Link from "next/link"
import { ElementRef, forwardRef } from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { PAGE_ROUTES } from "@/constants/routes"
import { cn } from "@/libs/utils/tailwind"
import { usePathname } from "next/navigation"

export interface LaunchCoinButtonProps extends ButtonProps {}

const LaunchCoinButton = forwardRef<ElementRef<typeof Button>, LaunchCoinButtonProps>(
  ({ className, ...props }, ref) => {
    // const router = useRouter()
    // const openModal = useGeneralModal(useModalOpenSelector)
    // const handleOpenLaunchCoinModal = () => {
    //   openModal("HowItWorks", {
    //     title: "How it Works",
    //     centerTitle: true,
    //     type: "modal",
    //     actions: [
    //       {
    //         type: "submit",
    //         text: (
    //           <>
    //             <Image
    //               src="/assets/logo.svg"
    //               width={15}
    //               height={15}
    //               alt="Rocket"
    //               className="mr-2 inline-block"
    //             />
    //             Launch Rocket
    //           </>
    //         ),
    //         props: {
    //           variant: "outline",
    //           className: "text-white md:w-[280px] w-full",
    //         },
    //       },
    //     ],
    //     actionProps: {
    //       align: "center",
    //     },
    //     onSubmit(data, make) {
    //       return make(new Promise((resolve) => resolve(true)), () => ({}))
    //     },
    //     onSuccess(data, { closeCurrentModal }) {
    //       router.push(PAGE_ROUTES.CREATE_COIN, {
    //         scroll: true,
    //       })
    //       closeCurrentModal()
    //     },
    //   })
    // }

    return (
      <Button {...props} variant="default" size="lg" className={cn(className)} ref={ref} asChild>
        <Link href={PAGE_ROUTES.CREATE_COIN}>start a new coin</Link>
      </Button>
    )
  },
)

export default LaunchCoinButton
