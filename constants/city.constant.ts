enum City {
    MEYERTON
}

const CityText: { [key in City]: string } = {
    [City.MEYERTON]: 'Meyerton',
};

export default City;

export {CityText}
