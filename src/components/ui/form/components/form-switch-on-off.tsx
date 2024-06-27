import { ElementRef, forwardRef } from "react"
import { cn } from "@/libs/utils/tailwind"
import { Button } from "../../button"
import { SwitchProps } from "../../switch"

export interface FormSwitchOnOffProps extends SwitchProps {
  variant: "SWITCH_ONOFF"
}

const FormSwitchOnOff = forwardRef<ElementRef<"div">, FormSwitchOnOffProps>(
  ({ variant, onChange, value, className }, ref) => {
    const currentValue = value ? "On" : "Off"

    return (
      <div
        className={cn(
          "flex items-center overflow-hidden rounded-md border border-primary",
          className,
        )}
        ref={ref}
      >
        {["On", "Off"].map((label) => {
          const isActive = currentValue === label
          const isOn = label === "On"
          return (
            <Button
              type="button"
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "h-6 w-7 rounded-none border-none md:h-8 md:w-9",
                isActive
                  ? "text-primary-foreground hover:text-active"
                  : "text-primary hover:text-primary",
              )}
              onClick={(e) => onChange?.(isOn as any)}
            >
              {label}
            </Button>
          )
        })}
      </div>
    )
  },
)

export default FormSwitchOnOff
