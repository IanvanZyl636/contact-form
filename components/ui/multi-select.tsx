"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import * as MultiSelectPrimitive from "@/components/ui/primitives/multi-select";

const MultiSelect = MultiSelectPrimitive.Root;

const MultiSelectGroup = MultiSelectPrimitive.Group

interface MultiSelectValueProps extends React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.Value>{
    label: string,
    currentValue:string | undefined,
    noSelectionValue:string | undefined,
}

const MultiSelectValue = MultiSelectPrimitive.Value;

const MultiSelectTrigger = React.forwardRef<
    React.ElementRef<typeof MultiSelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <MultiSelectPrimitive.Trigger
        ref={ref}
        className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            className
        )}
        {...props}
    >
        {children}
        <MultiSelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
        </MultiSelectPrimitive.Icon>
    </MultiSelectPrimitive.Trigger>
))
MultiSelectTrigger.displayName = MultiSelectPrimitive.Trigger.displayName

const MultiSelectScrollUpButton = React.forwardRef<
    React.ElementRef<typeof MultiSelectPrimitive.ScrollUpButton>,
    React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
    <MultiSelectPrimitive.ScrollUpButton
        ref={ref}
        className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
        )}
        {...props}
    >
        <ChevronUp className="h-4 w-4" />
    </MultiSelectPrimitive.ScrollUpButton>
))
MultiSelectScrollUpButton.displayName = MultiSelectPrimitive.ScrollUpButton.displayName

const MultiSelectScrollDownButton = React.forwardRef<
    React.ElementRef<typeof MultiSelectPrimitive.ScrollDownButton>,
    React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
    <MultiSelectPrimitive.ScrollDownButton
        ref={ref}
        className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
        )}
        {...props}
    >
        <ChevronDown className="h-4 w-4" />
    </MultiSelectPrimitive.ScrollDownButton>
))
MultiSelectScrollDownButton.displayName =
    MultiSelectPrimitive.ScrollDownButton.displayName

const MultiSelectContent = React.forwardRef<
    React.ElementRef<typeof MultiSelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
    <MultiSelectPrimitive.Portal>
        <MultiSelectPrimitive.Content
            ref={ref}
            className={cn(
                "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                position === "popper" &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                className
            )}
            position={position}
            {...props}
        >
            <MultiSelectScrollUpButton />
            <MultiSelectPrimitive.Viewport
                className={cn(
                    "p-1",
                    position === "popper" &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
                )}
            >
                {children}
            </MultiSelectPrimitive.Viewport>
            <MultiSelectScrollDownButton />
        </MultiSelectPrimitive.Content>
    </MultiSelectPrimitive.Portal>
))
MultiSelectContent.displayName = MultiSelectPrimitive.Content.displayName

const MultiSelectLabel = React.forwardRef<
    React.ElementRef<typeof MultiSelectPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.Label>
>(({ className, ...props }, ref) => (
    <MultiSelectPrimitive.Label
        ref={ref}
        className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
        {...props}
    />
))
MultiSelectLabel.displayName = MultiSelectPrimitive.Label.displayName

const MultiSelectItem = React.forwardRef<
    React.ElementRef<typeof MultiSelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <MultiSelectPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        {...props}
    >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MultiSelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MultiSelectPrimitive.ItemIndicator>
    </span>

        <MultiSelectPrimitive.ItemText>{children}</MultiSelectPrimitive.ItemText>
    </MultiSelectPrimitive.Item>
))
MultiSelectItem.displayName = MultiSelectPrimitive.Item.displayName

const MultiSelectSeparator = React.forwardRef<
    React.ElementRef<typeof MultiSelectPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof MultiSelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <MultiSelectPrimitive.Separator
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-muted", className)}
        {...props}
    />
))
MultiSelectSeparator.displayName = MultiSelectPrimitive.Separator.displayName

export {
    MultiSelect,
    MultiSelectGroup,
    MultiSelectValue,
    MultiSelectTrigger,
    MultiSelectContent,
    MultiSelectLabel,
    MultiSelectItem,
    MultiSelectSeparator,
    MultiSelectScrollUpButton,
    MultiSelectScrollDownButton,
}
