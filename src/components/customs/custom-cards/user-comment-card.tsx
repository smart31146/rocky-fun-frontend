import dayjs from "dayjs"
import ImageWithFallback from "@/components/ui/images/image-with-fallback"

export interface UserCommentCardProps {
  color: string
  name: string
  comment: string
  createdAt?: string
  avatar?: string
  isDev?: boolean
}

const UserCommentCard = ({
  avatar = "/assets/avatar_2.png",
  color,
  name,
  comment,
  createdAt,
  isDev = false,
}: UserCommentCardProps) => {
  return (
    <div className="flex flex-col gap-2 bg-card px-3 py-2">
      <div className="flex items-center gap-2.5">
        <ImageWithFallback
          src={avatar || "/assets/avatar_2.png"}
          fallback="/assets/avatar_2.png"
          className="h-4 w-4"
          width={16}
          height={16}
          alt="Avatar"
        />
        <p
          style={{ color, borderColor: color }}
          className="rounded border px-[3px] py-[2px] text-xs font-normal leading-3.5"
        >
          {name} {isDev ? "(dev)" : ""}
        </p>

        {dayjs(createdAt).isValid() ? (
          <p className="text-xs font-normal leading-3.5" suppressHydrationWarning>
            {dayjs(createdAt).format("MM/DD/YYYY, HH:mm:ss A")}
          </p>
        ) : null}
      </div>
      <p className="text-xs font-normal leading-3.5">{comment}</p>
    </div>
  )
}

export default UserCommentCard
