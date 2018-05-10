import { 
    ITEM_SELECTED
} from '../actions/types'

const INITIAL_STATE = {
    stocks: {}             
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ITEM_SELECTED:
            return {
                ...state,
                [action.payload.cardInvestmentType]: {
                    ...state[action.payload.cardInvestmentType],
                    selectedSymbol: action.payload.itemSymbol
                }
            }
        default: return state
    }
}
