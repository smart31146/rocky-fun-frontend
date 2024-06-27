import { api } from "./axios"
export const getCommentsByCoin = async (coinId: number) => {
  try {
    const result = await api.get(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/api/comments?limit=12&offset=0&page=0&coinId=${coinId}`,
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
