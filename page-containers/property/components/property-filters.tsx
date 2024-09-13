'use client';

import SaleTypeFilter from "@/components/property/sale-type-filter";
import PropertyTypeFilter from "@/components/property/property-type-filter";
import {Button} from "@/components/ui/button";
import {Minus, Plus} from "lucide-react";
import PriceFilter from "@/components/property/price-filter";
import AmountFilter from "@/components/property/amount-filter";
import {Checkbox} from "@/components/ui/checkbox";
import * as React from "react";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {ReadonlyURLSearchParams, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {PropertySearchParamsModel} from "@/page-containers/property/models/property-search-params.model";

function useSetQueryParams(router: AppRouterInstance, filterParams: PropertySearchParamsModel) {
    useEffect(() => {
        const params = new URLSearchParams();

        Object.entries(filterParams).forEach(([key, value]) => {
            let valueType;

            if (Array.isArray(value)) {
                valueType = 'array';
            } else {
                valueType = typeof value;
            }

            let formattedStringValue: string | undefined;

            switch (valueType) {
                case 'array':
                    formattedStringValue = value.length > 0 ? value.join(',') : undefined;
                    break;
                case 'boolean':
                    formattedStringValue = value === true ? value : undefined;
                    break;
                case 'string':
                    formattedStringValue = value.length > 0 ? value : undefined;
                    break;
                default:
                    formattedStringValue = undefined;
                    break;
            }

            if (!formattedStringValue) return;

            params.set(key, formattedStringValue);
        });

        router.replace(`?${params.toString()}`);
    }, [filterParams]);
}

function getSearchParams(searchParams: ReadonlyURLSearchParams) {
    const entries = Object.fromEntries(searchParams.entries());
    const propertySearchParams: PropertySearchParamsModel = {};

    Object.keys(entries).forEach((objKey) => {
        const key = objKey as keyof PropertySearchParamsModel;
        const value = entries[key];

        switch (true) {
            case value.includes(','):
                (propertySearchParams[key] as string[]) = value.split(',');
                break;
            case value === 'true':
                (propertySearchParams[key] as boolean) = true;
                break;
            default:
                (propertySearchParams[key] as string) = value;
                break;
        }
    })

    return propertySearchParams;
}

export default function PropertyFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filterParams, setFilterParams] = useState<PropertySearchParamsModel>(getSearchParams(searchParams));

    const moreFiltersInitialVal = [
        filterParams.minPrice,
        filterParams.maxPrice,
        filterParams.bathroomAmount,
        filterParams.parkingSpaces,
        filterParams.isPetFriendly,
        filterParams.hasGarden,
        filterParams.hasPool,
        filterParams.isInSecurityEstate
    ]
        .filter((val) => val !== undefined)
        .length > 0;

    const [moreFilters, setMoreFilters] = useState<boolean>(moreFiltersInitialVal);

    useSetQueryParams(router, filterParams);

    return (
        <div className={'bg-secondary text-secondary-foreground rounded-md p-4 flex flex-col gap-4'}>
            <div className={'flex flex-row gap-4 items-stretch'}>
                <div className={'w-full'}>
                    <SaleTypeFilter onValueChange={(saleType) => setFilterParams({...filterParams, saleType})}
                                    value={filterParams.saleType}/>
                </div>
                <div className={'w-full'}>
                    <PropertyTypeFilter label={'Property Type'}
                                        onValueChange={(propertyTypes) => setFilterParams({
                                            ...filterParams,
                                            propertyTypes
                                        })} value={filterParams.propertyTypes}/>
                </div>
                <div className={'w-full'}>
                    <AmountFilter label={'Bedrooms'} onValueChange={(bedroomAmount) => setFilterParams({
                        ...filterParams,
                        bedroomAmount
                    })} value={filterParams.bedroomAmount}/>
                </div>
                <div className={'w-full'}>
                    <AmountFilter label={'Garages'} onValueChange={(garageAmount) => setFilterParams({
                        ...filterParams,
                        garageAmount
                    })} value={filterParams.garageAmount}/>
                </div>
                <div className={'w-full'}>
                    <Button className={'w-full'} type={'button'} onClick={() => setMoreFilters(!moreFilters)}>
                        {
                            moreFilters ?
                                <>Less Filters <Minus className={'ml-2'}/></>
                                :
                                <>More Filters <Plus className={'ml-2'}/></>
                        }
                    </Button>
                </div>
            </div>
            {
                moreFilters ?
                    <>
                        <div className={'flex flex-row gap-4 items-stretch'}>
                            <div className={'w-full'}>
                                <PriceFilter label={'Min price'} onValueChange={(minPrice) => setFilterParams({
                                    ...filterParams,
                                    minPrice
                                })} value={filterParams.minPrice}/>
                            </div>
                            <div className={'w-full'}>
                                <PriceFilter label={'Max price'} onValueChange={(maxPrice) => setFilterParams({
                                    ...filterParams,
                                    maxPrice
                                })} value={filterParams.maxPrice}/>
                            </div>
                            <div className={'w-full'}>
                                <AmountFilter label={'Bathrooms'}
                                              onValueChange={(bathroomAmount) => setFilterParams({
                                                  ...filterParams,
                                                  bathroomAmount
                                              })} value={filterParams.bathroomAmount}/>
                            </div>
                            <div className={'w-full'}>
                                <AmountFilter label={'Parking Spaces'}
                                              onValueChange={(parkingSpaces) => setFilterParams({
                                                  ...filterParams,
                                                  parkingSpaces
                                              })} value={filterParams.parkingSpaces}/>
                            </div>
                            <div className={'w-full'}></div>
                        </div>
                        <div className={'flex flex-row gap-4'}>
                            <div className={'flex flex-row gap-4 w-4/5'}>
                                <div className={'w-full'}>
                                    <Checkbox label={'Pet Friendly'}
                                              onCheckedChange={(isPetFriendly: boolean) => setFilterParams({
                                                  ...filterParams,
                                                  isPetFriendly
                                              })} checked={filterParams.isPetFriendly}/>
                                </div>
                                <div className={'w-full'}>
                                    <Checkbox label={'Garden'}
                                              onCheckedChange={(hasGarden: boolean) => setFilterParams({
                                                  ...filterParams,
                                                  hasGarden
                                              })} checked={filterParams.hasGarden}/>
                                </div>
                                <div className={'w-full'}>
                                    <Checkbox label={'Pool'}
                                              onCheckedChange={(hasPool: boolean) => setFilterParams({
                                                  ...filterParams,
                                                  hasPool
                                              })} checked={filterParams.hasPool}/>
                                </div>
                                <div className={'w-full'}>
                                    <Checkbox label={'Security Estate'}
                                              onCheckedChange={(isInSecurityEstate: boolean) => setFilterParams({
                                                  ...filterParams,
                                                  isInSecurityEstate
                                              })} checked={filterParams.isInSecurityEstate}/>
                                </div>
                            </div>
                        </div>
                    </>
                    : null
            }
        </div>
    );
}

