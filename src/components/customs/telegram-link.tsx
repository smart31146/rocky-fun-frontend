import Link from "next/link"
import { ComponentPropsWithoutRef } from "react"
import { TelegramIcon } from "./icons/telegram-icon"

export interface TelegramLinkProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {}

const TelegramLink = ({ ...props }: TelegramLinkProps) => {
  return (
    <Link {...props} href="https://t.me/rocketdotfun" target="_blank">
      <TelegramIcon className="shrink-0 cursor-pointer" />
    </Link>
  )
}

export default TelegramLink
