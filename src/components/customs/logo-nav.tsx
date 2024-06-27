import { PAGE_ROUTES } from "@/constants/routes"
import { cn } from "@/libs/utils/tailwind"
import Image from "next/image"
import Link from "next/link"
import { ComponentPropsWithoutRef } from "react"

export interface LogoNavProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {}

const LogoNav = ({ className, ...props }: LogoNavProps) => {
  return (
    <Link {...props} href={PAGE_ROUTES.HOME} className={cn("shrink-0", className)}>
      <Image
        width={37}
        height={37}
        alt="Logo"
        src="/assets/logo.svg"
        className="h-10 w-8 shrink-0 md:h-[50px] md:w-[50px]"
      />
    </Link>
  )
}

export default LogoNav
