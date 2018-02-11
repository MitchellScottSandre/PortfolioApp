import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../common'

class WelcomeScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    }
    
    render() {
        const { titleTextStyle, containerStyle } = styles

        return (
            <View style={containerStyle}>
                <Text style={titleTextStyle}>Portfolio_App</Text>
                <Button>
                    Login
                </Button>
                <Button>
                    New User
                </Button>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        justifyContent: 'space-around',
        // alignItems: 'center',
        flex: 1
    }, 
    titleTextStyle: {
        fontSize: 30,
        textAlign: 'center' 
    }
}

export { WelcomeScreen }
