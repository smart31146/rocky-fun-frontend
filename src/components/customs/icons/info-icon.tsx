import React, { ComponentPropsWithoutRef } from "react"

export interface InfoIconProps extends ComponentPropsWithoutRef<"svg"> {}

export const InfoIcon = (props: InfoIconProps) => (
  <svg
    width="40"
    height="40"
    {...props}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 38C29.9411 38 38 29.9411 38 20C38 10.0589 29.9411 2 20 2C10.0589 2 2 10.0589 2 20C2 29.9411 10.0589 38 20 38Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M20.0635 16.254V29.8413" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" />
    <path d="M20.0635 10.0317V13.8413" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" />
  </svg>
)
