'use client';

import SaleTypeFilter from "./filters/sale-type-filter";
import PropertyTypeFilter from "./filters/property-type-filter";
import {Button} from "@/components/ui/button";
import {Minus, Plus} from "lucide-react";
import PriceFilter from "./filters/price-filter";
import {Checkbox} from "@/components/ui/checkbox";
import * as React from "react";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import {ReactNode, useEffect, useState} from "react";
import {PropertySearchParamsModel} from "../models/property-search-params.model";
import AmountFilter from "./filters/amount-filter";

function useSetQueryParams(filterParams: PropertySearchParamsModel) {
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

        window.history.replaceState(null, '', `?${params.toString()}`);

    }, [filterParams]);
}

function getSearchParams(searchParams: ReadonlyURLSearchParams) {
    const entries = Object.fromEntries(searchParams.entries());
    const propertySearchParams: PropertySearchParamsModel = {};

    Object.keys(entries).forEach((objKey) => {
        const key = objKey as keyof PropertySearchParamsModel;
        const value = entries[key];

        switch (true) {
            case value.includes(',') || key === 'propertyTypes':
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

const FilterContainer = ({children}: { children?: ReactNode }) => {
    return (
        <div className={'w-full min-[387px]:w-1/2 px-2 py-2 lg:w-1/5'}>
            {children}
        </div>
    )
}

const CheckBoxFilterContainer = ({children}: { children?: ReactNode }) => {
    return (
        <div className={'w-full min-[347px]:w-1/2 md:w-1/4 lg:w-1/5 px-2 py-2 '}>
            {children}
        </div>
    )
}

export default function PropertyFilters({onValueChange}:{onValueChange?(value: PropertySearchParamsModel | undefined): void}) {
    const searchParams = useSearchParams();
    const propertySearchParams = getSearchParams(searchParams);
    const [filterParams, setFilterParams] = useState<PropertySearchParamsModel>(propertySearchParams);

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

    useSetQueryParams(filterParams);

    useEffect(() => {
        if(!onValueChange) return;

        onValueChange(filterParams);
    }, [filterParams, onValueChange]);

    return (
        <div className={'text-secondary-foreground py-2 flex flex-col'}>
            <div className={'flex flex-row flex-wrap -mx-2'}>
                <FilterContainer>
                    <SaleTypeFilter onValueChange={(saleType) => setFilterParams({...filterParams, saleType})}
                                    value={filterParams.saleType}/>
                </FilterContainer>
                <FilterContainer>
                    <PropertyTypeFilter label={'Property Type'}
                                        onValueChange={(propertyTypes) => setFilterParams({
                                            ...filterParams,
                                            propertyTypes
                                        })} value={filterParams.propertyTypes}/>
                </FilterContainer>
                <FilterContainer>
                    <AmountFilter label={'Bedrooms'} onValueChange={(bedroomAmount) => setFilterParams({
                        ...filterParams,
                        bedroomAmount
                    })} value={filterParams.bedroomAmount}/>
                </FilterContainer>
                <FilterContainer>
                    <AmountFilter label={'Garages'} onValueChange={(garageAmount) => setFilterParams({
                        ...filterParams,
                        garageAmount
                    })} value={filterParams.garageAmount}/>
                </FilterContainer>
                <div className={'w-full px-2 py-2 lg:w-1/5'}>
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
                        <div className={'flex flex-row flex-wrap -mx-2'}>
                            <FilterContainer>
                                <PriceFilter label={'Min price'} onValueChange={(minPrice) => setFilterParams({
                                    ...filterParams,
                                    minPrice
                                })} value={filterParams.minPrice}/>
                            </FilterContainer>
                            <FilterContainer>
                                <PriceFilter label={'Max price'} onValueChange={(maxPrice) => setFilterParams({
                                    ...filterParams,
                                    maxPrice
                                })} value={filterParams.maxPrice}/>
                            </FilterContainer>
                            <FilterContainer>
                                <AmountFilter label={'Bathrooms'}
                                              onValueChange={(bathroomAmount) => setFilterParams({
                                                  ...filterParams,
                                                  bathroomAmount
                                              })} value={filterParams.bathroomAmount}/>
                            </FilterContainer>
                            <FilterContainer>
                                <AmountFilter label={'Parking Spaces'}
                                              onValueChange={(parkingSpaces) => setFilterParams({
                                                  ...filterParams,
                                                  parkingSpaces
                                              })} value={filterParams.parkingSpaces}/>
                            </FilterContainer>
                            <div className={'w-full'}></div>
                        </div>
                        <div className={'flex flex-row flex-wrap -mx-2'}>
                            <CheckBoxFilterContainer>
                                <Checkbox label={'Pet Friendly'}
                                          onCheckedChange={(isPetFriendly: boolean) => setFilterParams({
                                              ...filterParams,
                                              isPetFriendly
                                          })} checked={filterParams.isPetFriendly}/>
                            </CheckBoxFilterContainer>
                            <CheckBoxFilterContainer>
                                <Checkbox label={'Garden'}
                                          onCheckedChange={(hasGarden: boolean) => setFilterParams({
                                              ...filterParams,
                                              hasGarden
                                          })} checked={filterParams.hasGarden}/>
                            </CheckBoxFilterContainer>
                            <CheckBoxFilterContainer>
                                <Checkbox label={'Pool'}
                                          onCheckedChange={(hasPool: boolean) => setFilterParams({
                                              ...filterParams,
                                              hasPool
                                          })} checked={filterParams.hasPool}/>
                            </CheckBoxFilterContainer>
                            <CheckBoxFilterContainer>
                                <Checkbox label={'Security Estate'}
                                          onCheckedChange={(isInSecurityEstate: boolean) => setFilterParams({
                                              ...filterParams,
                                              isInSecurityEstate
                                          })} checked={filterParams.isInSecurityEstate}/>
                            </CheckBoxFilterContainer>
                        </div>
                    </>
                    : null
            }
        </div>
    );
}

