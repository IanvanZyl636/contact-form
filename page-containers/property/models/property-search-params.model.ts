export interface PropertySearchParamsModel {
    saleType?: string;
    propertyTypes?: string[];
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