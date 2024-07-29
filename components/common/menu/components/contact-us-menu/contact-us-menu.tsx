import {Button} from "@/components/ui/button";
import {Phone} from "lucide-react";
import Whatsapp from "@/components/common/icons/whatsapp";

export default function ContactUsMenu() {
    return (
        <div className={'flex flex-row gap-2'}>
            <Button size={'custom'} variant={'custom'}
                    className={'rounded-full bg-menu-foreground border-menu-foreground border-2 group'}>
                <div className={'p-2 rounded-full bg-menu text-menu-foreground z-10'}>
                    <Phone className={'h-6 w-6'}/>
                </div>
                <div
                    className={'hidden min-[375px]:flex h-full pl-2 pr-2 flex-col justify-center font-semibold align-middle rounded-r-full text-menu bg-menu-foreground'}>
                    (011) 222 4444
                </div>
            </Button>
            <Button size={'custom'} variant={'custom'}
                    className={'rounded-full flex grow text-menu-foreground hover:bg-opacity-60 bg-whatsapp border-2 border-transparent'}>
                <div className={'p-2'}>
                    <Whatsapp className={'h-6 w-6'}/>
                </div>
            </Button>
        </div>
    )
}
