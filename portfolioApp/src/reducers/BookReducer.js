import {
    SAVE_BOOK_DATA,
    BOOK_CRYPTO_FETCH_ALL_PRICE_SUCCESS,
    SAVE_RAW_DATA_BY_SEARCH_RANGE
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
    let currInvestmentData, currSymbolData
    switch (action.type) {
        case SAVE_BOOK_DATA:
            console.log('book reducer,', action)
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
            console.log('INVESTMENT_CRYPTO_FETCH_ALL_SUCCESS', action.payload)
            return {
                ...state,
                cryptoPrices: action.payload
            }
        
        case SAVE_RAW_DATA_BY_SEARCH_RANGE:
            console.log('SAVE_RAW_DATA_BY_SEARCH_RANGE', action.payload)
            currInvestmentData = state && state.rawData && action.payload.investmentType in state.rawData ? state.rawData[action.payload.investmentType] : {}
            currSymbolData = state && state.rawData && currInvestmentData && action.payload.symbol in currInvestmentData ? currInvestmentData[action.payload.symbol] : {}
            return {
                ...state,
                rawData: {
                    ...state.rawData,
                    [action.payload.investmentType]: {
                        ...currInvestmentData,
                        [action.payload.symbol]: {
                            ...currSymbolData,
                            [action.payload.dateField]: action.payload.data
                        }
                    }
                    
                }
            }

        default: return state
    }
}
