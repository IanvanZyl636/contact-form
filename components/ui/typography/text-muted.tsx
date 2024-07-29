export default function TextMuted({children}: {children?: string}){
    return (
        <p className="text-sm text-muted-foreground">{children}</p>
    )
}
