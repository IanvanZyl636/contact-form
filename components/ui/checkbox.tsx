"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import {Check} from "lucide-react"

import {cn} from "@/lib/utils"

export interface CheckBoxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    label?: string;
}

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckBoxProps
>(({className, label, id, ...props}, ref) => (
    <div className="flex items-center space-x-2 w-full">
        <CheckboxPrimitive.Root
            id={id}
            ref={ref}
            className={cn(
                "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                className={cn("flex items-center justify-center text-current")}
            >
                <Check className="h-4 w-4"/>
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {
            label ? (<label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>) : null
        }

    </div>

))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export {Checkbox}
