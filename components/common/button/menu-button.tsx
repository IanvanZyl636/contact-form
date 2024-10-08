import {ReactNode} from "react";
import {cn} from "@/lib/utils";

const MenuButtonStyle = (radius:string = 'rounded-md') => `${radius} group inline-flex h-10 items-center px-1 lg:px-2 xl:px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50`;

export default function MenuButton({children, className, isActive}: { children?: ReactNode,className?:string, isActive?:boolean }){
    return <div className={cn(
        MenuButtonStyle(),
        className,
        isActive && '')}>
        {children}
    </div>
}

export {MenuButtonStyle}
