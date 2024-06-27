"use client"

import { cn } from "@/libs/utils/tailwind"
import { isNil } from "lodash"
import { Search } from "lucide-react"
import { ChangeEventHandler, forwardRef } from "react"
import { Input, InputProps } from "../../input"

export interface FormInputProps extends InputProps {
  variant: "TEXT" | "SEARCH"
  noNativeNumber?: boolean

  searchIconClassName?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ variant, noNativeNumber, searchIconClassName, ...props }, ref) => {
    if (variant === "SEARCH") {
      return (
        <div className="relative flex items-center gap-1">
          <Search
            className={cn(
              "absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform",
              searchIconClassName,
            )}
          />
          <Input {...props} className={cn("pr-8", props.className)} ref={ref} />
        </div>
      )
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      if (props.type !== "number") {
        props?.onChange?.(event)
        return
      }

      if (props.type === "number") {
        const originalValue = event.target.value.replace(/(\.\.)|(\.\d+\.)/g, "")
        const dots = originalValue.match(/\./g) || []
        let val = Number.isNaN(Number(originalValue)) ? Number(props.value) : Number(originalValue)

        if (dots.length >= 2) {
          val = Number(originalValue.toString().replace(/\.+$/g, ""))
        }

        const max = props.max ? Number(props.max) : null
        const min = props.min ? Number(props.min) : null

        if (!isNil(min) && val <= min) val = min
        if (!isNil(max) && val >= max) val = max

        if (!/\.$/.test(originalValue)) {
          ;(event as any).target.value = val
        }
        props?.onChange?.(event)
      }
    }

    return (
      <Input
        {...props}
        type={noNativeNumber && props.type === "number" ? "text" : props.type}
        onChange={handleChange}
        ref={ref}
      />
    )
  },
)

FormInput.displayName = "FormInput"

export default FormInput
