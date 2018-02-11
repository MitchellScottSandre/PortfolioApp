import React, { Component } from 'react'
import axios from 'axios'
import { View } from 'react-native'
import { API } from './Constants'

class TestCall extends Component {
    componentWillMount() {
        const { baseUrl, apiKey } = API.ALPHA_VANTAGE
        let url = `${baseUrl}function=TIME_SERIES_DAILY&symbol=MSFT&apikey=${apiKey}&datatype=json`
        console.log(url)
        axios.get(url)
        .then((response) => {
            console.log(response)
        })
    }

    render() {
        return (
            <View></View>
        )
    }
}

export default TestCall
