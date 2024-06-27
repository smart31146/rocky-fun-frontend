"use client"

import { useEffect, useState } from "react"
import { AnchorProvider, Program } from "@coral-xyz/anchor"
import { getAssociatedTokenAddressSync } from "@solana/spl-token"
import { Rocketfun, IDL } from "./rocketfun"
import { AnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Keypair, PublicKey } from "@solana/web3.js"
import { BN } from "bn.js"

export const useAnchorValues = () => {
  const { connection } = useConnection()
  const { sendTransaction } = useWallet()

  const wallet = useWallet()

  if (!wallet || !wallet.publicKey) {
    return null
  }

  const provider = new AnchorProvider(connection, wallet as AnchorWallet, {
    commitment: "confirmed",
  })

  const programId = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!)
  const program = new Program<Rocketfun>(IDL, programId, provider)

  const admin = new PublicKey(process.env.NEXT_PUBLIC_ADMIN!)
  const ammId = Keypair.generate().publicKey
  const ammKey = PublicKey.findProgramAddressSync([ammId.toBuffer()], programId)[0]
  const mintAKeypair = Keypair.generate()
  const treasury = new PublicKey(process.env.NEXT_PUBLIC_TREASURY!)

  const associatedTokenAccount = getAssociatedTokenAddressSync(
    mintAKeypair.publicKey,
    wallet.publicKey!,
  )

  const tokenMetadataProgram = new PublicKey(process.env.NEXT_PUBLIC_METADATA_PROGRAM_ID!)

  // Derive PDA for metadata account
  const [metadataPDA, _] = PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), tokenMetadataProgram.toBuffer(), mintAKeypair.publicKey.toBuffer()],
    tokenMetadataProgram, // The public key of the token metadata program
  )

  const poolAuthority = PublicKey.findProgramAddressSync(
    [ammKey.toBuffer(), mintAKeypair.publicKey.toBuffer(), Buffer.from("authority")],
    programId,
  )[0]

  const poolKey = PublicKey.findProgramAddressSync(
    [ammKey.toBuffer(), mintAKeypair.publicKey.toBuffer()],
    programId,
  )[0]

  const poolAccountA = getAssociatedTokenAddressSync(mintAKeypair.publicKey, poolAuthority, true)

  return {
    program,
    connection,
    sendTransaction,
    ammId,
    admin,
    wallet,
    ammKey,
    mintAKeypair,
    associatedTokenAccount,
    tokenMetadataProgram,
    metadataPDA,
    poolKey,
    poolAuthority,
    poolAccountA,
    treasury,
    depositAmountA: new BN(800000000).mul(new BN(10 ** 6)),
  }
}
