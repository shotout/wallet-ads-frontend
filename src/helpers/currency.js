export const normalizeCurrency = (inputValue) => {
    let finalValue = '0'
    if(inputValue){
        finalValue = inputValue.toLocaleString('en-US')
    }
    return finalValue
}