import React, { ComponentPropsWithoutRef } from "react"

export interface XIconProps extends ComponentPropsWithoutRef<"svg"> {}

export const XIcon = (props: XIconProps) => (
  <svg
    width="20"
    height="20"
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.9091 8.11635L19.3636 0H17.5909L11.1364 7.06907L6.00001 0H0L7.81819 10.6909L0 19.2H1.77274L8.59092 11.7382L14.0455 19.2H20M2.40909 1.26547H5.13636L17.5909 18.0218H14.8636"
      fill="currentColor"
    />
  </svg>
)
