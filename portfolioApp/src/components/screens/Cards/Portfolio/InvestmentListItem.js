import React from 'react'
import { View, Text } from 'react-native'

const InvestmentListItem = (props) => {
    console.log('investment list item: props.info', props.info)
    const { name, symbol, price, change, volume } = props.info
    const { cellContainerStyle } = styles
    // onpress
    return (
        <View style={cellContainerStyle}>
            <Text>{name} {symbol} {price}</Text>
        </View>
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
