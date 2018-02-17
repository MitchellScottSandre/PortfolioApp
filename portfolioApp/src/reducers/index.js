// REDUCERS INDEX.js

import { combineReducers } from 'redux'
import AuthenticationReducer from './AuthenticationReducer'
import InvestmentReducer from './InvestmentReducer'
import { root } from './RootReducer'

export default combineReducers({
    auth: AuthenticationReducer,
    investments: InvestmentReducer, 
    root
})

