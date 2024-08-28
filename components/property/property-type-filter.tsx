import {MultiSelect, MultiSelectContent, MultiSelectItem, MultiSelectTrigger, MultiSelectValue} from "@/components/ui/multi-select";

export default function PropertyTypeFilter({label = 'Amount', onValueChange, value}:{label?:string, onValueChange?(value: string[]): void, value?: string[] | undefined}){
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
                    <MultiSelectValue label={label} />
                </MultiSelectTrigger>
                <MultiSelectContent>
                    {amounts.map((amount,index) => (<MultiSelectItem key={index} value={amount}>{amount}+</MultiSelectItem>))}
                </MultiSelectContent>
            </MultiSelect>
        </>
    )
}
