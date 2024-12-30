enum PropertySortingType {
    priceLowToHigh,
    priceHighToLow,
    mostRecent
}

const PropertySortingTypeText: { [key in PropertySortingType]: string } = {
    [PropertySortingType.priceLowToHigh]: 'Price - low to high',
    [PropertySortingType.priceHighToLow]: 'Price - high to low',
    [PropertySortingType.mostRecent]: 'Most Recent',
};

export default PropertySortingType;

export {
    PropertySortingTypeText,
}
