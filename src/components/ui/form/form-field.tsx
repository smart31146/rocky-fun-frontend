"use client"

import { cn } from "@/libs/utils/tailwind"
import { LabelProps } from "@radix-ui/react-label"
import get from "lodash/get"
import { Asterisk } from "lucide-react"
import { HTMLInputTypeAttribute, forwardRef } from "react"
import { FormCheckboxProps } from "./components/form-checkbox"
import { FormInputProps } from "./components/form-input"
import { FormSelectProps } from "./components/form-select"
import { FormSliderProps } from "./components/form-slider"
import { FormSwitchProps } from "./components/form-switch"
import { FormSwitchOnOffProps } from "./components/form-switch-on-off"
import { FormTextareaProps } from "./components/form-textarea"
import { FORM_UNIFIED_VARIANT } from "./constants"
import FormControl from "./form-control"
import FormDescription from "./form-description"
import {
  // FormNumber,
  // FormRichEditor,
  FormCheckbox,
  // FormDatePicker,
  FormInput,
  FormSelect,
  FormSlider,
  FormSwitch,
  FormSwitchOnOff,
  FormTextarea,
} from "./form-field-imports"
import FormFieldInternal from "./form-field-internal"
import FormItem from "./form-item"
import FormLabel from "./form-label"
import FormMessage from "./form-message"

export type FormFieldVariantBaseProps =
  | FormTextareaProps
  | FormInputProps
  | FormSwitchOnOffProps
  | FormCheckboxProps
  | FormSliderProps
  // | FormRadioGroupProps
  // | FormUIDProps
  // | FormNumberProps
  // | FormRichEditorProps
  // | FormDatePickerProps
  | FormSelectProps
  | FormSwitchProps

export interface FormFieldStandardBaseProps {
  type?: HTMLInputTypeAttribute
  name: string
  id?: string
  label?: string
  labelProps?: LabelProps
  placeholder?: string
  description?: string
  disabled?: boolean
  required?: boolean

  wrapperClassName?: string
  className?: string
  direction?: "horizontal" | "vertical"
  hideError?: boolean
}

const FORM_UNIFIED_VARIANT_LOADER = {
  [FORM_UNIFIED_VARIANT.TEXT]: FormInput,
  [FORM_UNIFIED_VARIANT.SEARCH]: FormInput,
  [FORM_UNIFIED_VARIANT.SWITCH_ONOFF]: FormSwitchOnOff,
  [FORM_UNIFIED_VARIANT.TEXTAREA]: FormTextarea,
  [FORM_UNIFIED_VARIANT.CHECKBOX]: FormCheckbox,
  [FORM_UNIFIED_VARIANT.SWITCH]: FormSwitch,
  [FORM_UNIFIED_VARIANT.SLIDER]: FormSlider,
  // [FORM_UNIFIED_VARIANT.RADIO_GROUP]: FormRadioGroup,
  // [FORM_UNIFIED_VARIANT.UID]: FormUID,
  // [FORM_UNIFIED_VARIANT.NUMBER]: FormNumber,
  // [FORM_UNIFIED_VARIANT.RICH_EDITOR]: FormRichEditor,
  // [FORM_UNIFIED_VARIANT.DATE_PICKER]: FormDatePicker,
  [FORM_UNIFIED_VARIANT.SELECT]: FormSelect,
  // [FORM_UNIFIED_VARIANT.SELECT_INFINITE]: FormSelectInfinite,
} as Record<keyof typeof FORM_UNIFIED_VARIANT, any>

const FormField = forwardRef<
  HTMLDivElement,
  FormFieldStandardBaseProps & FormFieldVariantBaseProps
>(
  (
    {
      name,
      variant,
      description,
      label,
      labelProps,
      wrapperClassName,
      className,
      direction = "vertical",
      required,
      hideError,
      ...baseProps
    },
    ref,
  ) => {
    const InputComp = FORM_UNIFIED_VARIANT_LOADER[variant] as any

    return (
      <FormFieldInternal
        name={name}
        render={({ field, formState: { errors } }) => {
          const _error = get(errors, name)
          const shouldHorizontalShowing = direction === "horizontal"

          return (
            <FormItem
              className={cn(
                wrapperClassName,
                shouldHorizontalShowing ? "flex items-center gap-2 space-y-0" : "",
              )}
              ref={ref}
            >
              {label ? (
                <FormLabel
                  {...labelProps}
                  className={cn(
                    "flex items-center",
                    labelProps?.className,
                    // shouldHorizontalShowing ? "order-2" : ""
                  )}
                >
                  {label}
                  {required ? <Asterisk className="ml-1 h-3 w-3 text-destructive" /> : ""}
                </FormLabel>
              ) : null}
              <FormControl>
                <InputComp
                  {...field}
                  {...baseProps}
                  value={baseProps.type === "file" ? undefined : field.value}
                  onChange={(event: any) => {
                    if (baseProps.type === "file") {
                      field.onChange(event.target.files[0])
                    } else {
                      if (typeof event === "string" || typeof event === "boolean") {
                        field.onChange(event)
                      } else {
                        field.onChange(event?.target?.value || event)
                      }
                    }
                  }}
                  variant={variant}
                  hasError={!!_error?.message}
                  className={cn(
                    className,
                    _error?.message && !hideError ? "!border-destructive" : null,
                    // shouldHorizontalShowing ? "order-1" : "",
                  )}
                />
              </FormControl>

              {_error?.message ? null : description ? <FormDescription /> : null}

              {_error && _error.message && !hideError ? <FormMessage /> : null}
            </FormItem>
          )
        }}
      />
    )
  },
)

FormField.displayName = "FormField"

export default FormField
