'use client'

import React, {useEffect} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import TextParagraph from "@/components/ui/typography/text-paragraph";
import PropertySortingType, {PropertySortingTypeText} from "@/constants/property-sorting.constant";

export interface PropertySorterProps {
    onValueChange?(value: string | undefined): void,

    value?: string | undefined
    amountOfRecords?: number;
}

const PropertySorting = ({onValueChange, value, amountOfRecords}: PropertySorterProps) => {
    const options: string[] = Object.values(PropertySortingTypeText);

    useEffect(() => {
            if (!onValueChange) return;

            onValueChange(PropertySortingTypeText[PropertySortingType.priceLowToHigh]);
        }, [onValueChange, value]
    );

    return (
        <>
            <div className={'bg-secondary text-secondary-foreground md:rounded-md px-4 py-4 flex flex-col'}>
                <div className={'flex flex-row gap-4 justify-items-center items-center'}>
                    <div className={'flex flex-row gap-2 shrink-0 grow justify-items-center items-center'}>
                        <div className={'shrink-0 hidden sm:block'}>
                            <TextParagraph>Order by:</TextParagraph>
                        </div>
                        <div className={'w-full md:w-1/2 lg:w-1/4'}>
                            <Select onValueChange={onValueChange} value={value}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={''}/>
                                </SelectTrigger>
                                <SelectContent>
                                    {options.map((option, index) => (
                                        <SelectItem key={index} value={option}>{option}</SelectItem>))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {
                        amountOfRecords !== undefined && amountOfRecords !== null ?
                            <div>
                                <TextParagraph>{amountOfRecords} results</TextParagraph>
                            </div>
                            :
                            <></>
                    }
                </div>
            </div>
        </>
    )
};

export default PropertySorting;
