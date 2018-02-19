import { 
    INVESTMENT_FETCH_SUCCESS,
    INVESTMENT_FETCH_ALL_SUCCESS
} from '../actions/types'
import { addDataToUniqueArray } from '../utils/functions'

const INITIAL_STATE = {
    lastStockDataFetchTime: 0,
    stocks: [],                 
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INVESTMENT_FETCH_SUCCESS:
            return {
                ...state,
                [action.payload.investmentType]: [...state[action.payload.investmentType], ...action.payload.value]
                // [action.payload.investmentType]: addDataToUniqueArray(state[action.payload.investmentType], action.payload.value)
                
            }
        case INVESTMENT_FETCH_ALL_SUCCESS: {
            return {
                ...state,
                [action.payload.investmentType]: action.payload.value
            }
        }
        default: return state
    }
}
