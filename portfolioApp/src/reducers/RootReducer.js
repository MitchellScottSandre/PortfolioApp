import { ROOT_CHANGED, WELCOME_SCREEN } from '../actions/types'

const INITIAL_STATE = {
    root: WELCOME_SCREEN
}

export function root(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case ROOT_CHANGED:
            console.log('root reducer switching to', action.root)
            return {
                ...state,
                root: action.root
            }
        default:
            return state
    }
}
