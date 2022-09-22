import { formatValue } from "react-currency-input-field"

export const normalizeCurrency = (inputValue) => {
    let finalValue = '0'
    if(inputValue){
        finalValue = inputValue.toLocaleString('en-US')
    }
    return finalValue
}

export const reformatCurrency = (value) => {
    const formattedValue1 = formatValue({
        value: value || '0',
        groupSeparator: ',',
        decimalSeparator: '.',
      })
    return formattedValue1
}