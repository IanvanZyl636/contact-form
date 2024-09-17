export default function H1({children}: {children?: string}){
    return (
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
            {children}
        </h1>
    )
}
