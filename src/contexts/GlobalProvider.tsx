"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

import { notify } from "@utils/notifications"
import { api } from "@/api/axios"

const GlobalContext = createContext<any>({
  coins: [],
})

export const GlobalProvider = ({ children }: Props) => {
  const axiosErrorHandler = () => {
    // // Add a request interceptor
    api.interceptors.response.use(
      function (config) {
        // Do something before request is sent
        return config
      },
      function (error) {
        if (error && error.response) {
          const { status = 0, data } = error.response
          if (status === 401) {
            notify({ type: "error", message: data.message })
          } else {
            if (status === 400) {
              notify({ type: "error", message: error.message })
            }
          }
        }
        // Do something with request error
        return Promise.reject(error)
      },
    )
  }

  // Logged in to wallet, now login to our system
  useEffect(() => {
    axiosErrorHandler()
  }, [])

  return <GlobalContext.Provider value={useMemo(() => ({}), [])}>{children}</GlobalContext.Provider>
}

interface Props {
  children: any
}

export const useGlobal = () => useContext(GlobalContext)
