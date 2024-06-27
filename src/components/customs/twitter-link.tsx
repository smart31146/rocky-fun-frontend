import Link from "next/link"
import { ComponentPropsWithoutRef } from "react"
import { XIcon } from "./icons/x-icon"

export interface TwitterLinkProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {}

const TwitterLink = ({ ...props }: TwitterLinkProps) => {
  return (
    <Link {...props} href="https://twitter.com/rocketdotfun" target="_blank">
      <XIcon className="shrink-0 cursor-pointer" />
    </Link>
  )
}

export default TwitterLink
