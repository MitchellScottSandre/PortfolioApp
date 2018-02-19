import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const InvestmentListItem = (props) => {
    // console.log('investment list item: props.info', props.info)
    const { name, symbol, price, change, volume } = props.info
    const { cellContainerStyle } = styles
    // onpress
    return (
        <TouchableOpacity>
            <View style={cellContainerStyle}>
                <Text>{name} {symbol} {price}</Text>
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
