enum PropertySorting {
    priceLowToHigh,
    priceHighToLow,
    mostRecent
}

const PropertySortingText: { [key in PropertySorting]: string } = {
    [PropertySorting.priceLowToHigh]: 'Price - low to high',
    [PropertySorting.priceHighToLow]: 'Price - high to low',
    [PropertySorting.mostRecent]: 'Most Recent',
};

export default PropertySorting;

export {
    PropertySortingText,
}
