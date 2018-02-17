import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'

class WelcomeScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    }

    newUserOnPress() {
        this.props.navigator.push({ // showModal
            screen: 'PortfolioApp.NewUserScreen',
            title: 'New User'
        })
    }

    loginUserOnPress() {
        this.props.navigator.push({ // showModal
            screen: 'PortfolioApp.LoginUserScreen',
            title: 'Returning User '
        })
    }
    
    render() {
        const { titleTextStyle, containerStyle, buttonStyle } = styles

        return (
            <View style={containerStyle}>
                <Text style={titleTextStyle}>Portfolio_App</Text>

                <Button 
                    onPress={this.loginUserOnPress.bind(this)} title='Login User'
                    titleStyle={{ fontWeight: '700', color: 'red' }} buttonStyle={buttonStyle} 
                />
            
                <Button 
                    onPress={this.newUserOnPress.bind(this)} title='New User'
                    titleStyle={{ fontWeight: '700', color: 'red' }} buttonStyle={buttonStyle} 
                />
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }, 
    titleTextStyle: {
        fontSize: 30,
        textAlign: 'center' 
    },
    buttonStyle: {
        backgroundColor: 'rgba(92, 99,216, 1)',
        width: 300,
        height: 45,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 5
    }
}

export { WelcomeScreen }
