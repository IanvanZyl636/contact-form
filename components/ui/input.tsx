import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    error?:boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full border-input rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            error ? 'border-destructive focus-visible:ring-destructive' :' focus-visible:ring-ring',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }