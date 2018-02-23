import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const InvestmentListItem = (props) => {
    // console.log('investment list item: props.info', props.info)
    const { name, symbol, averagePrice, change, amount, price, exchange } = props.info
    const { cellContainerStyle } = styles
    // onpress
    return (
        <TouchableOpacity>
            <View style={cellContainerStyle}>
                <Text>{name} | {symbol} | {price} | {averagePrice} | {amount} | {change} | {exchange}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = {
    cellContainerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row' 
    }
}

export default InvestmentListItem
