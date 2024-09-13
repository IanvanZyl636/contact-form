import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

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
                    <SelectValue label={label} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={undefined}>Any</SelectItem>
                    {amounts.map((amount,index) => (<SelectItem key={index} value={amount}>{amount}+</SelectItem>))}
                </SelectContent>
            </Select>
        </>
    )
}
