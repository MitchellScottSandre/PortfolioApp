import React, { Component } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
// import SmartCard from '../common/SmartCard'

const { width } = Dimensions.get('window')

class CardScreen extends Component {

    render() {
        const { cards } = this.props
        const { containerStyle } = styles
        return (
            <View style={containerStyle}>
                <ScrollView >
                    {cards}
                </ScrollView>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1, 
        width
    }
}

export default CardScreen
