import { useFormContext as useFormContextPrimitive } from "react-hook-form"
import { CreateCoinFormState } from "../_schema"

export const useFormContext = () => {
  return useFormContextPrimitive<CreateCoinFormState>()
}
