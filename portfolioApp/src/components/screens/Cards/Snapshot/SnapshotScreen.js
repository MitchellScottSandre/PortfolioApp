import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class SnapshotScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    }

    render() {
        return (
            <View></View>
        )
    }
}

export default connect(null, {})(SnapshotScreen)
