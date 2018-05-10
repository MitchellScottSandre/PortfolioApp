import React, { Component } from 'react'
import { View, Text } from 'react-native'
import numeral from 'numeral'

export default class YAxis extends Component {
    render() {
        const { minVal, maxVal, graphHeight } = this.props

        return (
            <View style={{ position: 'absolute', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: graphHeight }}>
                <Text style={{ fontSize: 10 }}>{numeral(maxVal).format('$0,0.00')}</Text>
                <Text style={{ fontSize: 10 }}>{numeral(minVal).format('$0,0.00')}</Text>
            </View>
        )
    }
}
