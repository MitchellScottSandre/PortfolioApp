import React, { Component } from 'react'
import SmartCard from '../common/SmartCard'
import { connect } from 'react-redux'

class StockCard extends Component {
    render() {
        return (
            <SmartCard title='Stocks' />
        )
    }
}

export default connect(null, {})(StockCard)
