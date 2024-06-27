import dynamic, { DynamicOptions, Loader } from "next/dynamic"
import { forwardRef } from "react"
import { Skeleton } from "../skeleton"

const takeInput = <T,>(options: DynamicOptions<T> | Loader<T>) => {
  const Component = dynamic(options, {
    ssr: true,
    loading: () => <Skeleton className="h-[40px] w-full" />,
  }) as any

  return forwardRef<any, any>((props, ref) => <Component {...props} outerRef={ref} />)
}

export const FormInput = takeInput(() => import("./components/form-input"))
export const FormSwitchOnOff = takeInput(() => import("./components/form-switch-on-off"))
export const FormTextarea = takeInput(() => import("./components/form-textarea"))
export const FormCheckbox = takeInput(() => import("./components/form-checkbox"))
export const FormSwitch = takeInput(() => import("./components/form-switch"))
export const FormSlider = takeInput(() => import("./components/form-slider"))
// export const RadioGroup = takeInput(() => import("./components/form-radio-group"))
export const FormSelect = takeInput(() => import("./components/form-select"))
// export const FormSelectInfinite = takeInput(() => import("./components/form-select-infinite"))
// export const FormUID = takeInput(() => import("./components/form-uid"))
// export const FormNumber = takeInput(() => import("./components/form-number"))
// export const FormRichEditor = takeInput(() => import("./components/form-rich-editor"))
// export const FormDatePicker = takeInput(() => import("./components/form-datepicker"))
