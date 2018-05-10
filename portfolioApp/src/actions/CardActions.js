import _ from 'lodash'

import {
    ITEM_SELECTED
} from './types'


export const setSelectedItem = (cardInvestmentType, itemSymbol) => {
    console.log('set selected item called,', cardInvestmentType, itemSymbol)
    return (dispatch) => {
        dispatch({
            type: ITEM_SELECTED,
            payload: {
                cardInvestmentType,
                itemSymbol
            }
        })
    }
}
