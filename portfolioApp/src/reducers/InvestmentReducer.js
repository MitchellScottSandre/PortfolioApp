import { 
    INVESTMENT_ADD_SUCCESS,
    INVESTMENT_FETCH_ALL_SUCCESS, 
    INVESTMENT_UPDATE_TOTALS,
    INVESTMENT_CRYPTO_FETCH_ALL_SUCCESS
} from '../actions/types'
// import { addDataToUniqueArray } from '../utils/functions'

const INITIAL_STATE = {
    lastStockDataFetchTime: 0,
    symbols: [],
    stocks: {}, 
    totals: {}                
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INVESTMENT_ADD_SUCCESS:
            console.log('investment add success:', action.payload)
            // const currInvestmentData = state[action.payload.investmentType]
            // const currSymbolData = (currInvestmentData[action.payload.value.symbol] || {})
            return {
                ...state,
                [action.payload.investmentType]: {
                    ...state[action.payload.investmentType],
                    [action.payload.value.symbol]: {
                        // ...currSymbolData,
                        ...action.payload.value
                    }
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
