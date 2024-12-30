'use client'

import H1 from "@/components/ui/typography/h1";
import * as React from "react";
import PropertyFilters from "./property-filters";
import PropertySorting from "./property-sorting";
import PropertyList from "./property-list";
import PropertyModel from "@/models/property.model";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {PropertySearchParamsModel} from "@/app/property/models/property-search-params.model";
import {SaleTypeText} from "@/constants/sale-type.constant";
import {getEnumKeyFromValue} from "@/helpers/constant.helper";
import {PropertyTypeText} from "@/constants/property-type.constant";

export default function PageContainer({propertyList}:{propertyList:PropertyModel[]}) {
    const [filterParams, setFilterParams] = useState<PropertySearchParamsModel>();
    const [filteredPropertyList] = useStatePropertyListFilter(propertyList, filterParams);
    const [propertySorting, setPropertySorting] = useState<string>();

    return (
        <>
            <div className={'bg-secondary mb-4'}>
                <div className={'flex flex-col max-[387px]:px-2 min-[387px]:container container mx-auto'}>
                    <PropertyFilters onValueChange={setFilterParams}/>
                </div>
            </div>
            <div className={'my-4 flex flex-col max-md:wrapper-container-fluid md:container mx-auto'}>
                <H1>Available Property</H1>
            </div>
            <div className={'pb-4 flex flex-col md:container min-[387px]:mx-auto'}>
                <PropertySorting value={propertySorting} onValueChange={setPropertySorting}  amountOfRecords={filteredPropertyList.length}/>
            </div>
            <div className={'pb-8 flex flex-col gap-8 md:container md:mx-auto'}>
                <PropertyList propertyList={filteredPropertyList}/>
            </div>
        </>
    )
}

function useStatePropertyListFilter(propertyList: PropertyModel[], filterParams: PropertySearchParamsModel | undefined, ): [PropertyModel[], Dispatch<SetStateAction<PropertyModel[]>>]{
    const [filteredPropertyList, setFilteredPropertyList] = useState<PropertyModel[]>(propertyList);

    useEffect(() => {
        if(!filterParams) return;

        setFilteredPropertyList(propertyListFilter(propertyList, filterParams));
    }, [filterParams, propertyList]);

    return [filteredPropertyList, setFilteredPropertyList];
}

function propertyListFilter(propertyList: PropertyModel[], filterParams: PropertySearchParamsModel){
    const saleType = getEnumKeyFromValue(SaleTypeText, filterParams.saleType ?? '');
    const propertyTypes = filterParams.propertyTypes?.map(propertyType => getEnumKeyFromValue(PropertyTypeText, propertyType));

    return propertyList.filter(property =>
        property.saleType === saleType &&
        (!propertyTypes || propertyTypes.length === 0 || propertyTypes.includes(property.propertyType)) &&
        (!filterParams.hasPool || property.hasPool) &&
        (!filterParams.hasGarden || property.hasGarden) &&
        (!filterParams.isInSecurityEstate || property.isInSecurityEstate) &&
        (!filterParams.isPetFriendly || property.isPetFriendly) &&
        (!filterParams.garageAmount || property.garageAmount >= Number(filterParams.garageAmount)) &&
        (!filterParams.bedroomAmount || property.bedroomAmount >= Number(filterParams.bedroomAmount)) &&
        (!filterParams.bathroomAmount || property.bathroomAmount >= Number(filterParams.bathroomAmount)) &&
        (!filterParams.parkingSpaces || property.parkingSpaces >= Number(filterParams.parkingSpaces)) &&
        (!filterParams.minPrice || property.price >= Number(filterParams.minPrice)) &&
        (!filterParams.maxPrice || property.price <= Number(filterParams.maxPrice))
    );
}