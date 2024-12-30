'use client'

import PropertyModel from "@/models/property.model";
import {useState} from "react";
import * as React from "react";
import PhotoCarousel from "@/app/property/[saleType]/[suburb]/[city]/[province]/[id]/components/photo-carousel";
import H2 from "@/components/ui/typography/h2";
import currencyFormatter from "@/helpers/currency.helder";
import {PropertyTitleText} from "@/constants/property-type.constant";
import {SaleTypeDescriptionText} from "@/constants/sale-type.constant";
import {SuburbText} from "@/constants/suburb.constant";
import {CityText} from "@/constants/city.constant";
import PropertyFeatureIcons from "@/app/property/components/property-feature-icons";
import ContactForm from "@/components/blocks/contact-form";
import Image from "next/image";
import HtmlRender from "@/components/common/html-render/html-render";

interface PageContainerProps {
    property: PropertyModel
}

export default function PageContainer({property}: PageContainerProps) {
    const [photoGallaryIndex, setPhotoGallaryIndex] = useState<number | undefined>(undefined);
    const propertyOverviewItems: { show?: boolean, keyText: string, valueText: string }[] = [
        {show: !!property.propertyType, keyText: 'Property type', valueText: PropertyTitleText[property.propertyType]},
        {show: !!property.floorSize, keyText: 'Floor size', valueText: `${property.floorSize.toString()} m²`},
        {show: !!property.erfSize, keyText: 'Erf size', valueText: `${property.erfSize.toString()} m²`},
        {show: !!property.bedroomAmount, keyText: 'Bedrooms', valueText: property.bedroomAmount.toString()},
        {show: !!property.bathroomAmount, keyText: 'Bathrooms', valueText: property.bathroomAmount.toString()},
        {show: !!property.garageAmount, keyText: 'Garages', valueText: property.garageAmount.toString()},
        {show: !!property.parkingSpaces, keyText: 'Parking spaces', valueText: property.parkingSpaces.toString()},
        {show: property.hasGarden, keyText: 'Garden', valueText: 'Yes'},
        {show: property.hasPool, keyText: 'Pool', valueText: 'Yes'},
        {show: property.isInSecurityEstate, keyText: 'In security estate', valueText: 'Yes'},
        {show: property.isPetFriendly, keyText: 'Pet friendly', valueText: 'Yes'},
    ];

    return (<div className={'property-container-fluid mx-auto flex flex-col gap-4 pb-4'}>
            <div>
                <PhotoCarousel photoUrls={(property.photos.map((photo) => photo.url)) ?? []}
                               fullScreenIndex={photoGallaryIndex} onFullScreenChange={(isFullScreen) => {
                    !isFullScreen ? setPhotoGallaryIndex(undefined) : null
                }}></PhotoCarousel>
            </div>
            <div className={'flex flex-col gap-4'}>
                <div className={'flex flex-row gap-4'}>
                    <div className={'flex flex-col gap-4 w-2/3'}>
                        <div className={'flex flex-col gap-2 p-4 card md:rounded-lg'}>
                            <div>
                                <H2 className={'text-primary'}>{currencyFormatter(property.price)}</H2>
                            </div>
                            <div>
                                {property.bedroomAmount > 0 ? <>{property.bedroomAmount} Bedroom</> : <></>} {PropertyTitleText[property.propertyType]} {SaleTypeDescriptionText[property.saleType]} in {SuburbText[property.location.suburb]}
                            </div>
                            <div>
                                {SuburbText[property.location.suburb]}, {CityText[property.location.city]}
                            </div>
                            <div className={'shrink-0 flex flex-row gap-2'}>
                                <PropertyFeatureIcons property={property}/>
                            </div>
                        </div>
                        <HtmlRender className={'flex flex-col gap-6 p-4 card md:rounded-lg'}
                                    html={property.description}/>
                        <div className={'flex flex-col gap-2 p-4 card md:rounded-lg'}>
                            Property overview
                            <div className={'flex flex-col'}>
                                {propertyOverviewItems.filter((item) => item.show).map((propertyOverviewItem, index) => (
                                    <div key={`property-overview-item${index}`}
                                         className={'flex flex-row even:bg-accent p-1'}>
                                        <div className={'w-1/2'}><b>{propertyOverviewItem.keyText}</b></div>
                                        <div className={'w-1/2'}>{propertyOverviewItem.valueText}</div>
                                    </div>))}
                            </div>
                        </div>
                        <div className={'p-4 card md:rounded-lg '}>
                            <div className={'md:rounded-lg overflow-hidden flex flex-row gap-4'}>
                                {property.photos.map((photo, index) => (
                                    <div key={`gallery-photo${index}`}
                                         className={'w-1/3 cursor-pointer'}
                                         onClick={() => setPhotoGallaryIndex(index)}
                                    >
                                        <div className={'w-full pb-[70%] relative'}>
                                            <Image
                                                src={photo.url}
                                                alt={`Photo ${index}`}
                                                fill
                                                draggable={false}
                                                className={'select-none'}
                                                style={{objectFit: 'cover', objectPosition: 'center'}}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={'w-1/3 relative'}>
                        <div className={'sticky-item flex flex-col gap-4'}>
                            <div className={'card md:rounded-lg p-4'}>
                                <div className={'flex flex-col gap-4'}>
                                    <div
                                        className={'text-3xl font-semibold leading-none tracking-tight text-center text-primary'}>
                                        Enquire now
                                    </div>
                                    <div className={'text-sm text-muted-foreground text-center'}>Please enter your
                                        details
                                        below
                                    </div>
                                    <ContactForm/>
                                </div>
                            </div>
                            <div className={'flex flex-col gap-2 p-4 card md:rounded-lg'}>
                                map
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}