import React from 'react'
import { View, Text } from 'react-native'

const InvestmentListItem = (props) => {
    console.log(props)
    const { name, symbol, value, change } = props.info
    const { cellContainerStyle } = styles
    // onpress
    return (
        <View style={cellContainerStyle}>
            <Text>{name}</Text>
        </View>
    )
}

const styles = {
    cellContainerStyle: {
        height: 90,
        flex: 1
    }
}

export default InvestmentListItem
