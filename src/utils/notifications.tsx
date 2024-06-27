import useNotificationStore from "../stores/useNotificationStore"

export function notify(newNotification: {
  type?: string
  message: string
  description?: string
  txid?: string
}) {
  const {
    notifications,
    tradingNotification,
    set: setNotificationStore,
  } = useNotificationStore.getState()

  setNotificationStore((state: { notifications: any[] }) => {
    state.notifications = [...notifications, { type: "success", ...newNotification }]
  })
}

export function showTradingNotification(data: {
  status: string
  amount: number
  price: number
  coin: string
  signature: string
}) {
  const { tradingNotification, set: setNotificationStore } = useNotificationStore.getState()

  setNotificationStore((state: { tradingNotification: any }) => {
    state.tradingNotification = {
      ...tradingNotification,
      status: data.status,
      amount: data.amount,
      price: data.price,
      coin: data.coin,
      signature: data.signature,
    }
  })
}
