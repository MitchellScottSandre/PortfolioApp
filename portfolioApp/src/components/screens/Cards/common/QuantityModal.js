import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Modal from 'react-native-modal'
import { Button, FormLabel, FormInput } from 'react-native-elements'

/*
    TODO
    
*/
class QuantityModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amount: 0,
            price: 0
        }
    }

    _dismissModal() {
        this.props.parentDismissModal()
    }

    _extraButtonOnPress(item) {
        const additionalInfo = {
            amount: 0,
            price: 0
        }
        this._dismissModal()
        this.props.onSubmitPress(item, additionalInfo)
    }

    _onSubmitPress(item) {
        const { amount, price } = this.state
        const additionalInfo = {
            amount,
            price
        }
        this._dismissModal()
        this.props.onSubmitPress(item, additionalInfo)
    }

    render() {
        const { isVisible, item, buttonSubmitText, showExtraButton, extraButtonText } = this.props
        const { name, symbol, exch: exchange } = (item || {})
        const { containerStyle, modalStyle, modalContentContainerStyle, submitButtonStyle, buttonTitleStyle, inputStyle, 
                inputContainerStyle } = styles

        return (
            <View style={containerStyle}>
                <Modal 
                    animationIn='slideInUp'
                    animationOut='slideOutUp'
                    isVisible={isVisible} 
                    style={modalStyle} 
                    onBackdropPress={this._dismissModal.bind(this)}
                    onSwipe={this._dismissModal.bind(this)}
                    swipeDirection="up"
                    swipeThreshold={100}
                >
                    <View style={modalContentContainerStyle}>
                        <View>
                            <Text>{name} | {symbol}</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View>
                                <FormLabel containerStyle={inputContainerStyle}>Amount</FormLabel>
                                <FormInput 
                                    onChangeText={(amount) => this.setState({ amount })} 
                                    keyboardType='numeric' containerStyle={inputContainerStyle} 
                                />
                                {/* <Text>Amount</Text>
                                <TextInput onChangeText={(amount) => this.setState({ amount: amount })} style={inputStyle} keyboardType='numeric' /> */}
                            </View>
                            <View>
                                <FormLabel containerStyle={inputContainerStyle}>Price</FormLabel>
                                <FormInput 
                                    onChangeText={(price) => this.setState({ price })} 
                                    keyboardType='numeric' containerStyle={inputContainerStyle} 
                                />
                                {/* <Text>Price</Text>
                                <TextInput onChangeText={(price) => this.setState({ price: price })} style={inputStyle} keyboardType='numeric' /> */}
                            </View>
                            <Button 
                                title={buttonSubmitText} style={submitButtonStyle} titleStyle={buttonTitleStyle} 
                                onPress={() => this._onSubmitPress(item)}
                            />
                            {showExtraButton ? 
                                <Button 
                                    title={extraButtonText} style={submitButtonStyle} titleStyle={buttonTitleStyle} 
                                    onPress={() => this._extraButtonOnPress(item)}
                                />
                            :
                                null
                            }
                           
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
    }, 
    modalStyle: {
        height: 340,
        margin: 30,
        padding: 20, 
        backgroundColor: 'white',
        borderRadius: 20,
        flex: 0
    },
    modalContentContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    submitButtonStyle: {
        width: 200,
        height: 30,
        marginTop: 20
    },
    buttonTitleStyle: {
        color: 'white',
        fontWeight: '700'
    },
    inputStyle: {
        borderColor: 'grey',
        borderWidth: 2,
        height: 20,
        width: 120,
        justifyContent: 'center'
    },
    inputContainerStyle: {
        width: 250
    }
}

export default QuantityModal
