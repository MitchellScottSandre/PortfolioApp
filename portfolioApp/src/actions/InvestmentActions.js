import firebase from 'firebase'
import _ from 'lodash'
import axios from 'axios'
import { API } from '../Constants'
// import { jsonToArray, mergeDataSetsByKeys, isLastCloseDate } from '../utils/functions'
import {
    INVESTMENT_ADD_SUCCESS, 
    INVESTMENT_STOCKS,
    INVESTMENT_UPDATE_TOTALS,
    INVESTMENT_FETCH_ALL_SUCCESS,
    INVESTMENT_CRYPTOS
} from './types'

export const investmentAdd = (investmentType, investment) => {
    console.log('addInvestment', investmentType, investment)
    const { name, symbol, exchange, price, amount } = (investment || {})
    const { currentUser } = firebase.auth()

    return (dispatch, getState) => {
        let dataToSet = {
            name,
            symbol,
            amount, 
            averagePrice: price,
        }

        if (exchange) {
            dataToSet = {
                ...dataToSet,
                exchange
            }
        }
        firebase.database().ref(`/users/${currentUser.uid}/investments/${investmentType}/${symbol}`)
            .set(dataToSet)
            .then(() => {
                const investmentInfo = { name, exchange, amount, averagePrice: price }
                switch (investmentType) {
                    case INVESTMENT_STOCKS: 
                        stockFetch(dispatch, symbol, investmentInfo)
                        break
                    case INVESTMENT_CRYPTOS:
                        addCrypto(dispatch, getState, symbol, investmentInfo, investmentType)
                        break
                    default:
                }
            })
    }
}

// Get all Stocks, ETFs, Bonds, Mutual Funds, and Cryptos from Firebase
export const investmentFetchAll = (investmentType) => {
    console.log('investmentFetchAll!!!')
    const { currentUser } = firebase.auth()
    return (dispatch, getState) => {
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
                case INVESTMENT_CRYPTOS:
                    cryptoFetchAll(dispatch, getState, symbolsString, investments)
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

const addCrypto = (dispatch, getState, symbol, investmentInfo, investmentType) => {
    const { name, price, amount } = investmentInfo
    const { bookData } = getState()
    const { cryptoPrices } = bookData
    const cryptoData = cryptoPrices[symbol]
    return dispatch({
        type: INVESTMENT_ADD_SUCCESS,
        payload: {
            investmentType,
            value: {
                name,
                amount,
                symbol,
                averagePrice: price,
                latestPrice: cryptoData.price
            }
        }
    })
}

const cryptoFetchAll = (dispatch, getState, symbolsString, investments) => {
    const { bookData } = getState()
    const { cryptoPrices } = bookData
    let updatedInvestments = investments

    _.forEach(investments, cryptoData => {
        const { symbol } = cryptoData
        updatedInvestments = {
            ...updatedInvestments,
            [symbol]: {
                ...investments[symbol],
                latestPrice: cryptoPrices[symbol].price
            }
        }
    })

    return dispatch({
        type: INVESTMENT_FETCH_ALL_SUCCESS,
        payload: {
            investmentType: INVESTMENT_CRYPTOS,
            value: updatedInvestments
        }
    })
}
