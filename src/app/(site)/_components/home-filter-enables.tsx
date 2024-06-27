import { FormField } from "@/components/ui/form"

const HomFilterEnables = () => (
  <div className="order-4 col-span-12 flex w-full flex-wrap justify-center gap-6 md:w-auto md:items-center md:justify-start">
    <FormField
      variant="SWITCH_ONOFF"
      label="Animations"
      name="enableAnimations"
      direction="horizontal"
    />

    {/* <FormField variant="SWITCH_ONOFF" label="Include nsfw" name="nsfw" direction="horizontal" /> */}
  </div>
)

export default HomFilterEnables
