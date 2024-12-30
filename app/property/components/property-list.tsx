'use client'

import PropertyModel, {DevelopmentModel} from "@/models/property.model";
import Image from 'next/image'
import H3 from "@/components/ui/typography/h3";
import currencyFormatter from "@/helpers/currency.helder";
import TextParagraph from "@/components/ui/typography/text-paragraph";
import LinesEllipsis from 'react-lines-ellipsis'
import PropertyType, {PropertyTitleText} from "@/constants/property-type.constant";
import {SuburbText, SuburbUrl} from "@/constants/suburb.constant";
import Link from "next/link";
import SaleType, {SaleTypeUrl} from "@/constants/sale-type.constant";
import {CityUrl} from "@/constants/city.constant";
import {ProvinceUrl} from "@/constants/province.constant";
import PropertyFeatureIcons from "@/app/property/components/property-feature-icons";
import {stripHtmlTags} from "@/helpers/strip-html-tags.helper";
import {EstateTypeUrl} from "@/constants/estate-type.constant";

export interface PropertyListProps {
    propertyList: Array<PropertyModel>;
}

export default function PropertyList({propertyList}: PropertyListProps) {
    const title = (property: PropertyModel) => {
        switch (property.propertyType) {
            case PropertyType.apartmentOrFlat:
            case PropertyType.townhouse:
            case PropertyType.house:
                return `${property.bedroomAmount} Bedroom ${PropertyTitleText[property.propertyType]}`
            default:
                return `${PropertyTitleText[property.propertyType]}`;

        }
    }

    const generateUrl = (property: PropertyModel) => {
        switch (property.saleType) {
            case SaleType.developments:
                return `/development/${EstateTypeUrl[(property as DevelopmentModel).estateType]}`
            default:
                return `/property/${SaleTypeUrl[property.saleType]}/${SuburbUrl[property.location.suburb]}/${CityUrl[property.location.city]}/${ProvinceUrl[property.location.province]}/${property.id}`;
        }
    }

    return (
        <div className={'flex flex-col gap-6'}>
            {
                propertyList.map((value, index) => {
                    const firstImage = value.photos.length > 0 ? value.photos[0].url : '';

                    return (
                        <Link key={index} href={generateUrl(value)}>
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
                                        text={stripHtmlTags(value.description)}
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
