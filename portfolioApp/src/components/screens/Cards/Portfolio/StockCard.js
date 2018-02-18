import React, { Component } from 'react'
import { connect } from 'react-redux'
import { investmentFetch } from '../../../../actions/InvestmentActions'
import { INVESTMENT_STOCKS } from '../../../../actions/types'
import InvestmentCard from './InvestmentCard'


class StockCard extends Component {
    componentWillMount() {
        this.props.investmentFetch(INVESTMENT_STOCKS)
    }

    // shouldComponentUpdate() {
    //     // TODO: check now time vs lastStockDataFetch time
    // }

    _addStock() {
        console.log('pressed')
    }

    render() {
        const { stocks } = this.props

        return (
            <InvestmentCard title='Stocks' data={stocks} onPlusButtonPress={this._addStock.bind(this)} />
        )
    }
}

const mapStateToProps = state => {
    // Map Firebase stock json to an array
    console.log('state stocks', state.investments.stocks)
    return {
        stocks: state.investments.stocks, 
        lastStockDataFetchTime: state.investments.lastStockDataFetchTime,
    }
}

export default connect(mapStateToProps, { investmentFetch })(StockCard)
