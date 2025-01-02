import {Drawer, DrawerClose, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {ChevronDown, MenuIcon, X} from "lucide-react";
import DesktopMenuLogo from "@/components/common/menu/components/menu-logo/desktop-menu-logo";
import MenuButton from "@/components/common/button/menu-button";
import Link from "next/link";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import * as React from "react";
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";
import {cn} from "@/lib/utils";
import ContactUsMenu from "@/components/common/menu/components/contact-us-menu/contact-us-menu";
import MobileMenuLogo from "@/components/common/menu/components/menu-logo/mobile-menu-logo";

export default function MobileMenu({className}: { className?: string }) {
    const menuButtonClass = (radius: string = 'rounded-md') => cn(navigationMenuTriggerStyle(radius), 'justify-center w-full');

    return <div className={cn(className, 'wrapper-container-fluid mx-auto bg-menu text-menu-foreground')}>
        <div className={'w-full flex flex-row'}>
            <div>
                <div className={'relative'}>
                    <div className={'h-full absolute top-0 right-12 bg-menu w-screen z-10'}></div>
                    <div className={'relative z-20'}>
                        <Link href="/" passHref>
                            <DesktopMenuLogo className={'hidden sm:block'}/>
                            <MobileMenuLogo className={'sm:hidden block'}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={'grow flex flex-col justify-center relative'}>
                <div className={'h-full absolute top-0 -left-12 bg-menuSecondary w-screen z-10'}></div>
                <div className={'flex flex-row align-middle justify-end items-center relative z-20'}>
                    <ContactUsMenu/>
                    <Drawer direction={'right'} fadeFromIndex={0} snapPoints={['']}>
                        <DrawerTrigger className={'ml-2'}>
                            <MenuButton isActive={true}>
                                <MenuIcon/>
                            </MenuButton>
                        </DrawerTrigger>
                        <DrawerContent className={'bg-menuSecondary text-menu-foreground'}>
                            <div
                                className={'wrapper-container-fluid flex flex-row justify-end align-middle menu-height'}>
                                <DrawerClose>
                                    <MenuButton className={'p-2'}>
                                        <X/>
                                    </MenuButton>
                                </DrawerClose>
                            </div>
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
                                            Properties
                                            <ChevronDown
                                                className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                                                aria-hidden="true"
                                            />
                                        </NavigationMenuPrimitive.Trigger>
                                        <NavigationMenuPrimitive.Content
                                            className={"border-l-2 bg-menuSecondary text-menu-foreground"}>
                                            <Link href="/property?saleType=For+Sale" legacyBehavior passHref>
                                                <NavigationMenuPrimitive.Link
                                                    className={menuButtonClass('rounded-r-md')}>
                                                    For Sale
                                                </NavigationMenuPrimitive.Link>
                                            </Link>
                                            <Link href="/property?saleType=To+Rent" legacyBehavior passHref>
                                                <NavigationMenuPrimitive.Link
                                                    className={menuButtonClass('rounded-r-md')}>
                                                    To Rent
                                                </NavigationMenuPrimitive.Link>
                                            </Link>
                                            <Link href="/investment/river-view" legacyBehavior passHref>
                                                <NavigationMenuPrimitive.Link
                                                    className={menuButtonClass('rounded-r-md')}>
                                                    Investments
                                                </NavigationMenuPrimitive.Link>
                                            </Link>
                                        </NavigationMenuPrimitive.Content>
                                    </NavigationMenuPrimitive.Item>
                                    <NavigationMenuPrimitive.Item>
                                        <Link href="/investment/river-view" legacyBehavior passHref>
                                            <NavigationMenuPrimitive.Link className={menuButtonClass()}>
                                                Latest Investment
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
    </div>
}
