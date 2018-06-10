import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import { setSelectedItem } from '../../../../actions/CardActions'
import { Header } from 'react-native-elements'
import SmartCard from '../common/SmartCard'
import InvestmentListItem from './InvestmentListItem'
import InvestmentSummary from './InvestmentSummary'
import Graph from '../../../graphing/Graph'
import * as ScalingUtils from '../../../../utils/scalingUtils'
import * as CommonStyles from '../../../common/CommonStyles'

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
        const { onPlusButtonPress, investmentType, title, summaryData } = this.props
        const { headerBlockStyle } = styles

        return (
            <SmartCard {...this.props} showPlusButton >
                <View>
                    <Header
                        leftComponent={<Text style={CommonStyles.GLOBAL_FONT_STYLES.title_white}>{title}</Text>}
                        rightComponent={{ icon: 'add', color: '#fff', onPress: onPlusButtonPress }}
                        outerContainerStyles={headerBlockStyle}
                        innerContainerStyles={{ alignItems: 'center' }}
                    />

                    <InvestmentSummary data={summaryData && summaryData[investmentType]} />

                    <ScrollView style={{ height: 300 }}>
                        {this._renderData()}
                    </ScrollView>

                    <Graph 
                        investmentType={investmentType}
                    />
                </View>
            </SmartCard>
        )
    }
}

const styles = {
    headerBlockStyle: {
        height: ScalingUtils.moderateScale(50),
        borderRadius: ScalingUtils.moderateScale(5),
        paddingLeft: ScalingUtils.moderateScale(20), 
        paddingRight: ScalingUtils.moderateScale(20), 
        paddingBottom: 0, 
        paddingTop: 0, 
        marginBottom: ScalingUtils.moderateScale(10),
        backgroundColor: CommonStyles.GLOBAL_COLORS.accent
    }
}

const mapStateToProps = state => {
    return {
        cardData: state.cards,
        summaryData: state.investments.summaryData
    }
}

export default connect(mapStateToProps, { setSelectedItem })(InvestmentCard)

