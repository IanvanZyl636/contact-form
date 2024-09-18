export const revalidate = 120;

export async function GET() {
    try {
        return Response.json(await (await fetch('https://raw.githubusercontent.com/IanvanZyl636/contact-form/master/data/generated/property-list.json')).json());
    } catch (err) {
        return Response.json(err);
    }
}
