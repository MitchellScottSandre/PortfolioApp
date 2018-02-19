import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { investmentFetchAll, investmentAdd } from '../../../../actions/InvestmentActions'
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
        this.props.investmentFetchAll(INVESTMENT_STOCKS)
    }

    _showAddStockModal() {
        this.setState({ showSearchModal: true })
    }

    _onSearchResultPress(stock) {
        const { name, symbol } = stock
        this.props.investmentAdd(INVESTMENT_STOCKS, name, symbol)
    }

    render() {
        const { stocks } = this.props

        return (
            <View>
                { this.state.showSearchModal ? 
                    <SearchModal 
                        isVisible={this.state.showSearchModal} 
                        searchType={SEARCH_STOCKS} 
                        parentDismissModal={() => this.setState({ showSearchModal: false })} 
                        onSearchResultPress={this._onSearchResultPress.bind(this)}
                    /> 
                : 
                    null
                }
                <InvestmentCard title='Stocks' data={stocks} onPlusButtonPress={() => this._showAddStockModal()} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        stocks: state.investments.stocks, 
        lastStockDataFetchTime: state.investments.lastStockDataFetchTime
    }
}

export default connect(mapStateToProps, { investmentFetchAll, investmentAdd })(StockCard)
