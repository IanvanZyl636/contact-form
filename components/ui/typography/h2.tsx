import * as React from "react";
import {cn} from "@/lib/utils";

const H2 = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({children, className},ref) => {
    return (
        <h2 ref={ref} className={cn('scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0', className)}>
            {children}
        </h2>
    )
});

export default H2
