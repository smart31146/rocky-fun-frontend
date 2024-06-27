import { zodResolver } from "@hookform/resolvers/zod"
import { useImperativeHandle } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Form, { FormField } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { GeneralModalComponentProps } from "../types"

const REPLY_LENGTH = 4000

export const schema = z.object({
  reply: z.string().nullish(),
})
export type SchemaType = z.infer<typeof schema>

export interface AddReplyFormDefaultValues extends SchemaType {}
export interface AddReplyFormSuccessValues extends SchemaType {}
export interface AddReplyFormErrorValues {}

export interface AddReplyFormProps extends GeneralModalComponentProps<AddReplyFormDefaultValues> {}

const AddReplyForm = ({
  outerRef,
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  closeCurrentModal,
}: AddReplyFormProps) => {
  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleSubmit = methods.handleSubmit((values) => {
    if (values.reply && values.reply.length > REPLY_LENGTH) {
      methods.setError("reply", {
        message: "Max REPLY_LENGTH characters allowed.",
      })
      return
    }

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
    <Form methods={methods} onSubmit={handleSubmit} className="flex flex-col gap-2">
      <FormField
        variant="TEXTAREA"
        name="reply"
        placeholder="(Optional)"
        rows={5}
        maxLength={REPLY_LENGTH}
      />
      {methods.formState.errors.reply ? null : (
        <p className="mb-3 text-sm text-[#D9D5D2]">Max {REPLY_LENGTH} char.</p>
      )}

      <Button type="submit" size="lg">
        Post Reply
      </Button>
      <Button variant="ghost" size="lg" onClick={closeCurrentModal}>
        Cancel
      </Button>
    </Form>
  )
}

export default AddReplyForm
