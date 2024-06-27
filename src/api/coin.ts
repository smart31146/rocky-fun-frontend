import queryString from "query-string"
import { api } from "./axios"

export const getCoins = async (page: number, filter: any) => {
  try {
    const result = await api.get(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/api/coins?${queryString.stringify({
        page,
        ...filter,
      })}`,
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

export const getCoinDetail = async (id: number) => {
  try {
    const result = await api.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/coins/${id}`)
    return result.data
  } catch (e) {
    return {
      error: true,
      data: null,
      errors: [],
    }
  }
}

export const createCoins = async (data: any) => {
  try {
    const result = await api.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/coins`, data)
    return result.data
  } catch (e) {
    return {
      error: true,
      data: null,
      errors: [],
    }
  }
}

export const addComment = async (data: any) => {
  try {
    const result = await api.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/comments`, data)
    return result.data
  } catch (e) {
    return {
      error: true,
      data: null,
      errors: [],
    }
  }
}
