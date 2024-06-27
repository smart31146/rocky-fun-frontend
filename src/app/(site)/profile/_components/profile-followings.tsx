import { ProfileCard } from "@/components/customs/custom-cards/profile-card"

export interface ProfileFollowingsProps {}

const ProfileFollowings = (props: ProfileFollowingsProps) => (
  <div className="mx-auto flex w-full max-w-[239px] flex-col items-center gap-3">
    <ProfileCard avatar="/assets/avatar_2.png" name="hoshinogi" followerCount={381} />
    <ProfileCard avatar="/assets/avatar_2.png" name="hoshinogi" followerCount={381} />
    <ProfileCard avatar="/assets/avatar_2.png" name="hoshinogi" followerCount={381} />
  </div>
)

export default ProfileFollowings
