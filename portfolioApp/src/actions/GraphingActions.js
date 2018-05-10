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
                        graphData: processBookData(dateRange, bookInfo)
                    }
                })
            })
    }
}


// Helper functions

export const processBookData = (dateRange, allData) => {

    let minVal = Number.MAX_VALUE
    let maxVal = Number.MIN_VALUE
    const numberItems = Object.keys(allData).length 
    const numberDatePoints = 5 //(first, 1, 2, 3, last) for 5 total
    const datePointGap = numberItems / numberDatePoints
    const dateDataField = dateRange === "1D" ? 'minute' : 'date'
    let dateData = []
    let bookData = []
    if (dateRange === "1D") {
        let index = 0
        bookData = _.map(allData, (data) => {
            // dateData.push(data[dateDataField])
            if (index === 0) {
                dateData.push(data[dateDataField])
            } else if (index === numberItems - 1) {
                dateData.push(data[dateDataField])
            } else if (index % datePointGap === 0) {
                dateData.push(data[dateDataField])
            }
            if (data.marketAverage < minVal) {
                minVal = data.marketAverage
            } else if (data.marketAverage > maxVal) {
                maxVal = data.marketAverage
            }
            index++
            return data.marketAverage
        })
    }

    return {
        bookData,
        minVal,
        maxVal,
        dateData
    }
}
