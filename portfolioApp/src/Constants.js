const INVESTMENT_INFO = {
    name: 'name',
    symbol: 'symbol',
    latestPrice: 'latestPrice',
    averagePrice: 'averagePrice',
    ammount: 'amount',
    change: 'change',
    close: 'close',
    closeTime: 'closeTime',
    exchange: 'exchange',
    sector: 'sector'
}

const API = {
    ALPHA_VANTAGE: {
        apiKey: '953M8HIRXV2KVV52', 
        baseUrl: 'https://www.alphavantage.co/query?',
        functions: {
            batchStockQuotes: 'BATCH_STOCK_QUOTES',
            timeSeriesDaily: 'TIME_SERIES_DAILY',
            digitalCurrencyDaily: 'DIGITAL_CURRENCY_DAILY',
            digitalCurrencyIntraday: 'DIGITAL_CURRENCY_INTRADAY',
            digitalCurrencyWeekly: 'DIGITAL_CURRENCY_WEEKLY'
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
    },
    IEX_TRADING: {
        baseUrl: 'https://api.iextrading.com/1.0'
    },
    COIN_MARKET_CAP: {
        baseUrl: 'https://api.coinmarketcap.com/v2',
        listings: 'ticker/'
    }
}

const CommonStyle = {
    
}

export {
    // SCREEN_NAMES,
    API,
    CommonStyle,
    INVESTMENT_INFO
}
