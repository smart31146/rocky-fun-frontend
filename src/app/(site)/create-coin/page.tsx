/* eslint-disable no-promise-executor-return */

"use client"

import { useState, useEffect } from "react"
import { useGeneralModal } from "@/components/customs/custom-modals/general-modal/hooks"
import { useModalOpenSelector } from "@/components/customs/custom-modals/general-modal/hooks/use-general-modal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Form, { FormField } from "@/components/ui/form"
import { PAGE_ROUTES } from "@/constants/routes"
import { cn } from "@/libs/utils/tailwind"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { CreateCoinFormState, createCoinFormSchema } from "./_schema"

import { createCoins } from "@/api/coin"
import CreateCoinErrors from "./_components/create-coin-errors"

import { useAnchorValues } from "@/anchor/setup"
import { Transaction } from "@solana/web3.js"
import BN from "bn.js"
import { getAssociatedTokenAddressSync } from "@solana/spl-token"
import { useWallet } from "@solana/wallet-adapter-react"

import { maximumUploadFileSize } from "@/constants/validation"

export interface CreateCoinProps {}

const CreateCoin = (props: CreateCoinProps) => {
  const wallet = useWallet()
  const router = useRouter()
  const anchorValues = useAnchorValues()
  const openModal = useGeneralModal(useModalOpenSelector)
  const [inlineErrorMessage, setInlineErrorMessage] = useState("")

  const methods = useForm<CreateCoinFormState>({
    resolver: zodResolver(createCoinFormSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      ticker: "",
    },
  })

  const createCoinOnChain = async (data: any) => {
    if (anchorValues) {
      try {
        const {
          program,
          connection,
          sendTransaction,
          ammId,
          ammKey,
          admin,
          mintAKeypair,
          associatedTokenAccount,
          metadataPDA,
          tokenMetadataProgram,
          poolKey,
          poolAuthority,
          poolAccountA,
          treasury,
          depositAmountA,
        } = anchorValues

        const image = new FormData()
        image.set("file", data.image)

        const res = await fetch("/api/files", {
          method: "POST",
          body: image,
        })
        const resData = await res.json()
        const imgUrl = resData.IpfsHash

        const metadataJson = JSON.stringify({
          name: data.name,
          symbol: data.ticker,
          description: data.description,
          image: process.env.NEXT_PUBLIC_GATEWAY_URL + imgUrl,
        })

        // Convert the JSON string to a Blob
        const blob = new Blob([metadataJson], { type: "application/json" })

        // Create a File object from the Blob
        const file = new File([blob], "metadata.json", { type: "application/json" })

        const pinata_metadata = new FormData()
        pinata_metadata.set("file", file)

        const res_metadata = await fetch("/api/files", {
          method: "POST",
          body: pinata_metadata,
        })
        const resMetaData = await res_metadata.json()
        const uri = resMetaData.IpfsHash

        const metadata = {
          name: data.name,
          symbol: data.ticker,
          uri: process.env.NEXT_PUBLIC_GATEWAY_URL + uri,
        }

        const create_amm_instruction = await program.methods
          .createAmm(ammId)
          .accounts({ amm: ammKey, admin: admin })
          .instruction()

        const create_mint_metadata = await program.methods
          .createTokenMint(metadata.name, metadata.symbol, metadata.uri)
          .accounts({
            payer: wallet.publicKey!,
            mintAccount: mintAKeypair.publicKey,
            associatedTokenAccount,
            metadataAccount: metadataPDA,
            tokenMetadataProgram,
          })
          .instruction()

        const create_pool_instruction = await program.methods
          .createPool()
          .accounts({
            amm: ammKey,
            pool: poolKey,
            poolAuthority,
            mintA: mintAKeypair.publicKey,
            poolAccountA,
          })
          .instruction()

        const deposit_liquidity_instruction = await program.methods
          .depositLiquidity(depositAmountA)
          .accounts({
            pool: poolKey,
            poolAuthority,
            depositor: wallet.publicKey!,
            mintA: mintAKeypair.publicKey,
            poolAccountA,
            depositorAccountA: associatedTokenAccount,
          })
          .instruction()

        const treasuryAccountA = getAssociatedTokenAddressSync(mintAKeypair.publicKey, treasury)

        const buy_token_instruction = await program.methods
          .swapExactTokensForTokens(false, new BN(Number(data.amount * 10 ** 9)), new BN(1))
          .accounts({
            amm: ammKey,
            pool: poolKey,
            poolAuthority,
            trader: wallet.publicKey!,
            mintA: mintAKeypair.publicKey,
            mintACreator: wallet.publicKey!,
            poolAccountA,
            traderAccountA: associatedTokenAccount,
            treasury: treasury,
            treasuryAccountA,
          })
          .instruction()

        const transaction = new Transaction().add(
          create_amm_instruction,
          create_mint_metadata,
          create_pool_instruction,
          deposit_liquidity_instruction,
          buy_token_instruction,
        )

        // Specify the signers needed for this transaction
        const signers = [mintAKeypair]

        const tx = await sendTransaction(transaction, connection, { signers })

        console.log(
          "mintA",
          mintAKeypair.publicKey.toString(),
          "ammKey",
          ammKey.toString(),
          "poolKey",
          poolKey.toString(),
          "poolAuthority",
          poolAuthority.toString(),
          "poolAccountA",
          poolAccountA.toString(),
        )

        return {
          mintA: mintAKeypair.publicKey.toString(),
          ammKey: ammKey.toString(),
          poolKey: poolKey.toString(),
          poolAuthority: poolAuthority.toString(),
          poolAccountA: poolAccountA.toString(),
        }

        // console.log(`View on explorer: https://solscan.io/tx/${tx}?cluster=devnet`)
      } catch (e) {
        // User reject or something
        return null
      }
    } else {
      return null
    }
  }
  const onCreateCoin = async (data: any) => {
    const coinOnChainInfo: any = await createCoinOnChain(data)

    if (!coinOnChainInfo) {
      return null
    }

    const payload = new FormData()
    payload.append("name", data.name)
    payload.append("ticker", data.ticker)
    payload.append("description", data.description)
    payload.append("file", data.image)
    payload.append("website", data.website || "")
    payload.append("twitter", data.twitter || "")
    payload.append("telegram", data.telegram || "")
    payload.append("marketCapSol", data.amount)

    payload.append("mintA", coinOnChainInfo.mintA)
    payload.append("ammKey", coinOnChainInfo.ammKey)
    payload.append("poolKey", coinOnChainInfo.poolKey)
    payload.append("poolAuthority", coinOnChainInfo.poolAuthority)
    payload.append("poolAccountA", coinOnChainInfo.poolAccountA)

    return await createCoins(payload)
  }

  const handleSubmit = methods.handleSubmit(async (values) => {
    if (!values.image) {
      methods.setError("image", { message: "must upload image" })
      return
    }

    if (values.image.size > maximumUploadFileSize) {
      setInlineErrorMessage("image too large: it must be less than 4.3 megabytes")
      return
    } else {
      setInlineErrorMessage("")
    }

    if (!wallet.publicKey) {
      setInlineErrorMessage("wallet not connected")
      return
    }

    setInlineErrorMessage("")

    openModal("BuyCoin", {
      title: `Choose how many ${values.name} <br/> you want to buy (optional)`,
      type: "modal",
      size: "xs",
      actions: [],
      async onSuccess(modalData, modaler) {
        toast.promise(
          new Promise(async (resolve) => {
            setInlineErrorMessage("")
            // Call API to create call
            const result = await onCreateCoin({ ...values, amount: Number(modalData.amount) })
            resolve(result?.data)
          }),
          {
            loading: "Loading...",
            success: (data) => {
              // @ts-ignore
              if (data?.id) {
                // @ts-ignore
                router.push(PAGE_ROUTES.COIN.replace(":id", data?.id))
                modaler.closeCurrentModal()
                return `The ${methods.getValues("name")} coin has been added`
              } else {
                modaler.closeCurrentModal()
                return `Operation failed`
              }
            },
            error: "Error",
            closeButton: true,
            duration: 300,
          },
        )
      },
      autoCloseOnSuccess: false,
    })
  })

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-[350px] flex-col gap-4 py-10"
    >
      <FormField
        labelProps={{ className: "!text-[#FFC600]" }}
        name="name"
        variant="TEXT"
        placeholder=""
        label="Name"
        size="lg"
        required
        hideError
      />
      <FormField
        labelProps={{ className: "!text-[#FFC600]" }}
        name="ticker"
        variant="TEXT"
        placeholder=""
        label="Ticker"
        size="lg"
        required
        hideError
      />
      <FormField
        labelProps={{ className: "!text-[#FFC600]" }}
        name="description"
        variant="TEXTAREA"
        placeholder=""
        label="Description"
        rows={5}
        required
        hideError
      />
      <FormField
        labelProps={{ className: "!text-[#FFC600]" }}
        name="image"
        variant="TEXT"
        type="file"
        accept="image/png, image/gif, image/jpeg, image/jpg"
        placeholder=""
        label="Image"
        className={cn(
          "file:mr-5 file:border-[1px] file:px-3 file:py-1",
          "file:rounded-md file:text-sm file:font-medium",
          "file:mt-[2px] file:max-h-[27px] hover:file:cursor-pointer hover:file:bg-blue-50",
          "file:bg-stone-50 file:text-stone-700 hover:file:text-blue-700",
        )}
        size="lg"
        required
        hideError
      />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="justify-start gap-2 p-0 text-[#FFC600]">
            More Options
          </AccordionTrigger>
          <AccordionContent className="mt-4 flex flex-col gap-4">
            <FormField
              labelProps={{ className: "text-[#FFC600]" }}
              name="website"
              variant="TEXT"
              placeholder="(Optional)"
              label="website link"
              size="lg"
            />
            <FormField
              labelProps={{ className: "text-[#FFC600]" }}
              name="twitter"
              variant="TEXT"
              placeholder="(Optional)"
              label="twitter link"
              size="lg"
            />
            <FormField
              labelProps={{ className: "text-[#FFC600]" }}
              name="telegram"
              variant="TEXT"
              placeholder="(Optional)"
              label="telegram link"
              size="lg"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="h-11 bg-[#FFC600] hover:bg-[#FFC600] md:h-9" type="submit" size="lg">
        Create coin
      </Button>

      {inlineErrorMessage && (
        <div className="rounded border border-red-300 p-2 text-red-300">{inlineErrorMessage}</div>
      )}
      <p className="text-sm font-normal leading-4">Cost to deploy: ~0.02 SOL</p>
      <CreateCoinErrors />
    </Form>
  )
}

export default CreateCoin
