import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardScreen from '../common/CardScreen'
import StockCard from './StockCard'
import { INVESTMENT_STOCKS, INVESTMENT_CRYPTOS } from '../../../../actions/types'
import { investmentFetchAll } from '../../../../actions/InvestmentActions'
import { cryptoFetchAllPriceData } from '../../../../actions/BookActions'
import CryptoCard from './CryptoCard';

class PortfolioScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    }

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
