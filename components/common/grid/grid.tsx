import {ReactNode} from "react";
import {cn} from "@/lib/utils";

export function Grid({children,className='lg:grid-cols-3'}:{children:ReactNode, className?:string}){
    return <div className={cn('grid gap-4 justify-center',className)}>
        {children}
    </div>
}
