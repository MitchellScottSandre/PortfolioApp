// const SCREEN_NAMES = {
//     welcome: 'welcome'
// }

const API = {
    ALPHA_VANTAGE: {
        apiKey: '953M8HIRXV2KVV52', 
        baseUrl: 'https://www.alphavantage.co/query?',
        functions: {
            batchStockQuotes: 'BATCH_STOCK_QUOTES'
        }
    },
    SYMBOL_SEARCH: {
        baseUrl: 'http://d.yimg.com/aq/autoc?region=US&lang=en&query='
    }
}

const CommonStyle = {
    
}

export {
    // SCREEN_NAMES,
    API,
    CommonStyle
}
