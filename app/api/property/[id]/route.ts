import PropertyModel from "@/models/property.model";

export const revalidate = 120;

export async function GET(
    request: Request,
    { params }: { params: { id: string } }) {
    try {
        const dataArr:Array<PropertyModel> = await (await fetch('https://raw.githubusercontent.com/IanvanZyl636/contact-form/master/data/generated/property-list.json')).json();
        const filterItems = dataArr.filter((data) => data.id === params.id);
        const filterItem = filterItems.length > 0 ? filterItems[0] : undefined;

        return Response.json(filterItem);
    } catch (err) {
        console.error(err);
        return Response.json(err);
    }
}
