import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEffect} from "react";

export default function PriceFilter({label = 'Price', onValueChange, value}:{label?:string, onValueChange?(value: string | undefined): void, value?: string | undefined}){
    const defaultValue = "any";
    useEffect(()=> onValueChange && onValueChange(defaultValue),[defaultValue]);

        const prices = [
            "100",
            "200",
            "300",
            "400",
            "500"
        ]

        return (
            <>
            <Select onValueChange={onValueChange} value={value}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue noSelectionValue={'any'}  currentValue={value} label={label} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={defaultValue}>Any</SelectItem>
                    {prices.map((price,index) => {
                        const priceString = price.toString();
                        return (<SelectItem key={index} value={priceString}>R {priceString}</SelectItem>)
                    })}
                </SelectContent>
            </Select>
            </>
        )
}
