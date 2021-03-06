import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { createNewUserAccount } from '../../../actions/AuthenticationActions'
import AuthForm from './AuthForm'

class NewUserScreen extends Component {
    static navigatorStyle = {
        // navBarHidden: true
    }

    onPress() {
        const { email, password } = this.props

        this.props.createNewUserAccount({ email, password })
    }

    render() {
        const { containerStyle } = styles

        return (
            <View style={containerStyle} >
                <AuthForm buttonText='Create' onPress={this.onPress.bind(this)} />
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        // marginLeft: 15,
        // marginRight: 15
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password
    }
}

export default connect(mapStateToProps, { createNewUserAccount })(NewUserScreen)
