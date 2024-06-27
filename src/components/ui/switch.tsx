"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "../../libs/utils/tailwind"

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
      className={cn(
        "peer relative inline-flex h-[22px] w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#D9D9D9]",
        className,
      )}
      {...props}
      ref={ref}
    >
      <span className={cn("absolute left-[2px] top-1/2 -translate-y-1/2 transform text-[7.8px]")}>
        ON
      </span>
      <span
        className={cn(
          "absolute right-[2px] top-1/2 -translate-y-1/2 transform text-[7.8px] text-black",
        )}
      >
        OFF
      </span>

      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-[18px] w-[18px] rounded-full",
          "bg-white shadow-lg ring-0 transition-transform",
          "data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitives.Root>
  ),
)
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
