import { ComponentPropsWithoutRef } from "react"

export interface MoneyIconProps extends ComponentPropsWithoutRef<"svg"> {}

export const MoneyIcon = (props: MoneyIconProps) => (
  <svg
    width="38"
    height="38"
    {...props}
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 37C28.9411 37 37 28.9411 37 19C37 9.05887 28.9411 1 19 1C9.05887 1 1 9.05887 1 19C1 28.9411 9.05887 37 19 37Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.6885 29V26.594C17.3607 26.594 15.8852 26.1429 15 25.5414L15.5902 23.8872C16.4754 24.4887 17.6557 24.9398 18.9836 24.9398C20.6066 24.9398 21.7869 23.8872 21.7869 22.5338C21.7869 21.1805 20.9016 20.2782 19.1311 19.5263C16.7705 18.6241 15.1475 17.5714 15.1475 15.3158C15.1475 13.3609 16.623 11.7068 18.6885 11.406V9H20.1639V11.406C21.6393 11.406 22.5246 11.8571 23.2623 12.3083L22.8197 13.812C22.377 13.5113 21.3443 13.0602 19.8689 13.0602C17.9508 13.0602 17.2131 14.1128 17.2131 15.015C17.2131 16.218 18.0984 16.9699 20.1639 17.7218C22.6721 18.7744 23.8525 19.9774 23.8525 22.2331C23.8525 24.188 22.5246 25.9925 20.0164 26.4436V29H18.6885Z"
      fill="currentColor"
    />
  </svg>
)
