"use client"

import Menu from "@/components/common/menu/menu";
import PageSection, {PageSectionProps} from "@/components/common/page-section/page-section";
import {LandingCarousel} from "@/components/common/carousel/landing-carousel";
import {LegacyRef, useEffect} from "react";

export default function Home() {
    const sectionIdName = 'section';

    useEffect(() => {
        let currentSection = 0;

        const scrollToSection = (index: number) => {

            const section = document.getElementById(`${sectionIdName}${index}`);
            if (section) {
                const top = section.getBoundingClientRect().top + window.scrollY;
                window.scroll({
                    top: top,
                    behavior: "smooth"
                })
            }
        };

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 0) {
                currentSection = Math.min(currentSection + 1, sections.length - 1);
            } else {
                currentSection = Math.max(currentSection - 1, 0);
            }

            scrollToSection(currentSection);
            window.history.pushState(null, '', `#${sectionIdName}${currentSection}`);
        };

        const handleHashChange = (e:HashChangeEvent) => {
            e.preventDefault();
            const hash = window.location.hash.replace('#', '').replace(`${sectionIdName}`, '');
            const sectionIndex = +hash;
            if (sectionIndex >= 0) {
                currentSection = sectionIndex;
                scrollToSection(currentSection);
            }
        };

        window.addEventListener('wheel', handleWheel);
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const sections:PageSectionProps[] = [
        {children:<LandingCarousel className={'w-full h-full'}/>},
        {children:<LandingCarousel className={'w-full h-full'}/>},
        {children:<LandingCarousel className={'w-full h-full'}/>},
        {children:<LandingCarousel className={'w-full h-full'}/>},
    ];

    return (<>
            <Menu/>
            {sections.map((section, i) =>{
                const sectionId = `${sectionIdName}${i}`;

                return (<PageSection key={i} id={sectionId} {...section}></PageSection>)
            })}
        </>
    );
}

I am starting an accounting company in South Africa I have my AGA SA, and I can do the following services accounting (Monthly processing, VAT, bank reconciliation and invoices), secretarial (register a company and share certificates), Tax (SARS VAT registration, SARS UIF PAYE SDL registration, Corporate Tax, Personal Tax, Capital Gains Tax, SARS Return, Payroll Tax and VAT), Payroll, Independent reviews (Financial statements)
