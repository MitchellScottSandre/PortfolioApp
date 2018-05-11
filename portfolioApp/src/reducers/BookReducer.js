import {
    SAVE_BOOK_DATA
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

        default: return state
    }
}
