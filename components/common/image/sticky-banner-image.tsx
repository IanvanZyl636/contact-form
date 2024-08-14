import {RefObject, useEffect, useRef} from "react";
import Image, {ImageProps} from "next/image";

export interface StickyBannerImageProps {
    image: ImageProps,
    containerRef: RefObject<HTMLDivElement>
}

export default function StickyBannerImage({image,containerRef}: StickyBannerImageProps) {
    const stickyDivRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        const containerDiv = containerRef.current;
        const stickyDiv = stickyDivRef.current;

        if(!containerDiv || !stickyDiv) return;

        const currentScrollPosition = (window.scrollY || document.documentElement.scrollTop) +75;
        const currentBottomScrollPosition = currentScrollPosition + window.innerHeight - 75;
        const containerOffsetTop = containerDiv.offsetTop;
        const containerOffsetBottom = containerOffsetTop + containerDiv.offsetHeight;

        if((containerOffsetTop <= currentScrollPosition && containerOffsetBottom > currentScrollPosition) || (containerOffsetTop <= currentBottomScrollPosition && containerOffsetBottom > currentBottomScrollPosition)) {
            stickyDiv.style.removeProperty('position');
            stickyDiv.style.removeProperty('top');
            return;
        }

        stickyDiv.style.position = 'absolute';
        stickyDiv.style.top = '-10000000px';
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [containerRef,stickyDivRef]);

    return (
        <>
            <div ref={stickyDivRef} className={'sticky-banner-image'}>
                <Image
                    {...image}
                    placeholder="blur"
                    quality={100}
                    fill
                    sizes="100vw"
                    style={{
                        objectFit: 'cover',
                    }}
                />
            </div>
        </>
    )
}
