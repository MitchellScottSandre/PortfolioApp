import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const SearchResultListItem = (props) => {
    // console.log('SearchResultListItem: props.info', props.info)
    const { onPress, info } = props
    const { name, symbol } = info
    const { cellContainerStyle } = styles
   
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={cellContainerStyle}>
                <Text>{name} {symbol} </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = {
    cellContainerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 2
    }
}

export default SearchResultListItem
