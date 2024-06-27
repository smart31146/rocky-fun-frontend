"use client"

import { usePathname } from "next/navigation"
import React, { useEffect } from "react"

const Template = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname()

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    })
  }, [pathname])

  return children
}

export default Template
