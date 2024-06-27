// const socket = io('wss://streamer.cryptocompare.com');

const channelToSubscription = new Map()

// socket.on('connect', () => {
//   console.log('[socket] Connected');
// });
//
// socket.on('disconnect', (reason: string) => {
//   console.log('[socket] Disconnected:', reason);
// });
//
// socket.on('error', (error: any) => {
//   console.log('[socket] Error:', error);
// });
//
// socket.on('m', (data: any) => {
//   processRealtimeData(data)
// });

const processRealtimeData = (data: any) => {
  const { time, price, symbol } = data

  const tradePrice = parseFloat(price)
  const tradeTime = parseInt(time) // In miliseconds
  const channelString = `${symbol}`
  const subscriptionItem = channelToSubscription.get(channelString)
  if (subscriptionItem === undefined) {
    return
  }
  const { lastDailyBar } = subscriptionItem
  const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time)

  let bar
  if (tradeTime >= nextDailyBarTime) {
    bar = {
      time: nextDailyBarTime,
      open: tradePrice,
      high: tradePrice + 5,
      low: tradePrice - 2,
      close: tradePrice - 1,
    }
  } else {
    bar = {
      ...lastDailyBar,
      high: Math.max(lastDailyBar.high, tradePrice),
      low: Math.min(lastDailyBar.low, tradePrice),
      close: tradePrice,
    }
  }
  subscriptionItem.lastDailyBar = bar

  // Send data to every subscriber of that symbol
  subscriptionItem.handlers.forEach((handler: any) => handler.callback(bar))
}

const initFakeEvent = () => {
  const event = {
    time: 1718496000000,
    price: 107,
    symbol: "BECK",
  }

  processRealtimeData(event)
}

setTimeout(() => {
  initFakeEvent()
}, 10000)

function getNextDailyBarTime(barTime: number) {
  const date = new Date(barTime)
  date.setDate(date.getDate() + 1)
  return date.getTime()
}

export function subscribeOnStream(
  symbolInfo: any,
  resolution: any,
  onRealtimeCallback: () => void,
  subscriberUID: string,
  onResetCacheNeededCallback: () => void,
  lastDailyBar: any,
) {
  // Unique channel string
  const channelString = `${symbolInfo.ticker}`

  // Define handler
  const handler = {
    id: subscriberUID,
    callback: onRealtimeCallback,
  }

  // Check if there is already this channel
  let subscriptionItem = channelToSubscription.get(channelString)

  if (subscriptionItem) {
    // Already subscribed to the channel, use the existing subscription
    subscriptionItem.handlers.push(handler)
    return
  }

  // Otherwise, create new subsciption item
  subscriptionItem = {
    subscriberUID,
    resolution,
    lastDailyBar,
    handlers: [handler],
  }

  channelToSubscription.set(channelString, subscriptionItem)
  // socket.emit('SubAdd', { subs: [channelString] });
}

export function unsubscribeFromStream(subscriberUID: string) {
  // Find a subscription with id === subscriberUID
  // @ts-ignore
  for (const channelString of channelToSubscription.keys()) {
    const subscriptionItem = channelToSubscription.get(channelString)
    const handlerIndex = subscriptionItem.handlers.findIndex(
      (handler: any) => handler.id === subscriberUID,
    )

    if (handlerIndex !== -1) {
      // Remove from handlers
      subscriptionItem.handlers.splice(handlerIndex, 1)

      if (subscriptionItem.handlers.length === 0) {
        // Unsubscribe from the channel if it is the last handler
        // socket.emit('SubRemove', { subs: [channelString] });
        channelToSubscription.delete(channelString)
        break
      }
    }
  }
}
