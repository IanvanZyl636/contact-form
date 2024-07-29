import H1 from "@/components/ui/typography/h1";

export default function HeadingCenterSection({heading, children}: { heading:string, children?: React.ReactNode }) {
    return (
        <div className={'w-full h-full flex flex-col container py-8'}>
            <div className={'grow flex flex-col justify-center text-center pb-4 max-h-[50%]'}>
                <H1>{heading}</H1>
            </div>
            <div className={'grow pt-4'}>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
};
