import axios from 'axios'
import _ from 'lodash'
import { API } from '../Constants'
import { SET_GRAPH_DATA, SAVE_BOOK_DATA, INVESTMENT_STOCKS, INVESTMENT_CRYPTOS } from './types'

export const dateRangeOptions = ["1D", "1M", "3M", "6M", "YTD", "1Y", "2Y", "5Y"]

export const getBookData = (investmentType, symbol, dateRange) => {
    console.log('Graphing Actions called', investmentType, symbol, dateRange)

    // First, check if the data already exists in bookData (from BookReducer)
    return (dispatch, getState) => {
        const { bookData } = getState()
        console.log('book data --->', bookData)
        if (bookData && investmentType in bookData && symbol in bookData[investmentType] && dateRange in bookData[investmentType][symbol]) {
            console.log('-----> DATA ALREADY EXISTS IN BOOK')
            return dispatch({
                type: SET_GRAPH_DATA,
                payload: {
                    investmentType,
                    symbol,
                    dateRange,
                    graphData: bookData[investmentType][symbol][dateRange]
                }
            })
        } 
    
        console.log('-----> DATA DOESNT EXIST IN BOOK')
        switch (investmentType) {
            case INVESTMENT_STOCKS:
                return dispatch(fetchStockBookData(symbol, dateRange))
            case INVESTMENT_CRYPTOS:
                return dispatch(fetchCryptoBookData(symbol, dateRange))
            default:

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
                const processedBookData = processBookData(dateRange, bookInfo, 'IEX')
                return saveBookData(dispatch, processedBookData, INVESTMENT_STOCKS, stockSymbol, dateRange)
            })
    }
}

const fetchCryptoBookData = (symbol, dateRange) => {
    const { baseUrl, functions, apiKey } = API.ALPHA_VANTAGE
    const { digitalCurrencyDaily } = functions
    // TODO 1: Use daily or intraday based on the date range
    const url = `${baseUrl}function=${digitalCurrencyDaily}&symbol=${symbol}&market=USD&apikey=${apiKey}`
    console.log('url is:', url)
    return (dispatch) => {
        axios.get(url)
        .then(response => {
            const { data } = response
            const bookData = data['Time Series (Digital Currency Daily)']

            // TODO 2: Slice the data based on the date range
            // Slice the book data according to the date range
            // switch (dateRange) {
            //     case dateRangeOptions[0]:
            // }

            const processedBookData = processBookData(dateRange, bookData, 'ALPHA')
            return saveBookData(dispatch, processedBookData, INVESTMENT_CRYPTOS, symbol, dateRange)
        })
    }
}

const saveBookData = (dispatch, bookData, investmentType, symbol, dateRange) => {
    dispatch({
        type: SAVE_BOOK_DATA,
        payload: {
            investmentType,
            symbol,
            dateRange,
            graphData: bookData
        }
    })
    
    dispatch({
        type: SET_GRAPH_DATA,
        payload: {
            investmentType,
            symbol,
            dateRange,
            graphData: bookData
        }
    })
}

// Helper functions
const getParams = (dateRange) => {
    return `?&filter=${getFilters(dateRange)}`
}

const getFilters = (dateRange) => {
    if (dateRange === "1D") {
        return "minute,marketAverage,marketClose"
    } 
    
    return "date,close"
}

const getDateField = (dateRange, apiSource) => {
    if (apiSource === 'IEX') {
        return dateRange === "1D" ? 'minute' : 'date'
    } else if (apiSource === 'ALPHA') {
        return 'USE_KEY'
    }
}

const getPriceField = (dateRange, apiSource) => {
    if (apiSource === 'IEX') {
        return dateRange === "1D" ? 'marketAverage' : 'close'
    } else if (apiSource === 'ALPHA') {
        return '4b. close (USD)'
    }
}

// Get the dateData, bookData, minVal, and maxVal from the API response data
export const processBookData = (dateRange, allData, apiSource) => {
    const keys = Object.keys(allData)
    const numberItems = keys.length 
    const numberDatePoints = 5 
    const datePointGap = numberItems / numberDatePoints
    const dateDataField = getDateField(dateRange, apiSource)
    const valueDataField = getPriceField(dateRange, apiSource)

    let dateData = []
    let bookData = []
    let minVal = Number.MAX_VALUE
    let maxVal = Number.MIN_VALUE

    let index = 0
    bookData = _.map(allData, (data) => {
        const date = dateDataField === 'USE_KEY' ? keys[index] : data[dateDataField]
        const numVal = apiSource === 'ALPHA' ? parseInt(data[valueDataField], 10) : data[valueDataField]
        if (index === 0) {
            dateData.push(date)
        } else if (index === numberItems - 1) {
            dateData.push(date)
        } else if (index % datePointGap === 0) {
            dateData.push(date)
        }
        if (data[valueDataField] < minVal) {
            minVal = numVal
        } else if (data[valueDataField] > maxVal) {
            maxVal = numVal
        }
        index++
        return numVal
    })

    return {
        bookData,
        minVal,
        maxVal,
        dateData
    }
}
