import { 
    INVESTMENT_FETCH_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    lastStockDataFetchTime: 0,
    stocks: [],                 // symbol, name from Firebase
    stockInfo: []               // financial info, from Alpha Vantage
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INVESTMENT_FETCH_SUCCESS:
            console.log('investment reducer: action:', action)
            return {
                ...state,
                [action.payload.investmentType]: action.payload.value
            }
        default: return state
    }
}
