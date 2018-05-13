import React, { Component } from 'react'
import { View, Text } from 'react-native'
import _ from 'lodash'

export default class YAxis extends Component {
    render() {
        const { dateData } = this.props

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
               {_.map(dateData, (data) => <Text style={{ fontSize: 8 }}key={data}>{data}</Text>)}
            </View>
        )
    }
}
