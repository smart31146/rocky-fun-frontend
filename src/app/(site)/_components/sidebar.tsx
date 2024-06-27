"use client"

import { DocumentIcon } from "@/components/customs/icons/document-icon"
import LogoNav from "@/components/customs/logo-nav"
import TelegramLink from "@/components/customs/telegram-link"
import TwitterLink from "@/components/customs/twitter-link"
import { cn } from "@/libs/utils/tailwind"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { ComponentPropsWithoutRef, FC, Fragment, ReactNode } from "react"
import { useMenuItems } from "./use-menu"

export interface SidebarProps {}

const Sidebar = (props: SidebarProps) => {
  const items = useMenuItems({ withoutDocsItem: true })
  return (
    <div className="fixed left-0 top-0 hidden h-lvh w-[244px] p-4 px-8 md:block">
      <LogoNav />

      <MenuRoot className="mt-10">
        {items.map((item) => (
          <MenuLabel href={item.path} as={item.path} container={item.container} icon={item.icon}>
            {item.label}
          </MenuLabel>
        ))}
      </MenuRoot>

      <div className="mt-14 flex flex-col gap-8">
        <Link
          href="https://docs.rocket.fun"
          className={cn(
            "flex min-h-[40px] items-center gap-6 text-sm font-bold text-active",
            "bg-card p-4",
          )}
        >
          <DocumentIcon className="h-6 w-6 text-active" />
          Help Docs
        </Link>

        <div className="flex items-center gap-8">
          <TelegramLink />
          <TwitterLink />
        </div>
      </div>
    </div>
  )
}

export interface MenuLabelProps extends LinkProps {
  icon?: ReactNode
  container?: FC<any>
  className?: string
  children?: ReactNode
}

export const MenuLabel: FC<MenuLabelProps> = ({
  className,
  children,
  icon,
  container: Container = Fragment,
  ...props
}) => {
  const { href } = props
  const path = usePathname()

  return (
    <Container>
      <Link
        {...props}
        className={cn(
          "flex h-10 items-center gap-6 font-semibold text-inactive",
          path === href ? "text-active" : "",
          className,
        )}
      >
        {icon}
        {children}
      </Link>
    </Container>
  )
}

export interface MenuRootProps extends ComponentPropsWithoutRef<"div"> {}

export const MenuRoot: FC<MenuRootProps> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cn("flex flex-col gap-4", className)}>
      {children}
    </div>
  )
}

export interface MenuItem {
  path: string
  icon: ReactNode
  label: ReactNode
  container?: FC<any>
}

export default Sidebar
