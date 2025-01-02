import React from "react";
import {LucideIcon} from "lucide-react";
import TextMuted from "@/components/ui/typography/text-muted";

interface FeatureHighlightItemProps{
    icon: LucideIcon,
    title:string,
    text:string,
}

export default function FeatureHighlightItem({icon: Icon, title, text}:FeatureHighlightItemProps) {
    return (
    <div className={'flex flex-row justify-center'}>
        <div className={'flex flex-col justify-center mr-4'}>
            <Icon className={'text-primary'} size={40} strokeWidth={2.25}/>
        </div>
        <div className={'flex flex-col'}>
            <div className={'font-bold'}>{title}</div>
            <div>
                <TextMuted>{text}</TextMuted>
            </div>
        </div>
    </div>
    )
}