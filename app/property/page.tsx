'use client';

import {useSearchParams} from "next/navigation";
import H1 from "@/components/ui/typography/h1";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import PriceFilter from "@/components/property/price-filter";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import * as React from "react";
import AmountFilter from "@/components/property/amount-filter";
import {Checkbox} from "@/components/ui/checkbox";
import {CheckedState} from "@radix-ui/react-checkbox";

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


    const [minPrice, setMinPrice] = useState<string | undefined>(searchParams.minPrice);
    const [maxPrice, setMaxPrice] = useState<string | undefined>(searchParams.maxPrice);
    const [bedroomAmount, setBedroomAmount] = useState<string | undefined>(searchParams.bedroomAmount);
    const [garageAmount, setGarageAmount] = useState<string | undefined>(searchParams.garageAmount);
    const [bathroomAmount, setBathroomAmount] = useState<string | undefined>(searchParams.bathroomAmount);
    const [parkingSpaces, setParkingSpaces] = useState<string | undefined>(searchParams.parkingSpaces);
    const [hasGarden, setHasGarden] = useState<CheckedState | undefined>(searchParams.hasGarden);
    const [hasPool, setHasPool] = useState<CheckedState | undefined>(searchParams.hasPool);
    const [isInSecurityEstate, setIsInSecurityEstate] = useState<CheckedState | undefined>(searchParams.isInSecurityEstate);
    const [isPetFriendly, setIsPetFriendly] = useState<CheckedState | undefined>(searchParams.isPetFriendly);


    return (
        <>
            <div className={'my-8 flex flex-col gap-8 container mx-auto'}>
                <H1> Available Property</H1>
                <div className={'bg-secondary text-secondary-foreground rounded-md p-4 flex flex-col gap-4'}>
                    <div className={'flex flex-row gap-2'}>
                        <PriceFilter label={'Min price'} onValueChange={setMinPrice} value={minPrice}/>
                        <PriceFilter label={'Max price'} onValueChange={setMaxPrice} value={maxPrice}/>
                        <AmountFilter label={'Bedrooms'} onValueChange={setBedroomAmount} value={bedroomAmount}/>
                        <AmountFilter label={'Garages'} onValueChange={setGarageAmount} value={garageAmount}/>
                        <AmountFilter label={'Bathrooms'} onValueChange={setBathroomAmount} value={bathroomAmount}/>
                        <AmountFilter label={'Parking Spaces'} onValueChange={setParkingSpaces} value={parkingSpaces}/>
                    </div>
                    <div className={'flex flex-row gap-2 w-1/2'}>
                        <Checkbox label={'Pet Friendly'} checked={isPetFriendly} onCheckedChange={setIsPetFriendly}/>
                        <Checkbox label={'Garden'} checked={hasGarden} onCheckedChange={setHasGarden}/>
                        <Checkbox label={'Pool'} checked={hasPool} onCheckedChange={setHasPool}/>
                        <Checkbox label={'Security Estate'} checked={isInSecurityEstate} onCheckedChange={setIsInSecurityEstate}/>
                    </div>
                </div>
            </div>
        </>
    )
}

