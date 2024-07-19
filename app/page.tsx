"use client"

import Menu from "@/components/common/menu/menu";
import PageSection, {PageSectionProps} from "@/components/common/page-section/page-section";
import {LandingCarousel} from "@/components/common/carousel/landing-carousel";
import {useEffect} from "react";
import PageScrollService from "@/services/page-scroll.service";

export default function Home() {
    const sectionName = 'section';

    // useEffect(() => {
    //     let pageScrollService:PageScrollService | null = new PageScrollService(sectionName, sections.length)
    //
    //     return () => {
    //         pageScrollService?.destroy();
    //         pageScrollService = null;
    //     };
    // }, []);

    const sections:PageSectionProps[] = [
        {children:<LandingCarousel className={'w-full h-full'}/>},
        {children:<div>TestTestTestTestTestTestTestTestTestTestTestTestTestTest TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest TestTestTestTestTestTestTestTestTestTestTestTestTestTest TestTestTestTestTestTestTestTestTestTest</div>},
        {children:<LandingCarousel className={'w-full h-full'}/>},
        {children:<LandingCarousel className={'w-full h-full'}/>},
    ];

    return (<>
            <Menu/>
            {sections.map((section, i) =>{
                const sectionId = `${sectionName}${i}`;

                return (<PageSection key={i} id={sectionId} {...section}></PageSection>)
            })}
        </>
    );
}

// I am starting an accounting company in South Africa I have my AGA SA, and I can do the following services accounting (Monthly processing, VAT, bank reconciliation and invoices), secretarial (register a company and share certificates), Tax (SARS VAT registration, SARS UIF PAYE SDL registration, Corporate Tax, Personal Tax, Capital Gains Tax, SARS Return, Payroll Tax and VAT), Payroll, Independent reviews (Financial statements)
