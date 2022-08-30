import _ from 'lodash'

export const getAudiencePrice = (data) => {
    const target = data.balancedTargeting
    let balancePrice = 0
    let detailPrice = 0
    if(target.cryptoCurrency || target.year || target.months || target.day || target.airdropReceived){
        balancePrice = 0.02
    }
    if(data.detailTargeting && !_.isEmpty(data.detailTargeting)){
        detailPrice = 0.02
    }
    return 0.06 + balancePrice + detailPrice
}

export const calculateAirdropPerUser = (data) => {
    const audiencePrice = getAudiencePrice(data)
    const budgetPrice = data.budgetAds ? Number(data.budgetAds) : null
    if(budgetPrice && audiencePrice){
        return Math.round(budgetPrice / audiencePrice)
    }
    return 0
}

export const checkIsFormMax = (formArr) => {
    if(formArr.length){
        const filterArr = formArr.filter(item => item.optimized === true)
        if(filterArr.length === formArr.length){
            return true
        }
    }
    return false
}

export const getTotalBudget = (formArr) => {
    if(formArr.length){
        const totalBudget = []
        formArr.forEach(item => {
            if(item.budgetAds && !isNaN(item.budgetAds)){
                totalBudget.push(Number(item.budgetAds))
            }
        })
        return totalBudget.reduce((partialSum, a) => partialSum + a, 0)
    }
    return 0
}

export const getTotalUserGetAirdrop = (formArr) => {
    if(formArr.length){
        const totalUser = []
        formArr.forEach(item => {
            if(item.budgetAds && !isNaN(item.budgetAds)){
                totalUser.push(calculateAirdropPerUser(item))
            }
        })
        return totalUser.reduce((partialSum, a) => partialSum + a, 0)
    }
    return 0
}