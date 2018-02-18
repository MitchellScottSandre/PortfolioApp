import firebase from 'firebase'
import _ from 'lodash'
import axios from 'axios'
import { API } from '../Constants'
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
            // snapshot.val() is JSON of investments names/symbols
            let val = snapshot.val()
            const symbols = _.map(snapshot.val(), (investment) => {
                return investment.symbol
            })
            let data = stocksInfoFetch(val, symbols)
            console.log('data from stock info fetch:', data)

            // switch (investmentType) {
            //     case INVESTMENT_STOCKS: 
            //         data = stocksInfoFetch(val, symbols)
            //         break
            //     default:
            // }
            dispatch({
                type: INVESTMENT_FETCH_SUCCESS,
                payload: { 
                    investmentType, 
                    value: data 
                }
            })
        })
    }
}
// API call to get all financial info
const stocksInfoFetch = (stocks, symbols) => {
    const symbolsString = _.join(symbols, ',') // array -> comma separated list
    console.log('symbolsString', symbolsString)
    const { baseUrl, apiKey } = API.ALPHA_VANTAGE
    const url = `${baseUrl}function=${API.ALPHA_VANTAGE.functions.batchStockQuotes}&symbols=${symbolsString}&apikey=${apiKey}`
    console.log(url)
    let stockQuotes = []
    axios.get(url)
        .then((response) => {
            console.log('aaaa', response.data['Stock Quotes'])
            stockQuotes = response.data['Stock Quotes']
        })
    return stockQuotes
}
