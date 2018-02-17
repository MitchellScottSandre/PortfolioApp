import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardScreen from '../common/CardScreen'
import StockCard from './StockCard'

const cards = [
    <StockCard key='1' />,
    <StockCard key='2' />
]

class PortfolioScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    }

    render() {
        return (
            <CardScreen cards={cards} />
        )
    }
}


export default connect(null, {})(PortfolioScreen)
