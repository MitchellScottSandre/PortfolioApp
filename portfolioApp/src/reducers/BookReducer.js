import {
    SAVE_BOOK_DATA,
    BOOK_CRYPTO_FETCH_ALL_PRICE_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {     

}

export default (state = INITIAL_STATE, action) => {
    let currInvestmentData, currSymbolData
    switch (action.type) {
        case SAVE_BOOK_DATA:
            console.log('book reducer,', action)
            currInvestmentData = state[action.payload.investmentType] || {}
            currSymbolData = action.payload.symbol in currInvestmentData ? currInvestmentData[action.payload.symbol] : {}
            return {
                ...state,
                [action.payload.investmentType]: {
                    [action.payload.symbol]: {
                        ...currSymbolData,
                        [action.payload.dateRange]: action.payload.graphData
                    }
                }
            }

        case BOOK_CRYPTO_FETCH_ALL_PRICE_SUCCESS: 
            console.log('INVESTMENT_CRYPTO_FETCH_ALL_SUCCESS', action.payload)
            return {
                ...state,
                cryptoPrices: action.payload
            }

        default: return state
    }
}
