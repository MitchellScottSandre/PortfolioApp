import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { LineChart } from 'react-native-svg-charts'
import { connect } from 'react-redux'
import { fetchStockBookData } from '../../actions/GraphingActions'
import YAxis from './YAxis'
import XAxis from './XAxis'

const graphHeight = 200

class Graph extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedSymbol: '',
            selectedName: '',
            selectedDateRange: '1D',
            graphData: null
        }
    }

    componentWillReceiveProps(nextProps) {
        const { investmentType, cardData } = nextProps
        let graphSymbol = ''

        this.setState({ graphData: nextProps.graphData })

        if ('selectedItem' in cardData[investmentType]) {
            const item = cardData[investmentType].selectedItem
            const { symbol, name } = item
            if (symbol === this.state.selectedSymbol) return
            
            this.setState({ 
                selectedSymbol: symbol,
                selectedName: name
            })

            //investmentType
            nextProps.fetchStockBookData(symbol, this.state.selectedDateRange)
        } 
    }

    render() {
        const { minVal, maxVal, bookData, dateData } = (this.state.graphData || {})
        console.log(this.props.graphData)
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
                {/* <Text>{this.state.selectedName || ''}</Text> */}
            </View>
            
            
        )
    }
}

const mapStateToProps = state => {
    console.log('Graph map state to props', state)
    let graphData = []
    if (state.graphing && state.graphing.stockInfo && state.graphing.stockInfo.graphData) {
        graphData = state.graphing.stockInfo.graphData
        console.log('book data is', graphData)
    }
    return {
        graphData,
        cardData: state.cards
    }
}

export default connect(mapStateToProps, { fetchStockBookData })(Graph)
