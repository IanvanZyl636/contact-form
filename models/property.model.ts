import PropertyType from "@/constants/property-type.constant";
import SaleType from "@/constants/sale-type.constant";
import LocationModel from "@/models/location.model";
import {PropertyPhotoModel} from "@/models/property-photo.model";
import EstateType from "@/constants/estate-type.constant";

export default interface PropertyModel {
    id:string;
    photos: Array<PropertyPhotoModel>;
    description:string;
    price:number;
    bedroomAmount:number;
    garageAmount:number;
    bathroomAmount:number;
    parkingSpaces:number;
    erfSize:number;
    floorSize:number;
    availabilityInMonths:number;
    hasGarden:boolean;
    hasPool:boolean;
    isInSecurityEstate:boolean;
    isPetFriendly:boolean;
    propertyType:PropertyType;
    saleType:SaleType;
    location:LocationModel;
}

export interface DevelopmentModel extends PropertyModel{
    estateType:EstateType;
}
