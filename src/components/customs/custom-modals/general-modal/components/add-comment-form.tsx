import { zodResolver } from "@hookform/resolvers/zod"
import { useImperativeHandle } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Form, { FormField } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { GeneralModalComponentProps } from "../types"

export const schema = z.object({})
export type SchemaType = z.infer<typeof schema>

export interface AddCommentFormDefaultValues extends SchemaType {}
export interface AddCommentFormSuccessValues extends SchemaType {}
export interface AddCommentFormErrorValues {}

export interface AddCommentFormProps
  extends GeneralModalComponentProps<AddCommentFormDefaultValues> {}

const AddCommentForm = ({
  outerRef,
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  closeCurrentModal,
}: AddCommentFormProps) => {
  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleSubmit = methods.handleSubmit((values) => {
    const promiseOrValue = onSubmit(values)

    if (typeof promiseOrValue === "boolean") {
      if (promiseOrValue) {
        onSuccess(values)
      } else {
        onError(values)
      }
    } else {
      promiseOrValue.then(onSuccess).catch(onError)
    }
  })

  // The actions will trigger me
  useImperativeHandle(outerRef, () => ({
    reset() {},
    submit() {
      handleSubmit()
    },
  }))

  return (
    <Form methods={methods} onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField variant="TEXTAREA" name="comment" placeholder="(Optional)" rows={5} />

      <p className="text-sm text-[#D9D5D2]">buy 37839.103967 Udder for 0.01 SOL</p>

      <Button type="submit" size="lg">Place Trade</Button>
      <Button variant="ghost" size="lg" onClick={closeCurrentModal}>
        Cancel
      </Button>
    </Form>
  )
}

export default AddCommentForm
