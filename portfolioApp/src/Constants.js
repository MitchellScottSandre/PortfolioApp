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
    },
    CRYPTO_COMPARE: {
        baseUrl: 'https://min-api.cryptocompare.com/data/',
        functions: {
            historicalDay: 'histoday',
            historyHour: 'histohour',
            histoMinute: 'histominute'
        }
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

/*
    Crypto Compare:
time: 1526400960,
close: 8535.64,
high: 8537.21,
low: 8534.89,
open: 8536.14,
volumefrom: 28.89,
volumeto: 248060.02
},
*/
