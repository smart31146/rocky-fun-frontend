export const PAGE_ROUTES = {
  HOME: "/",
  CREATE_COIN: "/create-coin",
  CONNECT_WALLET: "/connect-wallet",

  COIN: "/coin/:id",
  COIN_INFO: "/coin/:id/info",
  COIN_CHART: "/coin/:id/chart",
  COIN_TXS: "/coin/:id/txs",
  COIN_BUY_SELL: "/coin/:id/buy-sell",
  COIN_PROFILE: "/coin/:id/profile",

  PROFILE: "/profile",
} as const
