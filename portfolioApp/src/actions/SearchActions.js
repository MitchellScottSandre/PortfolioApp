import _ from 'lodash'
import axios from 'axios'
import {
    SEARCH_TEXT_CHANGED,
    SEARCH_FETCH_SUCCESS,
    SEARCH_STOCKS
} from './types'
import { API } from '../Constants'

export const searchFieldTextChange = (investmentType, text) => {
    return (dispatch) => {
        dispatch({
            type: SEARCH_TEXT_CHANGED,
            payload: text
        })
        searchByInvestmentType(dispatch, investmentType, text)
    }
}

export const searchByInvestmentType = (dispatch, investmentType, text) => {
    const { baseUrl } = API.SYMBOL_SEARCH
    let url = `${baseUrl}${text}`
    console.log('searchByInvestmentType url is:', url)
    axios.get(url)
        .then((response) => {
            let typeFilter = getSearchTypeByInvestmentType(investmentType)
            let data = _.filter(response.data.ResultSet.Result, (result) => {
                return result.type === typeFilter
            })
            dispatch({
                type: SEARCH_FETCH_SUCCESS,
                payload: {
                    searchType: investmentType,
                    value: data
                }
            })
        })
        .catch((error) => console.log(error))
}

// Helper Functions
const getSearchTypeByInvestmentType = (investmentType) => {
    switch (investmentType) {
        case SEARCH_STOCKS: return API.SYMBOL_SEARCH.types.stock
        default: return ''
    }
}
