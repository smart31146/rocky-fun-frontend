import React, { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "@/libs/utils/tailwind"

export interface CoinGraphGroupProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
}

const CoinGraphGroup = ({ children, className, ...props }: CoinGraphGroupProps) => (
  <div {...props} className={cn(className)}>
    {children}
  </div>
)

export default CoinGraphGroup
