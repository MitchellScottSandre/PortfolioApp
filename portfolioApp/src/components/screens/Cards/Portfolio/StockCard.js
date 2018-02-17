import React, { Component } from 'react'
import { connect } from 'react-redux'
import { investmentFetch } from '../../../../actions/InvestmentActions'
import { INVESTMENT_STOCKS } from '../../../../actions/types'
import InvestmentCard from './InvestmentCard'

class StockCard extends Component {
    componentWillMount() {
        this.props.investmentFetch(INVESTMENT_STOCKS)
    }

    componentDidMount() {
       let symbols = this.props.stocks.map((stock) => stock.symbol) 
       console.log('symbols:', symbols)
    }

    shouldComponentUpdate() {
        // TODO: check now time vs lastStockDataFetch time
    }

    render() {
        const { lastStockDataFetchTime, stocks, stockInfo } = this.props

        console.log('props stocks', this.props.stocks)
        const data = [
            {
                name: 'Apple Inc',
                symbol: 'AAPL',
                value: 172,
                change: -0.56
            }
        ]

        return (
            <InvestmentCard title='Stocks' data={data} />
        )
    }
}

const mapStateToProps = state => {
    return {
        stocks: state.investments.stocks,
        lastStockDataFetchTime: state.investments.lastStockDataFetchTime,
        stockInfo: state.investmentFetch.stockInfo
    }
}

export default connect(mapStateToProps, { investmentFetch })(StockCard)
