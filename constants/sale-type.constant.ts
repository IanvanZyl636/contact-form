enum SaleType {
    forSale,
    toRent,
    developments,
}

const SaleTypeText: { [key in SaleType]: string } = {
    [SaleType.forSale]: 'For Sale',
    [SaleType.toRent]: 'To Rent',
    [SaleType.developments]: 'Developments'
};

const SaleTypeUrl: { [key in SaleType]: string } = {
    [SaleType.forSale]: 'for-sale',
    [SaleType.toRent]: 'to-rent',
    [SaleType.developments]: 'developments'
};

export default SaleType;

export {
    SaleTypeText,
    SaleTypeUrl
}
