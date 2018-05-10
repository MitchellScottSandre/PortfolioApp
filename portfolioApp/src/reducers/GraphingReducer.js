import {
    STOCK_FETCH_BOOK
} from '../actions/types'

const INITIAL_STATE = {
    stockInfo: {
        symbol: '',
        dateRange: '',
        data: []
    }             
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case STOCK_FETCH_BOOK:
            return {
                ...state,
                stockInfo: {
                    symbol: action.payload.stockInfo,
                    dateRange: action.payload.dateRange,
                    graphData: action.payload.graphData
                }
            }

        default: return state
    }
}
