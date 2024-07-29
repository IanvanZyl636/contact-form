import {Grid} from "@/components/common/grid/grid";
import GridItem, {GridItemProps} from "@/components/common/grid/grid-item";
import HeadingCenterSection from "@/components/common/page-section/sections/heading-center-section";

export default function WhatWeOfferGrid() {
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

    return (
        <HeadingCenterSection heading={'What we offer'}>
            <Grid className={'lg:grid-cols-4 sm:grid-cols-2'}>
                {gridItems.map((gridItem, index) => (<GridItem key={index} {...gridItem}/>))}
            </Grid>
        </HeadingCenterSection>
    )
};
