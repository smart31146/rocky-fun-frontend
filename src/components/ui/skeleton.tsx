import { cn } from "../../libs/utils/tailwind"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-white/10", className)} {...props} />
}

export { Skeleton }
