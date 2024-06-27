"use client"

import ImageWithFallback from "@/components/ui/images/image-with-fallback"
import { Pagination } from "@/components/ui/pagination-z"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/libs/utils/tailwind"
import useCoinStore from "@/stores/useCoinStore"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { ComponentPropsWithoutRef, useEffect, useState } from "react"

dayjs.extend(relativeTime)

export interface CoinGraphTradesProps extends ComponentPropsWithoutRef<"div"> {
  hideDate?: boolean
  hideTxs?: boolean
}

const CoinGraphTrades = ({ className, hideDate, hideTxs, ...props }: CoinGraphTradesProps) => {
  const invoices = useCoinStore((state) => state.tradingEvents)
  const [activeItem, setActiveItem] = useState<string>()

  // Apply shake to the first item
  useEffect(() => {
    setActiveItem(invoices[0]?.txs)
  }, [invoices])

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-xs text-foreground-secondary">User</TableHead>
            <TableHead className="text-xs text-foreground-secondary">type</TableHead>
            <TableHead className="text-xs text-foreground-secondary">SOL</TableHead>
            <TableHead className="text-xs text-foreground-secondary">Boden</TableHead>
            {!hideDate ? (
              <TableHead className="text-xs text-foreground-secondary">Date</TableHead>
            ) : null}
            {!hideTxs ? (
              <TableHead className="hidden text-xs text-foreground-secondary md:block">
                Txs
              </TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={index} className={activeItem === invoice.txs ? "animate-shake" : ""}>
              <TableCell className="flex w-[100px] max-w-[160px] gap-2.5 bg-card text-xs md:w-[200px]">
                <ImageWithFallback
                  src={invoice.src}
                  alt="coin"
                  width={14}
                  height={14}
                  className="h-3.5 w-3.5 rounded-full object-cover"
                  fallback="/assets/avatar_2.png"
                />
                <p
                  style={{ color: invoice.user.color, borderColor: invoice.user.color }}
                  className="whitespace-nowrap rounded border px-[3px] py-[2px]"
                >
                  {invoice.user.name}
                </p>
              </TableCell>
              <TableCell
                className={cn(
                  "bg-card text-xs",
                  invoice.type === "buy" ? "text-green-300" : "text-red-300",
                )}
              >
                {invoice.type}
              </TableCell>
              <TableCell className="bg-card text-xs">{invoice.sol}</TableCell>
              <TableCell className="bg-card text-xs">{invoice.boden}</TableCell>
              {!hideDate ? (
                <TableCell className="bg-card text-xs">
                  {dayjs(invoice.date).isValid() ? dayjs(invoice.date).fromNow() : "-"}
                </TableCell>
              ) : null}
              {!hideTxs ? (
                <TableCell className="hidden bg-card text-xs md:block">{invoice.txs}</TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-8 flex items-center justify-center">
        <Pagination currentPage={0} totalPages={3} />
      </div>
    </>
  )
}

export default CoinGraphTrades
