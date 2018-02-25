import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const SearchResultListItem = (props) => {
    // console.log('SearchResultListItem: props.info', props.info)
    const { onPress, info, alreadyOwned } = props
    const { name, symbol } = info
    const { cellContainerStyle } = styles
    const backgroundColor = alreadyOwned ? '#FFDDFFDD' : 'white'

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[cellContainerStyle, { backgroundColor }]}>
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
