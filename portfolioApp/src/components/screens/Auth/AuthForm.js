import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { emailInputChanged, passwordInputChanged } from '../../../actions'

class AuthForm extends Component {

    _onEmailChange(text) {
        this.props.emailInputChanged(text)
    }

    _onPasswordChange(text) {
        this.props.passwordInputChanged(text)
    }

    _renderButton() {
        const { buttonText, onPress, loading } = this.props
        const { buttonStyle } = styles

        if (loading) {
            return <Button buttonStyle={buttonStyle} loading />
        } 

        return <Button buttonStyle={buttonStyle} title={buttonText} onPress={onPress} />
    }

    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <FormLabel>Email</FormLabel>
                <FormInput onChangeText={this._onEmailChange.bind(this)} value={this.props.email} placeholder='yourEmail@abc.com' />

                <FormLabel>Password</FormLabel>
                <FormInput onChangeText={this._onPasswordChange.bind(this)} value={this.props.password} placeholder='password' />

                {this._renderButton()}
            </View>
        )
    }
}

const styles = {
    buttonStyle: {
        backgroundColor: 'rgba(92, 99,216, 1)',
        width: 300,
        height: 45,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 5
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, { emailInputChanged, passwordInputChanged })(AuthForm)
