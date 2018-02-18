import React, { Component } from 'react'
// import { Dimensions } from 'react-native'
import { Card } from 'react-native-elements'

// const { width } = Dimensions.get('window')

class SmartCard extends Component {

    render() {
        // const { title } = this.props
        const { containerStyle, defaultTitleStyle } = styles
        return (
           <Card containerStyle={containerStyle} titleStyle={defaultTitleStyle}>
                {this.props.children}
           </Card>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1
    },
    defaultTitleStyle: {
        textAlign: 'left'
    }
}

export default SmartCard
