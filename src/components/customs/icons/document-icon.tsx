import React, { ComponentPropsWithoutRef } from "react"

export interface DocumentIconProps extends ComponentPropsWithoutRef<"svg"> {}

export const DocumentIcon = (props: DocumentIconProps) => (
  <svg
    width="32"
    height="32"
    {...props}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.8335 26.9166H23.8335V23.9166H11.8335V26.9166ZM11.8335 20.9166H23.8335V17.9166H11.8335V20.9166ZM8.8335 32.9166C8.0085 32.9166 7.30225 32.6229 6.71475 32.0354C6.12725 31.4479 5.8335 30.7416 5.8335 29.9166V5.91663C5.8335 5.09163 6.12725 4.38538 6.71475 3.79788C7.30225 3.21038 8.0085 2.91663 8.8335 2.91663H20.8335L29.8335 11.9166V29.9166C29.8335 30.7416 29.5397 31.4479 28.9522 32.0354C28.3647 32.6229 27.6585 32.9166 26.8335 32.9166H8.8335ZM19.3335 13.4166V5.91663H8.8335V29.9166H26.8335V13.4166H19.3335Z"
      fill="currentColor"
    />
  </svg>
)
