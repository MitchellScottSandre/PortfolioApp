import React, { Component } from 'react'
import { View, Text } from 'react-native'
import _ from 'lodash'
import { dateRangeOptions, MONTHS } from '../../actions/GraphingActions'

export default class XAxis extends Component {

    _renderDate(date) {
        const { dateRange } = this.props
        if (dateRange === dateRangeOptions[0]) {
            return `${date.getHours()}:${date.getMinutes()}`
        } else if (dateRange === dateRangeOptions[6] || dateRange === dateRangeOptions[7]) {
            const yr = date.getFullYear() % 100
            const month = MONTHS[date.getMonth()]
            return `${yr} ${month} ${date.getDate()}`
        } else {
            const month = MONTHS[date.getMonth()]
            return `${month} ${date.getDate()}`
        }
    }

    render() {
        const { dateData } = this.props

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
               {_.map(dateData, (date) => <Text style={{ fontSize: 8 }}key={date}>{this._renderDate(date)}</Text>)}
            </View>
        )
    }
}
