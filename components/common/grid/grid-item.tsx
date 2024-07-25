import {ImageProps} from "next/image";
import {Card} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export interface GridItemProps{
    title: string,
    description: string,
    image: ImageProps,
    link: string,
    linkText: string,
}

export default function GridItem({title, description, image, link, linkText}: GridItemProps) {
    return <Card className={'flex-col flex p-4 gap-2 h-full'}>
        <div style={{aspectRatio: "2 / 1"}}>
            Image
        </div>
        <div>
            <h2>{title}</h2>
        </div>
        <div className={'grow'}>
            {description}
        </div>
        <div>
            <Link href={link}>
                <Button className={'w-full'}>{linkText}</Button>
            </Link>
        </div>
    </Card>
}
