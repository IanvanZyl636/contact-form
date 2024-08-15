import PageSection, {PageSectionProps} from "@/components/common/page-section/page-section";
import WhatWeOfferGrid from "@/components/blocks/what-we-offer-grid";
import Hero from "@/components/blocks/hero";
import background from '@/public/space-hero.png';
import ContactForm from "@/components/blocks/contact-form";

export default function Home() {
    const sectionName = 'section';

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
        sections.map((section, i) => {
            const sectionId = `${sectionName}${i}`;

            return (<PageSection key={i} id={sectionId} {...section}></PageSection>)
        })
    );
}
