"use client"

import { LayoutProps, ParamsProps } from "@/types/utilities"
import CoinForm from "./_components/coin-form"
import CoinProvider from "./_components/coin-provider"
import CoinRedirection from "./_components/coin-redirection"

export interface CoinLayoutProps extends LayoutProps, ParamsProps<"id"> {}

const CoinLayout = ({ children, params: { id } }: CoinLayoutProps) => (
  <CoinProvider id={id}>
    <CoinForm>
      {children}
      <CoinRedirection />
    </CoinForm>
  </CoinProvider>
)

export default CoinLayout
