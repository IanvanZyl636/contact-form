import SaleType from "./sale-type.constant";

const SaleTypeRouting: { [key in SaleType]: string } = {
    [SaleType.forSale]: 'for-sale',
    [SaleType.toRent]: 'to-rent',
    [SaleType.developments]: 'developments',
};

export default SaleTypeRouting;