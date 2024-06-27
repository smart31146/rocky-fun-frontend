import { getDatafeed, getSymbol } from "@/api/datafeed"
import { subscribeOnStream, unsubscribeFromStream } from "@/trading-chart-view/streaming"

// DatafeedConfiguration implementation
const configurationData = {
  // Represents the resolutions for bars supported by your datafeed
  supported_resolutions: [
    "1",
    "3",
    "5",
    "15",
    "30",
    "45",
    "1H",
    "2H",
    "3H",
    "4H",
    "1D",
    "1W",
    "1M",
  ],
  // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
  exchanges: [],
  // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
  symbols_types: [],
}

// Use it to keep a record of the most recent bar on the chart
const lastBarsCache = new Map()

export const datafeed = {
  onReady: (callback: any) => {
    setTimeout(() => callback(configurationData))
  },

  searchSymbols: async (
    userInput: string,
    exchange: string,
    symbolType: string,
    onResultReadyCallback: (symbol: string[]) => void,
  ) => {
    onResultReadyCallback([])
  },

  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: (data: any) => void,
    onResolveErrorCallback: (message: string) => void,
  ) => {
    const { data } = await getSymbol(symbolName)
    onSymbolResolvedCallback({
      name: data.name,
      timezone: "Etc/UTC",
      minmov: 1,
      minmov2: 0,
      session: "24x7",
      visible_plots_set: "ohlc",
      description: data.ticker,
      type: "crypto",
      supported_resolutions: configurationData.supported_resolutions,
      pricescale: 100,
      ticker: data.ticker,
    })
  },

  getBars: async (
    symbolInfo: any,
    resolution: string,
    periodParams: any,
    onHistoryCallback: (data: any[], setting: any) => void,
    onErrorCallback: (error: any) => void,
  ) => {
    const { from, to, firstDataRequest, countBack } = periodParams

    try {
      const { data } = await getDatafeed({
        symbol: symbolInfo.ticker,
        from,
        to,
        resolution,
        countback: countBack,
      })

      if (!data || data.length === 0) {
        // "noData" should be set if there is no data in the requested period
        onHistoryCallback([], { noData: true })
        return
      }

      if (firstDataRequest) {
        lastBarsCache.set(`${symbolInfo.name}`, { ...data[data.length - 1] })
      }

      onHistoryCallback(data, { noData: true })
      // onHistoryCallback(bars, { noData: true });
    } catch (error) {
      onErrorCallback(error)
    }
  },

  subscribeBars: (
    symbolInfo: any,
    resolution: string,
    onRealtimeCallback: () => void,
    subscriberUID: string,
    onResetCacheNeededCallback: () => void,
  ) => {
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback,
      lastBarsCache.get(`${symbolInfo.name}`),
    )
  },

  unsubscribeBars: (subscriberUID: string) => {
    unsubscribeFromStream(subscriberUID)
  },
}
