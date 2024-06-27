import { ElementRef, forwardRef } from "react"
import { Switch, SwitchProps } from "../../switch"
import { SlideProps, Slider } from "../../slider"

export interface FormSliderProps extends SlideProps {
  variant: "SLIDER"
}

const FormSlider = forwardRef<ElementRef<typeof Switch>, FormSliderProps>(
  ({ onChange, value, variant, ...props }, ref) => (
    <Slider
      value={value}
      {...props}
      ref={ref}
      onValueChange={(newValue) => onChange?.(newValue as any)}
    />
  ),
)

export default FormSlider
