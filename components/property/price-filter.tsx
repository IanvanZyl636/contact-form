import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export default function PriceFilter({label = 'Price', onValueChange, value}:{label?:string, onValueChange?(value: string | undefined): void, value?: string | undefined}){
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
                <SelectTrigger className="w-full">
                    <SelectValue label={label} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={undefined}>Any</SelectItem>
                    {prices.map((price,index) => (<SelectItem key={index} value={price}>R {price}</SelectItem>))}
                </SelectContent>
            </Select>
            </>
        )
}
