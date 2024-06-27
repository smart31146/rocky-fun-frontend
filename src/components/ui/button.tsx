import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/libs/utils/tailwind"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-primary text-primary bg-transparent shadow-sm hover:bg-primary hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        muted: "bg-muted text-secondary-foreground shadow-sm hover:bg-muted/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        dark: "bg-dark",
        linear: "text-background",
        // linear: "bg-gradient-to-r from-[#FFE2E2] via-[#FFECAA] to-[#D6FFC7] text-background",
        linear2: "text-background",
        // linear2: "bg-gradient-to-r from-[#C281E1] via-[#F0D8FF] to-[#E692F3] text-background",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-7 rounded-md px-3 text-xs",
        lg: "h-9 px-2 md:h-10 rounded-md md:px-4",
        icon: "h-8 w-8",
      },
      rounded: {
        default: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const customStyles = {
      linear: {
        background: "linear-gradient(90deg, #FFC554 0%, #FFECAA 50%, #FFC600 100%)",
      },
      linear2: {
        background: "linear-gradient(90deg, #C281E1 0%, #F0D8FF 51.5%, #E692F3 100%)",
      },
    } as Record<"linear" | "linear2", React.CSSProperties>
    return (
      <Comp
        type="button"
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        style={variant ? customStyles?.[variant as "linear" | "linear2"] : undefined}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
