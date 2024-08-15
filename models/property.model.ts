import PropertyType from "@/constants/property-type.constant";
import SaleType from "@/constants/sale-type.constant";
import LocationModel from "@/models/location.model";

export default interface PropertyModel {
    description:string;
    price:number;
    bedroomAmount:number;
    garageAmount:number;
    bathroomAmount:number;
    parkingSpaces:number;
    erfSize:number;
    floorSize:number;
    availability:number;
    hasGarden:boolean;
    hasPool:boolean;
    isInSecurityEstate:boolean;
    isPetFriendly:boolean;
    propertyType:PropertyType;
    saleType:SaleType;
    location:LocationModel;
}