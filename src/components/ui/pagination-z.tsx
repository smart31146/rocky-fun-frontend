"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import {
  IPaginationProps,
  NextButton,
  PageButton,
  Pagination as PaginationRoot,
  PrevButton,
} from "react-headless-pagination"
import { cn } from "@/libs/utils/tailwind"
import { buttonVariants } from "./button"

export interface PaginationProps
  extends Omit<
      IPaginationProps,
      "edgePageCount" | "middlePagesSiblingCount" | "setCurrentPage" | "onNext" | "onPrev"
    >,
    Partial<Pick<IPaginationProps, "setCurrentPage">> {
  activeClassName?: string
  onNext?: () => void
  onPrev?: () => void
}

export const Pagination = ({
  currentPage,
  className,
  setCurrentPage,
  totalPages,
  activeClassName,
  onNext,
  onPrev,
}: PaginationProps) => {
  const handleCurrentPageCHange: IPaginationProps["setCurrentPage"] = (pageIndex) => {
    if (setCurrentPage) setCurrentPage(pageIndex)
  }

  return (
    <PaginationRoot
      currentPage={currentPage}
      totalPages={totalPages}
      edgePageCount={1}
      middlePagesSiblingCount={1}
      className={cn("flex items-center justify-start", className)}
      truncableClassName={buttonVariants({
        variant: "ghost",
        size: "icon",
      })}
      setCurrentPage={handleCurrentPageCHange}
    >
      <PrevButton
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "cursor-pointer",
        })}
      >
        <ChevronLeftIcon className="text-neutral-grey-300 h-4 w-4" />
      </PrevButton>
      <div className="flex items-center justify-center gap-1 [&>li]:list-none">
        <PageButton
          activeClassName={buttonVariants({
            variant: "default",
            size: "icon",
            className: cn("hover:text-primary-foreground cursor-pointer", activeClassName),
          })}
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
          })}
        />
      </div>
      <NextButton
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "cursor-pointer",
        })}
      >
        <ChevronRightIcon className="text-neutral-grey-300 h-4 w-4" />
      </NextButton>
    </PaginationRoot>
  )
}
