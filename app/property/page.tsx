import H1 from "@/components/ui/typography/h1";
import * as React from "react";
import PropertyFilters from "./components/property-filters";
import PropertySorting from "./components/property-sorting";
import PropertyList from "./components/property-list";
import PropertyModel from "@/models/property.model";

export const revalidate = 120;

export default async function PropertyPage() {
    const propertyList:Array<PropertyModel> = await (await fetch('http://localhost:3000/api/property')).json();

    return (
        <>
            <div className={'bg-secondary mb-4'}>
                <div className={'flex flex-col max-[387px]:px-2 min-[387px]:container container mx-auto'}>
                    <PropertyFilters/>
                </div>
            </div>
            <div className={'my-4 flex flex-col max-md:wrapper-container-fluid md:container mx-auto'}>
                <H1>Available Property</H1>
            </div>
            <div className={'pb-4 flex flex-col md:container min-[387px]:mx-auto'}>
                <PropertySorting/>
            </div>
            <div className={'pb-8 flex flex-col gap-8 md:container md:mx-auto'}>
                <PropertyList propertyList={propertyList}/>
            </div>
        </>
    )
}
