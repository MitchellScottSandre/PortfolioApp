import {
    SAVE_BOOK_DATA,
    BOOK_CRYPTO_FETCH_ALL_PRICE_SUCCESS,
} from '../actions/types'

const INITIAL_STATE = {    
    // cryptoPrices

    // cryptos
    
    // stocks
    // --> symbol
    // --> --> minVal, maxVal, bookData (price), dateData (dates)

    // rawData
    // --> cryptos
    // --> --> symbol
    // --> --> --> [weekly] or [daily] or [intraday] : data
}

export default (state = INITIAL_STATE, action) => {
    let currInvestmentData, currSymbolDatath
    switch (action.type) {
        case SAVE_BOOK_DATA:
            currInvestmentData = state[action.payload.investmentType] || {}
            currSymbolData = action.payload.symbol in currInvestmentData ? currInvestmentData[action.payload.symbol] : {}
            return {
                ...state,
                [action.payload.investmentType]: {
                    ...state[action.payload.investmentType],
                    [action.payload.symbol]: {
                        ...currSymbolData,
                        [action.payload.dateRange]: action.payload.graphData
                    }
                }
            }

        case BOOK_CRYPTO_FETCH_ALL_PRICE_SUCCESS: 
            return {
                ...state,
                cryptoPrices: action.payload
            }

        default: return state
    }
}
