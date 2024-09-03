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

export default SaleType;

export {SaleTypeText}
