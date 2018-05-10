import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { investmentUpdateTotals } from '../../../../actions/InvestmentActions'

class InvestmentSummary extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            totalBookValue: null,
            totalMarketValue: null,
            dollarChange: null,
            percentChange: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this._calculateValues(nextProps)
    }

    _calculateValues(props) {
        console.log("investment Summary props:", props)
        const { data, investmentType } = props
        let totalBookValue = 0
        let totalMarketValue = 0
        data.forEach((investment) => {
            const { amount, averagePrice, latestPrice } = investment
            totalBookValue += amount * averagePrice
            totalMarketValue += amount * latestPrice
        })
        this.setState({
            totalBookValue: numeral(totalBookValue).format('$0,0.00'),
            totalMarketValue: numeral(totalMarketValue).format('$0,0.00'),
            dollarChange: numeral(totalMarketValue - totalBookValue).format('$0,0.00'),
            percentChange: numeral((totalMarketValue / totalBookValue) - 1).format('0.00%')
        })
        // props.investmentUpdateTotals({ investmentType, totalBookValue, totalMarketValue })
    }
    
    render() {
        return (
            <View>
                {/* <Text> */}
                <Text>{this.state.totalMarketValue} | {this.state.totalBookValue} | {this.state.dollarChange} | {this.state.percentChange}</Text>

            </View>
        )
    }
}


export default connect(null, { investmentUpdateTotals })(InvestmentSummary)

// export default InvestmentSummary
