export default function TextLead({children}: {children?: string}){
    return (
        <p className="text-xl text-muted-foreground">
            {children}
        </p>
    )
}
