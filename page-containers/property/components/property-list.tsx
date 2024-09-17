'use client'

import React, {useEffect} from 'react';
import PropertyHttpService from "@/http-services/property.http-service";
import PropertyModel from "@/models/property.model";
import Image from 'next/image'
import H3 from "@/components/ui/typography/h3";
import currencyFormatter from "@/helpers/currency.helder";
import TextParagraph from "@/components/ui/typography/text-paragraph";
import LinesEllipsis from 'react-lines-ellipsis'
import PropertyType, {PropertyTitleText} from "@/constants/property-type.constant";
import {SuburbText} from "@/constants/suburb.constant";

import iconBath from "@/public/property-feature-icons/icon_bath.svg";
import iconBed from "@/public/property-feature-icons/icon_bed.svg";
import iconParking from "@/public/property-feature-icons/icon_parking.svg";
import iconErf from "@/public/property-feature-icons/icon_erf.svg";
import iconFloor from "@/public/property-feature-icons/icon_floor.svg";
import {cn} from '@/lib/utils';

const propertyHttpService = PropertyHttpService;

const PropertyList = () => {
    const [propertyList, setPropertyList] = React.useState<PropertyModel[]>([]);

    useEffect(() => {
        const fetchPropertyList = async () => {
            const result = await propertyHttpService.getPropertyList();

            setPropertyList(result);
        }

        fetchPropertyList();
    }, [propertyHttpService]);

    const title = (value: PropertyModel) => {
        switch (value.propertyType) {
            case PropertyType.apartmentOrFlat:
            case PropertyType.townhouse:
            case PropertyType.house:
                return `${value.bedroomAmount} Bedroom ${PropertyTitleText[value.propertyType]}`
            default:
                return `${PropertyTitleText[value.propertyType]}`;

        }
    }

    const PropertyFeatureIcon = ({icon, text, height = 20, width = 20, className}: {
        icon: any,
        height?: number,
        width?: number,
        text: string,
        className?: string
    }) => (
        <div className={cn('flex flex-row gap-1 justify-items-center align-middle text-muted-foreground', className)}>
            <Image height={height} width={width} style={{width: `${width}px`, height: `${height}px`}}
                   className={'text-muted-foreground'} src={icon} alt={text}/>
            <div>
                {text}
            </div>
        </div>
    );

    const propertyFeatureIcons = (value: PropertyModel) => {
        switch (value.propertyType) {
            case PropertyType.apartmentOrFlat:
            case PropertyType.townhouse:
            case PropertyType.house:
                return (
                    <>
                        <PropertyFeatureIcon icon={iconBed} text={value.bedroomAmount.toString()}/>
                        <PropertyFeatureIcon icon={iconBath} text={value.bathroomAmount.toString()}/>
                        <PropertyFeatureIcon icon={iconParking} text={value.garageAmount.toString()}/>
                        <PropertyFeatureIcon icon={iconFloor} width={25} height={25}
                                             text={`${value.floorSize.toString()} m²`}/>
                        <PropertyFeatureIcon icon={iconErf} width={25} height={25}
                                             text={`${value.erfSize.toString()} m²`}/>
                    </>
                )
            default:
                return (<PropertyFeatureIcon icon={iconErf} height={25} width={25}
                                             text={`${value.erfSize.toString()} m²`}/>)

        }
    };

    return (
        <div className={'flex flex-col gap-6'}>
            {


                propertyList.map((value, index) => {
                    const firstImage = value.photos.length > 0 ? value.photos[0].url : ''

                    return (
                        <div className={'primary-list-item md:rounded-lg overflow-hidden flex flex-col md:flex-row cursor-pointer'}
                             key={index}>
                            <div className={'relative w-full pt-[50%] md:w-[318px] md:h-[217px] md:pt-0 md:shrink-0'}>
                                <Image
                                    src={firstImage}
                                    style={{objectFit: 'cover', objectPosition: 'center'}}
                                    fill
                                    alt={`Property images ${index}`}
                                />
                            </div>
                            <div className={`grow p-4 flex flex-col gap-2`}>
                                <H3 className={'text-primary'}>{currencyFormatter(value.price)}</H3>
                                <TextParagraph
                                    className={'shrink-0 text-muted-foreground'}>{title(value)}</TextParagraph>
                                <TextParagraph
                                    className={'shrink-0'}><b>{SuburbText[value.location.suburb]}</b></TextParagraph>
                                <LinesEllipsis
                                    className={'text-muted-foreground'}
                                    text={value.description}
                                    maxLine='2'
                                    ellipsis='...'
                                    trimRight
                                    basedOn='words'
                                />
                                <div className={'shrink-0 flex flex-row gap-2'}>
                                    {propertyFeatureIcons(value)}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default PropertyList;
