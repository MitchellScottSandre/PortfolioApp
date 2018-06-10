import axios from 'axios'
import _ from 'lodash'
import { API } from '../Constants'
import { SET_GRAPH_DATA, SAVE_BOOK_DATA, INVESTMENT_STOCKS, INVESTMENT_CRYPTOS, STARTING_FETCH_GRAPH_DATA } from './types'

export const dateRangeOptions = ["1D", "1M", "3M", "6M", "YTD", "1Y", "2Y", "5Y"]
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
// Matches ####-##-##
const dateMatchExpr = new RegExp("[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))")

export const getBookData = (investmentType, symbol, dateRange) => {
    // console.log('Graphing Actions called', investmentType, symbol, dateRange)

    // First, check if the data already exists in bookData (from BookReducer)
    return (dispatch, getState) => {
        const { bookData } = getState()
        console.log('book data --->', bookData)
        if (bookData && investmentType in bookData && symbol in bookData[investmentType] && dateRange in bookData[investmentType][symbol]) {
            // console.log('-----> DATA ALREADY EXISTS IN BOOK')
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
    
        // console.log('-----> DATA DOESNT EXIST IN BOOK')
        dispatch({ type: STARTING_FETCH_GRAPH_DATA, payload: { investmentType } })
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
    // console.log('fetch stock url:', url)
    return (dispatch) => {
        axios.get(url)
            .then((response) => {
                // console.log('fetch stock response', response)
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
    // console.log('url is', url)
    return (dispatch) => {
        axios.get(url)
        .then(response => {
            // console.log(response)
            const { data } = response
            const { Data } = data

            const processedBookData = processBookData(dateRange, Data, 'CRYPTO_COMPARE')

            return saveBookData(dispatch, processedBookData, INVESTMENT_CRYPTOS, symbol, dateRange)
        })
    }
}

const saveBookData = (dispatch, bookData, investmentType, symbol, dateRange) => {
    // console.log('save book data:')
    // console.log(bookData, investmentType, symbol, dateRange)
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

// Get the dateData, bookData, minVal, and maxVal from the API response data
export const processBookData = (dateRange, allData, apiSource) => {
    const keys = Object.keys(allData)
    const numberItems = keys.length 
    const numberDatePoints = 5 
    const datePointGap = Math.round(numberItems / numberDatePoints)
    const dateDataField = getDateField(dateRange, apiSource)
    const valueDataField = getPriceField(dateRange, apiSource)
    const today = new Date()
    // console.log("datePointGap", datePointGap)
    let dateData = []
    let bookData = []
    let minVal = Number.MAX_VALUE
    let maxVal = Number.MIN_VALUE
    
    let i = 0
    bookData = _.map(allData, data => {
        const numVal = apiSource === 'ALPHA' ? parseInt(data[valueDataField], 10) : data[valueDataField]
        if (apiSource === API.CRYPTO_COMPARE.name) {
            // console.log("date ---> ", getFormattedDate(data[dateDataField], apiSource, dateRange), "-->", numVal)
            // console.log("--> ", i, i % datePointGap === 0)
        }
        if (i === 0 || i === numberItems - 1 || i % datePointGap === 0) {
            const date = getFormattedDate(data[dateDataField], apiSource, dateRange, today)
            if (i === 0) {
                dateData.push(date)
            } else if (i === numberItems - 1) {
                dateData.push(date)
            } else {
                dateData.push(date)
            }
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
    if (apiSource === API.IEX_TRADING.name) {
        return dateRange === "1D" ? 'minute' : 'date'
    } else if (apiSource === API.CRYPTO_COMPARE.name) {
        return 'time'
    }
}

const getPriceField = (dateRange, apiSource) => {
    if (apiSource === API.IEX_TRADING.name) {
        return dateRange === "1D" ? 'marketAverage' : 'close'
    } else if (apiSource === API.CRYPTO_COMPARE.name) {
        return 'close'
    }
}

const getFormattedDate = (dateInfo, apiSource, dateRange, todayDate) => {
    if (apiSource === API.CRYPTO_COMPARE.name) {
        return new Date(dateInfo * 1000)
        // const date = new Date(dateInfo * 1000)
        // switch (dateRange) {
        //     case dateRangeOptions[0]: return date.getHours()
        //     // default: return MONTHS[date.getMonth()] + " " + date.getDate() 
        // }
    } else if (apiSource === API.IEX_TRADING.name) {
        if (dateMatchExpr.test(dateInfo)) {
            const year = dateInfo.substring(0, 4)
            const month = dateInfo.substring(5, 7)
            const day = dateInfo.substring(8, 10)
            // return MONTHS[date.getMonth()] + " " + date.getDate()
            return new Date(year, month, day)
        } else {
            const hour = parseInt(dateInfo.substring(0, 2), 10)
            const minute = parseInt(dateInfo.substring(3, 5), 10)
            return new Date(todayDate.getYear(), todayDate.getMonth(), todayDate.getDay(), hour, minute)
        }
    }

    return dateInfo
}

const getCryptoCompareParams = (dateRange) => {
    const { functions } = API.CRYPTO_COMPARE
    let dateFunction = ''
    let requestLimit = 0

    switch (dateRange) {
        case dateRangeOptions[0]: // 1 day
            dateFunction = functions.histoMinute
            requestLimit = 3600 // number minutes in a day
            break
        case dateRangeOptions[1]: // 1 month
            dateFunction = functions.historyHour
            requestLimit = 24 * 31
            break
        case dateRangeOptions[2]: // 3 months
            dateFunction = functions.historicalDay
            requestLimit = 31 * 3
            break
        case dateRangeOptions[3]: // 6 months
            dateFunction = functions.historicalDay
            requestLimit = 31 * 6 
            break
        case dateRangeOptions[4]: // YTD TODO
            dateFunction = functions.historicalDay
            requestLimit = 6 * 21 
            break
        case dateRangeOptions[5]: // 1 year
            dateFunction = functions.historicalDay
            requestLimit = 365
            break
        case dateRangeOptions[6]:
            dateFunction = functions.historicalDay
            requestLimit = 365 * 2 // 2 year years
            break
        case dateRangeOptions[7]:
            dateFunction = functions.historicalDay
            requestLimit = 365 * 2 // 5 year years
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
