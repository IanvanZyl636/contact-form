"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {cn} from "@/lib/utils";

export function LandingCarousel({className}:{className?:string}) {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className={className}
            opts={{loop:true}}
            // onMouseLeave={()=>plugin.current.play()}
        >
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div>
                            {index + 1}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext/>
        </Carousel>
    )
}
