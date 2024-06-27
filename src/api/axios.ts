import axios from "axios"

// Primary APIs
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
  timeout: 200000,
})

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    error["message"] = error?.response?.data?.message
    return Promise.reject(error)
  },
)

export function setAuthHeader(token: string) {
  api.defaults.headers.authorization = `Bearer ${token}`
}

export function clearAuthHeader() {
  delete api.defaults.headers.authorization
}
