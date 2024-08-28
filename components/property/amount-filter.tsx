import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEffect} from "react";

export default function AmountFilter({label = 'Amount', onValueChange, value}:{label?:string, onValueChange?(value: string | undefined): void, value?: string | undefined}){
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
            <Select onValueChange={onValueChange} value={value}>
                <SelectTrigger className="w-full">
                    <SelectValue noSelectionValue={'any'}  currentValue={value} label={label} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={defaultValue}>Any</SelectItem>
                    {amounts.map((amount,index) => (<SelectItem key={index} value={amount}>{amount}+</SelectItem>))}
                </SelectContent>
            </Select>
        </>
    )
}
