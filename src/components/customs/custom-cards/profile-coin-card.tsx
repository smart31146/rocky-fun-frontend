import Image from "next/image"
import { cn } from "@/libs/utils/tailwind"
import { useAuth } from "@contexts/AuthProvider"

export default function ProfileCoinCard({ data }: Props) {
  const { user } = useAuth()
  return (
    <div className={cn("mx-auto flex w-full items-start border border-transparent")}>
      <Image
        width={90}
        height={90}
        src={data?.image}
        alt="Thumbnail"
        className="h-[90px] w-[90px] rounded-md"
      />

      <div className={data?.description ? "px-4" : "p-4"}>
        <div className="mb-1 flex items-center gap-1.5 text-sm font-normal leading-4 text-foreground-secondary">
          Launched by{" "}
          <Image alt="Skull" width={17} height={17} src={user?.avatar || "/assets/avatar_2.png"} />
          {user?.username}
        </div>

        {/* <h2 className="mb-1 text-[15px] font-medium leading-5 text-foreground-secondary">
          {title}
        </h2> */}
        <p className="mb-1 text-sm font-normal leading-4 !text-[#86efac]">{data?.name}</p>
        <p className="text-sm font-normal leading-4 text-foreground-secondary">replies: 0</p>

        {data?.description ? (
          <p className="mt-1 text-sm font-normal leading-[18px] text-secondary">
            {data?.description}
          </p>
        ) : null}
      </div>
    </div>
  )
}

interface Props {
  data: any
}
