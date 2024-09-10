import H1 from "@/components/ui/typography/h1";
import * as React from "react";
import PropertyFilters from "@/containers/property-page/components/property-filters";





export default function PropertyPageContainer() {


    return (
        <>
            <div className={'my-8 flex flex-col gap-8 container mx-auto'}>
                <H1> Available Property</H1>
                <PropertyFilters/>
            </div>
        </>
    )
}

