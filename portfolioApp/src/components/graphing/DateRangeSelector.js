import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import _ from 'lodash'

export default class DateRangeSelector extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedRangeIndex: 0
        }
    }

    _optionOnPress(index) {
        this.setState({ selectedRangeIndex: index })
        this.props.onPress(index)
    }

    _renderDateRange(range, index) {
        const { rangeOptionStyle, selectedRangeOptionStyle } = styles
        return (
            <TouchableWithoutFeedback
                onPress={() => this._optionOnPress(index)}
                key={index}
            >
                <View style={index === this.state.selectedRangeIndex ? selectedRangeOptionStyle : rangeOptionStyle}>
                    <Text style={{ fontSize: 8 }}>{range}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        const { dateRangeOptions } = this.props
        const { containerStyle } = styles
        return (
            <View style={containerStyle}>
                {_.map(dateRangeOptions, (range, index) => this._renderDateRange(range, index))}
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    rangeOptionStyle: {
        width: 25,
        height: 15,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    selectedRangeOptionStyle: {
        width: 25,
        height: 15,
        borderRadius: 5,
        backgroundColor: 'orange'
    }
}
