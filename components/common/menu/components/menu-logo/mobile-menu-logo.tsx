import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from '@/public/mobile_halo_tech_logo.png'

export default function MobileMenuLogo({className}: {className?: string}): JSX.Element {
    return <div className={cn(className,'logo menu-logo-height py-2')}>
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
