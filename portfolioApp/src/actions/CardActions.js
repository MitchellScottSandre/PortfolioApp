import _ from 'lodash'

import {
    ITEM_SELECTED
} from './types'


export const setSelectedItem = (cardInvestmentType, item) => {
    console.log('set selected item called,', cardInvestmentType, item)
    return (dispatch) => {
        dispatch({
            type: ITEM_SELECTED,
            payload: {
                cardInvestmentType,
                item
            }
        })
    }
}
