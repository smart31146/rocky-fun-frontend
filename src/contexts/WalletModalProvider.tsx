import React, { createContext, FC, useContext, useMemo, useState } from "react"
import WalletModal from "@components/WalletModal"

const WalletModalContext = createContext<any>({
  visible: false,
  setVisible: (open: boolean) => {},
})

export const WalletModalProvider = ({ children }: Props) => {
  const [visible, setVisible] = useState(false)

  return (
    <WalletModalContext.Provider
      value={useMemo(
        () => ({
          visible,
          setVisible,
        }),
        [visible, setVisible],
      )}
    >
      {children}
      {visible && <WalletModal open={visible} setOpen={setVisible} />}
    </WalletModalContext.Provider>
  )
}

interface Props {
  children: any
}

export const useWalletModal = () => useContext(WalletModalContext)
