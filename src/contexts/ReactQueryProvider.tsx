"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

/**
 * Read docs:
 * - https://tanstack.com/query/v5/docs/react/guides
 * - https://tanstack.com/query/v5/docs/react/guides
 */

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"

let __queryClientInstance: QueryClient

export const getQueryClientInstance = () => {
  if (!__queryClientInstance)
    __queryClientInstance = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 1000,
          retry(failureCount, error) {
            return false
          },
        },
      },
    })

  return __queryClientInstance
}

export const getQueryClient = getQueryClientInstance()

export interface ReactQueryProviderProps {
  children: ReactNode
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [queryClient] = useState(() => getQueryClientInstance())

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
