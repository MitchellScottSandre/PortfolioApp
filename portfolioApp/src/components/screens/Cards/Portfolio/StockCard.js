import React, { Component } from 'react'
import { connect } from 'react-redux'
import { investmentFetch } from '../../../../actions/InvestmentActions'
import { INVESTMENT_STOCKS } from '../../../../actions/types'
import InvestmentCard from './InvestmentCard'


class StockCard extends Component {
    componentWillMount() {
        this.props.investmentFetch(INVESTMENT_STOCKS)
    }

    // componentWillReceiveProps(nextProps) {
    //     const symbols = _.map(nextProps.stocks, (stock) => {
    //         return stock.symbol
    //     })

    //     nextProps.stocksInfoFetch(symbols)
    // }

    // shouldComponentUpdate() {
    //     // TODO: check now time vs lastStockDataFetch time
    // }

    render() {
        const { lastStockDataFetchTime, stocks, stockInfo } = this.props

        return (
            <InvestmentCard title='Stocks' data={stocks} />
        )
    }
}

const mapStateToProps = state => {
    // Map Firebase stock json to an array
    console.log('state stocks', state.investments.stocks)
    return {
        stocks: state.investments.stocks, 
        lastStockDataFetchTime: state.investments.lastStockDataFetchTime,
        // stockInfo: state.investmentFetch.stockInfo
    }
}

export default connect(mapStateToProps, { investmentFetch })(StockCard)
