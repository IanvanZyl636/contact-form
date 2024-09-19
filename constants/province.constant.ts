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

const ProvinceUrl: { [key in Province]: string } = {
    [Province.EC]: 'eastern-cape',
    [Province.FS]: 'free-state',
    [Province.GT]: 'gauteng',
    [Province.NL]: 'kwaZulu-natal',
    [Province.LP]: 'limpopo',
    [Province.MP]: 'mpumalanga',
    [Province.NC]: 'northern-cape',
    [Province.NW]: 'north-west',
    [Province.WC]: 'western-cape',
};

export default Province;

export {
    ProvinceText,
    ProvinceUrl
}
