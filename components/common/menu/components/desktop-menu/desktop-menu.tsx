import {
    NavigationMenu,
    NavigationMenuContent, NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {cn} from "@/lib/utils";
import MenuLogo from "@/components/common/menu/components/menu-logo/menu-logo";

export default function DesktopMenu() {
    return <NavigationMenu logo={<Link href="/" passHref><MenuLogo/></Link>}>
        <NavigationMenuList>
            <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Home
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuTrigger>
                    Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full')}>
                            Accounting
                        </NavigationMenuLink>
                    </Link>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full text-nowrap')}>
                            Register a Company
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuContent>
            </NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    How it works
                </NavigationMenuLink>
            </Link>
            <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About Us
                </NavigationMenuLink>
            </Link>
            <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact Us
                </NavigationMenuLink>
            </Link>
        </NavigationMenuList>
    </NavigationMenu>
}
