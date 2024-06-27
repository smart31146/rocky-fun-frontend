/* eslint-disable react/no-array-index-key */

"use client"

import { useEffect, useState } from "react"
// @ts-ignore
import { CheckCircleIcon, InformationCircleIcon, XCircleIcon } from "@heroicons/react/outline"
// @ts-ignore
import { XIcon } from "@heroicons/react/solid"
import { useConnection } from "@solana/wallet-adapter-react"
import { useNetworkConfiguration } from "@contexts/NetworkConfigurationProvider"

import { Confirm, Success, Warning } from "@components/icons"
import { showTradingNotification } from "@utils/notifications"

import useNotificationStore from "../stores/useNotificationStore"

import { cn } from "@/libs/utils/tailwind"

const NotificationList = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore((s) => s)

  const reversedNotifications = [...notifications].reverse()

  return (
    <div className="pointer-events-none fixed inset-[8px] z-20 z-[1000] flex items-end px-1 py-1 sm:p-6">
      <div className="flex w-full flex-col">
        {reversedNotifications.map((n, idx) => (
          <Notification
            key={`${n.message}${idx}`}
            type={n.type}
            message={n.message}
            description={n.description}
            txid={n.txid}
            onHide={() => {
              setNotificationStore((state: any) => {
                const reversedIndex = reversedNotifications.length - 1 - idx
                state.notifications = [
                  ...notifications.slice(0, reversedIndex),
                  ...notifications.slice(reversedIndex + 1),
                ]
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}

const Notification = ({ type, message, description, txid, onHide }: any) => {
  const { connection } = useConnection()
  const { networkConfiguration } = useNetworkConfiguration()

  // TODO: we dont have access to the network or endpoint here..
  // getExplorerUrl(connection., txid, 'tx')
  // Either a provider, context, and or wallet adapter related pro/contx need updated

  useEffect(() => {
    const id = setTimeout(() => {
      onHide()
    }, 3000)

    return () => {
      clearInterval(id)
    }
  }, [onHide])

  return (
    <div className="bg-bkg-1 pointer-events-auto bottom-0 left-0 mt-2 w-full max-w-sm overflow-hidden rounded-md p-2 shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="rounded-md bg-white p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {type === "success" ? (
              <CheckCircleIcon className="mr-1 h-8 w-8 text-emerald-500" />
            ) : null}
            {type === "info" && <InformationCircleIcon className="mr-1 h-8 w-8" />}
            {type === "error" && <XCircleIcon className="mr-1 h-8 w-8 text-red-500" />}
          </div>
          <div className="ml-2 w-0 flex-1">
            <div
              className={`text-fgd-1 font-bold 
              ${type === "success" ? "text-emerald-500" : type === "error" ? "text-red-500" : ""}`}
            >
              {message}
            </div>
            {description ? <p className="text-fgd-2 mt-0.5 text-sm">{description}</p> : null}
            {txid ? (
              <div className="flex flex-row">
                <a
                  href={`https://explorer.solana.com/tx/${txid}?cluster=${networkConfiguration}`}
                  target="_blank"
                  rel="noreferrer"
                  className="link link-accent flex flex-row text-emerald-200"
                >
                  <svg
                    className="text-primary-light ml-2 mt-0.5 h-4 w-4 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  <div className="mx-4 flex">
                    {txid.slice(0, 8)}...
                    {txid.slice(txid.length - 8)}
                  </div>
                </a>
              </div>
            ) : null}
          </div>
          <div className="ml-4 flex flex-shrink-0 self-start">
            <button
              type="button"
              onClick={() => onHide()}
              className="bg-bkg-2 default-transition text-fgd-3 hover:text-fgd-4 inline-flex rounded-md focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const TradingNotification = () => {
  const { tradingNotification, set: setNotificationStore } = useNotificationStore((s) => s)

  // TODO: we dont have access to the network or endpoint here..
  // getExplorerUrl(connection., txid, 'tx')
  // Either a provider, context, and or wallet adapter related pro/contx need updated

  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     onHide()
  //   }, 3000)
  //
  //   return () => {
  //     clearInterval(id)
  //   }
  // }, [onHide])

  const getIconByStatus = () => {
    switch (tradingNotification.status) {
      case "success": {
        return <Success />
      }

      case "confirming": {
        return <Confirm />
      }

      case "fail": {
        return <Warning />
      }

      default: {
        return <Confirm />
      }
    }
  }

  const getColorByStatus = () => {
    switch (tradingNotification.status) {
      case "success": {
        return "#17CD13"
      }

      case "confirming": {
        return "#0071BC"
      }

      case "fail": {
        return "#EB4F4F"
      }

      default: {
        return "#0071BC"
      }
    }
  }

  const getTitleByStatus = () => {
    switch (tradingNotification.status) {
      case "success": {
        return "Transaction Success..."
      }

      case "confirming": {
        return "Confirming transaction..."
      }

      case "fail": {
        return "Transaction Failed"
      }

      default: {
        return "Confirming transaction..."
      }
    }
  }

  const onClose = () => {
    showTradingNotification({ status: "", coin: "", amount: 0, price: 0, signature: "" })
  }

  if (tradingNotification.status) {
    return (
      <div
        className={cn(
          `fixed bottom-6 right-6 z-50 h-[102px] w-[368px] border bg-[#1F1F1F] px-[20px] pb-[12px] pt-[14px]`,
          {
            "border-[#17CD13]": tradingNotification.status === "success",
            "border-[#0071BC]": tradingNotification.status === "confirming",
            "border-[#EB4F4F]": tradingNotification.status === "fail",
          },
        )}
      >
        <XIcon
          className="absolute right-[11px] top-[7px] h-[8px] w-[8px] cursor-pointer"
          onClick={onClose}
        />
        <div className="flex">
          <div>{getIconByStatus()}</div>

          <div className={"ml-[14px]"}>
            <div
              className={cn("mb-[7px] text-[15px] font-semibold", {
                "text-[#17CD13]": tradingNotification.status === "success",
                "text-[#0071BC]": tradingNotification.status === "confirming",
                "text-[#EB4F4F]": tradingNotification.status === "fail",
              })}
            >
              {getTitleByStatus()}
            </div>
            <div className={"text-[14px] text-white"}>
              Buy {tradingNotification.amount} {tradingNotification.coin} for{" "}
              {tradingNotification.price} SOL
            </div>
          </div>
        </div>
        {tradingNotification.status !== "fail" && (
          <div className={"mt-[10px] text-right"}>
            <div
              className={"cursor-pointer text-[14px] text-white underline"}
              onClick={() => {
                window.open(`https://solscan.io/tx/${tradingNotification.signature}`, "_blank")
              }}
            >
              View on Solscan
            </div>
          </div>
        )}
      </div>
    )
  } else {
    return <></>
  }
}

export default NotificationList
