import axios from 'axios'
import _ from 'lodash'
import { API } from '../Constants'
import { SET_GRAPH_DATA, SAVE_BOOK_DATA } from './types'

export const getBookData = (investmentType, symbol, dateRange) => {
    console.log('Graphing Actions called', investmentType, symbol, dateRange)
    // First, check if the data already exists in bookData (from BookReducer)
    return (dispatch, getState) => {
        const { bookData } = getState()
        if (bookData && investmentType in bookData && symbol in bookData[investmentType] && dateRange in bookData[investmentType][symbol]) {
            console.log('-----> DATA ALREADY EXISTS IN BOOK')
            return dispatch({
                type: SET_GRAPH_DATA,
                payload: {
                    investmentType: 'stocks',
                    symbol,
                    dateRange,
                    graphData: bookData[investmentType][symbol][dateRange]
                }
            })
        } else {
            console.log('-----> DATA DOESNT EXIST IN BOOK')
            return dispatch(fetchStockBookData(symbol, dateRange))
        }
    }
}

const fetchStockBookData = (stockSymbol, dateRange) => {
    if (stockSymbol.length === 0) return
    const { baseUrl } = API.IEX_TRADING

    let url = `${baseUrl}/stock/${stockSymbol}/chart/${dateRange}/${getParams(dateRange)}`
    console.log(url)
    return (dispatch) => {
        axios.get(url)
            .then((response) => {
                const bookInfo = response.data
                const processedBookData = processBookData(dateRange, bookInfo)
                console.log('processedBookData', processedBookData)
                dispatch({
                    type: SAVE_BOOK_DATA,
                    payload: {
                        investmentType: 'stocks',
                        symbol: stockSymbol,
                        dateRange,
                        graphData: processedBookData
                    }
                })
                
                dispatch({
                    type: SET_GRAPH_DATA,
                    payload: {
                        investmentType: 'stocks',
                        symbol: stockSymbol,
                        dateRange,
                        graphData: processedBookData
                    }
                })
            })
    }
}

const getParams = (dateRange) => {
    return `?&filter=${getFilters(dateRange)}`
}

const getFilters = (dateRange) => {
    if (dateRange === "1D") {
        return "minute,marketAverage,marketClose"
    } 
    
    return "date,close"
}

// Helper functions

export const processBookData = (dateRange, allData) => {
    let minVal = Number.MAX_VALUE
    let maxVal = Number.MIN_VALUE
    const numberItems = Object.keys(allData).length 
    const numberDatePoints = 5 //(first, 1, 2, 3, last) for 5 total
    const datePointGap = numberItems / numberDatePoints
    const dateDataField = dateRange === "1D" ? 'minute' : 'date'
    const valueDataField = dateRange === "1D" ? 'marketAverage' : 'close'
    let dateData = []
    let bookData = []

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
        if (data[valueDataField] < minVal) {
            minVal = data[valueDataField]
        } else if (data[valueDataField] > maxVal) {
            maxVal = data[valueDataField]
        }
        index++
        return data[valueDataField]
    })

    return {
        bookData,
        minVal,
        maxVal,
        dateData
    }
}
