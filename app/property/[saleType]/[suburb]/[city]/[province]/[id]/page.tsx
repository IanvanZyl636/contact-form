import PropertyModel from "@/models/property.model";
import {CityUrl} from "@/constants/city.constant";
import {SuburbUrl} from "@/constants/suburb.constant";
import {ProvinceUrl} from "@/constants/province.constant";
import {SaleTypeUrl} from "@/constants/sale-type.constant";
import PhotoCarousel from "@/app/property/[saleType]/[suburb]/[city]/[province]/[id]/components/photo-carousel";

export const revalidate = 120;

export const dynamicParams = false;

export async function generateStaticParams() {
    const propertyList:Array<PropertyModel> = await (await fetch('https://raw.githubusercontent.com/IanvanZyl636/contact-form/master/data/generated/property-list.json')).json();

    return propertyList.map((property) => ({
        saleType:SaleTypeUrl[property.saleType],
        suburb:SuburbUrl[property.location.suburb],
        city:CityUrl[property.location.city],
        province:ProvinceUrl[property.location.province],
        id: property.id,
    }))
}

export default async function Page({ params }: { params: { id: string }}){
    const propertyList:Array<PropertyModel> = (await (await fetch('https://raw.githubusercontent.com/IanvanZyl636/contact-form/master/data/generated/property-list.json')).json() as Array<PropertyModel>).filter(property => property.id === params.id);
    const property = propertyList.length > 0 ? propertyList[0] : undefined;

    return (<div className={'property-container-fluid mx-auto'}>
        <PhotoCarousel photoUrls={(property?.photos.map((photo)=> photo.url)) ?? []}></PhotoCarousel>
    </div>)
}
