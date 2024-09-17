const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: ' ',
    decimalSeparator: '.',
    symbol: 'R',
    showDecimalSeparator: false,
}

const currencyFormatter = (value:string | number, options:typeof defaultOptions = defaultOptions) => {
    let numberValue = 0.0;

    switch (typeof value){
        case 'number': numberValue = value;
        break;
        case 'string':numberValue = Number(value);
        break;
        default:
            console.error('value must be either string or number');
    }

    if(isNaN(numberValue)) console.error('value is not a number');

    const valueString = numberValue.toFixed(options.significantDigits)

    const [currency, decimal] = valueString.split('.')
    return `${options.symbol} ${currency.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        options.thousandsSeparator
    )}${options.showDecimalSeparator ? `${options.decimalSeparator}${decimal}`: ''}`
}

export default currencyFormatter
