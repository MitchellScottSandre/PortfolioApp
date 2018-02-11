import React, { Component } from 'react'
import axios from 'axios'
import { View } from 'react-native'
import { API } from './Constants'

class TestAPICall extends Component {
    componentWillMount() {
        const { baseUrl, apiKey } = API.ALPHA_VANTAGE
        const url = `${baseUrl}function=TIME_SERIES_DAILY&symbol=MSFT&apikey=${apiKey}&datatype=json`
        axios.get(url)
        .then((response) => {
            console.log(response)
        })
    }

    render() {
        return (
            <View />
        )
    }
}

export default TestAPICall
