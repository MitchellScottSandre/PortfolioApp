import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const InvestmentListItem = (props) => {
    console.log('investment list item: props.info', props.info)
    const { name, symbol, averagePrice, change, amount, price, exchange, closePrice, closeDate } = props.info
    const { cellContainerStyle } = styles
    // onpress
    return (
        <TouchableOpacity>
            <View style={cellContainerStyle}>
                <Text>{name} | {symbol} | {price} | {averagePrice} | {amount} | {change} | {exchange} | {closePrice} | {closeDate} </Text>
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
