import * as React from "react";
import {cn} from "@/lib/utils";

const TextParagraph = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({children, className}, ref) => (
    <p ref={ref} className={cn(className)}>
        {children}
    </p>
));

export default TextParagraph;
