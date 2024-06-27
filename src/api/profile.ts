import { api } from "./axios"

export const editProfile = async (data: any) => {
  try {
    const result = await api.put(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/api/users/update-profile`,
      data,
    )
    return result.data
  } catch (e: any) {
    return {
      error: true,
      data: null,
      errors: [e.message || "Internal Server Error"],
    }
  }
}

export const getUserProfile = async (id: number) => {
  try {
    const result = await api.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/users/${id}`)
    return result.data
  } catch (e) {
    return {
      error: true,
      data: null,
      errors: [],
    }
  }
}

export const getMyProfile = async () => {
  try {
    const result = await api.get(`${process.env.NEXT_PUBLIC_API_END_POINT}/api/users/profile`)
    return result.data
  } catch (e) {
    return { data: null }
  }
}
