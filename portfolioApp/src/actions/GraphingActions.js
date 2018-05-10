import axios from 'axios'
import _ from 'lodash'
import { API } from '../Constants'
import {
    STOCK_FETCH_BOOK
} from './types'

export const fetchStockBookData = (stockSymbol, dateRange) => {
    console.log('fetch stock book data called');
    if (stockSymbol.length === 0) return
    const { baseUrl } = API.IEX_TRADING
    let url = `${baseUrl}/stock/${stockSymbol}/chart/${dateRange}/?&filter=date,minute,marketAverage,marketClose`
    console.log(url)
    return (dispatch) => {
        axios.get(url)
            .then((response) => {
                const bookInfo = response.data
                dispatch({
                    type: STOCK_FETCH_BOOK,
                    payload: {
                        stockSymbol,
                        dateRange,
                        data: processBookData(dateRange, bookInfo)
                    }
                })
            })
    }
}


// Helper functions

export const processBookData = (dateRange, allData) => {
    if (dateRange === "1D") {
        return _.map(allData, (data) => data.marketAverage)
    }
}