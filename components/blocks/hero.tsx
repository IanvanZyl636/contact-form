import H1 from "@/components/ui/typography/h1";

export default function Hero() {
    return (
        <>
            <div className={'container flex flex-row align-middle w-full'}>
                <div className={'flex flex-col justify-center align-middle'}>
                    <div className={'rounded-2xl px-10 py-32 bg-white/70'}>
                        <H1>TEST HERO</H1>
                    </div>
                </div>
            </div>
        </>
    )
}
