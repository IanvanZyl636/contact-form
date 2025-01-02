export default function TextLead({children, className}: {children?: string, className?: string}) {
    return (
        <p className={`text-xl text-muted-foreground ${className}`}>
            {children}
        </p>
    )
}
