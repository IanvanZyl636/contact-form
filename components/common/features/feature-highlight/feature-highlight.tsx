import {ReactNode} from "react";
import {cn} from "@/lib/utils";

interface FeatureHighlightProps{
    children?:ReactNode;
    className?:string;
}

export default function FeatureHighlight({children, className}:FeatureHighlightProps) {
    return (
        <div className={cn('flex flex-row justify-between', className)}>
            {children}
        </div>
    )
}