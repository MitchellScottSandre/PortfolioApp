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

    const url = `${baseUrl}/stock/${stockSymbol}/chart/${dateRange}/${getParams(dateRange)}`
    console.log('fetch stock url:', url)
    return (dispatch) => {
        axios.get(url)
            .then((response) => {
                console.log('fetch stock response', response)
                const bookInfo = response.data
                const processedBookData = processBookData(dateRange, bookInfo, 'IEX')
                return saveBookData(dispatch, processedBookData, INVESTMENT_STOCKS, stockSymbol, dateRange)
            })
    }
}

const fetchCryptoBookData = (symbol, dateRange) => {
    const { baseUrl } = API.CRYPTO_COMPARE
    const { dateFunction, requestLimit } = getCryptoCompareParams(dateRange)
    const url = `${baseUrl}${dateFunction}?fsym=${symbol}&tsym=USD&limit=${requestLimit}`
    console.log('url is', url)
    return (dispatch) => {
        axios.get(url)
        .then(response => {
            console.log(response)
            const { data } = response
            const { Data } = data

            const processedBookData = processBookData(dateRange, Data, 'CRYPTO_COMPARE')

            return saveBookData(dispatch, processedBookData, INVESTMENT_CRYPTOS, symbol, dateRange)
        })
    }
}

const saveBookData = (dispatch, bookData, investmentType, symbol, dateRange) => {
    console.log('save book data:')
    console.log(bookData, investmentType, symbol, dateRange)
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
    } else if (apiSource === 'CRYPTO_COMPARE') {
        return 'time'
    }
}

const getPriceField = (dateRange, apiSource) => {
    if (apiSource === 'IEX') {
        return dateRange === "1D" ? 'marketAverage' : 'close'
    } else if (apiSource === 'CRYPTO_COMPARE') {
        return 'close'
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

    let i = 0
    bookData = _.map(allData, data => {
        const date = data[dateDataField]
        const numVal = apiSource === 'ALPHA' ? parseInt(data[valueDataField], 10) : data[valueDataField]
        if (i === 0) {
            dateData.push(date)
        } else if (i === numberItems - 1) {
            dateData.push(date)
        } else if (i % datePointGap === 0) {
            dateData.push(date)
        }
        if (data[valueDataField] < minVal) {
            minVal = numVal
        } else if (data[valueDataField] > maxVal) {
            maxVal = numVal
        }
        i++
        return numVal
    })

    return {
        bookData,
        minVal,
        maxVal,
        dateData
    }
}

const getCryptoCompareParams = (dateRange) => {
    const { functions } = API.CRYPTO_COMPARE
    let dateFunction = ''
    let requestLimit = 0

    switch (dateRange) {
        case dateRangeOptions[0]:
            dateFunction = functions.histoMinute
            requestLimit = 500
            break
        case dateRangeOptions[1]:
            dateFunction = functions.historyHour
            requestLimit = 168 // 8h * 21 days
            break
        case dateRangeOptions[2]:
            dateFunction = functions.historyHour
            requestLimit = 168 * 3 // 3 months
            break
        case dateRangeOptions[3]:
            dateFunction = functions.historicalDay
            requestLimit = 6 * 21 // 6 months
            break
        case dateRangeOptions[4]:
            dateFunction = functions.historicalDay
            requestLimit = 6 * 21 // YTD TODO
            break
        case dateRangeOptions[5]:
            dateFunction = functions.historicalDay
            requestLimit = 12 * 21 // 1 year
            break
        case dateRangeOptions[6]:
            dateFunction = functions.historicalDay
            requestLimit = 2 * 12 * 21 // 2 year years
            break
        case dateRangeOptions[7]:
            dateFunction = functions.historicalDay
            requestLimit = 5 * 12 * 21 // 5 year years
            break
        default:
            dateFunction = functions.historicalDay
            requestLimit = 100
    }

    return {
        dateFunction,
        requestLimit
    }
}
