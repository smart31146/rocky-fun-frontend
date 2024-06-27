import { State, create } from "zustand"
import { produce } from "immer"

// @ts-ignore
interface NotificationStore extends State {
  notifications: Array<{
    type: string
    message: string
    description?: string
    txid?: string
  }>
  tradingNotification: any
  set: (x: any) => void
}

const useNotificationStore = create<NotificationStore>((set, _get) => ({
  notifications: [],
  tradingNotification: {
    status: "",
    amount: 0,
    price: 0,
    coin: "",
    signature: "",
  },
  set: (fn) => set(produce(fn) as any),
}))

export default useNotificationStore
