import React, { Component } from 'react'
import { LineChart, Grid } from 'react-native-svg-charts'
import { connect } from 'react-redux'
import { fetchStockBookData } from '../../actions/GraphingActions'

class Graph extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedSymbol: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        const { investmentType, cardData } = nextProps
        let graphSymbol = ''
        if ('selectedSymbol' in cardData[investmentType]) {
            graphSymbol = cardData[investmentType].selectedSymbol
            if (graphSymbol === this.state.selectedSymbol) return
            
            this.setState({ selectedSymbol: graphSymbol })
        } else {
            return
        }
        console.log('graph componentWillReceiveProps', investmentType, cardData)
        //investmentType
        nextProps.fetchStockBookData(graphSymbol, "1D")
    }

    render() {
        return (
            <LineChart
                style={{ height: 200 }}
                data={this.props.graphData || []}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid />
            </LineChart>
        )
    }
}

const mapStateToProps = state => {
    console.log('Graph map state to props', state)
    let data = []
    if (state.graphing && state.graphing.stockInfo && state.graphing.stockInfo.data) {
        data = state.graphing.stockInfo.data
    }
    return {
        graphData: data,
        cardData: state.cards
    }
}

export default connect(mapStateToProps, { fetchStockBookData })(Graph)
