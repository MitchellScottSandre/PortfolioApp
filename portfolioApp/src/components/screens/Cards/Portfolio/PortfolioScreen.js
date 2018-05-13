import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardScreen from '../common/CardScreen'
import { INVESTMENT_STOCKS, INVESTMENT_CRYPTOS } from '../../../../actions/types'
import { investmentFetchAll } from '../../../../actions/InvestmentActions'
import { cryptoFetchAllPriceData } from '../../../../actions/BookActions'

import StockCard from './StockCard'
import CryptoCard from './CryptoCard'

// This will display all portfolio information, including Stocks, Cryptos
class PortfolioScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    }

    // Get all Crypto Price information, and pull saved investments from Firebase
    componentWillMount() {
        this.props.cryptoFetchAllPriceData()
        this.props.investmentFetchAll(INVESTMENT_STOCKS)
        this.props.investmentFetchAll(INVESTMENT_CRYPTOS)
    }

    _getCards() {
        return [
            <StockCard key='1' />,
            <CryptoCard key='2' />
        ]
    }

    render() {
        return (
            <CardScreen cards={this._getCards()} />
        )
    }
}


export default connect(null, { investmentFetchAll, cryptoFetchAllPriceData })(PortfolioScreen)
