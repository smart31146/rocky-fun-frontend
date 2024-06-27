import { useFormContext } from "../_hooks/use-form-context"

export interface CreateCoinErrorsProps {}

const CreateCoinErrors = (props: CreateCoinErrorsProps) => {
  const {
    formState: { errors },
  } = useFormContext()

  const items = Object.entries(errors).map((error) => ({
    label: error[1].message?.toString(),
  }))

  if (!items.length) return null

  return (
    <ul className="rounded-md border border-destructive p-3 text-sm text-destructive">
      {items.map((item) => (
        <li>{item.label}</li>
      ))}
    </ul>
  )
}

export default CreateCoinErrors
