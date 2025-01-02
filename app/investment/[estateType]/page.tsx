import PropertyModel from "@/models/property.model";
import SaleType from "@/constants/sale-type.constant";
import {EstateTypeUrl} from "@/constants/estate-type.constant";
import PageContainer from "@/app/investment/[estateType]/components/page-container";

export const revalidate = 120;

export const dynamicParams = false;

export async function generateStaticParams() {
    const propertyList: Array<PropertyModel> = await (await fetch('https://raw.githubusercontent.com/IanvanZyl636/contact-form/master/data/generated/property-list.json')).json();

    return propertyList
        .filter(item => item.saleType === SaleType.developments)
        .map((property) => {
            if (property.estateType === undefined) return;

            return {
                estateType: EstateTypeUrl[property.estateType],
            }
        });
}

export default function Page({params}: { params: { estateType: string } }) {
    return (
        <PageContainer/>
    )
}