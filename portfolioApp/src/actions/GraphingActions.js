import axios from 'axios'
import _ from 'lodash'
import { API } from '../Constants'
import { SET_GRAPH_DATA, SAVE_BOOK_DATA, INVESTMENT_STOCKS, INVESTMENT_CRYPTOS, SAVE_RAW_DATA_BY_SEARCH_RANGE } from './types'

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
    let dataFunction = ''
    let dataFieldShortName = ''
    let dataFunctionName = ''
    switch (dateRange) {
        case dateRangeOptions[0]:
            dataFunction = functions.digitalCurrencyIntraday
            dataFunctionName = 'Time Series (Digital Currency Intraday)'
            dataFieldShortName = 'intraday'
            break
        case dateRangeOptions[1]:
        case dateRangeOptions[2]:
        case dateRangeOptions[3]:
        case dateRangeOptions[4]:
            dataFunction = functions.digitalCurrencyDaily
            dataFunctionName = 'Time Series (Digital Currency Daily)'
            dataFieldShortName = 'daily'
            break
        default:
            dataFunction = functions.digitalCurrencyWeekly
            dataFunctionName = 'Time Series (Digital Currency Weekly)'
            dataFieldShortName = 'weekly'
    }

    const url = `${baseUrl}function=${dataFunction}&symbol=${symbol}&market=USD&apikey=${apiKey}`
    console.log('url is:', url)
    return (dispatch) => {
        axios.get(url)
        .then(response => {
            const { data } = response
            let bookData = data[dataFunctionName]

            console.log('response is', response)
            console.log('booKData is', bookData)
            let bookMaxObjects = null
            switch (dateRange) {
                case dateRangeOptions[1]: // M
                    bookMaxObjects = 31
                    break
                case dateRangeOptions[2]: // 3M
                    bookMaxObjects = 90
                    break
                case dateRangeOptions[3]: // 6M
                    bookMaxObjects = 182
                    break
                case dateRangeOptions[4]: // YTD TODO
                    break
                case dateRangeOptions[5]: // 1Y
                    bookMaxObjects = 365
                    break
                case dateRangeOptions[6]: // 2Y
                    bookMaxObjects = 365 * 2
                    break
            }

            const processedBookData = processBookData(dateRange, bookData, 'ALPHA', bookMaxObjects, true)

            dispatch({
                type: SAVE_RAW_DATA_BY_SEARCH_RANGE,
                payload: {
                    investmentType: INVESTMENT_CRYPTOS,
                    field: dataFieldShortName,
                    data: bookData,
                    symbol
                }
            })

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
    } else if (apiSource === 'ALPHA') {
        return 'USE_KEY'
    }
}

const getPriceField = (dateRange, apiSource) => {
    if (apiSource === 'IEX') {
        return dateRange === "1D" ? 'marketAverage' : 'close'
    } else if (apiSource === 'ALPHA') {
        return dateRange === "1D" ? '1b. price (USD)' : '4b. close (USD)'
    }
}

// Get the dateData, bookData, minVal, and maxVal from the API response data
export const processBookData = (dateRange, allData, apiSource, maxIndex, reverseData) => {
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

    // let index = 0
    let endIndex = maxIndex ? Math.min(maxIndex, numberItems) : numberItems
    console.log('end index is', endIndex)
    for (let i = 0; i < endIndex; i++) {
        const data = allData[keys[i]]
        const date = dateDataField === 'USE_KEY' ? keys[i] : data[dateDataField]
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
        bookData.push(numVal)
    }

    return {
        bookData: reverseData ? bookData.reverse() : bookData,
        minVal,
        maxVal,
        dateData: reverseData ? dateData.reverse() : dateData,
    }
}
