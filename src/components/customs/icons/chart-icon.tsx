import React, { ComponentPropsWithoutRef } from "react"

export interface ChartIconProps extends ComponentPropsWithoutRef<"svg"> {}

export const ChartIcon = (props: ChartIconProps) => (
  <svg
    width="40"
    height="38"
    {...props}
    viewBox="0 0 40 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 35.3176L16.1176 23.3176L22.4706 28.9647L36.7294 14.4235"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.12939 19.9294V30.2353"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.9766 10.3294V18.9412"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.3179 2V22.0471"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.7876 5.24706V22.0471"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33.3413 14L38.0001 13.5765L37.0119 18.2353"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
