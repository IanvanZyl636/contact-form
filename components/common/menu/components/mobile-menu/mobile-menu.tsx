import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {ChevronDown, MenuIcon} from "lucide-react";
import MenuLogo from "@/components/common/menu/components/menu-logo/menu-logo";
import MenuButton, {MenuButtonStyle} from "@/components/common/button/menu-button";
import Link from "next/link";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import * as React from "react";
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";
import {cn} from "@/lib/utils";

export default function MobileMenu() {
    const menuButtonClass = (radius:string = 'rounded-md') => cn(navigationMenuTriggerStyle(radius), 'justify-center w-full');

    return <div className={'wrapper-container-fluid mx-auto'}>
        <div className={'flex flex-row'}>
            <Link href="/" passHref>
                <MenuLogo/>
            </Link>
            <div className={'flex-grow flex flex-row align-middle justify-end'}>
                <Drawer direction={'right'}>
                    <DrawerTrigger>
                        <MenuButton isActive={true}>
                            <MenuIcon/>
                        </MenuButton>
                    </DrawerTrigger>
                    <DrawerContent>
                        <NavigationMenuPrimitive.Root orientation={'vertical'} className={'pl-4 pr-4 pb-4'}>
                            <NavigationMenuPrimitive.List className={'list-none'}>
                                <NavigationMenuPrimitive.Item>
                                    <Link href="/" legacyBehavior passHref>
                                        <NavigationMenuPrimitive.Link className={menuButtonClass()}>
                                            Home
                                        </NavigationMenuPrimitive.Link>
                                    </Link>
                                </NavigationMenuPrimitive.Item>
                                <NavigationMenuPrimitive.Item>
                                    <NavigationMenuPrimitive.Trigger className={menuButtonClass()}>
                                        Services
                                        <ChevronDown
                                            className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                                            aria-hidden="true"
                                        />
                                    </NavigationMenuPrimitive.Trigger>
                                    <NavigationMenuPrimitive.Content className={"border-l-2 bg-popover text-popover-foreground"}>
                                        <Link href="/" legacyBehavior passHref>
                                            <NavigationMenuPrimitive.Link className={menuButtonClass('rounded-r-md')}>
                                                Accounting
                                            </NavigationMenuPrimitive.Link>
                                        </Link>
                                        <Link href="/" legacyBehavior passHref>
                                            <NavigationMenuPrimitive.Link className={menuButtonClass('rounded-r-md')}>
                                                Register a Company
                                            </NavigationMenuPrimitive.Link>
                                        </Link>
                                    </NavigationMenuPrimitive.Content>
                                </NavigationMenuPrimitive.Item>
                                <NavigationMenuPrimitive.Item>
                                    <Link href="/" legacyBehavior passHref>
                                        <NavigationMenuPrimitive.Link className={menuButtonClass()}>
                                            How it works
                                        </NavigationMenuPrimitive.Link>
                                    </Link>
                                </NavigationMenuPrimitive.Item>
                                <NavigationMenuPrimitive.Item>
                                    <Link href="/" legacyBehavior passHref>
                                        <NavigationMenuPrimitive.Link className={menuButtonClass()}>
                                            About Us
                                        </NavigationMenuPrimitive.Link>
                                    </Link>
                                </NavigationMenuPrimitive.Item>
                                <NavigationMenuPrimitive.Item>
                                    <Link href="/" legacyBehavior passHref>
                                        <NavigationMenuPrimitive.Link className={menuButtonClass()}>
                                            Contact Us
                                        </NavigationMenuPrimitive.Link>
                                    </Link>
                                </NavigationMenuPrimitive.Item>
                            </NavigationMenuPrimitive.List>
                        </NavigationMenuPrimitive.Root>
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    </div>
}
