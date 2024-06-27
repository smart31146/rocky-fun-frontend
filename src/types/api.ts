import { AxiosError, AxiosResponse } from "axios"

export interface FetcherResponse<TData = any, TConfig = any>
  extends AxiosResponse<TData, TConfig> {}

export interface FetcherError<TData = any, TConfig = any>
  extends AxiosError<FetcherResult<TData>, TConfig> {}

export interface FetcherResult<T = unknown> {
  data: T
  message: string
  code: string
  pagination?: FetcherPagination
}

export interface FetcherBadRequest extends Record<string, string | string[]> {}

export interface FetcherPagination {
  page: number
  size: number
  total: number
}
