'use client'

import {cn} from "@/lib/utils";
import {CSSProperties, ReactNode, useRef} from "react";
import StickyBannerImage from "@/components/common/image/sticky-banner-image";
import {ImageProps} from "next/image";

export interface PageSectionProps {
    children?: ReactNode,
    className?: string,
    id?: string,
    style?: CSSProperties | undefined,
    stickyBackground?: ImageProps,
}

export default function PageSection({children, className, id, style, stickyBackground}: PageSectionProps) {
    const sectionContainerRef = useRef<HTMLDivElement>(null);

    return <>
        {stickyBackground && <StickyBannerImage containerRef={sectionContainerRef} image={stickyBackground}/>}
        <div ref={sectionContainerRef} className={cn('page-section', className, !stickyBackground && 'bg-background')} style={style}>
            <div id={id} className={'page-section-anchor'}></div>
            {children}
        </div>
    </>
}


