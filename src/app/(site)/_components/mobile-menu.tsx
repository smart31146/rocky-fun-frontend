/* eslint-disable jsx-a11y/control-has-associated-label */
import BarIcon from "@/components/customs/icons/bar-icon"
import LogoNav from "@/components/customs/logo-nav"
import TextLogoNav from "@/components/customs/text-logo-nav"
import { cn } from "@/libs/utils/tailwind"
import { XIcon } from "lucide-react"
import { ComponentPropsWithoutRef, Fragment, useState } from "react"
import { useMenuItems } from "./use-menu"
import TelegramLink from "@/components/customs/telegram-link"
import TwitterLink from "@/components/customs/twitter-link"
import Link from "next/link"

export interface MobileMenuProps extends ComponentPropsWithoutRef<"div"> {}

const MobileMenu = ({ className, ...props }: MobileMenuProps) => {
  const items = useMenuItems()

  const [open, setOpen] = useState(false)

  const handleToggle = () => setOpen((prevOpen) => !prevOpen)

  return (
    <div {...props} className={cn(className)}>
      <BarIcon className="cursor-pointer" role="button" onClick={handleToggle} />

      <section
        className={cn(
          "fixed -left-full top-0 z-10 h-lvh w-full",
          "transition-all duration-300",
          open ? "left-0" : "",
        )}
      >
        <header className="flex h-16 items-center justify-between bg-background px-5 py-4">
          <LogoNav />

          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-md bg-white"
            onClick={handleToggle}
          >
            <XIcon className="h-8 w-8 text-primary-foreground" />
          </button>
        </header>
        <article className="h-full bg-primary-soft px-4 py-6">
          <TextLogoNav logoClassName="w-[250px] mx-auto mb-10" />

          <section className="flex justify-center">
            <div className="mx-auto flex flex-col gap-6">
              {items.map((item) => {
                const Container = item.container || Fragment
                return (
                  <Container>
                    <Link
                      href={item.path}
                      className="flex items-center gap-4 text-2xl font-semibold text-primary-foreground"
                      onClick={handleToggle}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </Container>
                )
              })}

              <div className="ml-6 mt-8 flex items-center gap-4">
                <TelegramLink className="grid h-9 w-9 place-items-center rounded border border-primary-foreground bg-white [&_path:nth-child(1)]:fill-[#232836] [&_path:nth-child(2)]:fill-[#374055] [&_path:nth-child(3)]:fill-[#374055]" />
                <TwitterLink className="grid h-9 w-9 place-items-center rounded border border-primary-foreground bg-white text-black" />
              </div>
            </div>
          </section>
        </article>
      </section>
    </div>
  )
}

export default MobileMenu
