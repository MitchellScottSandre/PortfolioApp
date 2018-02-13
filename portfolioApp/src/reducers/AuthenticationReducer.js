import { 
    EMAIL_INPUT_CHANGED, 
    PASSWORD_INPUT_CHANGED,
    AUTHORIZATION_START,
    AUTHORIZATION_SUCCESS,
    AUTHORIZATION_FAIL
} from '../actions/types'

const INITIAL_STATE = { 
    email: '', 
    password: '',
    user: null,
    error: '',
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_INPUT_CHANGED: return { ...state, email: action.payload }
        case PASSWORD_INPUT_CHANGED: return { ...state, password: action.payload }
        case AUTHORIZATION_START: return { ...state, loading: true }
        case AUTHORIZATION_SUCCESS: return { INITIAL_STATE, user: action.payload }
        case AUTHORIZATION_FAIL: return { ...state, loading: false, error: 'ERROR' }
        default: return state
    }
}
