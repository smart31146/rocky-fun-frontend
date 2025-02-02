import React, { ComponentPropsWithoutRef } from "react"

export interface HomeIconProps extends ComponentPropsWithoutRef<"svg"> {}

export const HomeIcon = (props: HomeIconProps) => (
  <svg
    width="32"
    height="32"
    {...props}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.00004 25.3333H12V17.3333H20V25.3333H24V13.3333L16 7.33333L8.00004 13.3333V25.3333ZM5.33337 28V12L16 4L26.6667 12V28H17.3334V20H14.6667V28H5.33337Z"
      fill="currentColor"
    />
  </svg>
)
