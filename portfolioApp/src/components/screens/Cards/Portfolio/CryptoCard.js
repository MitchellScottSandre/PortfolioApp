import React, { Component } from 'react'
import { View } from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import { investmentAdd } from '../../../../actions/InvestmentActions'
import { INVESTMENT_CRYPTOS, SEARCH_CRYPROS } from '../../../../actions/types'
import InvestmentCard from './InvestmentCard'
import SearchModal from '../common/SearchModal'

class CryptoCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showSearchModal: false
        }
    }

    _showAddModal() {
        this.setState({ showSearchModal: true })
    }

    _onSearchResultAdd(crypto, additionalInfo) {
        const { name, symbol } = crypto
        const { price, amount } = additionalInfo
        this.props.investmentAdd(INVESTMENT_CRYPTOS, { name, symbol, price, amount })
    }

    render() {
        const { cryptos } = this.props

        return (
            <View>
                <SearchModal 
                    isVisible={this.state.showSearchModal} 
                    searchType={SEARCH_CRYPROS} 
                    parentDismissModal={() => this.setState({ showSearchModal: false })} 
                    onSearchResultAdd={this._onSearchResultAdd.bind(this)}
                /> 
                <InvestmentCard 
                    title='Crypto' 
                    data={cryptos} 
                    onPlusButtonPress={() => this._showAddModal()} 
                    investmentType={INVESTMENT_CRYPTOS} 
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    // console.log('Crypto Card props from redux', state)

    return {
        cryptos: _.map(state.investments.cryptos, (crypto) => { return crypto }),
        // lastStockDataFetchTime: state.investments.lastStockDataFetchTime
    }
}

export default connect(mapStateToProps, { investmentAdd })(CryptoCard)
