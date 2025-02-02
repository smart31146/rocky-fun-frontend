// "use client"

// import { Loader, RotateCw } from "lucide-react"
// import { forwardRef, useState } from "react"
// import { useFormContext } from "react-hook-form"
// import slugify from "slugify"
// import get from "lodash/get"
// import { cn } from "@/libs/utils/tailwind"
// import FormInput, { FormInputProps } from "./form-input"

// export interface FormUIDProps extends Omit<FormInputProps, "variant"> {
//   variant: "UID"
//   fromName: string
// }

// const FormUID = forwardRef<HTMLInputElement, FormUIDProps>(
//   ({ fromName, ...props }: FormUIDProps, ref) => {
//     const methods = useFormContext()

//     const [isGenerating, setIsGenerating] = useState(false)

//     const handleGenerateUID = () => {
//       setIsGenerating(true)

//       const relatedInputValue = get(methods.getValues(), fromName) || props?.value || ""
//       const value = slugify(relatedInputValue, {
//         lower: true,
//         strict: true,
//         trim: true,
//       }) as any

//       if (props.onChange) props.onChange(value)

//       setTimeout(() => {
//         setIsGenerating(false)
//       }, 300)
//     }

//     return (
//       <div className="relative">
//         <FormInput {...props} ref={ref} className={cn("pr-8", props.className)} />

//         <div
//           className={cn(
//             "group",
//             "absolute right-3 top-1/2 -translate-y-1/2 transform",
//             "flex gap-2",
//           )}
//         >
//           <p className="invisible text-xs text-zinc-500 group-hover:visible">
//             {isGenerating ? "Loading.." : props?.value ? "Regenerate" : "Generate"}
//           </p>
//           {isGenerating ? (
//             <Loader className="h-4 w-4 animate-spin" />
//           ) : (
//             <RotateCw
//               className={cn("h-4 w-4 cursor-pointer", "text-zinc-500")}
//               onClick={handleGenerateUID}
//             />
//           )}
//         </div>
//       </div>
//     )
//   },
// )

// FormUID.displayName = "FormUID"

// export default FormUID
