import numeral from 'numeral'
import _ from 'lodash'
import { 
    INVESTMENT_ADD_SUCCESS,
    INVESTMENT_FETCH_ALL_SUCCESS, 
    INVESTMENT_UPDATE_TOTALS,
} from '../actions/types'

const INITIAL_STATE = {
    lastStockDataFetchTime: 0,
    symbols: [],
    stocks: {}, 
    totals: {}                
}

const calculateSummaryValues = (data) => {
    let totalBookValue = 0
    let totalMarketValue = 0
    _.forEach(data, (investment) => {
        const { amount, averagePrice, latestPrice } = investment
        totalBookValue += amount * averagePrice
        totalMarketValue += amount * latestPrice
    })
    return {
        totalBookValue: numeral(totalBookValue).format('$0,0.00'),
        totalMarketValue: numeral(totalMarketValue).format('$0,0.00'),
        dollarChange: numeral(totalMarketValue - totalBookValue).format('$0,0.00'),
        percentChange: numeral((totalMarketValue / totalBookValue) - 1).format('0.00%')
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INVESTMENT_ADD_SUCCESS:
            // console.log('investment add success:', action.payload)
            // const currInvestmentData = state[action.payload.investmentType]
            // const currSymbolData = (currInvestmentData[action.payload.value.symbol] || {})
            const updatedInvestmentData = {
                ...state[action.payload.investmentType],
                    [action.payload.value.symbol]: {
                        // ...currSymbolData,
                        ...action.payload.value
                    }
            }

            const updatedInvestmentSummaryData = calculateSummaryValues(updatedInvestmentData)
            return {
                ...state,
                [action.payload.investmentType]: updatedInvestmentData,
                summaryData: {
                    ...state.summaryData,
                    [action.payload.investmentType]: updatedInvestmentSummaryData
                },
                symbols: [...state.symbols, action.payload.value.symbol]
            }
        case INVESTMENT_FETCH_ALL_SUCCESS: 
            return {
                ...state,
                [action.payload.investmentType]: action.payload.value
            }
        
        case INVESTMENT_UPDATE_TOTALS: 
            console.log('investment update totals', action.payload)
            return {
                ...state,
                totals: {
                    ...state.totals,
                    [action.payload.investmentType]: {
                        totalBookValue: action.payload.totalBookValue,
                        totalMarketValue: action.payload.totalMarketValue
                    }
                }
            }
        default: return state
    }
}
