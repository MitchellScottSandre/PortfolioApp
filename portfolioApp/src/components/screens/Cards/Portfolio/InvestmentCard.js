import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import SmartCard from '../common/SmartCard'
import InvestmentListItem from './InvestmentListItem'
// import { connect } from 'react-redux'

// 1 day, 1 week, 1 month, 3 month, 6 month, 1 year, 2 year, max GRAPH
// itemsList
// graph
class InvestmentCard extends Component {

    _renderData() {
        return this.props.data.map((item, index) => 
            <InvestmentListItem key={index} info={item} />
        )
    }
    
    render() {
        // const { listItems } = this.props
        const { graphViewStyle } = styles

        return (
            <SmartCard {...this.props} >
                <View>
                    <ScrollView>
                        {/* {this._renderData()} */}
                    </ScrollView>

                    <View style={graphViewStyle}>
                        <Text>GRAPH TODO</Text>
                    </View>
                </View>
            </SmartCard>
        )
    }
}

const styles = {
    graphViewStyle: {
        height: 50
    }
}
//connect(null, {})
export default InvestmentCard
