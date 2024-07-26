import {Button} from "../ui/button";
import {MessageSquareText} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export default function Toolbar() {
    return (
        <div className={'fixed right-4 bottom-4 z-50'}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size={'custom'} className={'rounded-full'}>
                            <div className={'p-3'}>
                                <MessageSquareText className="h-8 w-8"/>
                            </div>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Contact us</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}