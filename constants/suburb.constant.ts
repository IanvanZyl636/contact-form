enum Suburb{
    KOOKRUS
}

const SuburbText: { [key in Suburb]: string } = {
    [Suburb.KOOKRUS]: 'Kookrus',
};

const SuburbUrl: { [key in Suburb]: string } = {
    [Suburb.KOOKRUS]: 'kookrus',
};

export default Suburb;

export {
    SuburbText,
    SuburbUrl
}
