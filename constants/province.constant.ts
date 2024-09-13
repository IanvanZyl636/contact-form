enum Province {
    EC,
    FS,
    GT,
    NL,
    LP,
    MP,
    NC,
    NW,
    WC
}

const ProvinceText: { [key in Province]: string } = {
    [Province.EC]: 'Eastern Cape',
    [Province.FS]: 'Free State',
    [Province.GT]: 'Gauteng',
    [Province.NL]: 'KwaZulu-Natal',
    [Province.LP]: 'Limpopo',
    [Province.MP]: 'Mpumalanga',
    [Province.NC]: 'Northern Cape',
    [Province.NW]: 'North West',
    [Province.WC]: 'Western Cape',
};

export default Province;

export {ProvinceText}
