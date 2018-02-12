import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../common'

class WelcomeScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    }

    newUserOnPress() {
        this.props.navigator.push({
            screen: 'PortfolioApp.NewUserScreen',
            title: 'New User'
        })
    }
    
    render() {
        const { titleTextStyle, containerStyle } = styles

        return (
            <View style={containerStyle}>
                <Text style={titleTextStyle}>Portfolio_App</Text>
                {/* <Button>
                    Current User
                </Button> */}
                <Button onPress={this.newUserOnPress.bind(this)}>
                    New User
                </Button>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1
    }, 
    titleTextStyle: {
        fontSize: 30,
        textAlign: 'center' 
    }
}

export { WelcomeScreen }
