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
        baseUrl: 'http://d.yimg.com/aq/autoc?region=US&lang=en&query=',
        types: {
            currency: 'C',
            stock: 'S',
            etf: 'E',
            option: 'O'
        }
    }
}

const CommonStyle = {
    
}

export {
    // SCREEN_NAMES,
    API,
    CommonStyle
}
