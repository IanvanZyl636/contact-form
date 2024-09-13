import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import SaleType, {SaleTypeText} from "@/constants/sale-type.constant";
import {useEffect} from "react";

export default function SaleTypeFilter({onValueChange, value}:{onValueChange?(value: string | undefined): void, value?: string | undefined}){
    const saleTypes:string[]= Object.values(SaleTypeText);

    useEffect(()=> {
            (!value && onValueChange) ? onValueChange(SaleTypeText[SaleType.forSale]) : null;
        }
        ,[onValueChange]);

    return (
        <>
            <Select onValueChange={onValueChange} value={value}>
                <SelectTrigger className="w-full">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {saleTypes.map((saleType,index) => (<SelectItem key={index} value={saleType}>{saleType}</SelectItem>))}
                </SelectContent>
            </Select>
        </>
    )
}
