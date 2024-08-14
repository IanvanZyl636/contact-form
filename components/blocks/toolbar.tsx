import * as React from "react";
import {Button, ButtonProps} from "../ui/button";
import {MessageSquareText} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import {useEffect, useState} from "react";

export interface ToolbarProps extends ButtonProps {
    open: boolean;
}

const Toolbar = React.forwardRef<
    React.ElementRef<typeof Button>,
    ToolbarProps
>(({open, ...props}, ref) => (<TooltipProvider>
    <Tooltip>
        <TooltipTrigger asChild>
            <Button ref={ref} size={'custom'} className={'rounded-full fixed right-4 bottom-4 z-50'} {...props}>
                <div className={'p-3'}>
                    <MessageSquareText className="h-8 w-8"/>
                </div>
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>Contact us</p>
        </TooltipContent>
    </Tooltip>
</TooltipProvider>));

export default Toolbar;
