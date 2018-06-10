import {
    SET_GRAPH_DATA,
    STARTING_FETCH_GRAPH_DATA
} from '../actions/types'

const INITIAL_STATE = { }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_GRAPH_DATA:
            return {
                ...state,
                [action.payload.investmentType]: {
                    symbol: action.payload.symbol,
                    dateRange: action.payload.dateRange,
                    graphData: action.payload.graphData,
                    loading: false
                }
            }
        case STARTING_FETCH_GRAPH_DATA:
            return {
                ...state,
                [action.payload.investmentType]: {
                    loading: true
                }
            }
        default: return state
    }
}
