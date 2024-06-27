"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"
import * as React from "react"

import { cn } from "@/libs/utils/tailwind"

export interface SlideProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  thumb?: React.ReactNode
  thumbProps?: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>

  trackProps?: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track>

  rangeProps?: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range>
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SlideProps>(
  ({ className, thumb, thumbProps, rangeProps, trackProps, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Track
        {...trackProps}
        className={cn(
          "relative h-1.5 w-full grow overflow-hidden rounded-full bg-[#494949]",
          trackProps?.className,
        )}
      >
        <SliderPrimitive.Range
          {...rangeProps}
          className={cn("absolute h-full bg-primary", rangeProps?.className)}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        {...thumbProps}
        className={cn(
          "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          thumbProps?.className,
        )}
      >
        {thumb}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  ),
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
