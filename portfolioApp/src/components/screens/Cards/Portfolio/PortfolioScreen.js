import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardScreen from '../common/CardScreen'
import StockCard from './StockCard'
// import { loginUser } from '../../../../actions/AuthenticationActions'

const cards = [
    <StockCard key='1' />,
    // <StockCard key='2' />
]

class PortfolioScreen extends Component {
    static navigatorStyle = {
        navBarHidden: true
    }

    componentWillMount() {
        // const email = 'a@a.com'
        // const password = 'aaaaaa'
        // this.props.loginUser({ email, password })
    }

    render() {
        return (
            <CardScreen cards={cards} />
        )
    }
}


export default connect(null, { })(PortfolioScreen)
