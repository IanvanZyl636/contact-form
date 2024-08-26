enum PropertyType {
    house,
    apartmentOrFlat,
    townhouse,
    vacantLandOrPlot,
    farm,
    commercialProperty,
    industrialProperty,
}

const PropertyTypeItem: { [key in PropertyType]: string } = {
    [PropertyType.house]: 'House',
    [PropertyType.apartmentOrFlat]: 'Apartment / Flat',
    [PropertyType.townhouse]: 'TownHouse',
    [PropertyType.vacantLandOrPlot]: 'Vacant Land / Plot',
    [PropertyType.farm]: 'Farm',
    [PropertyType.commercialProperty]: 'Commercial Property',
    [PropertyType.industrialProperty]: 'Industrial Property',
};

export default PropertyType;

export {PropertyTypeItem}
