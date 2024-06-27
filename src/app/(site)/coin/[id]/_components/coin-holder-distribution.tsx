"use client"

import { ComponentPropsWithoutRef, useEffect, useState } from "react"
import { cn } from "@/libs/utils/tailwind"
import { useAnchorValues } from "@/anchor/setup"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { ParsedAccountData, PublicKey } from "@solana/web3.js"
import { useCoinContext } from "@/app/(site)/coin/[id]/_components/use-coin-context"
import { useConnection } from "@solana/wallet-adapter-react"
import { Helius } from "helius-sdk"

export interface CoinHolderDistributionProps extends ComponentPropsWithoutRef<"div"> {}

const CoinHolderDistribution = (props: CoinHolderDistributionProps) => {
  const { connection } = useConnection()
  const { coin: detail, setCoinChainData } = useCoinContext()
  const anchorValues = useAnchorValues()
  const [holders, setHolders] = useState<any[]>([])

  const getHolders = async () => {
    if (detail) {
      const { mintA, poolAuthority } = detail

      const data: { name: string; percentage: string }[] = []

      let bondingCurveProcess = 0
      // Extract the owner and token balance of each token account

      // Retrieve all Token Accounts for the Mint Account
      const helius = new Helius(process.env.NEXT_PUBLIC_HELIUS_KEY!, "devnet")

      const all_holders = await helius.connection.getTokenLargestAccounts(
        new PublicKey(mintA),
        "confirmed",
      )

      console.log(all_holders)

      all_holders.value.forEach((account: any) => {
        const tokenAmount = account.uiAmount
        if (tokenAmount > 0) {
          const percentage = (tokenAmount / 10 ** 6 / 10).toFixed(3)
          if (account.address === poolAuthority) {
            data.push({
              name: `${account.address.slice(0, 6)} 🤵‍ (dev)`,
              percentage: `${percentage}%`,
            })
            bondingCurveProcess = (800 - Number(percentage)) / 57.5
          } else {
            data.push({
              name: account.address.slice(0, 6),
              percentage: `${percentage}%`,
            })
          }
        }
      })
      setCoinChainData({ bondingCurveProcess })

      setHolders(data)
    }
  }

  useEffect(() => {
    if (connection && detail) {
      getHolders()
    }
  }, [detail])

  return (
    <div {...props}>
      <h2 className="mb-5 text-lg font-bold leading-6">Holder distribution</h2>

      <ul className="flex list-decimal flex-col">
        {holders.map((item) => (
          <li
            key={item.name}
            className={cn(
              "flex items-center justify-between",
              "text-sm font-normal",
              "leading-6 text-foreground-secondary",
            )}
          >
            <span className="underline">{item.name}</span> <span>{item.percentage}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CoinHolderDistribution
