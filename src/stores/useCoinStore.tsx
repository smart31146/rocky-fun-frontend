import { State, create } from "zustand"

interface User {
  name: string
  color: string
}
// @ts-ignore
interface CoinStore extends State {
  tradingEvents: Array<{
    src: string
    user: User
    type: string
    sol: number
    boden: string
    date: string
    timestamp: number
    txs: string
  }>
  updateEvent: (x: any) => void
}

const useCoinStore = create<CoinStore>((set, _get) => ({
  tradingEvents: [],
  updateEvent: (data) =>
    set((state) => {
      const updatedData = [...state.tradingEvents]
      if (updatedData.length === 9) {
        updatedData.splice(8, 1)
      }
      updatedData.unshift(data)
      return {
        tradingEvents: updatedData,
      }
    }),
}))

export default useCoinStore
