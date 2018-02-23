import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Header } from 'react-native-elements'
import SmartCard from '../common/SmartCard'
import InvestmentListItem from './InvestmentListItem'
import InvestmentSummary from './InvestmentSummary'
// import { connect } from 'react-redux'

// 1 day, 1 week, 1 month, 3 month, 6 month, 1 year, 2 year, max GRAPH
// header: include TOTOAL AMOUNT
// itemsList
// graph
class InvestmentCard extends Component {

    _renderData() {
        return this.props.data.map((item, index) => 
            <InvestmentListItem key={index} info={item} />
        )
    }
    
    render() {
        const { onPlusButtonPress, data, investmentType } = this.props
        const { graphViewStyle } = styles

        return (
            <SmartCard {...this.props} showPlusButton >
                <View>
                    <Header
                        leftComponent={<Text style={{ color: 'white' }}>Stocks</Text>}
                        rightComponent={{ icon: 'add', color: '#fff', onPress: onPlusButtonPress }}
                        outerContainerStyles={{ height: 40, paddingLeft: 15, paddingRight: 15, paddingBottom: 0, paddingTop: 0, marginBottom: 20 }}
                        innerContainerStyles={{ alignItems: 'center' }}
                    />

                    <InvestmentSummary data={data} investmentType={investmentType} />

                    <ScrollView>
                        {this._renderData()}
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
