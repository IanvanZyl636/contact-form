'use client';

import {useSearchParams} from "next/navigation";
import H1 from "@/components/ui/typography/h1";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PriceFilter from "@/components/property/price-filter";
import {useState} from "react";

interface SaleTypePageSearchParamsModel {
    minPrice?: string;
    maxPrice?: string;
    bedroomAmount?: string;
    garageAmount?: string;
    bathroomAmount?: string;
    parkingSpaces?: string;
    availability?: string;
    hasGarden?: boolean;
    hasPool?: boolean;
    isInSecurityEstate?: boolean;
    isPetFriendly?: boolean;
}

export default function SaleTypePage() {
    const searchParams: SaleTypePageSearchParamsModel = Object.fromEntries(useSearchParams().entries());
    const [minPrice, setMinPrice]= useState<string|undefined>(searchParams.minPrice);
    const [maxPrice, setMaxPrice]= useState<string|undefined>(searchParams.maxPrice);

    return (
        <>
            <div className={'my-8 flex flex-col gap-8 container mx-auto'}>
                <H1> Available Property</H1>
                <div className={'bg-secondary text-secondary-foreground rounded-md p-4'}>
                    <PriceFilter label={'Min price'} onValueChange={setMinPrice} value={minPrice} />
                    <PriceFilter onValueChange={setMaxPrice} value={maxPrice} />
                </div>
            </div>
        </>
    )
}
