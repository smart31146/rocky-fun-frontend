import * as React from "react"

import { VariantProps, cva } from "class-variance-authority"
import { cn } from "../../libs/utils/tailwind"

export const inputVariants = cva(
  [
    "flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-placeholder",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        default: "h-9",
        lg: "h-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

export interface InputVariantProps extends VariantProps<typeof inputVariants> {}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariantProps {
  hasError?: boolean
  outerRef?: any
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError, outerRef, size = "default", ...props }, ref) => (
    <input {...props} type={type} className={cn(inputVariants({ size, className }))} ref={ref} />
  ),
)
Input.displayName = "Input"

export { Input }
