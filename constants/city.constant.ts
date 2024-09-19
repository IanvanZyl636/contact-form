enum City {
    MEYERTON
}

const CityText: { [key in City]: string } = {
    [City.MEYERTON]: 'Meyerton',
};

const CityUrl: { [key in City]: string } = {
    [City.MEYERTON]: 'meyerton',
};

export default City;

export {
    CityText,
    CityUrl
}
