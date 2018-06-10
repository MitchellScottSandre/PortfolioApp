import firebase from 'firebase'
import _ from 'lodash'
import axios from 'axios'
import { API } from '../Constants'
import {
    INVESTMENT_ADD_SUCCESS, 
    INVESTMENT_STOCKS,
    INVESTMENT_UPDATE_TOTALS,
    INVESTMENT_FETCH_ALL_SUCCESS,
    INVESTMENT_CRYPTOS
} from './types'

// Add a single investment, selected from a quantity modal
// Need to add the investment symbol, name, averagePrice, and amount to firebase
// Then, need to go and get the latest price for that investment
export const investmentAdd = (investmentType, investment) => {
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

        // Add the data to firebase, then get the price and save to redux
        firebase.database().ref(`/users/${currentUser.uid}/investments/${investmentType}/${symbol}`)
            .set(dataToSet)
            .then(() => {
                const investmentInfo = { name, exchange, amount, averagePrice: price }
                switch (investmentType) {
                    case INVESTMENT_STOCKS: 
                        stockFetchPriceAndSave(dispatch, symbol, investmentInfo)
                        break
                    case INVESTMENT_CRYPTOS:
                        addCrypto(dispatch, getState, symbol, investmentInfo, investmentType)
                        break
                    default:
                }
            })
    }
}

// Pull all the firebase information for this investment and go fetch the latest price data
// for each investment, if we have to
export const investmentFetchAll = (investmentType) => {
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
                    stockFetchAllLatestPrices(dispatch, symbolsString, investments)
                    break
                case INVESTMENT_CRYPTOS:
                    cryptoFetchAll(dispatch, getState, symbolsString, investments)
                    break
                default:
            }
        })
    }
}

// Given a list of stock symbols, and the current data for the stock from Firebase,
// fetch all of the latest data for each stock and then add the total stock data object
// to redux -> investments -> stocks
const stockFetchAllLatestPrices = (dispatch, symbolsString, stocks) => {
    if (symbolsString.length === 0) return
    const { baseUrl } = API.IEX_TRADING
    const url = `${baseUrl}/stock/market/batch?symbols=${symbolsString}&types=quote`

    axios.get(url)
        .then((response) => {
            const stocksInfo = response.data

            // We do this for each stock since we aren't replacing everything at investments -> stocks -> symbol.
            // Instead, just updating what we need to
            _.forEach(stocksInfo, (stockInfo) => {
                const { symbol, change, changePercent, latestPrice, close, closeTime, sector, latestTime } = stockInfo.quote

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
                            ...stocks[symbol] // Include the average price, amount, etc, information
                        }
                    }
                })
            })
        })
}

// Fetch the price for a single stock, then save to redux state
export const stockFetchPriceAndSave = (dispatch, symbol, investmentInfo) => {
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

// Get the crypto latest price from book and save to redux state
// TODO need to actually go and refresh and get the newest data
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

// Fetch all of the crypto information from firebase. Update with latest price information
// TODO this needs to use the actual latest price. 
// And then save to redux state
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
