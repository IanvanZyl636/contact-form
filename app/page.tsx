import Menu from "@/components/common/menu/menu";
import PageSection, {PageSectionProps} from "@/components/common/page-section/page-section";
import WhatWeOfferGrid from "@/components/blocks/what-we-offer-grid";
import Toolbar from "@/components/blocks/toolbar";
import Hero from "@/components/blocks/hero";
import background from '@/public/space-hero.png';
import ContactForm from "@/components/blocks/contact-form";
import LastPassFix from "@/components/blocks/last-pass-fix";
import {ContactDrawerDialog} from "@/components/blocks/contact-drawer-dialog";
// import ContactForm from "@/components/blocks/contact-form";

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

    const sections: PageSectionProps[] = [
        {children: <Hero/>, stickyBackground: {alt: "hero-section-background", src: background}},
        {children: <WhatWeOfferGrid/>},
        {
            children: <div className={'container'}>
                <ContactForm/>
            </div>
        },
    ];

    return (
        <LastPassFix>
            <Menu/>
            {sections.map((section, i) => {
                const sectionId = `${sectionName}${i}`;

                return (<PageSection key={i} id={sectionId} {...section}></PageSection>)
            })}
            <ContactDrawerDialog/>
        </LastPassFix>
    );
}

// I am starting an accounting company in South Africa I have my AGA SA, and I can do the following services accounting (Monthly processing, VAT, bank reconciliation and invoices), secretarial (register a company and share certificates), Tax (SARS VAT registration, SARS UIF PAYE SDL registration, Corporate Tax, Personal Tax, Capital Gains Tax, SARS Return, Payroll Tax and VAT), Payroll, Independent reviews (Financial statements)
