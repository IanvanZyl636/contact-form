enum Suburb{
    KOOKRUS
}

const SuburbText: { [key in Suburb]: string } = {
    [Suburb.KOOKRUS]: 'Kookrus',
};

export default Suburb;

export {SuburbText}
