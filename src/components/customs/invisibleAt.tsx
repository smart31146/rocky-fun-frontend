import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export interface InvisibleAtProps {
  path: string
  children: ReactNode
}

const InvisibleAt = ({ path, children }: InvisibleAtProps) => {
  const pathname = usePathname()

  if (pathname === path) return null

  return children
}

export default InvisibleAt
