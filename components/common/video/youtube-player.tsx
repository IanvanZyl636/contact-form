'use client'

import {useEffect, useRef, useState} from "react";
import {OrientationType} from "@/constants/orientation-type";
import {cn} from "@/lib/utils";
import {useAspectRatioOrientation} from "@/hooks/use-aspect-ratio-orientation";

interface YoutubePlayerProps {
    videoId: string
}

export  default function YouTubePlayer({ videoId }:YoutubePlayerProps){
    const orientation = useAspectRatioOrientation(16/9);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayerVisible, setIsPlayerVisible] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    const onPlayerStateChange = (event: any) => {
        if (event.data === 1) {
            setIsPlaying(true)
        }

        if (event.data === (window as any).YT.PlayerState.ENDED) {
            setIsPlayerVisible(false);
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const onYouTubeIframeAPIReady = () => {
            new (window as any).YT.Player(iframeRef.current, {
                events: {
                    onStateChange: onPlayerStateChange,
                },
            });
        };

        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;

        document.body.appendChild(script);
        (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className={'responsive-video'}>
            {!isPlaying ? <div
                className={'absolute top-0 left-0 w-full h-full bg-cover bg-center z-20'}
                style={{
                    backgroundImage: `url(${thumbnailUrl})`,
                }}
            ></div> : <></>}
            {isPlayerVisible ? <div
                className={cn('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-video overflow-hidden', orientation === OrientationType.landscape ? 'w-full' : 'h-full')}>
                <iframe
                    className={'absolute top-0 left-0 w-full h-full z-[1] object-cover'}
                    ref={iframeRef}
                    id={`youtube-player-${videoId}`}
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&enablejsapi=1&widgetid=1&iv_load_policy=3&fs=0&modestbranding=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    loading="lazy"
                ></iframe>
            </div>:<></>}

        </div>
    );
};