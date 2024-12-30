'use client'

import PropertyModel from "@/models/property.model";
import Image from 'next/image'
import H3 from "@/components/ui/typography/h3";
import currencyFormatter from "@/helpers/currency.helder";
import TextParagraph from "@/components/ui/typography/text-paragraph";
import LinesEllipsis from 'react-lines-ellipsis'
import PropertyType, {PropertyTitleText} from "@/constants/property-type.constant";
import {SuburbText, SuburbUrl} from "@/constants/suburb.constant";
import Link from "next/link";
import {SaleTypeUrl} from "@/constants/sale-type.constant";
import {CityUrl} from "@/constants/city.constant";
import {ProvinceUrl} from "@/constants/province.constant";
import PropertyFeatureIcons from "@/app/property/components/property-feature-icons";

export interface PropertyListProps {
    propertyList: Array<PropertyModel>;
}

export default function PropertyList({propertyList}: PropertyListProps) {
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

    return (
        <div className={'flex flex-col gap-6'}>
            {


                propertyList.map((value, index) => {
                    const firstImage = value.photos.length > 0 ? value.photos[0].url : '';
                    const url = `/property/${SaleTypeUrl[value.saleType]}/${SuburbUrl[value.location.suburb]}/${CityUrl[value.location.city]}/${ProvinceUrl[value.location.province]}/${value.id}`;

                    return (
                        <Link key={index} href={url}>
                            <div
                                className={'primary-list-item md:rounded-lg overflow-hidden flex flex-col md:flex-row cursor-pointer'}
                                key={index}>
                                <div
                                    className={'relative w-full pt-[50%] md:w-[318px] md:h-[217px] md:pt-0 md:shrink-0'}>
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
                                        <PropertyFeatureIcons property={value}/>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    );
};
