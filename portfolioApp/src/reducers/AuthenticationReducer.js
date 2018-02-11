import { 
    EMAIL_INPUT_CHANGED, 
    PASSWORD_INPUT_CHANGED 
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
        case PASSWORD_INPUT_CHANGED:return { ...state, password: action.payload }
        default: return state
    }
}
