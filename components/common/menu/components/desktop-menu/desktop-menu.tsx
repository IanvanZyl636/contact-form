import {
    NavigationMenu,
    NavigationMenuContent, NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {cn} from "@/lib/utils";
import DesktopMenuLogo from "@/components/common/menu/components/menu-logo/desktop-menu-logo";

export default function DesktopMenu({className}: {className?: string}) {

    return <NavigationMenu className={className} logo={<Link href="/" passHref><DesktopMenuLogo/></Link>}>
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
                    <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full')}>
                            Accounting
                        </NavigationMenuLink>
                    </Link>
                    <Link href="/" legacyBehavior passHref>
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
