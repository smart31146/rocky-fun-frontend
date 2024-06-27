import { PAGE_ROUTES } from "@/constants/routes"
import { cn } from "@/libs/utils/tailwind"
import Image from "next/image"
import Link from "next/link"
import { ComponentPropsWithoutRef } from "react"

export interface TextLogoNavProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  logoClassName?: string

  isFooter?: boolean
}

const TextLogoNav = ({ className, logoClassName, isFooter, ...props }: TextLogoNavProps) => {
  return (
    <Link {...props} href={PAGE_ROUTES.HOME} className={cn("shrink-0", className)}>
      <Image
        width={305}
        height={305}
        alt="Logo"
        src={isFooter ? "/assets/rocket-fun-logo-footer.svg" : "/assets/rocket-fun-logo.svg"}
        className={cn(logoClassName)}
      />
    </Link>
  )
}

export default TextLogoNav
