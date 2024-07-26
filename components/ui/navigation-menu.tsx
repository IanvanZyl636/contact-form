import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import {cva} from "class-variance-authority"
import {ChevronDown, MessageSquareText} from "lucide-react"
import {cn} from "@/lib/utils"
import {MenuButtonStyle} from "@/components/common/button/menu-button";
import {Button} from "@/components/ui/button";
import Whatsapp from "@/components/common/icons/whatsapp";

interface NavigationMenuExtendedProps extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
    logo: JSX.Element; // Add your new prop here
}

const NavigationMenu = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Root>,
    NavigationMenuExtendedProps
>(({className, children, ...props}, ref) => (
    <NavigationMenuPrimitive.Root
        ref={ref}
        className={cn(
            "z-50 bg-background  w-full",
            className
        )}
        {...props}
    >
        <div className={'container relative mx-auto '}>
            <div className={'w-full inline-grid grid-rows-1 grid-cols-[1fr_auto_1fr]'}>
                <div className={'justify-self-start self-center'}>
                    {props.logo}
                </div>
                <div className={'flex flex-row self-center justify-self-center'}>
                    {children}
                </div>
                <div className={'justify-self-end self-center'}>
                    <Button size={'custom'} variant={'custom'} className={'rounded-full mr-2 bg-whatsapp text-primary-foreground bg-opacity-20'}>
                        <div className={'p-2'}>
                            <Whatsapp className={'h-6 w-6'}/>
                        </div>
                    </Button>
                    <Button size={'custom'} className={'rounded-full'}>
                        <div className={'p-2'}>
                            <MessageSquareText className={'h-6 w-6'}/>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({className, ...props}, ref) => (
    <NavigationMenuPrimitive.List
        ref={ref}
        className={cn(
            "group flex flex-1 list-none items-center justify-center space-x-1",
            className
        )}
        {...props}
    />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>
>(({className, children, ...props}, ref) => (
    <NavigationMenuPrimitive.Item
        ref={ref}
        className={cn("relative")}
        {...props}
    >
        {children}
    </NavigationMenuPrimitive.Item>
));

const navigationMenuTriggerStyle = (radius: string = 'rounded-md') => cva(
    cn(MenuButtonStyle(radius), "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50")
)();

const NavigationMenuTrigger = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({className, children, ...props}, ref) => {
    return <NavigationMenuPrimitive.Trigger
        ref={ref}
        className={cn(navigationMenuTriggerStyle(), "group w-max", className)}
        {...props}
    >
        {children}{" "}
        <ChevronDown
            className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
        />
    </NavigationMenuPrimitive.Trigger>
})
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({className, ...props}, ref) => (
    <NavigationMenuPrimitive.Content
        ref={ref}
        className={cn(
            "left-0 top-[110%] bo data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
            "rounded-md border bg-popover text-popover-foreground shadow",
            className
        )}
        {...props}
    />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({className, ...props}, ref) => (
    <div className={cn("absolute left-50 top-full flex justify-center")}>
        <NavigationMenuPrimitive.Viewport
            className={cn(
                "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
                className
            )}
            ref={ref}
            {...props}
        />
    </div>
))
NavigationMenuViewport.displayName =
    NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({className, ...props}, ref) => (
    <NavigationMenuPrimitive.Indicator
        ref={ref}
        className={cn(
            "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
            className
        )}
        {...props}
    >
        <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md"/>
    </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
    NavigationMenuPrimitive.Indicator.displayName

export {
    navigationMenuTriggerStyle,
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport,
}
