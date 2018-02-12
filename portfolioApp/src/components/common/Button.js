import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const Button = (props) => {
    const { buttonStyle, textStyle } = styles

    return (
        <TouchableOpacity style={buttonStyle} onPress={props.onPress}>
            <Text style={textStyle}>
                {props.children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = {
    buttonStyle: {
        padding: 5,
        backgroundColor: 'grey', 
        borderRadius: 10, 
        margin: 10,
        width: 200
    },
    textStyle: {
        fontSize: 22,
        alignSelf: 'center'
    }
}

export { Button } 
