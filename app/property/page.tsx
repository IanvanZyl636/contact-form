import * as React from "react";
import PropertyModel from "@/models/property.model";
import PageContainer from "@/app/property/components/page-container";

export const revalidate = 120;

export default async function PropertyPage() {
    const propertyList:Array<PropertyModel> = await (await fetch('https://raw.githubusercontent.com/IanvanZyl636/contact-form/master/data/generated/property-list.json')).json();

    return (
        <>
            <PageContainer propertyList={propertyList}/>
        </>
    )
}
