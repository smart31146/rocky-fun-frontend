import React, { ComponentPropsWithoutRef } from "react"

export interface TxsIconProps extends ComponentPropsWithoutRef<"svg"> {}

export const TxsIcon = (props: TxsIconProps) => (
  <svg
    width="36"
    height="35"
    {...props}
    viewBox="0 0 36 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.10986 0.902824V31.7116"
      stroke="currentColor"
      strokeWidth="1.5274"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0.902832 26.2947L7.10973 33.1787L13.0909 26.2947"
      stroke="currentColor"
      strokeWidth="1.5274"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28.8901 33.1787V2.3699"
      stroke="currentColor"
      strokeWidth="1.5274"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M35.0973 7.78684L28.8904 0.902824L22.9092 7.78684"
      stroke="currentColor"
      strokeWidth="1.5274"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
