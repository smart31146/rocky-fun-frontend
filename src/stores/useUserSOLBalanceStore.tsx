/* eslint-disable no-console */
/* eslint-disable operator-assignment */
/* eslint-disable consistent-return */
import { State, create } from "zustand"
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"

// @ts-ignore
interface UserSOLBalanceStore extends State {
  balance: number
  getUserSOLBalance: (publicKey: PublicKey, connection: Connection) => void
}

const useUserSOLBalanceStore = create<UserSOLBalanceStore>((set, _get) => ({
  balance: 0,
  getUserSOLBalance: async (publicKey, connection) => {
    let balance = 0
    try {
      balance = await connection.getBalance(publicKey, "confirmed")
      balance = balance / LAMPORTS_PER_SOL

      return set((state) => ({ balance }))
    } catch (e) {}
  },
}))

export default useUserSOLBalanceStore
