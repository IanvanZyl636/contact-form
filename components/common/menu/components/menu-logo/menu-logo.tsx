import { cn } from "@/lib/utils";
import * as React from "react";

export default function MenuLogo({className}: {className?: string}): JSX.Element {
    return <div className={cn(className,'logo')} style={{height: '75px'}}>logo</div>
}
