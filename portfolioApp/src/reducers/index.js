// REDUCERS INDEX.js

import { combineReducers } from 'redux'
import AuthenticationReducer from './AuthenticationReducer'
import InvestmentReducer from './InvestmentReducer'
import SearchReducer from './SearchReducer'
import GraphingReducer from './GraphingReducer'
import CardReducer from './CardReducer'
import { root } from './RootReducer'

export default combineReducers({
    auth: AuthenticationReducer,
    investments: InvestmentReducer, 
    search: SearchReducer, 
    root,
    graphing: GraphingReducer,
    cards: CardReducer
})

