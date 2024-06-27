import ProfileCoinCard from "@/components/customs/custom-cards/profile-coin-card"

export interface Props {
  data: any[]
}

const CoinCreated = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {data.map((coin, index) => {
        return (
          <div key={index}>
            <ProfileCoinCard data={coin} />
          </div>
        )
      })}
    </div>
  )
}

export default CoinCreated
