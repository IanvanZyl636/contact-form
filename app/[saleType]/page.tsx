import SaleTypeRouting from "@/constants/sale-type-routing.constant"

export const dynamicParams = false;

export async function generateStaticParams() {
    const routes = Object.values(SaleTypeRouting);

    return routes.map((route) => ({
        saleType: route,
    }));
}

export default function SaleTypePage({ params }: { params: { saleType: string } }){
    return (
        <div>{params.saleType}</div>
    )
}