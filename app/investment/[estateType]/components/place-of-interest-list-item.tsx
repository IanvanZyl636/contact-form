import {LucideIcon} from "lucide-react";
import React from "react";

export interface PlaceOfInterestModel{
    icon: LucideIcon,
    title:string,
    items:{title:string,value:string}[]
}

export interface PlaceOfInterestListItemProps {
    placeOfInterest:PlaceOfInterestModel
    className?: string,
}

export default function PlaceOfInterestListItem({placeOfInterest}: PlaceOfInterestListItemProps) {
    return (
        <div className={'flex flex-col gap-2'}>
            <div className={'flex flex-row border-b-primary border-b-2 text-primary gap-2 pb-2'}>
                <div className={'flex flex-col justify-center'}>
                    <placeOfInterest.icon size={25} strokeWidth={2}></placeOfInterest.icon>
                </div>
                <div className={'flex flex-col justify-center font-bold'}>
                    {placeOfInterest.title}
                </div>
            </div>
            {placeOfInterest.items.map((item, index) => (
                <div key={`placeOfInterest${index}`} className={'flex flex-row'}>
                    <div className={'flex-1'}>
                        {item.title}
                    </div>
                    <div className={'flex-1'}>
                        {item.value}
                    </div>
                </div>
            ))}
        </div>
    )
}