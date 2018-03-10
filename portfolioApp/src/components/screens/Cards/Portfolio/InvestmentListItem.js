import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const InvestmentListItem = (props) => {
    console.log('investment list item: props.info', props.info)
    const { name, symbol, averagePrice, change, changePercent, amount, latestPrice, latestTime, exchange, close, closeTime, sector } = props.info
    // const { INVESTMENT_INFO.symbol } = props.info
    const { cellContainerStyle } = styles
    // onpress
    return (
        <TouchableOpacity>
            <View style={cellContainerStyle}>
                <Text>
                    {name} | {symbol} | {latestPrice} | {averagePrice} | {amount} | {change} | {exchange} | {changePercent} | {latestTime} |
                    {close} | {closeTime} | {sector}
                </Text> 
            </View>
        </TouchableOpacity>
    )
}

const styles = {
    cellContainerStyle: {
        height: 60,
        flex: 1,
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1
    }
}

export default InvestmentListItem
