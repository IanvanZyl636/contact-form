import {Grid} from "@/components/common/grid/grid";
import GridItem, {GridItemProps} from "@/components/common/grid/grid-item";
import {cn} from "@/lib/utils";

export default function WhatWeOfferGrid({className}: { className?: string }) {
    const gridItems: GridItemProps[] = [
        {
            title: 'Test',
            description: 'Test',
            image: {src: '', alt: ''},
            link: '',
            linkText: 'Learn more'
        },
        {
            title: 'Test',
            description: 'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test',
            image: {src: '', alt: ''},
            link: '',
            linkText: 'Learn more'
        },
        {
            title: 'Test',
            description: 'Test',
            image: {src: '', alt: ''},
            link: '',
            linkText: 'Learn more'
        },
        {
            title: 'Test',
            description: 'Test',
            image: {src: '', alt: ''},
            link: '',
            linkText: 'Learn more'
        },
    ];

    return <div className={className}>
        <Grid className={'lg:grid-cols-4 sm:grid-cols-2'}>
            {gridItems.map((gridItem, index) => (<GridItem key={index} {...gridItem}/>))}
        </Grid>
    </div>
};
