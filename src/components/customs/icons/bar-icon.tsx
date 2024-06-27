import React, { ComponentPropsWithoutRef } from "react"

export interface BarIconProps extends ComponentPropsWithoutRef<"svg"> {}

const BarIcon = ({ ...props }: BarIconProps) => {
  return (
    <svg
      width="32"
      height="32"
      {...props}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 36V32H42V36H6ZM6 26V22H42V26H6ZM6 16V12H42V16H6Z" fill="currentColor" />
    </svg>
  )
}

export default BarIcon
