import { api } from "./axios"
export const login = async (data: any) => {
  try {
    const result = await api.post(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/auth/login`, data)
    return result.data
  } catch (e) {
    return {
      error: true,
      data: null,
      errors: [],
    }
  }
}
