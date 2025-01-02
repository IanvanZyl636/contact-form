import React from "react";
import {cn} from "@/lib/utils";

export interface StripeListItemProps {
    title: string,
    value: string,
    className?: string,
}

export default function StripeListItem({title, value, className}: StripeListItemProps) {
    return (
        <div className={cn('flex flex-row w-full gap-2',className)}>
            <div>{title}</div>
            <div className={'relative grow'}>
                <div
                    className={'absolute top-1/2 -translate-y-1/2 w-full border-b-2 border-black '}>
                </div>
            </div>
            <div className={'font-bold'}>{value}</div>
        </div>
    )
}