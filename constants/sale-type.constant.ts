enum SaleType {
    forSale,
    toRent,
    developments,
}

const SaleTypeText: { [key in SaleType]: string } = {
    [SaleType.forSale]: 'For Sale',
    [SaleType.toRent]: 'To Rent',
    [SaleType.developments]: 'Investments'
};

const SaleTypeUrl: { [key in SaleType]: string } = {
    [SaleType.forSale]: 'for-sale',
    [SaleType.toRent]: 'to-rent',
    [SaleType.developments]: 'investments'
};

const SaleTypeDescriptionText: { [key in SaleType]: string } = {
    [SaleType.forSale]: 'for Sale',
    [SaleType.toRent]: 'to Rent',
    [SaleType.developments]: 'Investments'
};

export default SaleType;

export {
    SaleTypeText,
    SaleTypeUrl,
    SaleTypeDescriptionText
}
