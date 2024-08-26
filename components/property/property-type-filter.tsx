import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEffect} from "react";
import {PropertyTypeItem} from "@/constants/property-type.constant";

export default function PropertyTypeFilter({label = 'Property Type', onValueChange, value}:{label?:string, onValueChange?(value: string | undefined): void, value?: string | undefined}){
    const defaultValue = "any";

    useEffect(()=> {
            (!value && onValueChange) ? onValueChange(defaultValue) : null;
        }
        ,[defaultValue]);

    const propertyTypes:Array<{label:string, value:string}> = Object.entries(PropertyTypeItem).map(propertyTypeItem => ({label:propertyTypeItem[1], value:propertyTypeItem[0]}));

    return (
        <>
            <Select onValueChange={onValueChange} value={value}>
                <SelectTrigger className="w-full">
                    <SelectValue noSelectionValue={'any'}  currentValue={value} label={label} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={defaultValue}>Any</SelectItem>
                    {propertyTypes.map((propertyType,index) => (<SelectItem key={index} value={propertyType.value}>{propertyType.label}</SelectItem>))}
                </SelectContent>
            </Select>
        </>
    )
}
