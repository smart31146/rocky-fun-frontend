import ImageWithFallback from "@/components/ui/images/image-with-fallback"

export interface ProfileCardProps {
  avatar: string
  name: string
  followerCount: number
}

export const ProfileCard = ({ avatar, followerCount, name }: ProfileCardProps) => (
  <div className="flex w-full flex-row gap-2">
    <ImageWithFallback
      src={avatar}
      alt="Avatar"
      width={18}
      height={18}
      className="h-4 w-4 rounded-md"
      fallback="/assets/avatar_2.png"
    />
    <h2 className="text-sm font-normal">{name}</h2>

    <p className="ml-auto text-sm font-light text-white">{followerCount} followers</p>
  </div>
)
