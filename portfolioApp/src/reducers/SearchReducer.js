import {
    SEARCH_TEXT_CHANGED,
    SEARCH_FETCH_SUCCESS
} from '../actions/types'

const INITIAL_STATE = { 
    searchFieldText: '',
    searchResults: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_TEXT_CHANGED: 
            return { 
                ...state, 
                searchFieldText: action.payload 
            }
        case SEARCH_FETCH_SUCCESS: 
            return { 
                ...state, 
                searchType: action.payload.searchType,
                searchResults: action.payload.value
            }
        default: return state
    }
}
