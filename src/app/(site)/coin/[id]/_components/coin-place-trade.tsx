"use client"

import Image from "next/image"
import { useState } from "react"
import { notify, showTradingNotification } from "@utils/notifications"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { Transaction, PublicKey } from "@solana/web3.js"

import { useGeneralModal } from "@/components/customs/custom-modals/general-modal/hooks"
import { useModalOpenSelector } from "@/components/customs/custom-modals/general-modal/hooks/use-general-modal"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form"
import { cn } from "@/libs/utils/tailwind"
import { useCoinFormContext } from "./use-coin-form-context"
import { useAnchorValues } from "@/anchor/setup"
import BN from "bn.js"
import { getAssociatedTokenAddressSync } from "@solana/spl-token"
import { useCoinContext } from "@/app/(site)/coin/[id]/_components/use-coin-context"
import { useWalletModal } from "@contexts/WalletModalProvider"

const CoinPlaceTrade = ({ className, ...props }: any) => {
  const { coin: detail } = useCoinContext()
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const { setVisible } = useWalletModal()
  const methods = useCoinFormContext()
  const [targetButton, setTargetButton] = useState<"buy" | "sell" | null>("buy")
  const [tradeCoin, setTradeCoin] = useState<any>({ name: "SOL", image: "/assets/sol.svg" })
  const wallet = useWallet()
  const openModal = useGeneralModal(useModalOpenSelector)
  // @ts-ignore
  const coinDetail = props.data
  const anchorValues = useAnchorValues()

  const handleSetMaxSlippage = () => {
    openModal("SetMaxSlippage", {
      type: "modal",
      title: "Set max. slippage (%)",
      actions: [
        {
          type: "submit",
          text: "Close",
          props: {
            variant: "outline",
            className: "!text-white min-w-[118px]",
          },
        },
      ],
      actionProps: {
        align: "center",
      },
      onSubmit(data, make) {
        // eslint-disable-next-line no-promise-executor-return
        return make(new Promise((resolve) => resolve(true)), () => ({}))
      },
      autoCloseOnSuccess: true,
    })
  }

  const handleOpenPlaceTrade = () => {
    if (!wallet.publicKey) {
      // Show wallet selection
      setVisible(true)
      return
    }

    openModal("AddComment", {
      title: "Add a comment",
      type: "modal",
      actions: [],
      async onSubmit(data, modaler) {
        // eslint-disable-next-line no-promise-executor-return
        const { coin } = methods.getValues()
        const result = await submitTransaction(coin as number)
        return new Promise((resolve) => resolve(result))
      },
      onError: (data, modaler) => {
        modaler.closeCurrentModal()
      },
      onSuccess: (data, modaler) => {
        modaler.closeCurrentModal()
      },
      autoCloseOnSuccess: true,
      autoCloseOnError: false,
    })
  }

  const handleSetCoinValue = (val: number) => {
    methods.setValue("coin", val)
  }

  const submitTransaction = async (amount = 0) => {
    if (detail && anchorValues) {
      try {
        const { program, wallet: anchorWallet, treasury } = anchorValues

        const mintA = new PublicKey(detail.mintA)
        const ammKey = new PublicKey(detail.ammKey)
        const poolKey = new PublicKey(detail.poolKey)
        const poolAuthority = new PublicKey(detail.poolAuthority)
        const poolAccountA = new PublicKey(detail.poolAccountA)

        const mintACreator = new PublicKey(coinDetail.createdBy.wallet)

        const treasuryAccountA = getAssociatedTokenAddressSync(mintA, treasury)

        const associatedTokenAccount = getAssociatedTokenAddressSync(mintA, wallet.publicKey!)

        const swap_a = targetButton === "buy"
        // const decimals = swap_a ? 9 : 6;
        const input = swap_a
          ? new BN(Number(amount * 10 ** 9))
          : new BN(Number(amount)).mul(new BN(10 ** 6))

        const buy_token_instruction = await program.methods
          .swapExactTokensForTokens(!swap_a, input, new BN(1))
          .accounts({
            amm: ammKey,
            pool: poolKey,
            poolAuthority,
            trader: wallet.publicKey!,
            mintA,
            mintACreator,
            poolAccountA,
            traderAccountA: associatedTokenAccount,
            treasury,
            treasuryAccountA,
          })
          .instruction()

        const transaction = new Transaction().add(buy_token_instruction)

        const {
          context: { slot: minContextSlot },
          value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext()

        const signature = await wallet.sendTransaction(transaction, connection, { minContextSlot })

        console.log(`View on explorer: https://solscan.io/tx/${signature}?cluster=devnet`)
        showTradingNotification({
          status: "confirming",
          coin: "MEME",
          price: 10,
          amount,
          signature,
        })

        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature })

        showTradingNotification({ status: "success", coin: "MEME", price: 10, amount, signature })

        return true
      } catch (error: any) {
        showTradingNotification({ status: "fail", coin: "MEME", price: 10, amount, signature: "" })

        return false
      }
    } else {
      return false
    }
  }

  const switchCoin = () => {
    // Using current coin, switch to solana
    if (tradeCoin.name === coinDetail?.name) {
      setTradeCoin({
        name: "SOL",
        image: "/assets/sol.svg",
      })
    } else {
      // else set to current coin
      setTradeCoin({
        name: coinDetail?.name,
        image: coinDetail?.image,
      })
    }
  }

  return (
    <div {...props} className={cn("flex flex-col gap-4 bg-card p-4", className)}>
      <div className="group flex gap-3 [&>*]:flex-1">
        <Button
          type="button"
          size="lg"
          variant={targetButton === "buy" ? "default" : "dark"}
          onClick={() => setTargetButton("buy")}
        >
          Buy
        </Button>
        <Button
          type="button"
          size="lg"
          variant={targetButton === "sell" ? "default" : "dark"}
          onClick={() => setTargetButton("sell")}
        >
          Sell
        </Button>
      </div>

      <div className="flex justify-between">
        {coinDetail && (
          <Button type="button" size="sm" variant="muted" onClick={switchCoin}>
            switch to {tradeCoin.name === coinDetail?.name ? "SOL" : coinDetail?.name}
          </Button>
        )}
        <Button type="button" size="sm" variant="muted" onClick={handleSetMaxSlippage}>
          Set max slippage
        </Button>
      </div>

      <div className="relative">
        <FormField
          size="lg"
          name="coin"
          type="number"
          variant="TEXT"
          inputMode="numeric"
          placeholder="0.0"
          className="pr-24"
        />

        {tradeCoin?.name === "SOL" && (
          <Image
            src={tradeCoin.image}
            alt="Sol"
            width={62}
            height={62}
            className="absolute right-2 top-1/2 h-auto w-[62px] -translate-y-1/2 transform object-cover"
          />
        )}

        {tradeCoin?.name === coinDetail?.name && (
          <div className={"absolute right-2 top-1/2 flex -translate-y-1/2 items-center"}>
            <div className={"relative mr-[8px] h-[24px] w-[32px]"}>
              <Image
                src={tradeCoin.image}
                alt="Sol"
                fill
                className="h-[24px] w-auto object-contain"
              />
            </div>

            <div>{tradeCoin?.name}</div>
          </div>
        )}
      </div>

      {tradeCoin?.name === "SOL" && (
        <div className="flex flex-wrap gap-1">
          <Button
            className="rounded-md"
            size="sm"
            variant="muted"
            onClick={() => handleSetCoinValue(0)}
          >
            reset
          </Button>
          <Button
            className="rounded-md"
            size="sm"
            variant="muted"
            onClick={() => handleSetCoinValue(1)}
          >
            1 SOL
          </Button>
          <Button
            className="rounded-md"
            size="sm"
            variant="muted"
            onClick={() => handleSetCoinValue(5)}
          >
            5 SOL
          </Button>
          <Button
            className="rounded-md"
            size="sm"
            variant="muted"
            onClick={() => handleSetCoinValue(10)}
          >
            10 SOL
          </Button>
        </div>
      )}

      <div className="w-full">
        <Button
          className="h-11 w-full md:h-9"
          size="lg"
          type="button"
          onClick={handleOpenPlaceTrade}
        >
          Place Trade
        </Button>
        {/* <p className="mt-2 text-sm">Max Buy: 100M</p> */}
      </div>
    </div>
  )
}

export default CoinPlaceTrade
