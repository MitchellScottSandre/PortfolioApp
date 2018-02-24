import { 
    INVESTMENT_FETCH_SUCCESS,
    INVESTMENT_FETCH_ALL_SUCCESS, 
    INVESTMENT_UPDATE_TOTALS,
    INVESTMENT_FETCH_CLOSE_PRICE_SUCCESS
} from '../actions/types'
// import { addDataToUniqueArray } from '../utils/functions'

const INITIAL_STATE = {
    lastStockDataFetchTime: 0,
    // stocks: [], 
    stocks: {}, 
    totals: {}                
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case INVESTMENT_FETCH_SUCCESS:
            return {
                ...state,
                [action.payload.investmentType]: {
                    ...state[action.payload.investmentType],
                    [action.payload.value.symbol]: action.payload.value
                }
                // [action.payload.investmentType]: [...state[action.payload.investmentType], ...action.payload.value]
                // [action.payload.investmentType]: addDataToUniqueArray(state[action.payload.investmentType], action.payload.value)
                
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
        
        case INVESTMENT_FETCH_CLOSE_PRICE_SUCCESS: 
            console.log('investment fetch close price success', action.payload)
            return {
                ...state,
                [action.payload.investmentType]: {
                    ...state[action.payload.investmentType],
                    [action.payload.symbol]: {
                        ...state[action.payload.investmentType][action.payload.symbol],
                        closeDate: action.payload.closeDate,
                        closePrice: action.payload.closePrice
                    }
                }
            }
        
        default: return state
    }
}
