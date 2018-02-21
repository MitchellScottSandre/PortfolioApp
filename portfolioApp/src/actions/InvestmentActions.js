import firebase from 'firebase'
import _ from 'lodash'
import axios from 'axios'
import { API } from '../Constants'
import { jsonToArray, mergeDataSetsByKeys } from '../utils/functions'
import {
    INVESTMENT_FETCH_SUCCESS,
    INVESTMENT_FETCH_ALL_SUCCESS,
    INVESTMENT_STOCKS
} from './types'

export const investmentAdd = (investmentType, stock) => {
    console.log('addInvestment', investmentType, stock)
    const { name, symbol, exchange, price, amount } = stock
    const { currentUser } = firebase.auth()

    return (dispatch) => {
        // console.log('includessssss:', _.includes(getState().investments.stocks, { name, symbol }))
        firebase.database().ref(`/users/${currentUser.uid}/investments/${investmentType}/${symbol}`)
            .set({
                name,
                symbol,
                amount, 
                averagePrice: price,
                exchange
            })
            .then(() => {
                let investments = null
                switch (investmentType) {
                    case INVESTMENT_STOCKS: 
                        investments = [{ name, symbol, exchange }]
                        stocksInfoFetch(dispatch, investments, symbol)
                        break
                    default:
                }
            })
    }
}

// Get all Stocks, ETFs, Bonds, Mutual Funds, or Cryptos from Firebase
export const investmentFetchAll = (investmentType) => {
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
    if (symbolsString.length === 0) return

    const { baseUrl, apiKey } = API.ALPHA_VANTAGE
    const url = `${baseUrl}function=${API.ALPHA_VANTAGE.functions.batchStockQuotes}&symbols=${symbolsString}&apikey=${apiKey}`
    console.log('stocksInfoFetch url is:', url)
    axios.get(url)
        .then((response) => {
            const data = _.map(response.data['Stock Quotes'], (stockInfo) => {
                return {
                    symbol: stockInfo['1. symbol'],
                    price: stockInfo['2. price'],
                    // volume: stockInfo['3. volume']
                }
            })
            const mergedData = mergeStockData(stocks, data)
            if (stocks.length === 1) {
                investmentFetchSuccess(dispatch, INVESTMENT_FETCH_SUCCESS, INVESTMENT_STOCKS, mergedData[0])
            } else {
                investmentFetchSuccess(dispatch, INVESTMENT_FETCH_ALL_SUCCESS, INVESTMENT_STOCKS, mergedData)
            }
        })
}

const investmentFetchSuccess = (dispatch, type, investmentType, value) => {
    dispatch({
        type,
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
