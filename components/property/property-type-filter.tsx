
import {useEffect} from "react";
import {MultiSelect, MultiSelectContent, MultiSelectItem, MultiSelectTrigger, MultiSelectValue} from "@/components/ui/multi-select";

export default function PropertyTypeFilter({label = 'Amount', onValueChange, value}:{label?:string, onValueChange?(value: string | undefined): void, value?: string | undefined}){
    const defaultValue = "any";

    useEffect(()=> {
            (!value && onValueChange) ? onValueChange(defaultValue) : null;
        }
        ,[defaultValue]);

    const amounts:string[]=[
        '1',
        '2',
        '3',
        '4',
        '5',
    ]

    return (
        <>
            <MultiSelect onValueChange={onValueChange} value={value}>
                <MultiSelectTrigger className="w-full">
                    <MultiSelectValue noSelectionValue={'any'}  currentValue={value} label={label} />
                </MultiSelectTrigger>
                <MultiSelectContent>
                    <MultiSelectItem value={defaultValue}>Any</MultiSelectItem>
                    {amounts.map((amount,index) => (<MultiSelectItem key={index} value={amount}>{amount}+</MultiSelectItem>))}
                </MultiSelectContent>
            </MultiSelect>
        </>
    )
}
