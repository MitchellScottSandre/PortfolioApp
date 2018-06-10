import axios from 'axios'
import _ from 'lodash'
import { API } from '../Constants'
import { BOOK_CRYPTO_FETCH_ALL_PRICE_SUCCESS } from './types'

export const cryptoFetchAllPriceData = () => {
    const { baseUrl } = API.COIN_MARKET_CAP
    const url = `${baseUrl}/${API.COIN_MARKET_CAP.listings}`
    return (dispatch) => {
        axios.get(url)
            .then((response) => {
                const { data } = response
                const cryptoData = data.data
                let filteredData = []
                let allData = {}
                _.forEach(cryptoData, (crypto) => {
                    allData = {
                        ...allData,
                        [crypto.symbol]: {
                            symbol: crypto.symbol,
                            name: crypto.name,
                            price: crypto.quotes.USD.price
                        }
                    }
                })
                dispatch({
                    type: BOOK_CRYPTO_FETCH_ALL_PRICE_SUCCESS,
                    payload: allData
                })
            })
    }
}

