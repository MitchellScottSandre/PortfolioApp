import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'

export default class LoadSpinner extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                <ActivityIndicator size="small" color="#0000ff" animating />
            </View>
        )
    }
}
