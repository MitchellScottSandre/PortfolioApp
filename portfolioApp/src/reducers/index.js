// REDUCERS INDEX.js

import { combineReducers } from 'redux'
import AuthenticationReducer from './AuthenticationReducer'
import { root } from './RootReducer'

export default combineReducers({
    auth: AuthenticationReducer,
    root
})

