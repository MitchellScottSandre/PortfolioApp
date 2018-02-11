import React from 'react'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const App = () => {
    return (
        <Provider store={createStore()}>
            <View style={{ flex: 1 }}>
                <Text>Hello</Text>
            </View>
        </Provider>
    )
}

export default App