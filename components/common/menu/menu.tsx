"use client"
import {useMediaQuery} from "@/hooks/use-media-query";
import MobileMenu from "@/components/common/menu/components/mobile-menu/mobile-menu";
import DesktopMenu from "@/components/common/menu/components/desktop-menu/desktop-menu";

export default function Menu() {
    const isDesktop = useMediaQuery("(min-width: 980px)");
    return <>
        <div className={'menu-height'}></div>
        <div className={'fixed top-0 left-0 z-50 w-full menu-height border-menu-border'}>
            {isDesktop === false && (<MobileMenu/>)}
            {isDesktop === true && (<DesktopMenu/>)}
        </div>
    </>
}
