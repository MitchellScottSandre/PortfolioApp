import firebase from 'firebase'
import _ from 'lodash'
import axios from 'axios'
import { API } from '../Constants'
import { jsonToArray, mergeDataSetsByKeys, isLastCloseDate } from '../utils/functions'
import {
    INVESTMENT_FETCH_PRICE_SUCCESS,
    INVESTMENT_FETCH_ALL_SUCCESS,
    INVESTMENT_STOCKS,
    INVESTMENT_UPDATE_TOTALS,
    INVESTMENT_FETCH_CLOSE_PRICE_SUCCESS
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
                        investments = [{ name, symbol, exchange, price, amount, averagePrice: price }]
                        stocksPriceFetch(dispatch, investments, symbol)
                        break
                    default:
                }
                // console.log('called stocks info fetch: data is: ', data)
            })
    }
}

// Get all Stocks, ETFs, Bonds, Mutual Funds, or Cryptos from Firebase
export const investmentFetchAll = (investmentType) => {
    console.log('investmentFetchAll!!!')
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
                    stocksPriceFetch(dispatch, val, symbolsString)
                    _.forEach(val, (stock) => {
                        if (!stock.hasOwnProperty('closeDate') || !isLastCloseDate(stock.closeDate)) {
                            investmentPreviousCloseFetch(dispatch, 'stocks', stock.symbol)
                        }
                    })
                    break
                default:
            }
        })
    }
}

export const investmentPreviousCloseFetch = (dispatch, investmentType, symbol) => {
    if (symbol.length === 0) return
    // console.log('investmentGetPreviousClose')
    const { baseUrl, apiKey } = API.ALPHA_VANTAGE  
    const url = `${baseUrl}function=${API.ALPHA_VANTAGE.functions.timeSeriesDaily}&symbol=${symbol}&apikey=${apiKey}`
    console.log('investmentGetPreviousClose url is:', url)
    axios.get(url)
        .then((response) => {
            const data = response.data
            // console.log(data)
            const closeDate = Object.keys(data['Time Series (Daily)'])[0]
            const closePrice = data['Time Series (Daily)'][closeDate]['4. close']
            // console.log('dispatching...', data, closeDate, closePrice)
            dispatch({
                type: INVESTMENT_FETCH_CLOSE_PRICE_SUCCESS,
                payload: {
                    investmentType,
                    symbol,
                    closeDate,
                    closePrice
                }
            })  
        })
}

// API call to get all financial info
const stocksPriceFetch = (dispatch, stocks, symbolsString) => {
    if (symbolsString.length === 0) return
    console.log('stocks price fetch: symbols:', symbolsString)
    const { baseUrl, apiKey } = API.ALPHA_VANTAGE
    const url = `${baseUrl}function=${API.ALPHA_VANTAGE.functions.batchStockQuotes}&symbols=${symbolsString}&apikey=${apiKey}`
    console.log('stocksInfoFetch url is:', url)
    axios.get(url)
        .then((response) => {
            const priceData = _.map(response.data['Stock Quotes'], (stockInfo) => {
                return {
                    symbol: stockInfo['1. symbol'],
                    price: stockInfo['2. price'],
                    // volume: stockInfo['3. volume']
                }
            })

            const mergedData = mergeStockData(stocks, priceData)

            _.forEach(mergedData, (stock) => {
                investmentFetchSuccess(dispatch, INVESTMENT_FETCH_PRICE_SUCCESS, INVESTMENT_STOCKS, stock)
            })
            
            // if (stocks.length === 1) {
            //     investmentFetchSuccess(dispatch, INVESTMENT_FETCH_PRICE_SUCCESS, INVESTMENT_STOCKS, mergedData[0])
            // } else {
            //     console.log('merged data is:', mergedData)
            //     investmentFetchSuccess(dispatch, INVESTMENT_FETCH_ALL_SUCCESS, INVESTMENT_STOCKS, mergedData)
            // }
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

export const investmentUpdateTotals = ({ investmentType, totalBookValue, totalMarketValue }) => {
    return {
        type: INVESTMENT_UPDATE_TOTALS,
        payload: {
            investmentType,
            totalBookValue,
            totalMarketValue
        }
    }
}

// Helper Functions

// stocks1 is from firebase (name, symbol)                  // JSON
// stocks2 is from API request (contains financial info)    // ARRAY
const mergeStockData = (stocks1, stocks2) => {
    const newStocks1 = jsonToArray(stocks1)
    return (mergeDataSetsByKeys(newStocks1, stocks2, 'symbol', 'symbol'))
}
