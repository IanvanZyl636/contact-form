import PropertyModel from "@/models/property.model";
import PropertyType from "@/constants/property-type.constant";
import iconBed from "@/public/property-feature-icons/icon_bed.svg";
import iconBath from "@/public/property-feature-icons/icon_bath.svg";
import iconParking from "@/public/property-feature-icons/icon_parking.svg";
import iconFloor from "@/public/property-feature-icons/icon_floor.svg";
import iconErf from "@/public/property-feature-icons/icon_erf.svg";
import {cn} from "@/lib/utils";
import Image from "next/image";

const PropertyFeatureIcon = ({icon, text, height = 20, width = 20, className}: {
    icon: any,
    height?: number,
    width?: number,
    text: string,
    className?: string
}) => (
    <div className={cn('flex flex-row gap-1 justify-items-center align-middle text-muted-foreground', className)}>
        <Image height={height} width={width} style={{width: `${width}px`, height: `${height}px`}}
               className={'text-muted-foreground'} src={icon} alt={text}/>
        <div>
            {text}
        </div>
    </div>
);

export interface PropertyFeatureIconsProps {
    property: PropertyModel
}

export default function PropertyFeatureIcons({property}:PropertyFeatureIconsProps){
    switch (property.propertyType) {
        case PropertyType.apartmentOrFlat:
        case PropertyType.townhouse:
        case PropertyType.house:
            return (
                <>
                    <PropertyFeatureIcon icon={iconBed} text={property.bedroomAmount.toString()}/>
                    <PropertyFeatureIcon icon={iconBath} text={property.bathroomAmount.toString()}/>
                    <PropertyFeatureIcon icon={iconParking} text={property.garageAmount.toString()}/>
                    <PropertyFeatureIcon icon={iconFloor} width={25} height={25}
                                         text={`${property.floorSize.toString()} m²`}/>
                    <PropertyFeatureIcon icon={iconErf} width={25} height={25}
                                         text={`${property.erfSize.toString()} m²`}/>
                </>
            )
        default:
            return (<PropertyFeatureIcon icon={iconErf} height={25} width={25}
                                         text={`${property.erfSize.toString()} m²`}/>)

    }
};