export interface User {
  id: number
  wallet: string
  username: string
  avatar: string
  usernameChangedAt: string
  updatedAt: string
  createdAt: string
}

export interface Coin {
  id: number
  createdBy: User
  name: string
  ticker: string
  description: string
  website: string
  twitter: string
  telegram: string
  nsfw: boolean
  marketCapSol: number
  updatedAt: string
  createdAt: string
  image: string
  mintA: string
  ammKey: string
  poolKey: string
  poolAuthority: string
  poolAccountA: string

  // TODO: Need to add this field to backend
  volume: number
}
