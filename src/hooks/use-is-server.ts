import { useSyncExternalStore } from "react"

const subscribe = () => () => {}

export const useIsServer = () =>
  useSyncExternalStore(
    subscribe,
    () => false,
    () => true,
  )
