"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

import { login } from "@/api/auth"
import { getMyProfile } from "@/api/profile"
import { useWallet } from "@solana/wallet-adapter-react"

import { setAuthHeader, clearAuthHeader } from "@/api/axios"
import bs58 from "bs58"

const AuthContext = createContext<any>({
  status: "unauthenticated", // unauthenticated, authenticating, authenticated
  user: null,
  onLogin: () => {},
  setUser: () => {},
})

export const AuthProvider = ({ children }: Props) => {
  const { publicKey, disconnect, connected, connecting, signMessage } = useWallet()

  const isSignedMessage = () => {
    return localStorage.getItem("signedMessage") || false
  }

  const [status, setStatus] = useState("unauthenticated")
  const [user, setUser] = useState<any>(null)

  const [showWalletDetailModal, setShowWalletDetailModal] = useState(false)
  const [showConfirmWalletModal, setShowConfirmWalletModal] = useState(false)
  const [cancelSendMessage, setCancelSendMessage] = useState(false)

  const onLogin = async (payload: any) => {
    const { data } = await login(payload)

    if (data) {
      // Store current user
      setUser(data)

      // Store token to local storage
      localStorage.setItem("token", data?.token)

      // Set token to axios header
      setAuthHeader(data?.token)

      setStatus("authenticated")
    } else {
      disconnect()
    }
  }

  const logout = () => {
    // Clear user data
    setUser(null)

    // Remove token in local storage
    localStorage.removeItem("token")

    // Clear token in axios header
    clearAuthHeader()

    setStatus("unauthenticated")

    setShowWalletDetailModal(false)

    localStorage.removeItem("signedMessage")
  }

  const onSignMessage = async () => {
    if (signMessage && !isSignedMessage()) {
      setShowConfirmWalletModal(true)

      const timestamp = new Date().getTime()
      const message = new TextEncoder().encode(`Sign in to RocketFun: ${timestamp}`)

      await signMessage(message)
        .then(async (result) => {
          const signature = bs58.encode(result as Uint8Array)

          onLogin({ signature, address: publicKey?.toBase58(), timestamp })

          // Accept sign
          setShowConfirmWalletModal(false)
          setCancelSendMessage(false)

          // Set this status to local storage so that it wont ask in the next time
          localStorage.setItem("signedMessage", "true")

          // Show detail modal
          setShowWalletDetailModal(true)
        })
        .catch((reason) => {
          // Decline
          setCancelSendMessage(true)
          localStorage.removeItem("signedMessage")
        })
    }
  }

  const onGetProfile = async () => {
    const { data } = await getMyProfile()

    if (data) {
      // Store current user
      setUser(data)

      setStatus("authenticated")

      setShowWalletDetailModal(true)
    } else {
      disconnect()
      setStatus("unauthenticated")
      localStorage.removeItem("signedMessage")
    }
  }

  // Wallet changing from connecting to connected, sign the message
  useEffect(() => {
    if (!connecting && connected) {
      // If not sign, do sign and login now
      if (!isSignedMessage()) {
        onSignMessage()
      } else {
        // Already sign
        // Check token exist
        const token = localStorage.getItem("token")
        // No token, disconnect wallet now
        if (!token) {
          disconnect()
        } else {
          // If it has token
          // Set token to axios header
          setAuthHeader(token)
          // Get profile, if token is invalid, disconnect wallet, set status unauthenticated, remove saved token
          onGetProfile()
        }
      }
    }
  }, [connecting])

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          status,
          user,
          onLogin,
          setUser,
          onSignMessage,
          showWalletDetailModal,
          showConfirmWalletModal,
          cancelSendMessage,
          setShowWalletDetailModal,
          setShowConfirmWalletModal,
          logout,
        }),
        [status, user, showWalletDetailModal, showConfirmWalletModal, cancelSendMessage],
      )}
    >
      {children}
    </AuthContext.Provider>
  )
}

interface Props {
  children: any
}

export const useAuth = () => useContext(AuthContext)
