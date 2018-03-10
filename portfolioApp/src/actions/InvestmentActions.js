import firebase from 'firebase'
import _ from 'lodash'
import axios from 'axios'
import { API } from '../Constants'
import { jsonToArray, mergeDataSetsByKeys, isLastCloseDate } from '../utils/functions'
import {
    INVESTMENT_ADD_SUCCESS, 
    INVESTMENT_FETCH_PRICE_SUCCESS,
    INVESTMENT_FETCH_ALL_SUCCESS,
    INVESTMENT_STOCKS,
    INVESTMENT_UPDATE_TOTALS,
    // INVESTMENT_FETCH_CLOSE_PRICE_SUCCESS
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
                const investmentInfo = { name, exchange, amount, averagePrice: price }
                switch (investmentType) {
                    case INVESTMENT_STOCKS: 
                        stockFetch(dispatch, symbol, investmentInfo)
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
        .once('value', snapshot => {
            const investments = snapshot.val()                                  
            const symbols = _.map(investments, (investment) => {
                return investment.symbol
            })
            const symbolsString = _.join(symbols, ',')                  

            switch (investmentType) {
                case INVESTMENT_STOCKS: 
                    stockFetchAll(dispatch, symbolsString, investments)
                    break
                default:
            }
        })
    }
}

export const stockFetchAll = (dispatch, symbolsString, stocks) => {
    if (symbolsString.length === 0) return
    const { baseUrl } = API.IEX_TRADING
    let url = `${baseUrl}/stock/market/batch?symbols=${symbolsString}&types=quote`
    axios.get(url)
        .then((response) => {
            const stocksInfo = response.data
            _.forEach(stocksInfo, (stockInfo) => {
                const { 
                    symbol,
                    change,
                    changePercent, 
                    latestPrice,
                    close,
                    closeTime,
                    sector,
                    latestTime
                } = stockInfo.quote

                dispatch({
                    type: INVESTMENT_ADD_SUCCESS,
                    payload: {
                        investmentType: INVESTMENT_STOCKS,
                        value: {
                            change,
                            changePercent,
                            symbol,
                            latestPrice,
                            close,
                            closeTime, 
                            sector,
                            latestTime,
                            ...stocks[symbol]
                        }
                    }
                })
            })
        })
}

export const stockFetch = (dispatch, symbol, investmentInfo) => {
    if (symbol.length === 0) return
    const { baseUrl } = API.IEX_TRADING
    let url = `${baseUrl}/stock/${symbol}/book`
    axios.get(url)
        .then((response) => {
            const { 
                change,
                changePercent, 
                latestPrice,
                close,
                closeTime,
                sector,
                latestTime
            } = response.data.quote

            dispatch({
                type: INVESTMENT_ADD_SUCCESS,
                payload: {
                    investmentType: INVESTMENT_STOCKS,
                    value: {
                        change,
                        changePercent,
                        symbol,
                        latestPrice,
                        close,
                        closeTime, 
                        sector,
                        latestTime,
                        ...investmentInfo
                    }
                }
            })
        })
}

// const investmentFetchSuccess = (dispatch, type, investmentType, value) => {
//     dispatch({
//         type,
//         payload: { 
//             investmentType, 
//             value 
//         }
//     })
// }

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

// // Helper Functions

// // stocks1 is from firebase (name, symbol)                  // JSON
// // stocks2 is from API request (contains financial info)    // ARRAY
// const mergeStockData = (stocks1, stocks2) => {
//     const newStocks1 = jsonToArray(stocks1)
//     return (mergeDataSetsByKeys(newStocks1, stocks2, 'symbol', 'symbol'))
// }
