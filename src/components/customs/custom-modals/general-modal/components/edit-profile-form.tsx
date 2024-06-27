import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import React, { ElementRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { useController, useForm } from "react-hook-form"
import { z } from "zod"
import { omit } from "lodash"
import { Label } from "@/components/ui/label"
import Form, { FormField } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { GeneralModalComponentProps } from "../types"
import { cn } from "@/libs/utils/tailwind"
import { api } from "@/api/axios"
import { notify } from "@utils/notifications"

export const schema = z.object({
  photo: z.any(),
  username: z.string(),
  // bio: z.string().nullish(),
})
export type SchemaType = z.infer<typeof schema>

export interface EditProfileFormDefaultValues extends SchemaType {}
export interface EditProfileFormSuccessValues extends SchemaType {}
export interface EditProfileFormErrorValues {}

export interface EditProfileFormProps
  extends GeneralModalComponentProps<EditProfileFormDefaultValues> {}

const EditProfileForm = ({
  outerRef,
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
  closeCurrentModal,
}: EditProfileFormProps) => {
  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: omit(defaultValues, ["photo"]),
  })

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = methods.handleSubmit(async (values) => {
    if (values.username.length > 10) {
      setErrorMessage("Username must be 10 characters or less")
    } else {
      // @ts-ignore
      const { error, errors } = await onSubmit(values)

      if (!error) {
        onSuccess(values)
      } else {
        setErrorMessage(errors[0])
        onError(values)
      }
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
      <CustomInputUpload name="photo" label="Profile photo" url={defaultValues?.photo} />
      <FormField variant="TEXT" name="username" label="Username" />
      {/*<FormField variant="TEXT" name="bio" label="Bio" />*/}
      <p className="-mt-3 text-right text-xs font-normal text-foreground">
        You can change your username once every day
      </p>

      {errorMessage && (
        <p className="-mt-3 text-right text-xs font-normal text-red-400">{errorMessage}</p>
      )}

      <div className="flex flex-col gap-2">
        <Button type="submit" size="lg">
          Save Profile
        </Button>
        <Button variant="ghost" size="default" onClick={closeCurrentModal}>
          Close
        </Button>
      </div>
    </Form>
  )
}

export interface CustomInputUploadProps {
  name: string
  label: string
  url?: string
}

const CustomInputUpload = ({ url, name, label }: CustomInputUploadProps) => {
  const fileRef = useRef<ElementRef<"input">>(null)

  const [preview, setPreview] = useState(url)
  const { field, fieldState, formState } = useController({ name })

  const previewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const file = event.target?.result
      setPreview(file as string)
    }

    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files?.[0])
    }
  }

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    previewFile(event)

    field.onChange?.(event.target.files?.[0])
  }

  return (
    <div className="flex flex-row gap-2">
      <Label>{label}</Label>

      <div className="relative grid h-[40px] w-[40px] place-items-center rounded-md border border-white">
        {preview ? <Image src={preview} width={24} height={24} alt="Avatar" /> : null}

        <button
          type="button"
          className={cn(
            "absolute -bottom-2 -right-2 h-5 w-5",
            "flex items-center justify-center rounded border border-white bg-dark p-1 text-[11px] leading-[0px]",
          )}
          onClick={() => fileRef.current?.click()}
        >
          ✏️
        </button>
      </div>

      <input
        {...field}
        multiple={false}
        ref={fileRef}
        value={""}
        onChange={handleFileChange}
        type="file"
        className="hidden"
      />
    </div>
  )
}

export default EditProfileForm
