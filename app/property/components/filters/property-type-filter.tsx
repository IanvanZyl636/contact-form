import {MultiSelect, MultiSelectContent, MultiSelectItem, MultiSelectTrigger, MultiSelectValue} from "@/components/ui/multi-select";
import {PropertyTypeText} from "@/constants/property-type.constant";

export default function PropertyTypeFilter({label = 'Amount', onValueChange, value}:{label?:string, onValueChange?(value: string[]): void, value?: string[] | undefined}){
    const propertyTypes:string[]= Object.values(PropertyTypeText);

    return (
        <>
            <MultiSelect onValueChange={onValueChange} value={value}>
                <MultiSelectTrigger className="w-full">
                    <MultiSelectValue label={label} />
                </MultiSelectTrigger>
                <MultiSelectContent>
                    {propertyTypes.map((propertyType,index) => (<MultiSelectItem key={index} value={propertyType}>{propertyType}</MultiSelectItem>))}
                </MultiSelectContent>
            </MultiSelect>
        </>
    )
}
