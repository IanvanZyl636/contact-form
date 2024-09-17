enum PropertyType {
    house,
    apartmentOrFlat,
    townhouse,
    vacantLandOrPlot,
    farm,
    commercialProperty,
    industrialProperty,
}

const PropertyTypeText: { [key in PropertyType]: string } = {
    [PropertyType.house]: 'House',
    [PropertyType.apartmentOrFlat]: 'Apartment / Flat',
    [PropertyType.townhouse]: 'TownHouse',
    [PropertyType.vacantLandOrPlot]: 'Vacant Land / Plot',
    [PropertyType.farm]: 'Farm',
    [PropertyType.commercialProperty]: 'Commercial Property',
    [PropertyType.industrialProperty]: 'Industrial Property',
};

const PropertyTitleText : { [key in PropertyType]: string } = {
    [PropertyType.house]: 'House',
    [PropertyType.apartmentOrFlat]: 'Apartment',
    [PropertyType.townhouse]: 'Townhouse',
    [PropertyType.vacantLandOrPlot]: 'Vacant Land',
    [PropertyType.farm]: 'Farm',
    [PropertyType.commercialProperty]: 'Commercial Property',
    [PropertyType.industrialProperty]: 'Industrial Property',
};

export default PropertyType;

export {
    PropertyTypeText,
    PropertyTitleText
}
