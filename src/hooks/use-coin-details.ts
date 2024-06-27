import { getCoinDetail } from "@/api/coin"
import { FetcherResult } from "@/types/api"
import { Coin } from "@/types/entities"
import { createQuery, createSuspenseQuery } from "react-query-kit"

export interface UseCoinDetailsResponse extends FetcherResult<Coin> {}
export interface UseCoinDetailsVariables {
  id: string | number
}
export interface UseCoinDetailsError {}

export const useCoinDetails = createQuery<
  UseCoinDetailsResponse,
  UseCoinDetailsVariables,
  UseCoinDetailsError
>({
  queryKey: ["getCoinDetail"],
  fetcher: (variables) => {
    return getCoinDetail(
      typeof variables?.id === "number" ? variables?.id : parseInt(variables?.id),
    )
  },
})

export const useSuspenseCoinDetails = createSuspenseQuery<
  UseCoinDetailsResponse,
  UseCoinDetailsVariables,
  UseCoinDetailsError
>({
  queryKey: ["getCoinDetailSuspense"],
  fetcher: (variables) => {
    return getCoinDetail(
      typeof variables?.id === "number" ? variables?.id : parseInt(variables?.id),
    )
  },
})
