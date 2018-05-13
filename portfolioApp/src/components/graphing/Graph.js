import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { LineChart } from 'react-native-svg-charts'
import { connect } from 'react-redux'

import { getBookData, dateRangeOptions } from '../../actions/GraphingActions'
import YAxis from './YAxis'
import XAxis from './XAxis'
import DateRangeSelector from './DateRangeSelector'

const graphHeight = 150

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
        const { investmentType, cardData, graphingData } = nextProps

        let data = []
        if (graphingData && investmentType in graphingData && 'graphData' in graphingData[investmentType]) {
            console.log('Graph -> ', investmentType, graphingData[investmentType].graphData)
            data = graphingData[investmentType].graphData
        }

        this.setState({ graphData: data })

        // If there is a selected item
        if (cardData && investmentType in cardData && 'selectedItem' in cardData[investmentType]) {
            const item = cardData[investmentType].selectedItem
            const { symbol, name } = item

            // If it's a different investment, need to go and fetch that data
            if (symbol !== this.state.selectedSymbol) {
                this.setState({ 
                    selectedSymbol: symbol,
                    selectedName: name,
                })

                nextProps.getBookData(investmentType, symbol, this.state.selectedDateRange)
            }
        } 
    }

    _dateRangeChanged(index) {
        this.setState({ selectedDateRange: dateRangeOptions[index] })
        this.props.getBookData('stocks', this.state.selectedSymbol, dateRangeOptions[index])
    }

    render() {
        const { minVal, maxVal, bookData, dateData } = (this.state.graphData || {})
        
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
                <Text>{this.state.selectedName || ''}</Text>
            </View>    
        )
    }
}

const mapStateToProps = state => {
    return {
        graphingData: state.graphing,
        cardData: state.cards
    }
}

export default connect(mapStateToProps, { getBookData })(Graph)
