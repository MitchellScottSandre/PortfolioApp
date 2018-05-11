import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { LineChart } from 'react-native-svg-charts'
import { connect } from 'react-redux'

import { getBookData } from '../../actions/GraphingActions'
import YAxis from './YAxis'
import XAxis from './XAxis'
import DateRangeSelector from './DateRangeSelector'
const graphHeight = 150

const dateRangeOptions = ["1D", "1M", "3M", "6M", "YTD", "1Y", "2Y", "5Y"]

class Graph extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedSymbol: '',
            selectedName: '',
            selectedDateRange: dateRangeOptions[0],
            graphData: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        const { investmentType, cardData } = nextProps

        this.setState({ graphData: nextProps.graphData })

        // If there is a selected item
        if ('selectedItem' in cardData[investmentType]) {
            const item = cardData[investmentType].selectedItem
            const { symbol, name } = item

            // If it's a different investment, need to go and fetch that data
            if (symbol !== this.state.selectedSymbol) {
                this.setState({ 
                    selectedSymbol: symbol,
                    selectedName: name,
                    // selectedDateRange: dateRangeOptions[1],
                })

                nextProps.getBookData('stocks', symbol, this.state.selectedDateRange)
            }
        } 
    }

    _dateRangeChanged(index) {
        this.setState({ selectedDateRange: dateRangeOptions[index] })
        this.props.getBookData('stocks', this.state.selectedSymbol, dateRangeOptions[index])
    }

    render() {
        const { minVal, maxVal, bookData, dateData } = (this.state.graphData || {})
        // console.log(this.props.graphData)
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <YAxis
                        minVal={minVal}
                        maxVal={maxVal}
                        graphHeight={graphHeight}
                    />
                    {!!bookData && 
                        <LineChart
                            style={{ height: graphHeight, flex: 1, marginLeft: 15 }}
                            data={bookData}
                            svg={{ stroke: 'rgb(134, 65, 244)' }}
                            contentInset={{ top: 0, bottom: 0 }}
                            gridMin={minVal}
                            gridMax={maxVal}
                            animate
                        />
                    }
                </View>
                <XAxis
                    dateData={dateData}
                />
                <DateRangeSelector
                    dateRangeOptions={dateRangeOptions}
                    onPress={this._dateRangeChanged.bind(this)}
                />
                {/* <Text>{this.state.selectedName || ''}</Text> */}
            </View>    
        )
    }
}

const mapStateToProps = state => {
    console.log('Graph map state to props', state)
    let graphData = []
    if (state.graphing && state.graphing.stocks && state.graphing.stocks.graphData) {
        graphData = state.graphing.stocks.graphData
        console.log('book data is', graphData)
    } else {
        console.log('no stocks.graphData')
    }
    return {
        graphData,
        cardData: state.cards
    }
}

export default connect(mapStateToProps, { getBookData })(Graph)
