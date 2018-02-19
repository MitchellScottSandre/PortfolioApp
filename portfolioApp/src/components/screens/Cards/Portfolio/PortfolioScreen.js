import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardScreen from '../common/CardScreen'
import StockCard from './StockCard'
// import { loginUser } from '../../../../actions/AuthenticationActions'

// const cards = [
//     <StockCard key='1' />,
//     // <StockCard key='2' />
// ]

class PortfolioScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    }

    _getCards() {
        // navigator={this.props.navigator}
        return [
            <StockCard key='1' />,
            // <StockCard key='2' />
        ]
    }

    render() {
        return (
            <CardScreen cards={this._getCards()} />
        )
    }
}


export default connect(null, { })(PortfolioScreen)
