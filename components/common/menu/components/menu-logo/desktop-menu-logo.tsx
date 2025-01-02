import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from '@/public/Regency_Development_Group_Logo_Desktop.png'

export default function DesktopMenuLogo({className}: {className?: string}): JSX.Element {
    return <div className={cn(className,'logo menu-logo-height')}>
        <Image
            alt="Website logo"
            src={logo}
            style={{
                width: 'auto',
                height: '100%',
                display: 'inline-block',
            }}
        ></Image>
    </div>
}
