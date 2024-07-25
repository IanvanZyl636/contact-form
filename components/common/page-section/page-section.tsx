import {cn} from "@/lib/utils";
import {ReactNode} from "react";

export interface PageSectionProps {
    heading?: string;
    children?: ReactNode,
    className?: string,
    id?: string
}

export default function PageSection({children, className, id, heading}: PageSectionProps) {
    return <div className={cn('page-section', className)}>
        <div id={id} className={'page-section-anchor'}></div>
        <div className={'w-full h-full flex flex-col'}>
            {heading && (
                <div className={'grow flex flex-col justify-center text-center pb-4 max-h-[50%]'}>
                    <h1>{heading}</h1>
                </div>)}
            <div className={cn('grow', heading && 'pt-4')}>
                {children}
            </div>
        </div>
    </div>
}
