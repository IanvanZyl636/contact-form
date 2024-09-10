import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEffect} from "react";

export default function AmountFilter({label = 'Amount', onValueChange, value}:{label?:string, onValueChange?(value: string | undefined): void, value?: string | undefined}){
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
                    <SelectValue defaultValue={label} noSelectionValue={'any'}  currentValue={value} label={label} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={undefined as any}>Any</SelectItem>
                    {amounts.map((amount,index) => (<SelectItem key={index} value={amount}>{amount}+</SelectItem>))}
                </SelectContent>
            </Select>
        </>
    )
}
