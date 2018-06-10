import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { GLOBAL_FONT_STYLES } from '../../../common/CommonStyles'

export default class InvestmentSummary extends Component {

    _renderItem(name, value) {
        const { itemContainerStyle } = styles
        return (
            <View style={itemContainerStyle}>
                <Text style={GLOBAL_FONT_STYLES.subheading_emphasized_black}>{name}</Text>
                <Text style={GLOBAL_FONT_STYLES.subheading_black}>{value}</Text>
            </View>
        )
    }
    
    render() {
        const { totalMarketValue, totalBookValue, dollarChange, percentChange } = this.props.data || {}
        const { containerStyle } = styles
        return (
            <View style={containerStyle}>
                {this._renderItem('Market', totalMarketValue)}
                {this._renderItem('Book', totalBookValue)}
                {this._renderItem('Change ($)', dollarChange)}
                {this._renderItem('Change (%)', percentChange)}
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
}
