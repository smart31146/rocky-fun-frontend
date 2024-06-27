import { TelegramIcon } from "@/components/customs/icons/telegram-icon"
import { XIcon } from "@/components/customs/icons/x-icon"
import TextLogoNav from "@/components/customs/text-logo-nav"
import Link from "next/link"

export interface FooterProps {}

const Footer = (props: FooterProps) => (
  <footer className="mt-14 flex flex-col items-center justify-between p-4 py-14">
    <TextLogoNav logoClassName="mb-10" isFooter />

    <div className="flex items-center gap-8">
      <Link href="https://t.me/rocketdotfun" target="_blank">
        <TelegramIcon className="cursor-pointer" />
      </Link>
      <Link href="https://twitter.com/rocketdotfun" target="_blank">
        <XIcon className="cursor-pointer" />
      </Link>
      {/* <Link href="https://t.me/rocketfunsupport" className="text-sm font-bold">
        Support
      </Link> */}
    </div>
  </footer>
)

export default Footer
