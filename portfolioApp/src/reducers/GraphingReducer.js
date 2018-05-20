import {
    SET_GRAPH_DATA
} from '../actions/types'

const INITIAL_STATE = {
    // stocks: {
    //     symbol: '',
    //     dateRange: '',
    //     graphData: {}
    // }             
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_GRAPH_DATA:
            console.log('set graph data', action)
            return {
                ...state,
                [action.payload.investmentType]: {
                    symbol: action.payload.symbol,
                    dateRange: action.payload.dateRange,
                    graphData: action.payload.graphData
                }
            }

        default: return state
    }
}
