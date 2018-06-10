import _ from 'lodash'
import axios from 'axios'
import {
    SEARCH_TEXT_CHANGED,
    SEARCH_FETCH_SUCCESS,
    SEARCH_STOCKS,
    SEARCH_CRYPROS
} from './types'
import { API } from '../Constants'

export const searchFieldTextChange = (investmentType, text) => {
    return (dispatch, getState) => {
        dispatch({
            type: SEARCH_TEXT_CHANGED,
            payload: text
        })
        searchByInvestmentType(dispatch, getState, investmentType, text)
    }
}

export const searchByInvestmentType = (dispatch, getState, investmentType, text) => {
    let baseUrl = ''

    if (investmentType === SEARCH_CRYPROS) {
        const { bookData } = getState()
        const { cryptoPrices } = bookData
        const searchedData = _.filter(cryptoPrices, cryptoData => {
            const { symbol, name } = cryptoData
            if (text.length === 1) return symbol[0] === text || name[0] === text
            return symbol.indexOf(text) !== -1 || name.indexOf(text) !== -1
        })
        dispatch({
            type: SEARCH_FETCH_SUCCESS,
            payload: {
                searchType: investmentType,
                value: searchedData
            }
        })
    } else {
        baseUrl = API.SYMBOL_SEARCH.baseUrl
        const url = `${baseUrl}${text}`
        // console.log('searchByInvestmentType url is:', url)
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
}

// Helper Functions
const getSearchTypeByInvestmentType = (investmentType) => {
    switch (investmentType) {
        case SEARCH_STOCKS: return API.SYMBOL_SEARCH.types.stock
        default: return ''
    }
}
