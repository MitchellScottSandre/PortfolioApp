import firebase from 'firebase'
import _ from 'lodash'
import axios from 'axios'
import { API } from '../Constants'
import { jsonToArray, mergeDataSetsByKeys } from '../utils/functions'
import {
    INVESTMENT_FETCH_SUCCESS,
    INVESTMENT_STOCKS
} from './types'

// Get all Stocks, ETFs, Bonds, Mutual Funds, or Cryptos from Firebase
export const investmentFetch = (investmentType) => {
    const { currentUser } = firebase.auth()
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/investments/${investmentType}`)
        .on('value', snapshot => {
            const val = snapshot.val()                                  // snapshot.val() is JSON of investments names/symbols
            const symbols = _.map(snapshot.val(), (investment) => {
                return investment.symbol
            })
            const symbolsString = _.join(symbols, ',')                  // array -> comma separated list

            switch (investmentType) {
                case INVESTMENT_STOCKS: 
                    stocksInfoFetch(dispatch, val, symbolsString)
                    break
                default:
            }
        })
    }
}

// API call to get all financial info
const stocksInfoFetch = (dispatch, stocks, symbolsString) => {
    const { baseUrl, apiKey } = API.ALPHA_VANTAGE
    const url = `${baseUrl}function=${API.ALPHA_VANTAGE.functions.batchStockQuotes}&symbols=${symbolsString}&apikey=${apiKey}`
    console.log(url)
    axios.get(url)
        .then((response) => {
            const data = _.map(response.data['Stock Quotes'], (stockInfo) => {
                return {
                    symbol: stockInfo['1. symbol'],
                    price: stockInfo['2. price'],
                    volume: stockInfo['3. volume']
                }
            })
            const mergedData = mergeStockData(stocks, data)
            investmentFetchSuccess(dispatch, INVESTMENT_STOCKS, mergedData)
        })
}

const investmentFetchSuccess = (dispatch, investmentType, value) => {
    dispatch({
        type: INVESTMENT_FETCH_SUCCESS,
        payload: { 
            investmentType, 
            value 
        }
    })
}

// Helper Functions

// stocks1 is from firebase (name, symbol)                  // JSON
// stocks2 is from API request (contains financial info)    // ARRAY
const mergeStockData = (stocks1, stocks2) => {
    const newStocks1 = jsonToArray(stocks1)
    return (mergeDataSetsByKeys(newStocks1, stocks2, 'symbol', 'symbol'))
}