import * as React from "react";
import {cn} from "@/lib/utils";

const TextMuted= React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({children, className},ref) => {
    return (
        <p ref={ref} className={cn("text-sm text-muted-foreground",className)}>{children}</p>
    )
});

export default TextMuted;
