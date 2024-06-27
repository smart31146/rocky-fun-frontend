"use client"

import { CheckIcon } from "@radix-ui/react-icons"
import * as React from "react"

import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/libs/utils/tailwind"
import { Badge } from "./badge"
import { ScrollArea } from "./scroll-area"
import { useElementSize } from "./use-element-size"
import { withPreventDefault } from "./with-prevent-default"

const getAddOrRemoveValues = (data: string[], currentValue: string) => {
  const index = data.findIndex((value) => value === currentValue)

  if (index !== -1) {
    return data.filter((value) => value !== currentValue)
  }

  return [...data, currentValue]
}

const getActiveOption = (optionValue: string, currentValue: string | string[]) => {
  if (Array.isArray(currentValue)) {
    return currentValue.includes(optionValue)
  }

  return optionValue === currentValue
}

export interface ComboboxOption<TValue = string> {
  label: string
  value: TValue
}

export interface ComboboxProps {
  options?: ComboboxOption[]
  value?: string | string[]
  emptyLabel?: string
  placeholder?: string
  multiple?: boolean
  closeOnSelect?: boolean
  onChange?: (val: string | string[]) => void
  searchable?: boolean
  prefixValue?: React.ReactNode
  classnames?: {
    button?: string
    popover?: string
    popoverContent?: string
    option?: string
  }
}

export const Combobox = React.forwardRef<React.ElementRef<typeof Button>, ComboboxProps>(
  (
    {
      placeholder,
      emptyLabel,
      options,
      value: defaultValue,
      multiple = false,
      closeOnSelect,
      classnames,
      searchable,
      prefixValue,
      onChange,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false)
    const [state, setState] = React.useState<string | string[]>(() => {
      if (!multiple) {
        return defaultValue || ""
      }

      return defaultValue || []
    })

    const [value, setValue] = onChange ? [defaultValue, onChange] : [state, setState]

    const [target, { width }] = useElementSize()

    const handleClose = () => {
      setOpen(!closeOnSelect)
    }

    const handleSelect = (currentValue: string) => {
      if (!multiple && !Array.isArray(value)) {
        setValue?.(currentValue === value ? "" : currentValue)
        handleClose()
        return
      }

      if (multiple && Array.isArray(value)) {
        setValue(getAddOrRemoveValues(value, currentValue))
        handleClose()
        return
      }

      throw new Error("The value should be a type not_multiple=string or multiple=string[]")
    }

    React.useImperativeHandle(ref, target as any)

    const labelsMap = React.useMemo(
      () =>
        options?.reduce(
          (combinedOptions, curOption) => ({
            ...combinedOptions,
            [curOption.value]: curOption.label,
          }),
          {} as Record<string, string>,
        ),
      [options],
    )

    const renderSelectedValue = React.useMemo(() => {
      if (!multiple && !Array.isArray(value)) {
        return value ? options?.find((option) => option.value === value)?.label : placeholder
      }

      return Array.isArray(value)
        ? value.map((curValue) => (
            <Badge variant="secondary" key={curValue}>
              {labelsMap?.[curValue]}
              <X
                className="ml-1 h-3 w-3 cursor-pointer text-muted-foreground"
                onClick={withPreventDefault((e) => {
                  handleSelect(curValue)
                })}
              />
            </Badge>
          ))
        : []
    }, [value])

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <ScrollArea viewportClassName="max-h-[200px]">
            <Button
              ref={target}
              type="button"
              variant="outline"
              size="default"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full cursor-text justify-between border-white px-2",
                "text-white hover:bg-transparent hover:text-white",
                classnames?.button,
              )}
            >
              <span className="flex w-full flex-1 flex-wrap gap-1">
                {prefixValue}
                {renderSelectedValue}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </ScrollArea>
        </PopoverTrigger>
        <PopoverContent
          style={{ width }}
          className={cn("w-[200px] overflow-hidden rounded-md p-0", classnames?.popover)}
        >
          <Command value={value as any} className={classnames?.popoverContent}>
            {searchable ? (
              <CommandInput placeholder={placeholder} className="h-9 border-primary" />
            ) : null}
            <CommandEmpty>{emptyLabel ?? "No option found."}</CommandEmpty>
            <ScrollArea viewportClassName="max-h-[300px]">
              <CommandGroup>
                {options?.map((option) => {
                  const isActive = getActiveOption(option.value, value ?? "")

                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      className={cn(
                        isActive ? "hidden" : "",
                        "rounded-md",
                        "text-sm",
                        classnames?.option,
                      )}
                      onSelect={() => {
                        handleSelect(option.value)
                      }}
                    >
                      {option.label}
                      <CheckIcon
                        className={cn("ml-auto h-4 w-4", isActive ? "opacity-100" : "opacity-0")}
                      />
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
)
