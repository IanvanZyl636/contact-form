enum EstateType {
    riverView
}

const EstateTypeText: { [key in EstateType]: string } = {
    [EstateType.riverView]: 'River View',
};

const EstateTypeUrl : { [key in EstateType]: string } = {
    [EstateType.riverView]: 'river-view',
};

export default EstateType;

export {
    EstateTypeText,
    EstateTypeUrl
}
