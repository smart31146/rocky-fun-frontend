"use client"

import { forwardRef } from "react"
import { Textarea, TextareaProps } from "@/components/ui/textarea"

export interface FormTextareaProps extends TextareaProps {
  variant: "TEXTAREA"
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>((props, ref) => (
  <Textarea {...props} ref={ref} />
))

FormTextarea.displayName = "FormTextarea"

export default FormTextarea
