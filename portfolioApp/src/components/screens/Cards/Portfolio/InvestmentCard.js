import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { setSelectedItem } from '../../../../actions/CardActions'

import { Header } from 'react-native-elements'
import SmartCard from '../common/SmartCard'
import InvestmentListItem from './InvestmentListItem'
import InvestmentSummary from './InvestmentSummary'
import Graph from '../../../graphing/Graph'

class InvestmentCard extends Component {

    _renderData() {
        return this.props.data.map((item, index) => 
            <InvestmentListItem 
                key={index} 
                info={item} 
                onPress={() => this.props.setSelectedItem(this.props.investmentType, item)}
            />
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

                    {/* <View style={graphViewStyle}>
                        <Text>GRAPH TODO</Text>
                    </View> */}
                    <Graph 
                        investmentType={investmentType}
                    />
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

const mapStateToProps = state => {
    console.log('investment card Card props from redux', state)

    return {
        cardData: state.cards
    }
}

export default connect(mapStateToProps, { setSelectedItem })(InvestmentCard)

