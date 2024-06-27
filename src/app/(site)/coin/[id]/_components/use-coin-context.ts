import { Coin } from "@/types/entities"
import { createContext, useContext } from "react"

export const CoinContext = createContext<CoinContextInterface>({
  data: [],
} as unknown as CoinContextInterface)

export const useCoinContext = () => useContext(CoinContext)

interface CoinContextInterface {
  data: any[]
  coin: Coin
  setCoinChainData: (data: any) => void
  coinChainData: any
}
