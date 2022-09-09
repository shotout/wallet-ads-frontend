import _ from 'lodash'

export const getAudiencePrice = (data) => {
    const target = data.selectedCategory
    if(target === 'detail-targeting'){
        return 0.079
    }
    if(target === 'upload'){
        return 0.019
    }
    return 0.039
}

export const calculateAirdropPerUser = (data) => {
    const audiencePrice = getAudiencePrice(data)
    const budgetPrice = data.budgetAds ? Number(data.budgetAds.replace(',','.')) : null
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

export const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")