'use client';

import {useSearchParams} from "next/navigation";

interface SaleTypePageSearchParamsModel{
    minPrice?:number;
    maxPrice?:number;
    bedroomAmount?:number;
    garageAmount?:number;
    bathroomAmount?:number;
    parkingSpaces?:number;
    availability?:number;
    hasGarden?:boolean;
    hasPool?:boolean;
    isInSecurityEstate?:boolean;
    isPetFriendly?:boolean;
}

export default function SaleTypePage() {
    const searchParams: SaleTypePageSearchParamsModel = Object.fromEntries(useSearchParams().entries());

    return (
        <>
            <div>{searchParams.minPrice}</div>
            <div>{searchParams.isPetFriendly ? (<div>Yes</div>) : (<div>No</div>)}</div>
        </>
)
}