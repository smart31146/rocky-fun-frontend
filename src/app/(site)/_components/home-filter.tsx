/* eslint-disable react-hooks/rules-of-hooks */

"use client"

import { FormField } from "@/components/ui/form"
import { cn } from "@/libs/utils/tailwind"
import HomFilterEnables from "./home-filter-enables"

export interface HomeFilterProps {}

const HomeFilter = () => (
  <div className="flex flex-col gap-8">
    <div className="relative">
      <FormField
        variant="SEARCH"
        name="search"
        placeholder="Search for token"
        className={cn(
          "rounded-xl bg-primary-background ring-primary-background",
          "border-primary-foreground focus-visible:ring-primary",
          "placeholder:text-base placeholder:text-primary-placeholder",
          "h-[42px] px-5 md:h-[48px]",
        )}
        searchIconClassName="text-primary"
        wrapperClassName="w-full mx-auto max-w-[400px]"
      />
    </div>

    <div className="grid grid-cols-12 flex-wrap items-center justify-center gap-4 md:flex md:justify-start">
      <FormField
        variant="SELECT"
        name="orderByField"
        options={[
          { label: "bump order", value: "bumpOrder" },
          { label: "last reply", value: "lastReply" },
          { label: "reply count", value: "replyCount" },
          { label: "market cap", value: "marketCapSol" },
          { label: "launch time", value: "createdAt" },
        ]}
        prefixValue="sort: "
        closeOnSelect
        classnames={{
          button: cn(
            "text-white hover:text-white bg-primary-background rounded-md",
            "hover:bg-primary-background border-primary w-full md:w-[174px] md:px-4",
          ),
          popover: "border-primary",
          popoverContent: "bg-primary-background",
          option: "hover:!bg-primary-hover data-[selected=true]:bg-primary-hover",
        }}
        wrapperClassName="w-full col-span-6 md:w-auto order-2 md:order-1"
      />

      <FormField
        variant="SELECT"
        name="orderBy"
        options={[
          { label: "ascending", value: "asc" },
          { label: "descending", value: "desc" },
        ]}
        prefixValue="order: "
        closeOnSelect
        classnames={{
          button: cn(
            "text-white hover:text-white bg-primary-background rounded-md",
            "hover:bg-primary-background border-primary w-full md:w-[174px] md:px-4",
          ),
          popover: "border-primary",
          popoverContent: "bg-primary-background",
          option: "hover:!bg-primary-hover data-[selected=true]:bg-primary-hover",
        }}
        wrapperClassName="w-full col-span-6 md:w-auto order-3 md:order-2"
      />

      <HomFilterEnables />
    </div>
  </div>
)

interface Props {
  onChangeSort: (data: any) => void
  sort: any
}
export default HomeFilter
