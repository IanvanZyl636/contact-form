'use client'

import React from 'react';
import PropertySorter from "@/page-containers/property/components/sorting/property-sorter";

const PropertySorting = () => {
    const [propertySorting, setPropertySorting] = React.useState<string>();

    return (
        <div className={'bg-secondary text-secondary-foreground md:rounded-md px-4 py-2 flex flex-col'}>
            <PropertySorter value={propertySorting} onValueChange={setPropertySorting}/>
        </div>
    );
};

export default PropertySorting;