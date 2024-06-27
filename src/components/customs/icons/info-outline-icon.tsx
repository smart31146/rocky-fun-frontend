import React, { ComponentPropsWithoutRef } from "react"

export interface InfoOutlineProps extends ComponentPropsWithoutRef<"svg"> {}

const InfoOutlineIcon = (props: InfoOutlineProps) => (
  <svg width="100%" height="100%" {...props} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.25 12.75H9.75V8.25H8.25V12.75ZM9 6.75C9.2125 6.75 9.39063 6.67813 9.53438 6.53438C9.67813 6.39062 9.75 6.2125 9.75 6C9.75 5.7875 9.67813 5.60938 9.53438 5.46563C9.39063 5.32188 9.2125 5.25 9 5.25C8.7875 5.25 8.60938 5.32188 8.46563 5.46563C8.32188 5.60938 8.25 5.7875 8.25 6C8.25 6.2125 8.32188 6.39062 8.46563 6.53438C8.60938 6.67813 8.7875 6.75 9 6.75ZM9 16.5C7.9625 16.5 6.9875 16.3031 6.075 15.9094C5.1625 15.5156 4.36875 14.9813 3.69375 14.3063C3.01875 13.6313 2.48438 12.8375 2.09063 11.925C1.69688 11.0125 1.5 10.0375 1.5 9C1.5 7.9625 1.69688 6.9875 2.09063 6.075C2.48438 5.1625 3.01875 4.36875 3.69375 3.69375C4.36875 3.01875 5.1625 2.48438 6.075 2.09063C6.9875 1.69688 7.9625 1.5 9 1.5C10.0375 1.5 11.0125 1.69688 11.925 2.09063C12.8375 2.48438 13.6313 3.01875 14.3063 3.69375C14.9813 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.0375 16.3031 11.0125 15.9094 11.925C15.5156 12.8375 14.9813 13.6313 14.3063 14.3063C13.6313 14.9813 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5ZM9 15C10.675 15 12.0938 14.4188 13.2563 13.2563C14.4188 12.0938 15 10.675 15 9C15 7.325 14.4188 5.90625 13.2563 4.74375C12.0938 3.58125 10.675 3 9 3C7.325 3 5.90625 3.58125 4.74375 4.74375C3.58125 5.90625 3 7.325 3 9C3 10.675 3.58125 12.0938 4.74375 13.2563C5.90625 14.4188 7.325 15 9 15Z"
      fill="currentColor"
    />
  </svg>
)

export default InfoOutlineIcon
