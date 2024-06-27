import queryString from "query-string"
import { api } from "./axios"

export const getDatafeed = async (filter = {}) => {
  try {
    const result = await api.get(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/api/datafeed/data?${queryString.stringify(filter)}`,
    )
    return result.data
  } catch (e) {
    return {
      error: true,
      data: null,
      errors: [],
    }
  }
}

export const getSymbol = async (ticker: string) => {
  try {
    const result = await api.get(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/api/datafeed/symbol?${queryString.stringify({ ticker })}`,
    )
    return result.data
  } catch (e) {
    return {
      error: true,
      data: null,
      errors: [],
    }
  }
}
