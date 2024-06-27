/* eslint-disable new-cap */
/* eslint-disable react/destructuring-assignment */
import { useEffect, useRef, useState } from "react"
import {
  ChartingLibraryWidgetOptions,
  LanguageCode,
  ResolutionString,
  widget,
  IBasicDataFeed,
} from "@public/static/charting_library"

import useCoinStore from "@/stores/useCoinStore"

import { datafeed } from "@/trading-chart-view/datafeed"

const flashArrow = (time: number, price: number, tvWidget: any, type: string) => {
  try {
    const flash1 = tvWidget.activeChart().createShape(
      { time, price },
      {
        shape: `arrow_${type}`,
        lock: true,
        disableSelection: true,
        disableSave: true,
        disableUndo: true,
        zOrder: "top",
      },
    )

    setTimeout(() => {
      tvWidget.activeChart().removeEntity(flash1 as any)

      setTimeout(() => {
        const flash2 = tvWidget.activeChart().createShape(
          { time, price },
          {
            shape: `arrow_${type}`,
            lock: true,
            disableSelection: true,
            disableSave: true,
            disableUndo: true,
            zOrder: "top",
          },
        )

        setTimeout(() => {
          tvWidget.activeChart().removeEntity(flash2 as any)

          setTimeout(() => {
            const flash3 = tvWidget.activeChart().createShape(
              { time, price },
              {
                shape: `arrow_${type}`,
                lock: true,
                disableSelection: true,
                disableSave: true,
                disableUndo: true,
                zOrder: "top",
              },
            )

            setTimeout(() => {
              tvWidget.activeChart().removeEntity(flash3 as any)

              setTimeout(() => {
                const flash4 = tvWidget.activeChart().createShape(
                  { time, price },
                  {
                    shape: `arrow_${type}`,
                    lock: true,
                    disableSelection: true,
                    disableSave: true,
                    disableUndo: true,
                    zOrder: "top",
                  },
                )

                setTimeout(() => {
                  tvWidget.activeChart().removeEntity(flash4 as any)
                }, 100)
              }, 100)
            }, 100)
          }, 100)
        }, 100)
      }, 100)
    }, 100)
  } catch (e) {}
}

export const TVChartContainer = (props: Partial<ChartingLibraryWidgetOptions>) => {
  const invoices = useCoinStore((state) => state.tradingEvents)
  const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const [widgetInstance, setWidgetInstance] = useState<any>()

  useEffect(() => {
    if (widgetInstance) {
      const latestItem = invoices[0]
      if (latestItem) {
        // @ts-ignore
        flashArrow(
          latestItem.timestamp,
          latestItem.sol,
          widgetInstance,
          latestItem.type === "buy" ? "up" : "down",
        )
      }
    }
  }, [invoices])

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: props.symbol,
      datafeed: datafeed as unknown as IBasicDataFeed,
      interval: props.interval as ResolutionString,
      container: chartContainerRef.current,
      library_path: props.library_path,
      locale: props.locale as LanguageCode,
      disabled_features: ["use_localstorage_for_settings", "header_saveload"],
      enabled_features: [],
      charts_storage_url: props.charts_storage_url,
      charts_storage_api_version: props.charts_storage_api_version,
      client_id: props.client_id,
      user_id: props.user_id,
      fullscreen: props.fullscreen,
      autosize: props.autosize,
      theme: "dark",
      time_frames: [
        { text: "5d", resolution: "D" as ResolutionString, description: "5 Days" },
        { text: "1d", resolution: "D" as ResolutionString, description: "1 Day" },
      ],
      timeframe: "D",
      overrides: {
        "linetoolarrowmarkdown.arrowColor": "#7845C6",
        "linetoolarrowmarkup.arrowColor": "#7845C6",
        "AvailableZOrderOperations.bringToFrontEnabled": true,
      },
    }

    const tvWidget = new widget(widgetOptions)

    tvWidget.onChartReady(() => {
      const chart = tvWidget.chart()
      chart.onDataLoaded().subscribe(
        null,
        () => {
          setWidgetInstance(tvWidget)
          // tvWidget
          //   .activeChart()
          //   .createShape(
          //     { time: 1522108800, price: 170 },
          //     { shape: `arrow_${'up'}`,
          //       zOrder: "top"
          //    }
          //   )
        },
        true /* single shot (for onDataLoaded subscribe) */,
      )
    })
    return () => {
      tvWidget.remove()
    }
  }, [props])

  return <div ref={chartContainerRef} className="h-full" />
}
