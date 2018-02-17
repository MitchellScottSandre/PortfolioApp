import firebase from 'firebase'
import { API } from '../Constants'
import {
    INVESTMENT_FETCH_SUCCESS 
} from './types'

// Get all Stocks, ETFs, Bonds, Mutual Funds, or Cryptos from Firebase
export const investmentFetch = (investmentType) => {
    const { currentUser } = firebase.auth()
    console.log(currentUser)
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/investments/${investmentType}`)
        .on('value', snapshot => {
            dispatch({
                type: INVESTMENT_FETCH_SUCCESS,
                payload: { 
                    investmentType, 
                    value: snapshot.val() 
                }
            })
        })
    }
}
// API call to get all financial info
export const stocksInfoFetch = (symbols) => {
    const { baseUrl, apiKey } = API.ALPHA_VANTAGE
}
