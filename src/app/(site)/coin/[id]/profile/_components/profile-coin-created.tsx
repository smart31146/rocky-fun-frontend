import { CoinCard } from "@components/customs/custom-cards/coin-card"

const CoinCreated = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {data.map((coin: any, index: number) => {
        return (
          <div key={index}>
            <CoinCard data={coin} />
          </div>
        )
      })}
    </div>
  )
}

interface Props {
  data: any[]
}

export default CoinCreated
