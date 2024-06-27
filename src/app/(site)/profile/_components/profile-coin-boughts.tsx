import { Eye, RotateCw } from "lucide-react"
import Image from "next/image"

export interface ProfileCoinBoughtsProps {}

const ProfileCoinBoughts = (props: ProfileCoinBoughtsProps) => (
  <div className="flex items-center gap-4 rounded-md border border-[#3B3939] bg-[#2F2E2E] p-3.5">
    <Image
      src="/assets/bat-coin.svg"
      width={40}
      height={40}
      alt="coin"
      className="h-10 w-10 object-cover"
    />
    <div className="flex flex-col gap-1">
      <h2 style={{ color: "#B99000" }} className="text-sm font-normal leading-4">
        CTo19k (dev)
      </h2>
      <p className="text-sm font-normal leading-4">0.0073 SOL</p>
    </div>
    <div className="ml-auto flex flex-col gap-1">
      <span className="flex h-6 w-6 items-center justify-center rounded bg-[#3A3838]">
        <RotateCw className="h-4 w-4" />
      </span>
      <span className="flex h-6 w-6 items-center justify-center rounded bg-[#3A3838]">
        <Eye className="h-4 w-4" />
      </span>
    </div>
  </div>
)

export default ProfileCoinBoughts
