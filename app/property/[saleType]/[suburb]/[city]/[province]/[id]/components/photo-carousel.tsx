'use client'

import * as React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import Image from 'next/image'
import {A11y, Navigation, Pagination} from "swiper/modules";

import 'swiper/css';
import '../css/swiper/navigation.css';
import '../css/swiper/pagination.css';
import '../css/swiper/swiper-container.css';

import {useState} from "react";
import {cn} from "@/lib/utils";

interface PhotoCarouselProps {
    photoUrls: string[];
}

export default function PhotoCarousel({photoUrls}: PhotoCarouselProps) {
    const [fullScreen, setFullScreen] = useState(false);

    return (
        <div className={fullScreen?'fullscreen':''}>
            <Swiper
                className={fullScreen?'h-full w-full swiper-fullscreen':'normal'}
                onClick={() => setFullScreen(!fullScreen)}
                modules={[Navigation, Pagination, A11y]}
                pagination={{
                    type: 'fraction',
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



// 'use client'
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
//
// import { Swiper, SwiperSlide } from 'swiper/react';
//
// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
//
// export default function PhotoCarousel() {
//     return (
//         <Swiper
//             // install Swiper modules
//             modules={[Navigation, Pagination, A11y]}
//             spaceBetween={50}
//             slidesPerView={1}
//             navigation
//             pagination={{ clickable: true }}
//             scrollbar={{ draggable: true }}
//             onSwiper={(swiper) => console.log(swiper)}
//             onSlideChange={() => console.log('slide change')}
//         >
//             <SwiperSlide>Slide 1</SwiperSlide>
//             <SwiperSlide>Slide 2</SwiperSlide>
//             <SwiperSlide>Slide 3</SwiperSlide>
//             <SwiperSlide>Slide 4</SwiperSlide>
//         </Swiper>
//     );
// };
