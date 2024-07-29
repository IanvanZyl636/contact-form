export default function TextSmall({children}: {children?: string}){
    return (
        <small className="text-sm font-medium leading-none">{children}</small>
    )
}
