import * as React from "react";
import {cn} from "@/lib/utils";

const H3 = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({children, className},ref) => {
    return (
        <h3 ref={ref} className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>
            {children}
        </h3>
    )
});

export default H3
