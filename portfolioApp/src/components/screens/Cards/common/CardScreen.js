import React, { Component } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
// import SmartCard from '../common/SmartCard'

const { width, height } = Dimensions.get('window')

class CardScreen extends Component {

    render() {
        const { cards } = this.props
        const { containerStyle } = styles
        return (
            <View style={containerStyle}>
                <ScrollView 
                    snapToAlignment='start'
                    // snapToInterval={2}
                    decelerationRate="fast"
                    // contentContainerStyle={{flex:1}}
                >
                    {cards}
                </ScrollView>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1, 
        width,
        // flexDirection: 'row'
    }
}

export default CardScreen
