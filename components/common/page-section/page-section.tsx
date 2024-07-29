import {cn} from "@/lib/utils";
import {ReactNode} from "react";

export interface PageSectionProps {
    children?: ReactNode,
    className?: string,
    id?: string
}

export default function PageSection({children, className, id}: PageSectionProps) {
    return <div className={cn('page-section', className)}>
        <div id={id} className={'page-section-anchor'}></div>
        {children}
    </div>
}
