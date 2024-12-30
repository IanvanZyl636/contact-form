'use client'

import * as React from 'react';
import {Swiper, SwiperClass, SwiperSlide} from "swiper/react";
import Image from 'next/image'
import {A11y, Navigation, Pagination, Autoplay } from "swiper/modules";

import 'swiper/css';
import '../css/swiper/navigation.css';
import '../css/swiper/pagination.css';
import '../css/swiper/swiper-container.css';

import {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";

interface PhotoCarouselProps {
    photoUrls: string[];
    fullScreenIndex?:number;
    onFullScreenChange?:(isFullScreen:boolean)=>void;
}

export default function PhotoCarousel({photoUrls, fullScreenIndex, onFullScreenChange}: PhotoCarouselProps) {
    const swiperRef = useRef<SwiperClass | null>(null);
    const [fullScreen, setFullScreen] = useState(false);

    useEffect(() => {
        if(fullScreenIndex === undefined) return;

        setFullScreen(true);
        swiperRef.current?.slideTo(fullScreenIndex);
    }, [fullScreenIndex]);

    useEffect(() => {
        if(!onFullScreenChange) return;

        onFullScreenChange(fullScreen);
    }, [fullScreen, onFullScreenChange]);

    return (
        <div className={fullScreen?'fullscreen':''}>
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className={fullScreen?'h-full w-full swiper-fullscreen':'normal'}
                onClick={() => setFullScreen(!fullScreen)}
                modules={[Autoplay, Navigation, Pagination, A11y]}
                pagination={{
                    type: 'fraction',
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}
                loop={true}
                slidesPerView={1}

                navigation
                scrollbar={{draggable: true}}
            >
                {photoUrls.map((photoUrl, index) => (
                    <SwiperSlide key={index}>
                        <div className={cn(
                            fullScreen?'h-full w-full':'w-full pb-[56.3637%]',
                            'relative'
                        )}>
                            <Image src={photoUrl}
                                   alt={`Photo ${index}`}
                                   fill
                                   draggable={false}
                                   className={'select-none'}
                                   style={fullScreen?{objectFit:'contain', objectPosition:'center'}:{objectFit: 'cover', objectPosition: 'center'}}/>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};