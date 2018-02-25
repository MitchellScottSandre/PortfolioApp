import React, { Component } from 'react'
import { View } from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import { investmentAdd } from '../../../../actions/InvestmentActions'
import { INVESTMENT_STOCKS, SEARCH_STOCKS } from '../../../../actions/types'
import InvestmentCard from './InvestmentCard'
import SearchModal from '../common/SearchModal'

class StockCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showSearchModal: false
        }
    }
    componentWillMount() {
        console.log('stock card component will mount...')
        // this.props.investmentFetchAll(INVESTMENT_STOCKS)
    }

    _showAddStockModal() {
        this.setState({ showSearchModal: true })
    }

    _onSearchResultAdd(stock, additionalInfo) {
        const { name, symbol, exch: exchange } = stock
        const { price, amount } = additionalInfo
        console.log('stock card _onSearchResultAdd', price, amount)
        this.props.investmentAdd(INVESTMENT_STOCKS, { name, symbol, exchange, price, amount })
    }

    render() {
        const { stocks } = this.props

        return (
            <View>
                <SearchModal 
                    isVisible={this.state.showSearchModal} 
                    searchType={SEARCH_STOCKS} 
                    parentDismissModal={() => this.setState({ showSearchModal: false })} 
                    onSearchResultAdd={this._onSearchResultAdd.bind(this)}
                /> 
                <InvestmentCard title='Stocks' data={stocks} onPlusButtonPress={() => this._showAddStockModal()} investmentType='stocks' />
            </View>
        )
    }
}

const mapStateToProps = state => {
    console.log('symbols:', state.investments.symbols)
    console.log('investments is:', state.investments)
    let a = _.map(state.investments.stocks, (stock) => { return stock })
    console.log('a is:', a)
    return {
        stocks: _.map(state.investments.stocks, (stock) => { return stock }),
        lastStockDataFetchTime: state.investments.lastStockDataFetchTime
    }
}

export default connect(mapStateToProps, { investmentAdd })(StockCard)
